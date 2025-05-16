import { useState } from 'react';
import { ThemeKey, themes } from '../theme/themeConfig';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('dark-purple');
  // const [themeKey, setThemeKey] = useState<ThemeKey>('blue-ice');

  const value: ThemeContextType = {
    themeKey,
    setThemeKey,
    theme: themes[themeKey],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
