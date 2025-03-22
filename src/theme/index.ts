import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import * as tokens from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: tokens.typography.fontFamily.primary,
    h1: {
      fontSize: tokens.typography.size['4xl'],
      fontWeight: tokens.typography.weight.bold,
    },
    h2: {
      fontSize: tokens.typography.size['3xl'],
      fontWeight: tokens.typography.weight.semibold,
    },
    h3: {
      fontSize: tokens.typography.size['2xl'],
      fontWeight: tokens.typography.weight.medium,
    },
    body1: {
      fontSize: tokens.typography.size.base,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    h4: {
      fontWeight: tokens.typography.weight.semibold,
    },
    h5: {
      fontWeight: tokens.typography.weight.semibold,
    },
    h6: {
      fontWeight: tokens.typography.weight.semibold,
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: tokens.typography.weight.semibold,
    },
  },
  shape: {
    borderRadius: parseInt(tokens.radii.md),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: tokens.shadows.md,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
  shadows: [
    'none',
    tokens.shadows.sm,
    tokens.shadows.md,
    tokens.shadows.lg,
    tokens.shadows.xl,
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
    tokens.shadows['2xl'],
  ] as any,
};

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: tokens.colors.primary[500],
    light: tokens.colors.primary[300],
    dark: tokens.colors.primary[700],
    contrastText: tokens.colors.neutral.white,
  },
  secondary: {
    main: tokens.colors.secondary[500],
    light: tokens.colors.secondary[300],
    dark: tokens.colors.secondary[700],
    contrastText: tokens.colors.neutral.white,
  },
  neutral: {
    main: tokens.colors.neutral[500],
    light: tokens.colors.neutral[300],
    dark: tokens.colors.neutral[700],
    contrastText: tokens.colors.neutral.white,
  },
  error: {
    main: '#e74c3c',
    light: '#ec7063',
    dark: '#c0392b',
  },
  warning: {
    main: '#f1c40f',
    light: '#f4d03f',
    dark: '#d4ac0d',
  },
  info: {
    main: '#3498db',
    light: '#5dade2',
    dark: '#2980b9',
  },
  success: {
    main: '#2ecc71',
    light: '#55d98d',
    dark: '#27ae60',
  },
  text: {
    primary: tokens.colors.neutral[900],
    secondary: tokens.colors.neutral[600],
  },
  background: {
    default: tokens.colors.neutral[50],
    paper: tokens.colors.neutral[100],
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: {
    main: tokens.colors.primary[400],
    light: tokens.colors.primary[300],
    dark: tokens.colors.primary[600],
    contrastText: tokens.colors.neutral.white,
  },
  secondary: {
    main: tokens.colors.secondary[400],
    light: tokens.colors.secondary[300],
    dark: tokens.colors.secondary[600],
    contrastText: tokens.colors.neutral.white,
  },
  neutral: {
    main: tokens.colors.neutral[400],
    light: tokens.colors.neutral[300],
    dark: tokens.colors.neutral[600],
    contrastText: tokens.colors.neutral.white,
  },
  error: {
    main: '#e74c3c',
    light: '#ec7063',
    dark: '#c0392b',
  },
  warning: {
    main: '#f1c40f',
    light: '#f4d03f',
    dark: '#d4ac0d',
  },
  info: {
    main: '#3498db',
    light: '#5dade2',
    dark: '#2980b9',
  },
  success: {
    main: '#2ecc71',
    light: '#55d98d',
    dark: '#27ae60',
  },
  text: {
    primary: tokens.colors.neutral[50],
    secondary: tokens.colors.neutral[400],
  },
  background: {
    default: tokens.colors.darkMode.background,
    paper: tokens.colors.darkMode.paper,
  },
  divider: tokens.colors.darkMode.border,
};

export const lightTheme = responsiveFontSizes(
  createTheme(
    {
      ...baseTheme,
      palette: lightPalette,
    },
    esES
  )
);

export const darkTheme = responsiveFontSizes(
  createTheme(
    {
      ...baseTheme,
      palette: darkPalette,
    },
    esES
  )
); 