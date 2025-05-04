import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CourseContentManagement as CourseContentManagementType } from '../../types/teacher';

const CourseContentManagement: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [content, setContent] = useState<CourseContentManagementType['content']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<CourseContentManagementType['content'][0] | null>(null);
  const [contentType, setContentType] = useState<'lesson' | 'quiz' | 'assignment'>('lesson');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData: CourseContentManagementType['content'] = [
          {
            id: '1',
            title: 'Introducción a React',
            type: 'lesson',
            duration: '30 min',
            order: 1,
            status: 'published',
          },
          {
            id: '2',
            title: 'Quiz: Conceptos Básicos',
            type: 'quiz',
            duration: '15 min',
            order: 2,
            status: 'draft',
          },
          {
            id: '3',
            title: 'Proyecto Final',
            type: 'assignment',
            duration: '2 horas',
            order: 3,
            status: 'published',
          },
        ];
        setContent(mockData);
      } catch (err) {
        setError('Error al cargar el contenido del curso');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId]);

  const handleOpenDialog = (contentItem?: CourseContentManagementType['content'][0]) => {
    setSelectedContent(contentItem || null);
    setContentType(contentItem?.type || 'lesson');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContent(null);
  };

  const handleSaveContent = async () => {
    try {
      // TODO: Implementar llamada a API para guardar contenido
      console.log('Saving content:', selectedContent);
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success.main';
      case 'draft':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Contenido
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Contenido del Curso</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Agregar Contenido
          </Button>
        </Box>

        <List>
          {content.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                mb: 1,
                borderRadius: 1,
              }}
            >
              <DragIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText
                primary={item.title}
                secondary={`${item.type} - ${item.duration}`}
              />
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="body2"
                  color={getStatusColor(item.status)}
                >
                  {getStatusText(item.status)}
                </Typography>
              </Box>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleOpenDialog(item)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedContent ? 'Editar Contenido' : 'Nuevo Contenido'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Contenido</InputLabel>
              <Select
                value={contentType}
                label="Tipo de Contenido"
                onChange={(e) => setContentType(e.target.value as 'lesson' | 'quiz' | 'assignment')}
              >
                <MenuItem value="lesson">Lección</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="assignment">Tarea</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Título"
              fullWidth
              value={selectedContent?.title || ''}
              onChange={(e) =>
                setSelectedContent({
                  ...selectedContent!,
                  title: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Duración"
              fullWidth
              value={selectedContent?.duration || ''}
              onChange={(e) =>
                setSelectedContent({
                  ...selectedContent!,
                  duration: e.target.value,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveContent} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseContentManagement; 