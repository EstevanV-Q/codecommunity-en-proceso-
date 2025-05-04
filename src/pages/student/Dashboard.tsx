import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Badge,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School as SchoolIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Chat as ChatIcon,
  CalendarMonth as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Bookmark as BookmarkIcon,
  EmojiEvents as EmojiEventsIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import CourseCard from '../../components/courses/CourseCard';
import StudyGroupCard from '../../components/community/StudyGroupCard';
import FeedbackCard from '../../components/feedback/FeedbackCard';
import { StudentDashboard as StudentDashboardType } from '../../types/student';

interface MockUser {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

interface CourseCardProps {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextLesson?: string;
}

interface StudyGroupCardProps {
  id: string;
  name: string;
  members: number;
  activeDiscussions: number;
  description?: string;
  isPrivate?: boolean;
}

interface FeedbackCardProps {
  id: string;
  courseName: string;
  rating: number;
  comment: string;
  studentName: string;
  studentAvatar?: string;
  date: Date;
  tags?: string[];
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState<StudentDashboardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData: StudentDashboardType = {
          enrolledCourses: [
            {
              id: '1',
              title: 'Introducción a React',
              progress: 75,
              lastAccessed: new Date().toISOString(),
              nextLesson: 'Hooks avanzados',
            },
            {
              id: '2',
              title: 'Machine Learning',
              progress: 50,
              lastAccessed: new Date().toISOString(),
              nextLesson: 'Redes Neuronales',
            },
          ],
          studyGroups: [
            {
              id: '1',
              name: 'Grupo de React',
              members: [
                { id: '1', name: 'Juan Pérez', role: 'admin' },
                { id: '2', name: 'María García', role: 'member' },
                { id: '3', name: 'Carlos López', role: 'member' }
              ],
              activeDiscussions: 3,
              description: 'Grupo de estudio para principiantes en React',
            },
            {
              id: '2',
              name: 'Grupo de Machine Learning',
              members: [
                { id: '4', name: 'Ana Martínez', role: 'admin' },
                { id: '5', name: 'Pedro Sánchez', role: 'member' }
              ],
              activeDiscussions: 2,
              description: 'Grupo de estudio para Machine Learning',
            },
          ],
          feedback: [
            {
              id: '1',
              courseName: 'Introducción a React',
              rating: 5,
              comment: 'Excelente curso, muy bien explicado',
              studentName: 'Juan Pérez',
              date: new Date().toISOString(),
              tags: ['React', 'Frontend'],
            },
            {
              id: '2',
              courseName: 'Machine Learning',
              rating: 4,
              comment: 'Buen contenido, pero podría tener más ejemplos prácticos',
              studentName: 'María García',
              date: new Date().toISOString(),
              tags: ['ML', 'Python'],
            },
          ],
          recentActivity: [
            {
              id: '1',
              type: 'course',
              title: 'Introducción a React',
              date: new Date().toISOString(),
              status: 'completed'
            },
            {
              id: '2',
              type: 'assignment',
              title: 'Tarea de Machine Learning',
              date: new Date().toISOString(),
              status: 'pending'
            }
          ]
        };
        setDashboardData(mockData);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
      {/* Encabezado con bienvenida y estadísticas */}
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              ¡Bienvenido, {user?.displayName}!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Continúa tu aprendizaje y alcanza tus metas
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Tooltip title="Notificaciones">
              <IconButton sx={{ color: 'white' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Calendario">
              <IconButton sx={{ color: 'white' }}>
                <CalendarIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                background: alpha(theme.palette.common.white, 0.1),
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: alpha(theme.palette.common.white, 0.2), mr: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {dashboardData?.enrolledCourses.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Cursos Activos
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                background: alpha(theme.palette.common.white, 0.1),
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: alpha(theme.palette.common.white, 0.2), mr: 2 }}>
                <GroupIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {dashboardData?.studyGroups.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Grupos de Estudio
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                background: alpha(theme.palette.common.white, 0.1),
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: alpha(theme.palette.common.white, 0.2), mr: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  5
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Tareas Pendientes
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                background: alpha(theme.palette.common.white, 0.1),
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: alpha(theme.palette.common.white, 0.2), mr: 2 }}>
                <EmojiEventsIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  85%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Progreso Total
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Cursos inscritos */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Mis Cursos
              </Typography>
              <Chip
                icon={<TrendingUpIcon />}
                label="Progreso"
                color="primary"
                variant="outlined"
              />
            </Box>
            <Grid container spacing={3}>
              {dashboardData?.enrolledCourses.map((course) => (
                <Grid item xs={12} key={course.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      '&:hover': {
                        boxShadow: 2,
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <SchoolIcon />
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="h6" component="h2">
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Próxima lección: {course.nextLesson}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {course.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Marcar como favorito">
                          <IconButton size="small">
                            <BookmarkIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Último acceso">
                          <IconButton size="small">
                            <AccessTimeIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Actividad reciente y grupos de estudio */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4}>
            {/* Actividad reciente */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Actividad Reciente
              </Typography>
              <Stack spacing={2}>
                {dashboardData?.recentActivity.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: activity.status === 'completed' 
                            ? theme.palette.success.main 
                            : theme.palette.warning.main,
                          width: 32,
                          height: 32,
                        }}
                      >
                        {activity.type === 'course' ? <SchoolIcon /> : <AssignmentIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(activity.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Grupos de estudio */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Grupos de Estudio
              </Typography>
              <Stack spacing={2}>
                {dashboardData?.studyGroups.map((group) => (
                  <Box
                    key={group.id}
                    sx={{
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      '&:hover': {
                        boxShadow: 2,
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.secondary.main,
                          width: 40,
                          height: 40,
                        }}
                      >
                        <GroupIcon />
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">
                          {group.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {group.members.length} miembros • {group.activeDiscussions} discusiones
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <ChatIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard; 