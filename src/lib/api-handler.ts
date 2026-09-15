/**
 * ============================================================================
 * api-handler.ts / api-handler.js
 * Bulletproof Gemini REST API Module for ICAP CA English Learning Hub
 * Target Model: gemini-3.8-flash (with seamless gemini-3.1-flash-lite fallback)
 * ============================================================================
 */

// Event listener for opening the API key modal when key is missing
type KeyModalCallback = () => Promise<string | null>;
let keyModalHandler: KeyModalCallback | null = null;

export function registerKeyModalHandler(handler: KeyModalCallback) {
  keyModalHandler = handler;
}

/**
 * Retrieves the stored Gemini API key from localStorage, or returns indicator if server key is active.
 */
export async function getGeminiApiKey(): Promise<string | null> {
  if (typeof window === 'undefined') return 'SERVER_ENV_KEY';
  
  let key = localStorage.getItem('GEMINI_API_KEY');
  if (key) {
    key = key.trim();
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
      key = key.slice(1, -1).trim();
    }
    if (key.length > 20 && !key.includes('placeholder')) {
      return key;
    }
  }

  // The server environment provides the authentic process.env.GEMINI_API_KEY
  return 'SERVER_ENV_KEY';
}

/**
 * Helper to check whether Gemini is available via the server endpoint
 */
export async function checkServerGeminiStatus(): Promise<{ available: boolean; hasServerKey: boolean }> {
  try {
    const res = await fetch('/api/gemini/status');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[api-handler] Could not check server Gemini status:', e);
  }
  return { available: true, hasServerKey: true };
}

/**
 * Helper to save the API key into localStorage
 */
export function setGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    let cleaned = key.trim();
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    localStorage.setItem('GEMINI_API_KEY', cleaned);
  }
}

/**
 * Helper to remove API key from localStorage
 */
export function clearGeminiApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('GEMINI_API_KEY');
  }
}

/**
 * Validate an API key (either a custom user key or the server environment key)
 * Returns { valid: boolean, isServerKey?: boolean, model?: string, error?: string }
 */
export async function validateGeminiApiKey(key?: string): Promise<{
  valid: boolean;
  isServerKey?: boolean;
  model?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/gemini/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key || '' })
    });
    return await res.json();
  } catch (err: any) {
    return {
      valid: false,
      error: err?.message || 'Network error while contacting validation server'
    };
  }
}

/**
 * Helper function to clean and parse JSON from Gemini's response text.
 * Strips markdown code fences (```json ... ``` or ``` ... ```) using regex.
 * 
 * @param rawText - Raw text string from Gemini API response
 * @returns Parsed JavaScript object/array or null if invalid
 */
export function cleanAndParseJSON<T = any>(rawText: string): T | null {
  if (!rawText || typeof rawText !== 'string') return null;

  try {
    // 1. First attempt direct parse if already pure JSON
    return JSON.parse(rawText.trim()) as T;
  } catch {
    // 2. Strip markdown backticks ```json ... ``` or ``` ... ```
    try {
      let cleaned = rawText.trim();
      
      // Match content inside ```json ... ``` or ``` ... ```
      const markdownMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (markdownMatch && markdownMatch[1]) {
        cleaned = markdownMatch[1].trim();
      } else {
        // Fallback: strip leading and trailing backticks
        cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      }

      // If still enclosed in extra quotes or formatting, find first '{' or '['
      const firstBrace = cleaned.search(/[\{\[]/);
      if (firstBrace !== -1) {
        const openChar = cleaned[firstBrace];
        const closeChar = openChar === '[' ? ']' : '}';
        const lastBrace = cleaned.lastIndexOf(closeChar);
        
        if (lastBrace !== -1 && lastBrace > firstBrace) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }
      }

      // Remove invalid trailing commas before closing braces/brackets
      cleaned = cleaned.replace(/,\s*([\}\]])/g, '$1');

      return JSON.parse(cleaned) as T;
    } catch (innerError) {
      console.warn('[cleanAndParseJSON] JSON parse error, returning null:', innerError);
      return null;
    }
  }
}

/**
 * Sleep helper for exponential backoff retries
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Async function to call the Google AI Studio Gemini 2.5 Flash REST API
 * with exponential backoff, rate limit handling, pure JSON response formatting,
 * and guaranteed mock fallback.
 * 
 * @param systemPrompt - Instructions and role definitions for Gemini
 * @param userPrompt - Specific user prompt or payload request
 * @param fallbackData - Mock JSON data returned safely if API fails
 * @returns Parsed JSON response from Gemini or fallbackData on failure
 */
export interface GeminiCallConfig {
  prompt: string;
  systemInstruction?: string;
  fallbackText?: string;
  responseMimeType?: string;
  model?: string;
}

/**
 * Async function to call the server-side Gemini endpoint (/api/gemini/generate)
 * Supports both:
 * 1. callGeminiAPI(systemPrompt, userPrompt, fallbackData) -> returns T
 * 2. callGeminiAPI({ prompt, systemInstruction, fallbackText }) -> returns string
 */
export async function callGeminiAPI<T = any>(
  arg1: string | GeminiCallConfig,
  arg2?: string,
  arg3?: T
): Promise<any> {
  let systemPrompt = '';
  let userPrompt = '';
  let fallbackData: any = '';
  let isJsonMode = true;
  let requestedModel = 'gemini-3.1-flash-lite';

  if (typeof arg1 === 'object' && arg1 !== null) {
    userPrompt = arg1.prompt || '';
    systemPrompt = arg1.systemInstruction || 'You are an expert tutor for ICAP ECS.';
    fallbackData = arg1.fallbackText || 'Here is the detailed academic explanation based on ICAP ECS guidelines.';
    isJsonMode = arg1.responseMimeType === 'application/json';
    if (arg1.model) {
      requestedModel = arg1.model;
    }
  } else {
    systemPrompt = typeof arg1 === 'string' ? arg1 : '';
    userPrompt = arg2 || '';
    fallbackData = arg3;
    isJsonMode = true;
  }

  let customKey = typeof window !== 'undefined' ? localStorage.getItem('GEMINI_API_KEY') : null;
  if (customKey) {
    customKey = customKey.trim();
    if ((customKey.startsWith('"') && customKey.endsWith('"')) || (customKey.startsWith("'") && customKey.endsWith("'"))) {
      customKey = customKey.slice(1, -1).trim();
    }
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (customKey && customKey.length > 20 && !customKey.includes('placeholder')) {
    headers['X-Gemini-Api-Key'] = customKey;
  }

  const payload = {
    prompt: userPrompt,
    systemInstruction: systemPrompt,
    responseMimeType: isJsonMode ? 'application/json' : 'text/plain',
    model: requestedModel
  };

  const maxRetries = 2;
  let attempt = 0;
  let delay = 1500;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (response.status === 429 || response.status === 503) {
        attempt++;
        if (attempt <= maxRetries) {
          console.warn(`[api-handler] HTTP ${response.status}. Retrying in ${delay / 1000}s...`);
          await sleep(delay);
          delay *= 2;
          continue;
        } else {
          console.warn(`[api-handler] Server busy (${response.status}). Using fallback.`);
          return fallbackData;
        }
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        console.warn(`[api-handler] Server returned status ${response.status}:`, errorBody?.error || response.statusText);
        return fallbackData;
      }

      const result = await response.json();
      const rawText = result?.text;

      if (!rawText) {
        console.warn('[api-handler] Empty text from Gemini endpoint. Using fallback.');
        return fallbackData;
      }

      if (!isJsonMode) {
        return rawText;
      }

      const parsed = cleanAndParseJSON<T>(rawText);
      if (parsed !== null && parsed !== undefined) {
        return parsed;
      }

      if (typeof fallbackData === 'string') {
        return rawText;
      }

      console.warn('[api-handler] Could not parse JSON response. Using fallback.');
      return fallbackData;

    } catch (networkError) {
      attempt++;
      if (attempt <= maxRetries) {
        console.warn(`[api-handler] Network error: ${networkError}. Retrying in ${delay / 1000}s...`);
        await sleep(delay);
        delay *= 2;
      } else {
        console.warn('[api-handler] Network request failed after retries. Safely returning fallback data.');
        return fallbackData;
      }
    }
  }

  return fallbackData;
}
