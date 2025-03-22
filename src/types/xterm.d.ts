declare module 'xterm' {
  export interface ITheme {
    background?: string;
    foreground?: string;
    cursor?: string;
    cursorAccent?: string;
    selection?: string;
    black?: string;
    red?: string;
    green?: string;
    yellow?: string;
    blue?: string;
    magenta?: string;
    cyan?: string;
    white?: string;
    brightBlack?: string;
    brightRed?: string;
    brightGreen?: string;
    brightYellow?: string;
    brightBlue?: string;
    brightMagenta?: string;
    brightCyan?: string;
    brightWhite?: string;
  }

  export class Terminal {
    constructor(options?: any);
    open(container: HTMLElement): void;
    write(data: string): void;
    onData(callback: (data: string) => void): void;
    onKey(callback: (key: { key: string, domEvent: KeyboardEvent }) => void): void;
    focus(): void;
    clear(): void;
    reset(): void;
    resize(cols: number, rows: number): void;
    loadAddon(addon: any): void;
    dispose(): void;
    setOption(key: string, value: any): void;
    getOption(key: string): any;
  }
}

declare module 'xterm-addon-fit' {
  export class FitAddon {
    constructor();
    activate(terminal: any): void;
    fit(): void;
    dispose(): void;
  }
}

declare module 'xterm-addon-web-links' {
  export class WebLinksAddon {
    constructor(handler?: (event: MouseEvent, uri: string) => void);
    activate(terminal: any): void;
    dispose(): void;
  }
}

declare module 'xterm-addon-search' {
  export class SearchAddon {
    constructor();
    activate(terminal: any): void;
    findNext(term: string, options?: { regex?: boolean, wholeWord?: boolean, caseSensitive?: boolean }): boolean;
    findPrevious(term: string, options?: { regex?: boolean, wholeWord?: boolean, caseSensitive?: boolean }): boolean;
    dispose(): void;
  }
} 