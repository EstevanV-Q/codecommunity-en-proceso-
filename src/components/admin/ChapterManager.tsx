import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Collapse,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Chapter } from '../../types/course';
import CourseContentService from '../../services/CourseContentService';
import VideoUploader from '../mentor/VideoUploader';

interface ChapterManagerProps {
  courseId: string;
  initialChapters: Chapter[];
  onChaptersUpdate: (chapters: Chapter[]) => void;
}

export default function ChapterManager({
  courseId,
  initialChapters,
  onChaptersUpdate
}: ChapterManagerProps) {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  useEffect(() => {
    setChapters(initialChapters);
  }, [initialChapters]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedChapters = items.map((chapter, index) => ({
      ...chapter,
      order: index + 1
    }));

    setChapters(reorderedChapters);
    onChaptersUpdate(reorderedChapters);
  };

  const handleOpenDialog = (chapter?: Chapter) => {
    if (chapter) {
      setEditingChapter(chapter);
    } else {
      setEditingChapter({
        id: '',
        title: '',
        description: '',
        order: chapters.length + 1
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingChapter(null);
  };

  const handleSaveChapter = () => {
    if (!editingChapter) return;

    const updatedChapters = editingChapter.id
      ? chapters.map(chapter =>
          chapter.id === editingChapter.id ? editingChapter : chapter
        )
      : [...chapters, { ...editingChapter, id: Date.now().toString() }];

    setChapters(updatedChapters);
    onChaptersUpdate(updatedChapters);
    handleCloseDialog();
  };

  const handleDeleteChapter = (chapterId: string) => {
    const updatedChapters = chapters.filter(chapter => chapter.id !== chapterId);
    setChapters(updatedChapters);
    onChaptersUpdate(updatedChapters);
  };

  const handleToggleExpand = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleVideoUploadComplete = async (chapterId: string, videoUrl: string) => {
    const updatedChapters = chapters.map(chapter =>
      chapter.id === chapterId
        ? { ...chapter, videoUrl }
        : chapter
    );
    setChapters(updatedChapters);
    onChaptersUpdate(updatedChapters);
  };

  const handleVideoError = (error: string) => {
    console.error('Error uploading video:', error);
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Agregar Capítulo
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
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
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1">
                                {chapter.title}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleExpand(chapter.id)}
                              >
                                {expandedChapter === chapter.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                            </Box>
                          }
                          secondary={chapter.description}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => handleOpenDialog(chapter)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteChapter(chapter.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Collapse in={expandedChapter === chapter.id}>
                        <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                          <VideoUploader
                            courseId={courseId}
                            chapterId={chapter.id}
                            onUploadComplete={(videoUrl) => handleVideoUploadComplete(chapter.id, videoUrl)}
                            onError={handleVideoError}
                          />
                        </Box>
                      </Collapse>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingChapter?.id ? 'Editar Capítulo' : 'Nuevo Capítulo'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            value={editingChapter?.title || ''}
            onChange={(e) => {
              if (editingChapter) {
                setEditingChapter({
                  ...editingChapter,
                  title: e.target.value
                });
              }
            }}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            value={editingChapter?.description || ''}
            onChange={(e) => {
              if (editingChapter) {
                setEditingChapter({
                  ...editingChapter,
                  description: e.target.value
                });
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveChapter} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 