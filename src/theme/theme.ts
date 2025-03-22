import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { colors, typography, shadows, radii, transitions } from './tokens';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Definir la paleta personalizada
const customPalette = {
  mode: 'light',
  primary: {
    main: colors.primary[500],
    light: colors.primary[300],
    dark: colors.primary[700],
    contrastText: '#ffffff',
  },
  secondary: {
    main: colors.secondary[500],
    light: colors.secondary[300],
    dark: colors.secondary[700],
    contrastText: '#ffffff',
  },
  error: {
    main: colors.error[500],
    light: colors.error[300],
    dark: colors.error[700],
    contrastText: '#ffffff',
  },
  warning: {
    main: colors.warning[500],
    light: colors.warning[300],
    dark: colors.warning[700],
    contrastText: '#ffffff',
  },
  info: {
    main: colors.accent[500],
    light: colors.accent[300],
    dark: colors.accent[700],
    contrastText: '#ffffff',
  },
  success: {
    main: colors.success[500],
    light: colors.success[300],
    dark: colors.success[700],
    contrastText: '#ffffff',
  },
  text: {
    primary: colors.neutral[800],
    secondary: colors.neutral[600],
    disabled: colors.neutral[400],
  },
  background: {
    default: colors.neutral[50],
    paper: colors.neutral.white,
  },
  divider: colors.neutral[100],
  action: {
    active: colors.neutral[600],
    hover: colors.neutral[100],
    selected: colors.primary[50],
    disabled: colors.neutral[300],
    disabledBackground: colors.neutral[200],
  },
  grey: {
    50: colors.neutral[50],
    100: colors.neutral[100],
    200: colors.neutral[200],
    300: colors.neutral[300],
    400: colors.neutral[400],
    500: colors.neutral[500],
    600: colors.neutral[600],
    700: colors.neutral[700],
    800: colors.neutral[800],
    900: colors.neutral[900],
    A100: colors.neutral[100],
    A200: colors.neutral[200],
    A400: colors.neutral[400],
    A700: colors.neutral[700],
  },
};

// Tema claro
export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: customPalette as any,
    typography: {
      fontFamily: typography.fontFamily.primary,
      h1: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.bold,
        fontSize: typography.size['5xl'],
        lineHeight: typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tighter,
      },
      h2: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.semibold,
        fontSize: typography.size['4xl'],
        lineHeight: typography.lineHeight.tight,
      },
      h3: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.medium,
        fontSize: typography.size['3xl'],
        lineHeight: typography.lineHeight.tight,
      },
      h4: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.medium,
        fontSize: typography.size['2xl'],
      },
      h5: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.medium,
        fontSize: typography.size.xl,
      },
      h6: {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.weight.medium,
        fontSize: typography.size.lg,
      },
      subtitle1: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.lg,
        fontWeight: typography.weight.medium,
      },
      subtitle2: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.base,
        fontWeight: typography.weight.medium,
      },
      body1: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.base,
        lineHeight: typography.lineHeight.relaxed,
      },
      body2: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        lineHeight: typography.lineHeight.relaxed,
      },
      button: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        textTransform: 'none',
      },
      caption: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.xs,
      },
      overline: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    },
    shape: {
      borderRadius: parseInt(radii.md),
    },
    shadows: [
      'none',
      shadows.sm,
      shadows.sm,
      shadows.sm,
      shadows.md,
      shadows.md,
      shadows.md,
      shadows.md,
      shadows.lg,
      shadows.lg,
      shadows.lg,
      shadows.lg,
      shadows.lg,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows.xl,
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
      shadows['2xl'],
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: colors.neutral[100],
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.neutral[400],
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: colors.neutral[500],
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radii.sm,
            textTransform: 'none',
            fontWeight: typography.weight.medium,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: shadows.sm,
            },
          },
          contained: {
            '&:hover': {
              boxShadow: shadows.md,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radii.md,
            boxShadow: shadows.md,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: radii.md,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: shadows.sm,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: radii.full,
            fontWeight: typography.weight.medium,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: radii.sm,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: radii.sm,
            transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: radii.sm,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: radii.sm,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: colors.neutral[800],
            borderRadius: radii.sm,
            fontSize: typography.size.xs,
            padding: '6px 12px',
          },
          arrow: {
            color: colors.neutral[800],
          },
        },
      },
    },
  })
);

// Definir la paleta oscura
const darkPalette = {
  mode: 'dark',
  primary: {
    main: colors.primary[400],
    light: colors.primary[300],
    dark: colors.primary[600],
    contrastText: colors.neutral[900],
  },
  secondary: {
    main: colors.secondary[400],
    light: colors.secondary[300],
    dark: colors.secondary[600],
    contrastText: colors.neutral[900],
  },
  error: {
    main: colors.error[500],
    light: colors.error[300],
    dark: colors.error[700],
    contrastText: '#ffffff',
  },
  warning: {
    main: colors.warning[500],
    light: colors.warning[300],
    dark: colors.warning[700],
    contrastText: '#ffffff',
  },
  info: {
    main: colors.accent[500],
    light: colors.accent[300],
    dark: colors.accent[700],
    contrastText: '#ffffff',
  },
  success: {
    main: colors.success[500],
    light: colors.success[300],
    dark: colors.success[700],
    contrastText: '#ffffff',
  },
  text: {
    primary: colors.darkMode.text,
    secondary: alpha(colors.darkMode.text, 0.7),
    disabled: alpha(colors.darkMode.text, 0.5),
  },
  background: {
    default: colors.darkMode.background,
    paper: colors.darkMode.paper,
  },
  divider: colors.darkMode.border,
  action: {
    active: colors.darkMode.text,
    hover: alpha(colors.primary[500], 0.1),
    selected: alpha(colors.primary[500], 0.2),
    disabled: alpha(colors.darkMode.text, 0.3),
    disabledBackground: alpha(colors.darkMode.text, 0.1),
  },
  grey: {
    50: colors.neutral[900],
    100: colors.neutral[800],
    200: colors.neutral[700],
    300: colors.neutral[600],
    400: colors.neutral[500],
    500: colors.neutral[400],
    600: colors.neutral[300],
    700: colors.neutral[200],
    800: colors.neutral[100],
    900: colors.neutral[50],
    A100: colors.neutral[800],
    A200: colors.neutral[700],
    A400: colors.neutral[500],
    A700: colors.neutral[300],
  },
};

// Tema oscuro
export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: darkPalette as any,
    typography: lightTheme.typography,
    shape: lightTheme.shape,
    shadows: lightTheme.shadows,
    components: {
      ...lightTheme.components,
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: colors.darkMode.background,
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.darkMode.border,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: alpha(colors.darkMode.text, 0.5),
            },
          },
        },
      },
    },
  })
);

// Función para obtener alpha
function alpha(color: string, opacity: number): string {
  return color + Math.round(opacity * 255).toString(16).padStart(2, '0');
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
          },
          neutral: {
            main: grey[500],
            light: grey[300],
            dark: grey[700],
            contrastText: grey[900],
          },
        }
      : {
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: grey[400],
          },
          neutral: {
            main: grey[500],
            light: grey[300],
            dark: grey[700],
            contrastText: '#ffffff',
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' ? '#ffffff' : '#1e1e1e',
          color: mode === 'light' ? grey[900] : '#ffffff',
        },
      },
    },
  },
});

export default lightTheme; 