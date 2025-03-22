// Implementación simulada de xterm y sus addons
export class Terminal {
  private options: any = {};
  private container: HTMLElement | null = null;
  private addons: any[] = [];

  constructor(options: any = {}) {
    this.options = { ...options };
  }

  open(container: HTMLElement): void {
    this.container = container;
    console.log('Terminal abierta en el contenedor');
  }

  write(data: string): void {
    console.log('Escribiendo en terminal:', data);
  }

  onData(callback: (data: string) => void): void {
    console.log('Registrando callback onData');
  }

  onKey(callback: (key: { key: string, domEvent: KeyboardEvent }) => void): void {
    console.log('Registrando callback onKey');
  }

  focus(): void {
    console.log('Terminal enfocada');
  }

  clear(): void {
    console.log('Terminal limpiada');
  }

  reset(): void {
    console.log('Terminal reseteada');
  }

  resize(cols: number, rows: number): void {
    console.log(`Terminal redimensionada a ${cols}x${rows}`);
  }

  loadAddon(addon: any): void {
    this.addons.push(addon);
    console.log('Addon cargado en terminal');
  }

  dispose(): void {
    console.log('Terminal eliminada');
  }

  setOption(key: string, value: any): void {
    this.options[key] = value;
    console.log(`Opción ${key} establecida a:`, value);
  }

  getOption(key: string): any {
    return this.options[key];
  }
}

export class FitAddon {
  private terminal: Terminal | null = null;

  constructor() {}

  activate(terminal: Terminal): void {
    this.terminal = terminal;
    console.log('FitAddon activado');
  }

  fit(): void {
    console.log('Ajustando terminal al contenedor');
  }

  dispose(): void {
    console.log('FitAddon eliminado');
  }
}

export class WebLinksAddon {
  private terminal: Terminal | null = null;
  private handler: ((event: MouseEvent, uri: string) => void) | undefined;

  constructor(handler?: (event: MouseEvent, uri: string) => void) {
    this.handler = handler;
  }

  activate(terminal: Terminal): void {
    this.terminal = terminal;
    console.log('WebLinksAddon activado');
  }

  dispose(): void {
    console.log('WebLinksAddon eliminado');
  }
}

export class SearchAddon {
  private terminal: Terminal | null = null;

  constructor() {}

  activate(terminal: Terminal): void {
    this.terminal = terminal;
    console.log('SearchAddon activado');
  }

  findNext(term: string, options?: { regex?: boolean, wholeWord?: boolean, caseSensitive?: boolean }): boolean {
    console.log(`Buscando siguiente "${term}" con opciones:`, options);
    return true;
  }

  findPrevious(term: string, options?: { regex?: boolean, wholeWord?: boolean, caseSensitive?: boolean }): boolean {
    console.log(`Buscando anterior "${term}" con opciones:`, options);
    return true;
  }

  dispose(): void {
    console.log('SearchAddon eliminado');
  }
} 