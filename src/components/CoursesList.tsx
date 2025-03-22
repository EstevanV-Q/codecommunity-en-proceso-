import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  IconButton,
  Input,
} from '@mui/material';
import {
  PlayCircle as PlayCircleIcon,
  LiveTv as LiveIcon,
  Lock as LockIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
} from '@mui/icons-material';
import CourseCard from './CourseCard';
import { Course } from '../types/course';
import CourseContentService from '../services/CourseContentService';

interface CoursesListProps {
  courses: Course[];
  onEnroll?: (courseId: string) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, onEnroll }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const [videoDialog, setVideoDialog] = useState<{ 
    open: boolean; 
    courseId: string | null;
    courseTitle?: string;
  }>({
    open: false,
    courseId: null,
  });
  const coursesPerPage = 9;
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<{
    type: 'video' | 'live' | null;
    url: string | null;
    title: string | null;
  }>({
    type: null,
    url: null,
    title: null
  });
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    if (videoDialog.courseId) {
      loadChapters(videoDialog.courseId);
      checkPublicStatus(videoDialog.courseId);
    }
  }, [videoDialog.courseId]);

  const loadChapters = async (courseId: string) => {
    try {
      const loadedChapters = await CourseContentService.getChapters(courseId);
      setChapters(loadedChapters);
    } catch (error) {
      console.error('Error al cargar los capítulos:', error);
    }
  };

  const checkPublicStatus = async (courseId: string) => {
    const status = CourseContentService.isPublic(courseId);
    setIsPublic(status);
  };

  const handleTogglePublic = async (courseId: string) => {
    await CourseContentService.setPublicStatus(courseId, !isPublic);
    setIsPublic(!isPublic);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesType = filterType === 'all' || course.courseType === filterType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const handleWatchContent = async (courseId: string, type: 'video' | 'live') => {
    if (type === 'live') {
      // Redirigir a la sala de clases en vivo
      window.location.href = `/live-classroom/${courseId}`;
    } else {
      // Abrir el diálogo de videos para cursos grabados
      setVideoDialog({
        open: true,
        courseId
      });
    }
  };

  const handleUploadVideo = async (courseId: string, chapterId: string, file: File) => {
    try {
      await CourseContentService.uploadVideo(courseId, chapterId, file);
      // Recargar los capítulos para mostrar el nuevo video
      await loadChapters(courseId);
    } catch (error) {
      console.error('Error al subir el video:', error);
    }
  };

  const handleFileSelect = async (chapterId: string) => {
    if (!videoDialog.courseId) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await handleUploadVideo(videoDialog.courseId!, chapterId, file);
      }
    };
    input.click();
  };

  const handlePlayVideo = (chapter: any) => {
    if (chapter.isLocked && !chapter.videoUrl) {
      if (onEnroll && videoDialog.courseId) {
        onEnroll(videoDialog.courseId);
      }
    } else if (chapter.videoUrl) {
      setCurrentContent({
        type: 'video',
        url: chapter.videoUrl,
        title: chapter.title
      });
    }
  };

  const handleCloseContent = () => {
    setCurrentContent({
      type: null,
      url: null,
      title: null
    });
  };

  const isLiveActive = (course: Course) => {
    if (course.courseType !== 'live' || !course.hasSpecificStartDate) return false;
    
    const now = new Date();
    const startTime = new Date(course.startDate);
    // Consideramos que una clase está activa desde 5 minutos antes hasta 2 horas después de su inicio
    const fiveMinutesBefore = new Date(startTime.getTime() - 5 * 60000);
    const twoHoursAfter = new Date(startTime.getTime() + 2 * 60 * 60000);
    
    return now >= fiveMinutesBefore && now <= twoHoursAfter;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Cursos Disponibles
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Buscar cursos"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Nivel</InputLabel>
              <Select
                value={filterLevel}
                label="Nivel"
                onChange={(e: SelectChangeEvent) => setFilterLevel(e.target.value)}
              >
                <MenuItem value="all">Todos los niveles</MenuItem>
                <MenuItem value="beginner">Principiante</MenuItem>
                <MenuItem value="intermediate">Intermedio</MenuItem>
                <MenuItem value="advanced">Avanzado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tipo de curso</InputLabel>
              <Select
                value={filterType}
                label="Tipo de curso"
                onChange={(e: SelectChangeEvent) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">Todos los tipos</MenuItem>
                <MenuItem value="recorded">Video/Capítulos</MenuItem>
                <MenuItem value="live">En directo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {currentCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard 
              {...course} 
              onEnroll={onEnroll}
              onWatchContent={handleWatchContent}
              isLiveActive={isLiveActive(course)}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {currentCourses.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron cursos que coincidan con los filtros seleccionados.
          </Typography>
        </Box>
      )}

      {/* Diálogo para contenido */}
      <Dialog
        open={videoDialog.open}
        onClose={() => {
          setVideoDialog({ open: false, courseId: null });
          handleCloseContent();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {currentContent.type === 'live' ? <LiveIcon sx={{ mr: 1 }} /> : <PlayCircleIcon sx={{ mr: 1 }} />}
              {videoDialog.courseTitle || 'Contenido del Curso'}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => handleTogglePublic(videoDialog.courseId!)}
                color={isPublic ? "primary" : "default"}
                sx={{ mr: 1 }}
                title={isPublic ? "Hacer privado" : "Hacer público"}
              >
                {isPublic ? <PublicIcon /> : <PublicOffIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  setVideoDialog({ open: false, courseId: null });
                  handleCloseContent();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {currentContent.url ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {currentContent.title}
              </Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                {currentContent.type === 'video' ? (
                  <video
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    controls
                    src={currentContent.url}
                  />
                ) : (
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    src={currentContent.url}
                    allow="camera; microphone; fullscreen"
                  />
                )}
              </Box>
              {currentContent.type === 'video' && (
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={handleCloseContent}
                  sx={{ mb: 2 }}
                >
                  Volver a la lista
                </Button>
              )}
            </Box>
          ) : (
            <List>
              {chapters.map((chapter) => (
                <React.Fragment key={chapter.id}>
                  <ListItem disablePadding>
                    <ListItemButton 
                      onClick={() => handlePlayVideo(chapter)}
                      disabled={chapter.isLocked && !chapter.videoUrl}
                    >
                      <ListItemIcon>
                        {chapter.isLocked ? <LockIcon color="action" /> : <PlayCircleIcon color="primary" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={chapter.title}
                        secondary={`Duración: ${chapter.duration}`}
                      />
                      {!chapter.isLocked && (
                        <IconButton 
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileSelect(chapter.id);
                          }}
                        >
                          <UploadIcon />
                        </IconButton>
                      )}
                      {chapter.videoUrl ? (
                        <Typography variant="caption" color="success.main">
                          Video disponible
                        </Typography>
                      ) : chapter.isLocked ? (
                        <Typography variant="caption" color="error">
                          Requiere inscripción
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Sin video
                        </Typography>
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
          {!videoDialog.courseId && !currentContent.url && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Selecciona un capítulo para comenzar
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CoursesList; 