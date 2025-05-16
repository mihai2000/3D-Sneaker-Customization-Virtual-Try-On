export type ThemeKey = 'dark-purple' | 'blue-ice';

export interface ThemeStyles {
  bg: string;
  paper: React.CSSProperties;
  titleColor: string;
  inputBorder: string;
  buttonStyle: any;
  textFieldStyles: any;
  glow: any;
  linkColor: string;
}

export const themes: Record<ThemeKey, ThemeStyles> = {
  'dark-purple': {
    bg: 'linear-gradient(145deg, #1a0933, #0d021c)',
    paper: {
      backdropFilter: 'blur(14px)',
      background: 'rgba(30, 0, 60, 0.4)',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 0 40px rgba(180, 70, 255, 0.3)',
    },
    titleColor: '#fff',
    inputBorder: '#a855f7',
    glow: '#a855f7',
    textFieldStyles: {
      mb: 2,
      input: {
        color: 'white',
        '&:-webkit-autofill': {
          boxShadow: '0 0 0 30px #1a0933 inset !important',
          WebkitTextFillColor: 'white !important',
          borderRadius: '4px',
          transition: 'background-color 5000s ease-in-out 0s',
        },
      },
      label: {
        color: '#ccc',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#a855f7',
          transition: '0.3s ease',
        },
        '&:hover fieldset': {
          borderColor: '#a855f7',
          boxShadow: '0 0 6px #a855f7',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#a855f7',
          boxShadow: '0 0 10px #a855f7',
        },
      },
    },
    buttonStyle: {
      background: 'linear-gradient(90deg, #6f00ff, #a500ff)',
      color: '#fff',
      '&:hover': {
        background: 'linear-gradient(90deg, #a500ff, #6f00ff)',
      },
    },
    linkColor: '#fff',
  },

  'blue-ice': {
    bg: 'radial-gradient(circle at top left, #0f172a, #1e293b)',
    paper: {
      backdropFilter: 'blur(12px)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 0 20px rgba(0,229,255,0.08)',
    },
    titleColor: '#fff',
    inputBorder: '#00e5ff',
    glow: '00e5ff',
    textFieldStyles: {
      mb: 2,
      input: {
        color: 'white',
        '&:-webkit-autofill': {
          boxShadow: '0 0 0 30px #0f172a inset !important',
          WebkitTextFillColor: 'white !important',
          borderRadius: '4px',
          transition: 'background-color 5000s ease-in-out 0s',
        },
      },
      label: {
        color: '#ccc',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#00e5ff',
          transition: '0.3s ease',
        },
        '&:hover fieldset': {
          borderColor: '#00e5ff',
          boxShadow: '0 0 6px #00e5ff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00e5ff',
          boxShadow: '0 0 10px #00e5ff',
        },
      },
    },
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
