import { createContext } from 'react';
import { ThemeKey, ThemeStyles } from '../theme/themeConfig';

export interface ThemeContextType {
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  theme: ThemeStyles;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
