// Sistema de Diseño Corporativo para CodeCommunity

// Colores
export const colors = {
  primary: {
    50: '#E6F0FF',
    100: '#CCE0FF',
    200: '#99C2FF',
    300: '#66A3FF',
    400: '#3385FF',
    500: '#144272', // Azul Cobalto (énfasis/interactivo)
    600: '#0F3259',
    700: '#0A2647', // Azul Profundo (corporativo/confianza)
    800: '#051A33',
    900: '#020E1A',
  },
  secondary: {
    50: '#E6F7F4',
    100: '#CCEFE9',
    200: '#99DFD3',
    300: '#66CFBD',
    400: '#33BFA7',
    500: '#2C7865', // Verde Esmeralda (éxito/progreso)
    600: '#236052',
    700: '#1A483E',
    800: '#11302A',
    900: '#091815',
  },
  accent: {
    50: '#E6F5FF',
    100: '#CCEBFF',
    200: '#99D7FF',
    300: '#66C4FF',
    400: '#33B0FF',
    500: '#3AB0FF', // Turquesa (tecnología/innovación)
    600: '#008DCC',
    700: '#006A99',
    800: '#004666',
    900: '#002333',
  },
  alert: {
    50: '#FFF0EB',
    100: '#FFE1D6',
    200: '#FFC3AD',
    300: '#FFA585',
    400: '#FF875C',
    500: '#FF7F50', // Coral (alertas/llamadas a acción)
    600: '#CC6640',
    700: '#994C30',
    800: '#663320',
    900: '#331A10',
  },
  neutral: {
    50: '#F8F9FA', // Blanco Alabastro (fondos claros)
    100: '#E9ECEF', // Gris Nube (bordes/separadores)
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529', // Carbón (texto principal)
    900: '#121416',
    white: '#FFFFFF',
    black: '#000000',
  },
  darkMode: {
    background: '#0F172A', // Azul noche profundo
    paper: 'rgba(30, 41, 59, 0.8)', // Superficie con opacidad 80%
    border: '#334155',
    text: '#E2E8F0', // Contraste AAA
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  success: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  professional: {
    grisAntracita: '#2D4356', // Fondos profesionales
  },
};

// Espaciado
export const spacing = {
  base: '8px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

// Tipografía
export const typography = {
  fontFamily: {
    primary: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    code: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },
  size: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.75rem', // 28px - Heading 3
    '4xl': '2.25rem', // 36px - Heading 2
    '5xl': '3rem', // 48px - Heading 1
  },
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.2, // Headings
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75, // Body text
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.015em', // Heading 1
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.05em',
  },
};

// Sombras
export const shadows = {
  sm: '0 1px 2px rgba(16, 24, 40, 0.05)', // Elevation 1
  md: '0 4px 6px -1px rgba(16, 24, 40, 0.1), 0 2px 4px -1px rgba(16, 24, 40, 0.06)',
  lg: '0 8px 16px -4px rgba(16, 24, 40, 0.25)', // Elevation 3
  xl: '0 20px 25px -5px rgba(16, 24, 40, 0.1), 0 10px 10px -5px rgba(16, 24, 40, 0.04)',
  '2xl': '0 25px 50px -12px rgba(16, 24, 40, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Radios de borde
export const radii = {
  none: '0',
  sm: '4px', // Botones
  md: '8px', // Tarjetas
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// Z-index
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Transiciones
export const transitions = {
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '300ms', // Estándar para todos los estados
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// Breakpoints
export const breakpoints = {
  xs: '640px',
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1440px',
  '2xl': '1920px',
};

// Dimensiones
export const dimensions = {
  navbar: {
    height: '72px',
  },
  sidebar: {
    width: '280px',
    collapsedWidth: '72px',
  },
  courseCard: {
    width: '320px',
    height: '420px',
  },
}; 