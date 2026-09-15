import React, { createContext, useContext, useState, useEffect } from 'react';

export type SiteTheme = 'light' | 'slate' | 'sepia';
export type AccentColor = 'emerald' | 'blue' | 'red' | 'purple' | 'teal';

export interface AccentOption {
  id: AccentColor;
  name: string;
  colorHex: string;
  secondaryHex: string;
  description: string;
}

export const ACCENT_PRESETS: AccentOption[] = [
  {
    id: 'emerald',
    name: 'Emerald Green',
    colorHex: '#10b981',
    secondaryHex: '#14b8a6',
    description: 'Classic professional emerald green accent'
  },
  {
    id: 'blue',
    name: 'Royal Blue',
    colorHex: '#3b82f6',
    secondaryHex: '#0ea5e9',
    description: 'Corporate royal blue and sapphire accent'
  },
  {
    id: 'red',
    name: 'Ruby Crimson',
    colorHex: '#e11d48',
    secondaryHex: '#f43f5e',
    description: 'High-energy crimson and ruby accent'
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colorHex: '#a855f7',
    secondaryHex: '#8b5cf6',
    description: 'Sophisticated royal violet and amethyst accent'
  },
  {
    id: 'teal',
    name: 'Teal Cyan',
    colorHex: '#14b8a6',
    secondaryHex: '#06b6d4',
    description: 'Modern ocean teal and cyan accent'
  }
];

interface ThemeContextType {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentPresets: typeof ACCENT_PRESETS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'SITE_THEME';
const ACCENT_STORAGE_KEY = 'SITE_ACCENT_COLOR';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'slate') {
        return saved;
      }
    }
    return 'slate';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
      if (saved === 'emerald' || saved === 'blue' || saved === 'red' || saved === 'purple' || saved === 'teal') {
        return saved;
      }
    }
    return 'emerald';
  });

  const setTheme = (newTheme: SiteTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'slate') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCENT_STORAGE_KEY, newAccent);
      document.documentElement.setAttribute('data-accent', newAccent);
    }
  };

  useEffect(() => {
    // Initial attribute synchronization
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
    if (theme === 'slate') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, accent]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent, accentPresets: ACCENT_PRESETS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
