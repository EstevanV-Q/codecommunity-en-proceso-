import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Rating,
  Avatar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayCircle as PlayCircleIcon,
  LiveTv as LiveIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  List as ListIcon,
  VideoLibrary as VideoIcon,
  Lock as LockIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  VideoCall as VideoCallIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number;
  technologies: string[];
  requirements: string[];
  isPublished: boolean;
  price: number;
  mentor: string;
  enrolledStudents: number;
  rating: number;
  hasSpecificStartDate: boolean;
  startDate: string;
  endDate: string;
  courseType: 'recorded' | 'live';
  isPublic: boolean;
  coverImage: string;
  videos?: {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
    thumbnailUrl?: string;
  }[];
  liveClassroom?: {
    meetingLink: string;
    meetingId: string;
    meetingPassword: string;
    schedule: Array<{
      date: string;
      startTime: string;
      endTime: string;
      topic: string;
    }>;
  };
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
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideoList, setShowVideoList] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // TODO: Replace with actual API call
        const mockCourse: Course = {
          id: '2',
          title: 'Clase en Vivo: Desarrollo de APIs con Node.js',
          description: 'Aprende a crear APIs robustas con Node.js, Express y MongoDB. Incluye autenticación, validación y buenas prácticas.',
          level: 'intermediate',
          category: 'Web Development',
          duration: 2,
          technologies: ['Node.js', 'Express', 'MongoDB', 'REST API'],
          requirements: ['Conocimientos básicos de JavaScript', 'HTML y CSS'],
          isPublished: true,
          price: 49.99,
          mentor: 'María García',
          enrolledStudents: 30,
          rating: 4.8,
          hasSpecificStartDate: true,
          startDate: '2024-03-20',
          endDate: '2024-03-20',
          courseType: 'live',
          isPublic: true,
          coverImage: 'https://example.com/nodejs-course.jpg',
          liveClassroom: {
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            meetingId: 'abc-defg-hij',
            meetingPassword: '123456',
            schedule: [
              {
                date: '2024-03-20',
                startTime: '15:00',
                endTime: '17:00',
                topic: 'Introducción a APIs con Node.js'
              },
              {
                date: '2024-03-27',
                startTime: '15:00',
                endTime: '17:00',
                topic: 'Autenticación y Seguridad'
              },
              {
                date: '2024-04-03',
                startTime: '15:00',
                endTime: '17:00',
                topic: 'Despliegue y Monitoreo'
              }
            ]
          }
        };
        setCourse(mockCourse);
      } catch (err) {
        setError('Error al cargar el curso');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVideoNavigation = (direction: 'next' | 'prev') => {
    if (!course?.videos) return;
    
    if (direction === 'next' && currentVideoIndex < course.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else if (direction === 'prev' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleJoinLiveClass = () => {
    if (course?.liveClassroom?.meetingLink) {
      window.open(course.liveClassroom.meetingLink, '_blank');
    }
  };

  const handlePurchase = () => {
    setShowPurchaseDialog(true);
  };

  const handleConfirmPurchase = () => {
    if (!course) return;

    // Agregar el curso al carrito
    const cartItem = {
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.coverImage,
      description: course.description
    };

    // Obtener el carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Verificar si el curso ya está en el carrito
    const isCourseInCart = currentCart.some((item: any) => item.id === course.id);
    
    if (!isCourseInCart) {
      // Agregar el nuevo curso al carrito
      currentCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    // Redirigir al carrito
    navigate('/cart');
  };

  const renderContentTab = () => {
    if (!course) return null;

    if (!hasPurchased) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <LockIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Contenido Bloqueado
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Compra el curso para acceder a todo el contenido
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={() => setShowPurchaseDialog(true)}
          >
            Comprar Curso
          </Button>
        </Box>
      );
    }

    if (course.courseType === 'live' && course.liveClassroom) {
      const nextSession = course.liveClassroom.schedule[0];
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Información de la Clase en Vivo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Próxima Sesión
                  </Typography>
                  <Typography variant="body1">
                    Fecha: {new Date(nextSession.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    Hora: {nextSession.startTime} - {nextSession.endTime}
                  </Typography>
                  <Typography variant="body1">
                    Tema: {nextSession.topic}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VideoCallIcon />}
                    onClick={() => navigate(`/live-classroom/${course.id}`)}
                    sx={{ mt: 2 }}
                  >
                    Unirse a la Clase
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Detalles de la Reunión
                  </Typography>
                  <Typography variant="body1">
                    ID de la reunión: {course.liveClassroom.meetingId}
                  </Typography>
                  <Typography variant="body1">
                    Contraseña: {course.liveClassroom.meetingPassword}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<LinkIcon />}
                    onClick={() => {
                      if (course.liveClassroom?.meetingLink) {
                        window.open(course.liveClassroom.meetingLink, '_blank');
                      }
                    }}
                    sx={{ mt: 2 }}
                  >
                    Copiar Enlace
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Videos del Curso
          </Typography>
          <IconButton onClick={() => setShowVideoList(!showVideoList)}>
            <ListIcon />
          </IconButton>
        </Box>

        {course.videos && course.videos.length > 0 && (
          <>
            <Card>
              <CardMedia
                component="video"
                image={course.videos[currentVideoIndex].videoUrl}
                controls
                sx={{ height: 400 }}
              />
              <CardContent>
                <Typography variant="h6">
                  {course.videos[currentVideoIndex].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.videos[currentVideoIndex].description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setCurrentVideoIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentVideoIndex === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => setCurrentVideoIndex(prev => Math.min(course.videos!.length - 1, prev + 1))}
                    disabled={currentVideoIndex === course.videos!.length - 1}
                  >
                    Siguiente
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {showVideoList && (
              <Paper sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
                <List>
                  {course.videos.map((video, index) => (
                    <ListItem
                      key={video.id}
                      button
                      selected={index === currentVideoIndex}
                      onClick={() => setCurrentVideoIndex(index)}
                    >
                      <ListItemIcon>
                        <VideoIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={video.title}
                        secondary={`${video.duration} - ${video.description}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </>
        )}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Container>
        <Alert severity="error">{error || 'Curso no encontrado'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/courses')}
          sx={{ mb: 2 }}
        >
          Volver a Cursos
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {course.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 1 }}>{course.mentor[0]}</Avatar>
                <Typography variant="subtitle1">{course.mentor}</Typography>
                <Rating value={course.rating} readOnly sx={{ ml: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({course.enrolledStudents} estudiantes)
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Chip label={course.level} color="primary" sx={{ mr: 1 }} />
                <Chip label={course.category} sx={{ mr: 1 }} />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${course.duration} horas`}
                  sx={{ mr: 1 }}
                />
              </Box>

              <Typography variant="body1" paragraph>
                {course.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Descripción" />
                <Tab label="Contenido" />
                <Tab label="Requisitos" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  Descripción del Curso
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Qué aprenderás:
                  </Typography>
                  <List>
                    {course.technologies.map((tech, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={tech} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {renderContentTab()}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Requisitos
                </Typography>
                <List>
                  {course.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
              {course.coverImage && (
                <CardMedia
                  component="img"
                  image={course.coverImage}
                  alt={course.title}
                  sx={{ height: 200, borderRadius: 1, mb: 2 }}
                />
              )}

              <Typography variant="h5" gutterBottom>
                ${course.price}
              </Typography>

              {course.courseType === 'live' ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<LiveIcon />}
                  onClick={handleJoinLiveClass}
                  sx={{ mb: 2 }}
                >
                  Unirse a la Clase
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handlePurchase}
                  sx={{ mb: 2 }}
                >
                  Comprar Curso
                </Button>
              )}

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Incluye:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${course.duration} horas de contenido`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Instructor: ${course.mentor}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Nivel: ${course.level}`} />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={showPurchaseDialog} onClose={() => setShowPurchaseDialog(false)}>
        <DialogTitle>Confirmar Compra</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas comprar el curso "{course.title}" por ${course.price}?
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPurchaseDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmPurchase} variant="contained" color="primary">
            Confirmar Compra
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseDetail; 