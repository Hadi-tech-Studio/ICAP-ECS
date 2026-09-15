/**
 * ============================================================================
 * api-handler.js (Vanilla JavaScript ES Module / Global)
 * Bulletproof Gemini REST API Module for Free ICAP CA English Learning Website
 * Target Model: gemini-2.5-flash
 * Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY
 * ============================================================================
 */

(function(global) {
  'use strict';

  /**
   * Helper function to clean and parse JSON from Gemini's response text.
   * Strips markdown backticks (```json ... ```) using Regex before calling JSON.parse().
   * 
   * @param {string} rawText - Raw string from Gemini response
   * @returns {Object|Array|null} Parsed JSON or null
   */
  function cleanAndParseJSON(rawText) {
    if (!rawText || typeof rawText !== 'string') return null;

    try {
      // Direct parse attempt
      return JSON.parse(rawText.trim());
    } catch (e1) {
      try {
        let cleaned = rawText.trim();
        
        // Strip ```json ... ``` or ``` ... ```
        const markdownMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (markdownMatch && markdownMatch[1]) {
          cleaned = markdownMatch[1].trim();
        } else {
          cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
        }

        // Isolate outer JSON boundaries
        const firstBrace = cleaned.search(/[\{\[]/);
        const lastBrace = cleaned.lastIndexOf(cleaned.startsWith('[') ? ']' : '}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }

        return JSON.parse(cleaned);
      } catch (e2) {
        console.warn('[cleanAndParseJSON] Failed to parse JSON:', e2);
        return null;
      }
    }
  }

  /**
   * Check localStorage for GEMINI_API_KEY.
   * If missing, displays a simple modal asking the user for their free key.
   * 
   * @returns {Promise<string|null>} The API key or null if cancelled
   */
  async function ensureApiKey() {
    let key = localStorage.getItem('GEMINI_API_KEY');
    if (key && key.trim().length > 0) {
      return key.trim();
    }

    return new Promise((resolve) => {
      // Check if modal element exists in DOM or create one
      let modal = document.getElementById('gemini-api-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gemini-api-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4';
        modal.innerHTML = `
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-slate-800 border border-slate-100">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">🔑</div>
              <div>
                <h3 class="text-lg font-bold text-slate-900">Google AI Studio API Key</h3>
                <p class="text-xs text-slate-500">Free Gemini 2.5 Flash for ICAP Practice</p>
              </div>
            </div>
            <p class="text-sm text-slate-600 mb-4 leading-relaxed">
              To enable dynamic questions & AI essay grading, enter your free Google AI Studio key. It is saved <strong>only locally</strong> in your browser.
            </p>
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." 
              class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-2 font-mono" />
            <div class="flex justify-between items-center text-xs text-slate-500 mb-5">
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" class="text-emerald-600 hover:underline">Get free key from Google AI Studio &rarr;</a>
              <span>100% Free Tier</span>
            </div>
            <div class="flex gap-2">
              <button id="gemini-modal-cancel" class="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                Use Fallback Data
              </button>
              <button id="gemini-modal-save" class="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition">
                Save & Continue
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      modal.classList.remove('hidden');

      const input = document.getElementById('gemini-key-input');
      const saveBtn = document.getElementById('gemini-modal-save');
      const cancelBtn = document.getElementById('gemini-modal-cancel');

      function cleanup() {
        modal.classList.add('hidden');
        saveBtn.removeEventListener('click', onSave);
        cancelBtn.removeEventListener('click', onCancel);
      }

      function onSave() {
        const val = input.value.trim();
        if (val) {
          localStorage.setItem('GEMINI_API_KEY', val);
          cleanup();
          resolve(val);
        } else {
          input.focus();
        }
      }

      function onCancel() {
        cleanup();
        resolve(null);
      }

      saveBtn.addEventListener('click', onSave);
      cancelBtn.addEventListener('click', onCancel);
      input.focus();
    });
  }

  /**
   * Sleep helper
   * @param {number} ms 
   */
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  /**
   * Async function callGeminiAPI with exponential backoff & rate limit handling.
   * Routes securely to the server endpoint /api/gemini/generate.
   * 
   * @param {string} systemPrompt - System prompt instructions
   * @param {string} userPrompt - User prompt / task
   * @param {any} fallbackData - Guaranteed fallback JSON
   * @returns {Promise<any>}
   */
  async function callGeminiAPI(systemPrompt, userPrompt, fallbackData) {
    const customKey = localStorage.getItem('GEMINI_API_KEY');
    const headers = { 'Content-Type': 'application/json' };
    if (customKey && customKey.trim().length > 20 && !customKey.includes('placeholder')) {
      headers['X-Gemini-Api-Key'] = customKey.trim();
    }

    const payload = {
      prompt: userPrompt,
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      model: 'gemini-3.8-flash'
    };

    const maxRetries = 2;
    let attempt = 0;
    let delay = 1500;

    while (attempt <= maxRetries) {
      try {
        const response = await fetch('/api/gemini/generate', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        });

        // 429 Rate Limit or 503 Service Unavailable -> Exponential Backoff
        if (response.status === 429 || response.status === 503) {
          attempt++;
          if (attempt <= maxRetries) {
            console.warn(`[api-handler.js] Received HTTP ${response.status}. Retrying in ${delay / 1000}s (Attempt ${attempt}/${maxRetries})...`);
            await sleep(delay);
            delay *= 2;
            continue;
          } else {
            console.error(`[api-handler.js] Max retries exhausted (${response.status}). Returning fallback.`);
            return fallbackData;
          }
        }

        if (!response.ok) {
          const errText = await response.text();
          console.warn(`[api-handler.js] Response status ${response.status}: ${errText}`);
          return fallbackData;
        }

        const jsonResp = await response.json();
        const candidateText = jsonResp?.text;

        if (!candidateText) {
          console.warn('[api-handler.js] Empty candidate response. Returning fallback.');
          return fallbackData;
        }

        const parsed = cleanAndParseJSON(candidateText);
        if (parsed !== null && parsed !== undefined) {
          return parsed;
        }

        return fallbackData;

      } catch (err) {
        attempt++;
        if (attempt <= maxRetries) {
          console.warn(`[api-handler.js] Network error. Retrying in ${delay / 1000}s...`);
          await sleep(delay);
          delay *= 2;
        } else {
          console.warn('[api-handler.js] Network failure after retries. Safely returning fallback data.');
          return fallbackData;
        }
      }
    }

    return fallbackData;
  }

  // Export to global and module environments
  const APIHandler = {
    callGeminiAPI,
    cleanAndParseJSON,
    ensureApiKey,
    setApiKey: (key) => localStorage.setItem('GEMINI_API_KEY', key.trim()),
    clearApiKey: () => localStorage.removeItem('GEMINI_API_KEY'),
    getApiKey: () => localStorage.getItem('GEMINI_API_KEY')
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIHandler;
  }
  if (global) {
    global.APIHandler = APIHandler;
    global.callGeminiAPI = callGeminiAPI;
    global.cleanAndParseJSON = cleanAndParseJSON;
  }
})(typeof window !== 'undefined' ? window : this);
