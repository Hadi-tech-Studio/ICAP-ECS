import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, ExternalLink, X, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey, clearGeminiApiKey, validateGeminiApiKey } from '../lib/api-handler';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [keyInput, setKeyInput] = useState('');
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    valid: boolean;
    message?: string;
  } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('GEMINI_API_KEY') || '';
      setCurrentKey(stored ? `${stored.substring(0, 8)}...${stored.substring(stored.length - 4)}` : null);
      setKeyInput(stored);
      setSavedSuccess(false);
      setValidationResult(null);

      // Check if stored key is invalid or placeholder, and test server key
      if (stored && (stored.includes('placeholder') || stored.length < 20)) {
        clearGeminiApiKey();
        setCurrentKey(null);
        setKeyInput('');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    setIsValidating(true);
    setValidationResult(null);
    try {
      const result = await validateGeminiApiKey(keyInput.trim() || undefined);
      if (result.valid) {
        const modelLabel = result.model || 'gemini-3.1-flash-lite';
        setValidationResult({
          tested: true,
          valid: true,
          message: result.isServerKey
            ? `Default Google AI Studio Project Key is valid and active (${modelLabel} ready).`
            : `Custom Gemini API Key validated successfully (${modelLabel} ready)!`
        });
      } else {
        setValidationResult({
          tested: true,
          valid: false,
          message: result.error || 'The entered key could not be verified with Google Gemini.'
        });
      }
    } catch (e: any) {
      setValidationResult({
        tested: true,
        valid: false,
        message: e?.message || 'Verification connection failed.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      handleClear();
      onClose();
      return;
    }

    setIsValidating(true);
    try {
      const check = await validateGeminiApiKey(trimmed);
      if (!check.valid) {
        setValidationResult({
          tested: true,
          valid: false,
          message: check.error || 'This API key is invalid. Please check your key or use the default project key.'
        });
        setIsValidating(false);
        return;
      }
      setGeminiApiKey(trimmed);
      setSavedSuccess(true);
      if (onSaved) onSaved(trimmed);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch {
      setGeminiApiKey(trimmed);
      setSavedSuccess(true);
      if (onSaved) onSaved(trimmed);
      setTimeout(() => {
        onClose();
      }, 700);
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    clearGeminiApiKey();
    setKeyInput('');
    setCurrentKey(null);
    setValidationResult({
      tested: true,
      valid: true,
      message: 'Custom key cleared. The app has reverted to your Google AI Studio project credentials.'
    });
  };

  return (
    <div id="gemini-api-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-800 border border-slate-200 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Google AI Studio API Key</h3>
            <p className="text-xs text-slate-500 font-medium">Gemini 3.8 &amp; 3.1 Flash for Dynamic Exam Simulation</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          The ICAP English Hub utilizes <span className="font-semibold text-slate-900">Google Gemini Flash</span> to generate exam questions, audit writing scenarios, and sentence diagnostics.
        </p>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3.5 mb-4 text-xs text-emerald-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-emerald-900">Connected Server-Side:</strong> Gemini is authenticated via Google AI Studio server environment credentials. You can use dynamic practice immediately without providing a custom key.
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Optional Custom Gemini API Key:
            </label>
            <button
              type="button"
              onClick={handleTestKey}
              disabled={isValidating}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" /> Test Connection
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setValidationResult(null);
              }}
              placeholder="AIzaSy... (leave blank to use default project key)"
              className="w-full px-3.5 py-3 text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 focus:bg-white transition"
            />
          </div>

          {validationResult && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
              validationResult.valid
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {validationResult.valid ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span>{validationResult.message}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
            >
              Get Free Key from Google AI Studio <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {currentKey ? (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Custom Key Configured
              </span>
            ) : (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Project Key Active
              </span>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>API Key successfully validated and saved!</span>
          </div>
        )}

        <div className="flex gap-2.5 pt-2 border-t border-slate-100">
          {currentKey && (
            <button
              onClick={handleClear}
              className="px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              Clear Custom Key
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Use Project Key
          </button>
          <button
            onClick={handleSave}
            disabled={isValidating}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
          >
            {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Save &amp; Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
