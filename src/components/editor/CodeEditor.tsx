import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Box, Paper } from '@mui/material';
import { colors, shadows } from '../../theme/tokens';

// Tipos de lenguajes soportados
export type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'php'
  | 'ruby'
  | 'go'
  | 'rust';

interface CodeEditorProps {
  code: string;
  language: Language;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string | number;
  theme?: 'vs-dark' | 'vs-light';
  fontSize?: number;
  lineNumbers?: boolean;
  minimap?: boolean;
  wordWrap?: 'on' | 'off';
  autoFormat?: boolean;
  liveShare?: boolean;
  onSave?: (value: string) => void;
  onError?: (errors: monaco.editor.IMarker[]) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code: initialCode,
  language,
  onChange,
  readOnly = false,
  height = '500px',
  theme = 'vs-dark',
  fontSize = 14,
  lineNumbers = true,
  minimap = true,
  wordWrap = 'off',
  autoFormat = true,
  liveShare = false,
  onSave,
  onError,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [decorations, setDecorations] = useState<string[]>([]);

  // Configurar el editor cuando el componente se monta
  useEffect(() => {
    if (editorRef.current) {
      // Configuración del editor
      const editorInstance = monaco.editor.create(editorRef.current, {
        value: initialCode,
        language,
        theme,
        fontSize,
        lineNumbers: lineNumbers ? 'on' : 'off',
        readOnly,
        minimap: {
          enabled: minimap,
        },
        wordWrap: wordWrap,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        tabSize: 2,
        rulers: [80],
        bracketPairColorization: {
          enabled: true,
        },
        formatOnPaste: autoFormat,
        formatOnType: autoFormat,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
      });

      // Configurar acciones del editor
      editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        const value = editorInstance.getValue();
        onSave?.(value);
      });

      // Manejar cambios en el código
      editorInstance.onDidChangeModelContent(() => {
        const value = editorInstance.getValue();
        onChange?.(value);

        // Validar errores si hay un lenguaje que lo soporte
        if (language === 'typescript' || language === 'javascript') {
          const model = editorInstance.getModel();
          if (model) {
            monaco.editor.getModelMarkers({ owner: language }).forEach((marker) => {
              if (marker.severity === monaco.MarkerSeverity.Error) {
                onError?.([marker]);
              }
            });
          }
        }
      });

      // Configurar autocompletado
      monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          // Ejemplo de snippets personalizados
          const suggestions = [
            {
              label: 'console.log',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'console.log($1);',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            },
            {
              label: 'try-catch',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                'try {',
                '\t$1',
                '} catch (error) {',
                '\tconsole.error(error);',
                '}',
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            },
          ];

          return { suggestions };
        },
      });

      setEditor(editorInstance);

      // Limpiar el editor cuando el componente se desmonta
      return () => {
        editorInstance.dispose();
      };
    }
  }, []);

  // Actualizar el código cuando cambia externamente
  useEffect(() => {
    if (editor) {
      const currentValue = editor.getValue();
      if (currentValue !== initialCode) {
        editor.setValue(initialCode);
      }
    }
  }, [initialCode]);

  // Actualizar el tema del editor
  useEffect(() => {
    if (editor) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  // Actualizar el lenguaje del editor
  useEffect(() => {
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  // Resaltar errores de sintaxis
  const highlightErrors = (errors: monaco.editor.IMarker[]) => {
    if (editor) {
      const newDecorations = errors.map((error) => ({
        range: new monaco.Range(
          error.startLineNumber,
          error.startColumn,
          error.endLineNumber,
          error.endColumn
        ),
        options: {
          inlineClassName: 'errorDecoration',
          hoverMessage: { value: error.message },
        },
      }));

      setDecorations(editor.deltaDecorations(decorations, newDecorations));
    }
  };

  // Formatear el código
  const formatCode = () => {
    if (editor) {
      editor.getAction('editor.action.formatDocument')?.run();
    }
  };

  // Deshacer/Rehacer
  const undo = () => editor?.trigger('keyboard', 'undo', null);
  const redo = () => editor?.trigger('keyboard', 'redo', null);

  return (
    <Paper
      elevation={3}
      sx={{
        height,
        overflow: 'hidden',
        backgroundColor: theme === 'vs-dark' ? colors.darkMode.background : colors.neutral.white,
        boxShadow: shadows.lg,
        borderRadius: '8px',
      }}
    >
      <Box
        ref={editorRef}
        sx={{
          height: '100%',
          '& .errorDecoration': {
            textDecoration: 'wavy underline',
            textDecorationColor: '#f44336',
          },
        }}
      />
    </Paper>
  );
};

export default CodeEditor; 