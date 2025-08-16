import React, { createContext, useContext, useState } from 'react';
import { Theme, defaultThemes } from '../types/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = defaultThemes.dark 
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleMode = () => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark';
    const newTheme = {
      ...theme,
      mode: newMode,
      backgroundColor: newMode === 'light' ? '#ffffff' : '#111827',
      surfaceColor: newMode === 'light' ? '#f9fafb' : '#1f2937',
      textColor: newMode === 'light' ? '#111827' : '#f9fafb',
      textSecondaryColor: newMode === 'light' ? '#6b7280' : '#9ca3af',
      borderColor: newMode === 'light' ? '#e5e7eb' : '#374151',
    };
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};