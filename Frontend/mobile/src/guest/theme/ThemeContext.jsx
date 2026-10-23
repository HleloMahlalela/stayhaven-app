import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'nativewind';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const toggleTheme = () => setColorScheme(isDark ? 'light' : 'dark');
  const value = useMemo(() => ({
    isDark,
    toggleTheme,
    setTheme: setColorScheme,
  }), [isDark, setColorScheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useGuestTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useGuestTheme must be used inside ThemeProvider');
  return theme;
}
