import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAccepted }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover'
        }
      }}
    >
      <input {...getInputProps()} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: isDragActive ? 'primary.main' : 'text.secondary'
          }}
        />
        <Typography
          variant="body1"
          color={isDragActive ? 'primary.main' : 'text.secondary'}
          textAlign="center"
        >
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop files here, or click to select files'}
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileDropzone; 