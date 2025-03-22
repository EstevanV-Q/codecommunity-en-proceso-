import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      mode: 'light' | 'dark';
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
  }
}

declare global {
  interface Window {
    indexedDB: IDBFactory;
  }
}

export {}; 