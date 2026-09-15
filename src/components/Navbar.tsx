import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  PenTool, 
  BarChart3, 
  Key, 
  Sparkles,
  BookOpen,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

export type ActiveTab = 'exam' | 'writing' | 'books' | 'dashboard';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  hasApiKey
}) => {
  const { theme } = useTheme();

  return (
    <header className={`sticky top-0 z-40 border-b shadow-xl transition-colors duration-200 ${
      theme === 'sepia'
        ? 'bg-[#f4e4c1] border-[#dec596] text-[#2d1f11]'
        : theme === 'light'
        ? 'bg-white border-slate-200 text-slate-900'
        : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & ICAP Badge (Clickable to Main Page) */}
          <button 
            onClick={() => setActiveTab('exam')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
            title="Go to Main Page"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`font-display font-extrabold text-base sm:text-xl tracking-tight transition-colors ${
                  theme === 'sepia' ? 'text-[#2d1f11]' : theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  ICAP <span className="text-emerald-500">ECS</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CA Journey
                </span>
              </div>
              <p className={`text-[10px] sm:text-xs font-medium truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none transition-colors ${
                theme === 'sepia' ? 'text-[#795d3a]' : theme === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                English Communication Skills
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border transition-colors ${
            theme === 'sepia'
              ? 'bg-[#ebd5ad] border-[#deb87a]'
              : theme === 'light'
              ? 'bg-slate-100 border-slate-200'
              : 'bg-slate-800/80 border-slate-700/60'
          }`}>
            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] ${
                activeTab === 'exam'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : theme === 'sepia'
                  ? 'text-[#634b2c] hover:text-[#2d1f11] hover:bg-[#dec596]/40'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Practice Test (1h 50m)</span>
            </button>

            <button
              onClick={() => setActiveTab('writing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] ${
                activeTab === 'writing'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : theme === 'sepia'
                  ? 'text-[#634b2c] hover:text-[#2d1f11] hover:bg-[#dec596]/40'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>AI Writing Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] ${
                activeTab === 'books'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : theme === 'sepia'
                  ? 'text-[#634b2c] hover:text-[#2d1f11] hover:bg-[#dec596]/40'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Books & Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : theme === 'sepia'
                  ? 'text-[#634b2c] hover:text-[#2d1f11] hover:bg-[#dec596]/40'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Flashcards</span>
            </button>
          </nav>

          {/* Action Buttons: CA Journey, Theme Switcher & Gemini API Status */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Clickable option labeled 'CA Journey' */}
            <a
              href="https://whatsapp.com/channel/0029Vb2e7VLIt5rqrA9Iau3V"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition border cursor-pointer whitespace-nowrap shadow-sm ${
                theme === 'sepia'
                  ? 'border-emerald-700/40 bg-emerald-700/15 text-emerald-900 hover:bg-emerald-700/25 hover:border-emerald-700/60'
                  : theme === 'light'
                  ? 'border-emerald-500/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-600'
                  : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 hover:border-emerald-500/60'
              }`}
              title="Open CA Journey WhatsApp Channel"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>CA Journey</span>
              <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
            </a>

            {/* Prominent Theme Switcher (Slate Dark, Sepia Warmth, Crisp Light) */}
            <ThemeSwitcher />

            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                hasApiKey
                  ? theme === 'sepia'
                    ? 'bg-[#ebd5ad] text-emerald-900 border-emerald-700/40 hover:bg-[#deb87a]'
                    : theme === 'light'
                    ? 'bg-slate-100 text-emerald-700 border-emerald-500/40 hover:bg-slate-200'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                  : 'bg-amber-500/20 text-amber-500 border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasApiKey ? 'Gemini Flash AI' : 'Set Key'}
              </span>
              <span className="sm:hidden">
                {hasApiKey ? 'Ready' : 'Key'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className={`lg:hidden grid grid-cols-4 gap-1 pb-2.5 pt-1.5 border-t transition-colors ${
          theme === 'sepia' ? 'border-[#dec596]' : theme === 'light' ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex flex-col xs:flex-row items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-medium cursor-pointer touch-manipulation transition-all duration-75 active:scale-[0.98] ${
              activeTab === 'exam'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : theme === 'sepia'
                ? 'text-[#634b2c]'
                : theme === 'light'
                ? 'text-slate-600'
                : 'text-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Exam</span>
          </button>

          <button
            onClick={() => setActiveTab('writing')}
            className={`flex flex-col xs:flex-row items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-medium cursor-pointer touch-manipulation transition-all duration-75 active:scale-[0.98] ${
              activeTab === 'writing'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : theme === 'sepia'
                ? 'text-[#634b2c]'
                : theme === 'light'
                ? 'text-slate-600'
                : 'text-slate-300'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Writing</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`flex flex-col xs:flex-row items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-medium cursor-pointer touch-manipulation transition-all duration-75 active:scale-[0.98] ${
              activeTab === 'books'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : theme === 'sepia'
                ? 'text-[#634b2c]'
                : theme === 'light'
                ? 'text-slate-600'
                : 'text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Books</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col xs:flex-row items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-medium cursor-pointer touch-manipulation transition-all duration-75 active:scale-[0.98] ${
              activeTab === 'dashboard'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : theme === 'sepia'
                ? 'text-[#634b2c]'
                : theme === 'light'
                ? 'text-slate-600'
                : 'text-slate-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Stats</span>
          </button>
        </div>
      </div>
    </header>
  );
};
