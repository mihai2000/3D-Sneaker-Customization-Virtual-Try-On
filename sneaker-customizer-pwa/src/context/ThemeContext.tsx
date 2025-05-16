import React, { createContext, useContext, useState } from 'react';

type ThemeKey = 'dark-purple' | 'neon-glass' | 'blue-ice';

interface ThemeStyles {
  bg: string;
  paper: React.CSSProperties;
  titleColor: string;
  buttonStyle: any;
  linkColor: string;
}

interface ThemeContextType {
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  theme: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<ThemeKey, ThemeStyles> = {
  'dark-purple': {
    bg: 'linear-gradient(145deg, #1a0933, #0d021c)',
    paper: {
      backdropFilter: 'blur(14px)',
      background: 'rgba(30, 0, 60, 0.4)',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 0 40px rgba(180, 70, 255, 0.3)',
    },
    titleColor: '#e0bbff',
    buttonStyle: {
      background: 'linear-gradient(90deg, #6f00ff, #a500ff)',
      color: '#fff',
      '&:hover': {
        background: 'linear-gradient(90deg, #a500ff, #6f00ff)',
      },
    },
    linkColor: '#fff',
  },

  'neon-glass': {
    bg: '#0e0f12',
    paper: {
      backdropFilter: 'blur(30px)',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 0 20px rgba(0,255,255,0.25), 0 0 60px rgba(0,255,255,0.1)',
    },
    titleColor: '#aafaff',
    buttonStyle: {
      background: 'linear-gradient(to right, #00e5ff, #1e88e5)',
      boxShadow: '0 0 12px rgba(0,229,255,0.4)',
      color: '#fff',
      '&:hover': {
        background: 'linear-gradient(to right, #00bcd4, #1565c0)',
      },
    },
    linkColor: '#aafaff',
  },

  'blue-ice': {
    bg: 'radial-gradient(circle at top left, #0f172a, #1e293b)',
    paper: {
      backdropFilter: 'blur(12px)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 0 20px rgba(0,229,255,0.08)',
    },
    titleColor: '#c0f8ff',
    buttonStyle: {
      background: 'linear-gradient(to right, #38bdf8, #0ea5e9)',
      color: '#fff',
      '&:hover': {
        background: 'linear-gradient(to right, #0ea5e9, #0284c7)',
      },
    },
    linkColor: '#38bdf8',
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('dark-purple');

  const value: ThemeContextType = {
    themeKey,
    setThemeKey,
    theme: themes[themeKey],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
