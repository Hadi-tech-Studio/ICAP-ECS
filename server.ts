import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '10mb' }));

// Health and status routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/gemini/status', (_req, res) => {
  const hasKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  res.json({
    available: hasKey,
    hasServerKey: hasKey,
    preferredModel: 'gemini-3.1-flash-lite',
    supportedModels: ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash']
  });
});

const modelCooldowns = new Map<string, number>();

function isModelCoolingDown(modelName: string): boolean {
  const expiresAt = modelCooldowns.get(modelName);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    modelCooldowns.delete(modelName);
    return false;
  }
  return true;
}

function markModelCooldown(modelName: string, durationMs: number = 60000): void {
  modelCooldowns.set(modelName, Date.now() + durationMs);
}

function cleanApiKey(key: string | undefined | null): string {
  if (!key || typeof key !== 'string') return '';
  let cleaned = key.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/**
 * Server-side Gemini API Key Verification Endpoint
 * Validates either the server project key or a user-provided custom key
 * by executing a minimal test ping against gemini-3.1-flash-lite.
 */
app.post('/api/gemini/validate-key', async (req, res) => {
  try {
    const rawCustomKey = typeof req.body?.apiKey === 'string' ? req.body.apiKey : '';
    const customKey = cleanApiKey(rawCustomKey);
    const serverKey = cleanApiKey(process.env.GEMINI_API_KEY);
    const keyToTest = (customKey && customKey.length > 20 && customKey !== 'SERVER_ENV_KEY')
      ? customKey
      : serverKey;

    if (!keyToTest) {
      return res.status(400).json({
        valid: false,
        error: 'No API key provided or configured in environment.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey: keyToTest,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
    const activeCandidates = candidateModels.filter(m => !isModelCoolingDown(m));
    const modelsToTry = activeCandidates.length > 0 ? activeCandidates : candidateModels;
    let lastErr: any = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: 'Ping'
        });

        if (response && response.text) {
          return res.json({
            valid: true,
            model,
            isServerKey: keyToTest === serverKey
          });
        }
      } catch (candidateErr: any) {
        lastErr = candidateErr;
        const statusCode = candidateErr?.status || candidateErr?.statusCode || 500;
        const msg = candidateErr?.message || '';

        // If auth error, the key itself is invalid across all models
        if (statusCode === 401 || statusCode === 403 || msg.includes('API_KEY_INVALID')) {
          return res.status(400).json({
            valid: false,
            isAuthError: true,
            error: 'API key is invalid or not authorized (API_KEY_INVALID).'
          });
        }
        if (statusCode === 429) {
          markModelCooldown(model, 60000);
        }
        // If 429, 404, 503, try next candidate model
      }
    }

    const statusCode = lastErr?.status || lastErr?.statusCode || 500;
    const msg = lastErr?.message || 'Verification failed';
    const isAuth = statusCode === 401 || statusCode === 403 || msg.includes('API_KEY_INVALID');

    return res.status(isAuth ? 400 : 502).json({
      valid: false,
      isAuthError: isAuth,
      error: isAuth ? 'API key is invalid or not authorized (API_KEY_INVALID).' : msg
    });
  } catch (err: any) {
    const statusCode = err?.status || err?.statusCode || 500;
    const msg = err?.message || 'Verification failed';
    const isAuth = statusCode === 401 || statusCode === 403 || msg.includes('API_KEY_INVALID');

    return res.status(isAuth ? 400 : 502).json({
      valid: false,
      isAuthError: isAuth,
      error: isAuth ? 'API key is invalid or not authorized (API_KEY_INVALID).' : msg
    });
  }
});

/**
 * Server-side Gemini Content Generation Endpoint
 * Authenticates using the authentic process.env.GEMINI_API_KEY from Google AI Studio,
 * injects telemetry 'aistudio-build' header, and provides smooth fallback across
 * verified supported models (gemini-3.8-flash, gemini-3.1-flash-lite, gemini-flash-latest)
 * to prevent 400 API_KEY_INVALID, 404 NOT_FOUND, 429, or 503 capacity spikes.
 */
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, responseMimeType, model } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing required string parameter: prompt'
      });
    }

    // Always prefer the authentic Google AI Studio project key configured in the environment
    const serverKey = cleanApiKey(process.env.GEMINI_API_KEY);
    const rawClientKey = typeof req.headers['x-gemini-api-key'] === 'string'
      ? req.headers['x-gemini-api-key']
      : '';
    const clientHeaderKey = cleanApiKey(rawClientKey);

    // Ensure we have a valid key (server environment key is primary; client header is fallback only if valid)
    const validClientKey = (clientHeaderKey && clientHeaderKey.length > 20 && clientHeaderKey !== 'SERVER_ENV_KEY') ? clientHeaderKey : '';
    const primaryKey = serverKey || validClientKey;

    if (!primaryKey) {
      return res.status(401).json({
        success: false,
        error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is configured in your Google AI Studio project settings.'
      });
    }

    // Supported modern models: gemini-3.1-flash-lite, gemini-flash-latest, gemini-3.8-flash
    const validModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
    const requestedModel = (model && validModels.includes(model)) ? model : 'gemini-3.1-flash-lite';

    const baseCandidates = Array.from(new Set([
      requestedModel,
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.8-flash'
    ]));

    const activeCandidates = baseCandidates.filter(m => !isModelCoolingDown(m));
    const candidateModels = activeCandidates.length > 0 ? activeCandidates : baseCandidates;

    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    if (responseMimeType) {
      config.responseMimeType = responseMimeType;
    }

    // Sequence of keys to try: primary key (serverKey), then client key if different
    const keysToTry = Array.from(new Set([
      serverKey,
      validClientKey
    ])).filter(k => Boolean(k && k.length > 5));

    let lastError: any = null;
    let successfulText: string | null = null;
    let modelUsed = '';

    keyLoop: for (const key of keysToTry) {
      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      for (const candidate of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: candidate,
            contents: prompt,
            config: Object.keys(config).length > 0 ? config : undefined
          });

          if (response && response.text) {
            successfulText = response.text;
            modelUsed = candidate;
            break keyLoop;
          }
        } catch (modelErr: any) {
          lastError = modelErr;
          const statusCode = modelErr?.status || modelErr?.statusCode;
          const errorMsg = modelErr?.message || '';

          // If rate limited (status 429), place candidate model in temporary cooldown and smoothly continue to next model
          if (statusCode === 429) {
            markModelCooldown(candidate, 60000);
            console.log(`[server.ts] Model ${candidate} quota exhausted (429); transitioning to next available model.`);
            continue;
          }

          // If auth error on this key (400 API_KEY_INVALID, 401, 403), break candidate loop to try fallback key
          if (statusCode === 401 || statusCode === 403 || (statusCode === 400 && errorMsg.includes('API_KEY_INVALID'))) {
            console.warn(`[server.ts] Key returned auth error (${statusCode}). Switching to alternative key if available.`);
            break;
          }

          console.warn(`[server.ts] Model ${candidate} request failed (status ${statusCode}):`, errorMsg);

          // Continue to next candidate model on 404 (retired), 503 (demand spikes), or 500
          if (statusCode === 404 || statusCode === 503 || statusCode === 500) {
            continue;
          }
        }
      }
    }

    if (successfulText !== null) {
      return res.json({
        success: true,
        text: successfulText,
        modelUsed
      });
    }

    // If all candidates failed, send descriptive user-friendly error
    const errStatus = lastError?.status || 500;
    const errMsg = lastError?.message || 'Failed to call Gemini API';
    return res.status(errStatus === 403 || errStatus === 401 || errMsg.includes('API_KEY_INVALID') ? 401 : 502).json({
      success: false,
      error: (errStatus === 403 || errStatus === 401 || errMsg.includes('API_KEY_INVALID'))
        ? 'Gemini API authentication failed: please ensure your GEMINI_API_KEY in Google AI Studio is valid.'
        : `Gemini API request could not be completed: ${errMsg}`,
      details: lastError?.message
    });

  } catch (error: any) {
    console.error('[server.ts] Uncaught error in /api/gemini/generate:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal server error occurred while processing the Gemini request.',
      details: error?.message
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use('/ICAP-ECS', express.static(distPath));
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ICAP ECS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
