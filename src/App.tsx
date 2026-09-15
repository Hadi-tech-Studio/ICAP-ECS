/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { PracticeExamEngine } from './components/PracticeExamEngine';
import { WritingLab } from './components/WritingLab';
import { BooksHub } from './components/BooksHub';
import { Dashboard } from './components/Dashboard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { registerKeyModalHandler, getGeminiApiKey, checkServerGeminiStatus } from './lib/api-handler';
import { ExternalLink, Sparkles, BookOpen, ShieldCheck, GraduationCap, Palette } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export default function App() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('exam');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    // Check initial API key from localStorage or server environment
    const checkApiKeyStatus = async () => {
      const key = localStorage.getItem('GEMINI_API_KEY');
      if (key && key.trim().length > 0) {
        setHasApiKey(true);
        return;
      }
      const status = await checkServerGeminiStatus();
      setHasApiKey(status.available || status.hasServerKey);
    };
    checkApiKeyStatus();

    // Register callback for when Gemini API handler needs a key
    registerKeyModalHandler(() => {
      return new Promise((resolve) => {
        setIsApiKeyModalOpen(true);
        // Polling until modal resolves or cancelled
        const interval = setInterval(() => {
          const stored = localStorage.getItem('GEMINI_API_KEY');
          if (stored && stored.trim()) {
            clearInterval(interval);
            resolve(stored.trim());
          }
        }, 500);

        // Fallback timeout
        setTimeout(() => {
          clearInterval(interval);
          resolve(null);
        }, 30000);
      });
    });
  }, []);

  const handleKeySaved = (newKey: string) => {
    setHasApiKey(!!(newKey && newKey.trim().length > 0));
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200 overflow-x-hidden w-full ${
      theme === 'sepia'
        ? 'bg-[#fbf0d9] text-[#342410]'
        : theme === 'light'
        ? 'bg-slate-50 text-slate-900'
        : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16">
        <div className={activeTab === 'exam' ? 'block' : 'hidden'} role="tabpanel" aria-hidden={activeTab !== 'exam'}>
          <PracticeExamEngine />
        </div>
        <div className={activeTab === 'writing' ? 'block' : 'hidden'} role="tabpanel" aria-hidden={activeTab !== 'writing'}>
          <WritingLab onBackToMain={() => setActiveTab('exam')} />
        </div>
        <div className={activeTab === 'books' ? 'block' : 'hidden'} role="tabpanel" aria-hidden={activeTab !== 'books'}>
          <BooksHub onBackToMain={() => setActiveTab('exam')} onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)} />
        </div>
        <div className={activeTab === 'dashboard' ? 'block' : 'hidden'} role="tabpanel" aria-hidden={activeTab !== 'dashboard'}>
          <Dashboard
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onBackToMain={() => setActiveTab('exam')}
            onStartExam={() => setActiveTab('exam')}
            isActive={activeTab === 'dashboard'}
          />
        </div>
      </main>

      {/* Footer & Reference Links */}
      <footer className={`border-t py-8 text-xs transition-colors duration-200 ${
        theme === 'sepia'
          ? 'bg-[#f4e4c1] border-[#dec596] text-[#795d3a]'
          : theme === 'light'
          ? 'bg-white border-slate-200 text-slate-600'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span className={`font-semibold ${
              theme === 'sepia' ? 'text-[#2d1f11]' : theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              ICAP ECS - English Communication Skills
            </span>
            <span className={`${
              theme === 'sepia' ? 'text-[#92754c]' : theme === 'light' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              • Powered by Google Gemini 2.5 Flash
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 opacity-60" />
              <span className="font-medium mr-1">Theme:</span>
              <ThemeSwitcher size="sm" showLabels={true} />
            </div>
            <span>•</span>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-emerald-500 transition underline font-medium cursor-pointer"
            >
              API Key Config
            </button>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">CA Journey Ready</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={handleKeySaved}
      />
    </div>
  );
}
