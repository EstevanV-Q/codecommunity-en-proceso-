import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  IconButton,
  Paper,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  order: number;
  fileName: string;
}

interface VideoUploaderProps {
  courseId: string;
  chapterId: string;
  onUploadComplete: (videoUrl: string) => void;
  onError: (error: string) => void;
  initialVideos?: Video[];
  onVideosUpdate?: (videos: Video[]) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  courseId,
  chapterId,
  onUploadComplete,
  onError,
  initialVideos = [],
  onVideosUpdate,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setUploadStatus('error');
    onError(message);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      handleError('Por favor, sube solo archivos de video.');
      return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      handleError('El archivo es demasiado grande. El tamaño máximo es 500MB.');
      return;
    }

    setVideoFile(file);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulated upload
      await new Promise(resolve => setTimeout(resolve, 5000));
      const simulatedVideoUrl = `https://example.com/videos/${courseId}/${chapterId}/${file.name}`;
      
      const newVideo: Video = {
        id: Date.now().toString(),
        title: file.name.split('.')[0],
        description: '',
        url: simulatedVideoUrl,
        order: videos.length + 1,
        fileName: file.name,
      };

      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      onVideosUpdate?.(updatedVideos);
      
      setUploadStatus('success');
      onUploadComplete(simulatedVideoUrl);
      
    } catch (error) {
      console.error('Error uploading video:', error);
      handleError('Error al subir el video. Por favor, intenta de nuevo.');
    }
  };

  const handleDelete = (videoId: string) => {
    const updatedVideos = videos.filter(v => v.id !== videoId).map((v, idx) => ({
      ...v,
      order: idx + 1
    }));
    setVideos(updatedVideos);
    onVideosUpdate?.(updatedVideos);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingVideo) return;

    const updatedVideos = videos.map(v =>
      v.id === editingVideo.id ? editingVideo : v
    );
    setVideos(updatedVideos);
    onVideosUpdate?.(updatedVideos);
    setDialogOpen(false);
    setEditingVideo(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(videos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedVideos = items.map((video, index) => ({
      ...video,
      order: index + 1
    }));

    setVideos(reorderedVideos);
    onVideosUpdate?.(reorderedVideos);
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: '1px dashed',
          borderColor: theme => 
            uploadStatus === 'error'
              ? 'error.main'
              : theme.palette.divider,
          borderRadius: 2,
          bgcolor: 'background.default',
          p: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <CloudUploadIcon
            sx={{
              fontSize: 48,
              color: 'primary.main',
              mb: 2,
            }}
          />
          <Typography variant="subtitle1" align="center" gutterBottom>
            Haz clic para subir un nuevo video
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center">
            Formatos soportados: MP4, MOV, AVI, MKV
            <br />
            Tamaño máximo: 500MB
          </Typography>
        </Box>

        {uploadStatus === 'uploading' && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {videoFile?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </Paper>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {videos.map((video, index) => (
                <Draggable
                  key={video.id}
                  draggableId={video.id}
                  index={index}
                >
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ mb: 2 }}
                    >
                      <ListItem>
                        <Box {...provided.dragHandleProps} sx={{ mr: 2 }}>
                          <DragIcon />
                        </Box>
                        <ListItemText
                          primary={video.title}
                          secondary={video.description || video.fileName}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleEdit(video)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDelete(video.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Editar Video
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            value={editingVideo?.title || ''}
            onChange={(e) => setEditingVideo(prev => prev ? {...prev, title: e.target.value} : null)}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            value={editingVideo?.description || ''}
            onChange={(e) => setEditingVideo(prev => prev ? {...prev, description: e.target.value} : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VideoUploader; 