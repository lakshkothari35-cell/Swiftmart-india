import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, ThemeDefinition } from '../types/theme';
import { THEMES } from '../constants/themes';

interface ThemeContextType {
  theme: ThemeDefinition;
  setTheme: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<ThemeDefinition>(() => {
    const saved = localStorage.getItem('swiftmart_theme') as ThemeType;
    return THEMES.find(t => t.id === saved) || THEMES[0];
  });

  useEffect(() => {
    const root = document.documentElement;
    const { colors } = activeTheme;

    // Apply CSS Variables
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--card', colors.card);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--text-muted', colors.textMuted);

    // Apply color-scheme meta for system UI
    root.style.colorScheme = activeTheme.id === 'light' || activeTheme.id === 'holi' ? 'light' : 'dark';
    
    // Add theme class to body for Tailwind specific overrides
    root.classList.remove('theme-light', 'theme-dark', 'theme-swift', 'theme-diwali', 'theme-holi');
    root.classList.add(`theme-${activeTheme.id}`);

    localStorage.setItem('swiftmart_theme', activeTheme.id);
  }, [activeTheme]);

  const setTheme = (type: ThemeType) => {
    const theme = THEMES.find(t => t.id === type);
    if (theme) setActiveTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
