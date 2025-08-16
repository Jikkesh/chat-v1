export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textSecondaryColor: string;
  borderColor: string;
  accentColor: string;
}

export const createTheme = (mode: 'light' | 'dark', primaryColor: string): Theme => {
  const isLight = mode === 'light';
  
  return {
    mode,
    primaryColor,
    backgroundColor: isLight ? '#ffffff' : '#111827',
    surfaceColor: isLight ? '#f9fafb' : '#1f2937',
    textColor: isLight ? '#111827' : '#f9fafb',
    textSecondaryColor: isLight ? '#6b7280' : '#9ca3af',
    borderColor: isLight ? '#e5e7eb' : '#374151',
    accentColor: primaryColor,
  };
};

export const defaultThemes = {
  dark: createTheme('dark', '#f97316'),
  light: createTheme('light', '#2563eb'),
};