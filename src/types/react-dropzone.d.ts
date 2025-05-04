declare module 'react-dropzone' {
  import { FC } from 'react';

  export interface DropzoneProps {
    accept?: { [key: string]: string[] };
    disabled?: boolean;
    maxFiles?: number;
    maxSize?: number;
    minSize?: number;
    multiple?: boolean;
    onDrop?: (acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) => void;
    onDropAccepted?: (files: File[], event: DropEvent) => void;
    onDropRejected?: (files: File[], event: DropEvent) => void;
    onDragEnter?: (event: DropEvent) => void;
    onDragLeave?: (event: DropEvent) => void;
    onDragOver?: (event: DropEvent) => void;
    preventDropOnDocument?: boolean;
  }

  export interface DropEvent extends Event {
    dataTransfer: DataTransfer;
  }

  export interface DropzoneState {
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
    isFileDialogActive: boolean;
    draggedFiles: File[];
    acceptedFiles: File[];
    rejectedFiles: File[];
  }

  export interface DropzoneRef {
    open: () => void;
  }

  export function useDropzone(options?: DropzoneProps): {
    getRootProps: (props?: any) => any;
    getInputProps: (props?: any) => any;
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
    open: () => void;
  };

  const Dropzone: FC<DropzoneProps>;
  export default Dropzone;
} 