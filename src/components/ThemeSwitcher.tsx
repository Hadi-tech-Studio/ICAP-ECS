import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Palette, Check, ChevronDown } from 'lucide-react';
import { useTheme, SiteTheme, AccentColor, ACCENT_PRESETS } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md';
  showLabels?: boolean;
  includeAccentPicker?: boolean;
}

interface ThemeOption {
  id: SiteTheme;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  colorPreview: string;
  borderPreview: string;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'light',
    name: 'Crisp Light',
    shortName: 'Light',
    icon: Sun,
    colorPreview: '#ffffff',
    borderPreview: '#94a3b8',
    description: 'Crisp high-contrast light theme with crystal clear legibility'
  },
  {
    id: 'slate',
    name: 'Slate Dark',
    shortName: 'Dark',
    icon: Moon,
    colorPreview: '#0f172a',
    borderPreview: '#334155',
    description: 'Deep navy & slate dark theme for comfortable low-light studying'
  }
];

export const AccentColorPicker: React.FC<{
  size?: 'sm' | 'md';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const { accent, setAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentAccent = ACCENT_PRESETS.find(p => p.id === accent) || ACCENT_PRESETS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const paddingClass = size === 'sm' ? 'px-2 py-1' : 'px-2.5 py-1.5';

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 ${paddingClass} rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none touch-manipulation hover:bg-slate-700/30 text-slate-300 active:scale-[0.97]`}
        title={`Accent Color: ${currentAccent.name}. Click to change.`}
        aria-label={`Current accent color: ${currentAccent.name}. Click to switch.`}
        aria-expanded={isOpen}
      >
        <Palette className="w-3.5 h-3.5 opacity-70" />
        <span 
          className="w-3 h-3 rounded-full border border-white/20 shadow-xs shrink-0 transition-transform scale-100"
          style={{ backgroundColor: currentAccent.colorHex }}
        />
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 p-2 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2 py-1 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Accent Color
          </div>
          <div className="space-y-1">
            {ACCENT_PRESETS.map((opt) => {
              const isSelected = accent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAccent(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800 text-white font-bold ring-1 ring-slate-700 shadow-xs' 
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: opt.colorHex }}
                    />
                    <span>{opt.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '',
  size = 'md',
  showLabels = false,
  includeAccentPicker = true
}) => {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [isAccentMenuOpen, setIsAccentMenuOpen] = useState(false);
  const accentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accentContainerRef.current && !accentContainerRef.current.contains(e.target as Node)) {
        setIsAccentMenuOpen(false);
      }
    };
    if (isAccentMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAccentMenuOpen]);

  const currentAccent = ACCENT_PRESETS.find(p => p.id === accent) || ACCENT_PRESETS[0];
  const iconClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const paddingClass = size === 'sm' ? 'px-2 py-1' : 'px-2.5 py-1.5';

  const containerStyles = 
    theme === 'light'
      ? 'bg-slate-200/90 border-slate-300 shadow-xs'
      : 'bg-slate-800/90 border-slate-700/80 shadow-xs';

  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`} ref={accentContainerRef}>
      <div 
        className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-colors duration-200 ${containerStyles}`}
        role="radiogroup"
        aria-label="Color theme selector"
      >
        {THEME_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTheme(opt.id)}
              className={`group relative ${paddingClass} rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 text-xs font-semibold select-none touch-manipulation active:scale-[0.97] ${
                isActive
                  ? theme === 'light'
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-300 font-bold'
                    : 'bg-slate-700 text-white shadow-xs ring-1 ring-slate-600 font-bold'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
              title={`${opt.name} — ${opt.description}`}
              aria-label={`${opt.name} theme`}
            >
              {/* Swatch indicator dot */}
              <span 
                className={`w-2.5 h-2.5 rounded-full border shrink-0 transition-transform ${
                  isActive ? 'scale-110 shadow-xs' : 'opacity-70 group-hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: opt.colorPreview,
                  borderColor: opt.borderPreview
                }} 
              />

              {/* Icon */}
              <Icon className={`${iconClass} shrink-0 ${isActive ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'}`} />

              {/* Label */}
              {showLabels ? (
                <span className="tracking-tight text-[11px] font-medium">
                  {opt.name}
                </span>
              ) : (
                <span className="hidden sm:inline-block tracking-tight text-[11px] font-medium">
                  {opt.shortName}
                </span>
              )}
            </button>
          );
        })}

        {/* Integrated Accent Color trigger button if enabled */}
        {includeAccentPicker && (
          <>
            <div className={`w-[1px] h-4 mx-0.5 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
            
            <button
              type="button"
              onClick={() => setIsAccentMenuOpen(!isAccentMenuOpen)}
              className={`relative ${paddingClass} rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 text-xs font-semibold select-none touch-manipulation active:scale-[0.97] ${
                theme === 'light' 
                  ? 'text-slate-700 hover:bg-slate-300/50' 
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
              title={`Main Accent Color: ${currentAccent.name}. Click to choose Blue, Red, Purple, Teal, or Green.`}
              aria-label="Change Accent Color"
              aria-expanded={isAccentMenuOpen}
            >
              <Palette className={`${iconClass} opacity-80`} />
              <span 
                className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-xs shrink-0 transition-transform hover:scale-125"
                style={{ backgroundColor: currentAccent.colorHex }}
              />
              <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-150 ${isAccentMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </>
        )}
      </div>

      {/* Accent Color Palette Popover Dropdown */}
      {includeAccentPicker && isAccentMenuOpen && (
        <div className={`absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl border shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-100 ${
          theme === 'light'
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'bg-slate-900 border-slate-700/80 text-white shadow-black/60'
        }`}>
          <div className="px-2 py-1 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Accent Color</span>
            <span className="text-[10px] lowercase opacity-60">5 colors</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 px-1 py-1 mb-2 border-b border-slate-700/30">
            {ACCENT_PRESETS.map((opt) => {
              const isSelected = accent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAccent(opt.id);
                    setIsAccentMenuOpen(false);
                  }}
                  className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-100 cursor-pointer active:scale-90 ${
                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: opt.colorHex }}
                  title={opt.name}
                  aria-label={opt.name}
                >
                  {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            {ACCENT_PRESETS.map((opt) => {
              const isSelected = accent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAccent(opt.id);
                    setIsAccentMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isSelected 
                      ? theme === 'light' 
                        ? 'bg-slate-100 text-slate-950 font-bold ring-1 ring-slate-200 shadow-xs' 
                        : 'bg-slate-800 text-white font-bold ring-1 ring-slate-700 shadow-xs'
                      : theme === 'light'
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full border border-white/20 shadow-xs shrink-0"
                      style={{ backgroundColor: opt.colorHex }}
                    />
                    <span>{opt.name}</span>
                  </div>
                  {isSelected && (
                    <span 
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider text-white"
                      style={{ backgroundColor: opt.colorHex }}
                    >
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
