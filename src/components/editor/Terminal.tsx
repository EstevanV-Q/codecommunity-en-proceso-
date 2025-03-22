import React, { useRef, useEffect } from 'react';
import { Terminal as XTerm } from '../../mocks/xterm';
import { FitAddon } from '../../mocks/xterm';
import { WebLinksAddon } from '../../mocks/xterm';
import { SearchAddon } from '../../mocks/xterm';
import { Box, Paper } from '@mui/material';
import { colors, shadows } from '../../theme/tokens';
import '../../styles/xterm.css';

interface TerminalProps {
  height?: string | number;
  theme?: 'light' | 'dark';
  fontSize?: number;
  onCommand?: (command: string) => void;
  onInit?: (terminal: XTerm) => void;
  readOnly?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  height = '100%',
  theme = 'dark',
  fontSize = 14,
  onCommand,
  onInit,
  readOnly = false,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<XTerm | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const searchAddon = useRef<SearchAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new XTerm({
        cursorBlink: true,
        fontSize,
        fontFamily: "'Fira Code', monospace",
        theme: theme === 'dark' 
          ? {
              background: colors.darkMode.background,
              foreground: colors.neutral[100],
              cursor: colors.primary[400],
              selection: colors.primary[900],
            }
          : {
              background: colors.neutral.white,
              foreground: colors.neutral[900],
              cursor: colors.primary[600],
              selection: colors.primary[100],
            },
        convertEol: true,
        scrollback: 1000,
        disableStdin: readOnly,
      });

      // Inicializar addons
      fitAddon.current = new FitAddon();
      searchAddon.current = new SearchAddon();
      const webLinksAddon = new WebLinksAddon();

      // Cargar addons
      terminal.current.loadAddon(fitAddon.current);
      terminal.current.loadAddon(searchAddon.current);
      terminal.current.loadAddon(webLinksAddon);

      // Abrir terminal
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();

      // Mensaje de bienvenida
      terminal.current.write('\x1b[1;32mBienvenido a CodeCommunity Terminal\x1b[0m\r\n');
      terminal.current.write('$ ');

      // Manejar comandos si no es de solo lectura
      if (!readOnly && onCommand) {
        let commandBuffer = '';
        
        terminal.current.onKey(({ key, domEvent }) => {
          const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

          if (domEvent.key === 'Enter') {
            terminal.current?.write('\r\n');
            if (commandBuffer.trim() && onCommand) {
              onCommand(commandBuffer);
            }
            commandBuffer = '';
            terminal.current?.write('$ ');
          } else if (domEvent.key === 'Backspace') {
            if (commandBuffer.length > 0) {
              commandBuffer = commandBuffer.slice(0, -1);
              terminal.current?.write('\b \b');
            }
          } else if (printable) {
            commandBuffer += key;
            terminal.current?.write(key);
          }
        });
      }

      // Notificar inicialización
      if (onInit && terminal.current) {
        onInit(terminal.current);
      }

      // Manejar redimensionamiento
      const handleResize = () => {
        if (fitAddon.current) {
          fitAddon.current.fit();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        terminal.current?.dispose();
      };
    }
  }, [fontSize, onCommand, onInit, readOnly]);

  useEffect(() => {
    if (terminal.current) {
      terminal.current.setOption('fontSize', fontSize);
      fitAddon.current?.fit();
    }
  }, [fontSize]);

  useEffect(() => {
    if (terminal.current) {
      terminal.current.setOption('theme', theme === 'dark' 
        ? {
            background: colors.darkMode.background,
            foreground: colors.neutral[100],
            cursor: colors.primary[400],
            selection: colors.primary[900],
          }
        : {
            background: colors.neutral.white,
            foreground: colors.neutral[900],
            cursor: colors.primary[600],
            selection: colors.primary[100],
          }
      );
    }
  }, [theme]);

  return (
    <Paper
      elevation={3}
      sx={{
        height,
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? colors.darkMode.background : colors.neutral.white,
        boxShadow: shadows.lg,
        borderRadius: '8px',
      }}
    >
      <Box
        ref={terminalRef}
        sx={{
          height: '100%',
          padding: '8px',
        }}
      />
    </Paper>
  );
};

export default Terminal; 