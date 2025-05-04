import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Stack,
  useTheme,
  alpha,
  Avatar,
  CardMedia,
  Tooltip,
  Badge,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  ContentCopy as CopyIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  PlayCircle as PlayIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { Course } from '../../../types/dashboard';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

interface LiveSession {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  streamUrl: string;
  isActive: boolean;
}

interface CourseContent {
  courseId: string;
  videos: VideoContent[];
  liveSessions: LiveSession[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CourseContentManagement: React.FC<{ course: Course | null }> = ({ course: initialCourse }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [course, setCourse] = useState<Course | null>(initialCourse);
  const [content, setContent] = useState<CourseContent>({
    courseId: courseId || '',
    videos: [],
    liveSessions: [],
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'video' | 'live' | null>(null);
  const [selectedContent, setSelectedContent] = useState<VideoContent | LiveSession | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    streamUrl: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (!course && courseId) {
      // Aquí iría la llamada a la API para obtener los detalles del curso
      const fetchCourse = async () => {
        try {
          // Simulación de llamada a API
          const mockCourse: Course = {
            id: courseId,
            title: 'Curso de Ejemplo',
            description: 'Descripción del curso',
            level: 'beginner',
            category: 'Programación',
            duration: 40,
            technologies: ['React', 'TypeScript'],
            requirements: ['Conocimientos básicos'],
            isPublished: true,
            price: 99.99,
            mentor: 'Profesor Ejemplo',
            enrolledStudents: 0,
            rating: 0,
            hasSpecificStartDate: false,
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            courseType: 'recorded',
            isPublic: true,
            coverImage: '',
            liveClassroom: {
              meetingLink: '',
              meetingId: '',
              meetingPassword: '',
              schedule: []
            }
          };
          setCourse(mockCourse);
        } catch (error) {
          console.error('Error fetching course:', error);
        }
      };

      fetchCourse();
    }
  }, [courseId, course]);

  const generateVideoUrl = (title: string) => {
    const baseUrl = 'https://your-platform.com/videos';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${baseUrl}/${course?.id}/${slug}-${Date.now()}`;
  };

  const generateStreamUrl = (title: string) => {
    const baseUrl = 'https://your-platform.com/live';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${baseUrl}/${course?.id}/${slug}-${Date.now()}`;
  };

  const handleOpenDialog = (type: 'video' | 'live', content?: VideoContent | LiveSession) => {
    setDialogType(type);
    if (content) {
      setSelectedContent(content);
      setFormData({
        title: content.title,
        description: content.description,
        duration: type === 'video' ? (content as VideoContent).duration : '',
        videoUrl: type === 'video' ? (content as VideoContent).videoUrl : '',
        streamUrl: type === 'live' ? (content as LiveSession).streamUrl : '',
        startDate: type === 'live' ? (content as LiveSession).startDate : '',
        endDate: type === 'live' ? (content as LiveSession).endDate : '',
      });
    } else {
      setSelectedContent(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        videoUrl: '',
        streamUrl: '',
        startDate: '',
        endDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      videoUrl: dialogType === 'video' ? generateVideoUrl(title) : prev.videoUrl,
      streamUrl: dialogType === 'live' ? generateStreamUrl(title) : prev.streamUrl,
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, duration: e.target.value });
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, videoUrl: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, startDate: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, endDate: e.target.value });
  };

  const handleStreamUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, streamUrl: e.target.value });
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setSnackbar({ open: true, message: 'URL copied to clipboard!' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType(null);
    setSelectedContent(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (dialogType === 'video') {
      const newVideo: VideoContent = {
        id: selectedContent?.id || String(Date.now()),
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        videoUrl: formData.videoUrl || generateVideoUrl(formData.title),
        isPublished: true,
        createdAt: new Date().toISOString(),
      };

      if (selectedContent) {
        setContent({
          ...content,
          videos: content.videos.map(v => v.id === selectedContent.id ? newVideo : v),
        });
      } else {
        setContent({
          ...content,
          videos: [...content.videos, newVideo],
        });
      }
    } else if (dialogType === 'live') {
      const newLiveSession: LiveSession = {
        id: selectedContent?.id || String(Date.now()),
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        streamUrl: formData.streamUrl || generateStreamUrl(formData.title),
        isActive: new Date(formData.startDate) <= new Date() && new Date(formData.endDate) >= new Date(),
      };

      if (selectedContent) {
        setContent({
          ...content,
          liveSessions: content.liveSessions.map(s => s.id === selectedContent.id ? newLiveSession : s),
        });
      } else {
        setContent({
          ...content,
          liveSessions: [...content.liveSessions, newLiveSession],
        });
      }
    }

    setLoading(false);
    handleCloseDialog();
  };

  const handleDelete = async (type: 'video' | 'live', id: string) => {
    setLoading(true);
    // Simular eliminación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (type === 'video') {
      setContent({
        ...content,
        videos: content.videos.filter(v => v.id !== id),
      });
    } else {
      setContent({
        ...content,
        liveSessions: content.liveSessions.filter(s => s.id !== id),
      });
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Gestión de Contenido
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog(tabValue === 0 ? 'video' : 'live')}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
            }}
          >
            Agregar {tabValue === 0 ? 'Video' : 'Clase en Vivo'}
          </Button>
        </Box>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Administra el contenido de tu curso {course?.title}
        </Typography>
      </Paper>

      {/* Tabs Section */}
      <Paper elevation={0} sx={{ mb: 4, borderRadius: 2, p: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab icon={<VideoIcon />} label="Videos" />
          <Tab icon={<LiveIcon />} label="Clases en Vivo" />
        </Tabs>
      </Paper>

      {/* Content Section */}
      {tabValue === 0 ? (
        <Grid container spacing={3}>
          {content.videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={video.thumbnailUrl || 'https://source.unsplash.com/random/400x200?education'}
                  alt={video.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                      {video.title}
                    </Typography>
                    <Chip
                      icon={video.isPublished ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      label={video.isPublished ? 'Publicado' : 'Borrador'}
                      size="small"
                      sx={{
                        bgcolor: video.isPublished
                          ? alpha(theme.palette.success.main, 0.1)
                          : alpha(theme.palette.warning.main, 0.1),
                        color: video.isPublished
                          ? theme.palette.success.main
                          : theme.palette.warning.main,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {video.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={video.duration}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        color: theme.palette.info.main,
                      }}
                    />
                    <Chip
                      icon={<CalendarIcon />}
                      label={new Date(video.createdAt).toLocaleDateString()}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog('video', video)}
                    fullWidth
                  >
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {content.liveSessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/400x200?live"
                  alt={session.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                      {session.title}
                    </Typography>
                    <Chip
                      icon={session.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                      label={session.isActive ? 'En Vivo' : 'Programada'}
                      size="small"
                      sx={{
                        bgcolor: session.isActive
                          ? alpha(theme.palette.success.main, 0.1)
                          : alpha(theme.palette.error.main, 0.1),
                        color: session.isActive
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {session.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      icon={<CalendarIcon />}
                      label={new Date(session.startDate).toLocaleDateString()}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`${new Date(session.startDate).toLocaleTimeString()} - ${new Date(session.endDate).toLocaleTimeString()}`}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        color: theme.palette.info.main,
                      }}
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog('live', session)}
                    fullWidth
                  >
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {selectedContent ? 'Editar' : 'Agregar'} {dialogType === 'video' ? 'Video' : 'Clase en Vivo'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              fullWidth
              value={formData.title}
              onChange={handleTitleChange}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleDescriptionChange}
            />
            {dialogType === 'video' ? (
              <>
                <TextField
                  label="Duración (minutos)"
                  fullWidth
                  value={formData.duration}
                  onChange={handleDurationChange}
                />
                <TextField
                  label="URL del Video"
                  fullWidth
                  value={formData.videoUrl}
                  onChange={handleVideoUrlChange}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Fecha y Hora de Inicio"
                  type="datetime-local"
                  fullWidth
                  value={formData.startDate}
                  onChange={handleStartDateChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Fecha y Hora de Fin"
                  type="datetime-local"
                  fullWidth
                  value={formData.endDate}
                  onChange={handleEndDateChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="URL de la Transmisión"
                  fullWidth
                  value={formData.streamUrl}
                  onChange={handleStreamUrlChange}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {selectedContent ? 'Guardar Cambios' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseContentManagement; 