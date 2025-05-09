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
  Stack,
  useTheme,
  alpha,
  Button,
  keyframes,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemAvatar,
  ListItemAvatarProps,
  Card,
  CardContent,
  CardActions,
  DialogActions,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
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
  ArrowForward as ArrowForwardIcon,
  Rocket as RocketIcon,
  Event as EventIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Quiz as QuizIcon,
  Message as MessageIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { StudentDashboard as StudentDashboardType, StudyGroup as StudyGroupType } from '../../../types/student';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState<{
    enrolledCourses: Array<{
      id: string;
      name: string;
      progress: number;
      nextLesson: string;
    }>;
    studyGroups: Array<StudyGroupType>;
    pendingTasks: number;
    upcomingEvents: Array<{
      id: string;
      title: string;
      date: string;
      type: string;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [studentTickets, setStudentTickets] = useState<Array<any>>([]);

  // Mock data para eventos del calendario
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: '1',
      title: 'Examen de React',
      date: new Date(2024, 2, 15),
      type: 'exam',
      course: 'Introducción a React',
      professor: 'Prof. García'
    },
    {
      id: '2',
      title: 'Entrega de Proyecto ML',
      date: new Date(2024, 2, 20),
      type: 'assignment',
      course: 'Machine Learning',
      professor: 'Prof. Martínez'
    },
    {
      id: '3',
      title: 'Clase de Repaso',
      date: new Date(2024, 2, 18),
      type: 'class',
      course: 'Introducción a React',
      professor: 'Prof. García'
    }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData = {
          enrolledCourses: [
            {
              id: '1',
              name: 'Introducción a React',
              progress: 75,
              nextLesson: 'Hooks avanzados',
            },
            {
              id: '2',
              name: 'JavaScript Moderno',
              progress: 30,
              nextLesson: 'Async/Await',
            },
          ],
          studyGroups: [
            {
              id: '1',
              name: 'Grupo de React',
              activeDiscussions: 3,
              members: [],
              description: '',
              discussions: [],
            },
            {
              id: '2',
              name: 'JavaScript Avanzado',
              activeDiscussions: 2,
              members: [],
              description: '',
              discussions: [],
            },
          ],
          pendingTasks: 5,
          upcomingEvents: [
            {
              id: '1',
              title: 'Examen Final',
              date: '2024-03-20',
              type: 'exam',
            },
            {
              id: '2',
              title: 'Entrega Proyecto',
              date: '2024-03-25',
              type: 'assignment',
            },
          ],
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Leer tickets de soporte del localStorage
    const tickets = JSON.parse(localStorage.getItem('studentTickets') || '[]');
    setStudentTickets(tickets);
  }, []);

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleStudyGroupClick = (groupId: string) => {
    navigate(`/community/groups/${groupId}`);
  };

  const handleCalendarClick = () => {
    setCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return calendarEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <QuizIcon color="error" />;
      case 'assignment':
        return <AssignmentTurnedInIcon color="primary" />;
      case 'class':
        return <EventIcon color="info" />;
      default:
        return <EventIcon />;
    }
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
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
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Dashboard del Estudiante
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Bienvenido a tu espacio de aprendizaje
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<GroupIcon />}
            onClick={() => navigate('/community/groups')}
            sx={{
              background: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                background: alpha(theme.palette.common.white, 0.9),
              }
            }}
          >
            Ver Grupos
          </Button>
        </Box>
      </Paper>

      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3} 
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
          fontWeight: 'bold', 
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          animation: `${floatAnimation} 3s ease-in-out infinite`
              }}
            >
              ¡Bienvenido, {user?.displayName}!
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
          opacity: 0.9, 
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' }
              }}
            >
              <RocketIcon sx={{ animation: `${pulseAnimation} 2s ease-in-out infinite` }} />
              Continúa tu aprendizaje y alcanza tus metas
            </Typography>
          </Box>
          <Box 
            display="flex" 
            alignItems="center" 
            gap={2} 
            mt={{ xs: 2, sm: 0 }}
          >
            <Tooltip title="Ver Calendario">
              <IconButton 
          onClick={handleCalendarClick}
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              transform: 'scale(1.1)',
              transition: 'transform 0.2s'
            }
          }}
              >
          <CalendarIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              icon: <SchoolIcon />,
              value: dashboardData?.enrolledCourses.length || 0,
              label: 'Cursos Activos',
              color: theme.palette.success.main
            },
            {
              icon: <GroupIcon />,
              value: dashboardData?.studyGroups.length || 0,
              label: 'Grupos de Estudio',
              color: theme.palette.info.main
            },
            {
              icon: <AssignmentIcon />,
              value: dashboardData?.pendingTasks || 0,
              label: 'Tareas Pendientes',
              color: theme.palette.warning.main
            },
            {
              icon: <TrendingUpIcon />,
              value: dashboardData?.enrolledCourses 
                ? Math.round(dashboardData.enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / (dashboardData.enrolledCourses.length || 1))
                : 0,
              label: 'Progreso General',
              color: theme.palette.primary.main
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  background: alpha(theme.palette.common.white, 0.1),
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.2)}`,
                    background: alpha(theme.palette.common.white, 0.15),
                  }
                }}
              >
                <Avatar sx={{ 
                  bgcolor: alpha(stat.color, 0.2), 
                  color: stat.color,
                  mr: 2,
                  width: 48,
                  height: 48,
                  animation: `${pulseAnimation} 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stat.value}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {stat.label}
                </Typography>
                </Box>
              </Paper>
          </Grid>
        ))}
      </Grid>
      </Paper>

      {/* Cursos y Grupos */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SchoolIcon sx={{ color: theme.palette.primary.main }} />
            Mis Cursos
            </Typography>
          <Stack spacing={3}>
            {dashboardData?.enrolledCourses.map((course, index) => (
              <Paper
                key={course.id}
                elevation={2}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.2)}`,
                  }
                }}
                onClick={() => handleCourseClick(course.id)}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {course.name}
                            </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Próxima lección: {course.nextLesson}
                            </Typography>
                          </Box>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleCourseClick(course.id)}
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                      borderRadius: 2,
                      textTransform: 'none',
                      py: 1,
                      px: 3,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s'
                      }
                    }}
                  >
                    Continuar
                  </Button>
                </Box>
                <Box mt={2}>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      }
                    }}
                    />
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Progreso: {course.progress}%
                  </Typography>
                </Box>
          </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <GroupIcon sx={{ color: theme.palette.primary.main }} />
            Grupos de Estudio
          </Typography>
          <Stack spacing={3}>
            {dashboardData?.studyGroups.map((group, index) => (
              <Paper
                key={group.id}
                elevation={2}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.dark, 0.1)} 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.2)}`,
                  }
                }}
                onClick={() => handleStudyGroupClick(group.id)}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {group.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {group.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">
                    {group.members.length} miembros
            </Typography>
                            <Chip
                    label={`${group.activeDiscussions} discusiones activas`}
                              size="small"
                              color="primary"
                    sx={{
                      animation: `${pulseAnimation} 2s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}
                            />
                          </Box>
              </Paper>
              ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Tickets de Soporte */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon sx={{ color: theme.palette.secondary.main }} />
          Mis Tickets de Soporte
        </Typography>
        {studentTickets.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            No has creado tickets de soporte aún.
          </Paper>
        ) : (
          <Stack spacing={3}>
            {studentTickets.map((ticket) => (
              <Paper key={ticket.id} sx={{ p: 3, borderLeft: `6px solid ${theme.palette.primary.main}` }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{ticket.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{ticket.description}</Typography>
                    <Chip label={ticket.priority} color={
                      ticket.priority === 'critical' ? 'error' :
                      ticket.priority === 'high' ? 'warning' :
                      ticket.priority === 'medium' ? 'info' : 'success'
                    } sx={{ mr: 1 }} />
                    <Chip label={ticket.status === 'open' ? 'Abierto' : ticket.status} color={ticket.status === 'open' ? 'primary' : 'default'} />
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(ticket.date).toLocaleString()}
                    </Typography>
                    <Button variant="outlined" size="small" onClick={() => handleTicketClick(ticket.id)}>
                      Ver Detalle
                    </Button>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      {/* Calendario Emergente */}
      <Dialog
        open={calendarOpen}
        onClose={handleCloseCalendar}
        maxWidth="lg"
            fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            minHeight: '800px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          textAlign: 'center',
          py: 4,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: alpha(theme.palette.common.white, 0.3),
            borderRadius: '2px'
          }
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Calendario Académico
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 4, px: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                  }
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    sx={{
                      width: '100%',
                      '& .MuiPickersCalendarHeader-root': {
                        marginTop: 0,
                        marginBottom: 3,
                        '& .MuiPickersCalendarHeader-label': {
                          fontSize: '1.4rem',
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                        },
                      },
                      '& .MuiPickersDay-root': {
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        margin: '0 4px',
                        fontSize: '1rem',
                        '&.Mui-selected': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          color: 'white',
                          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                          },
                        },
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.1),
                          transform: 'scale(1.1)',
                          transition: 'transform 0.2s',
                        },
                        '&.MuiPickersDay-today': {
                          border: `2px solid ${theme.palette.primary.main}`,
                          background: 'transparent',
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.1),
                          },
                        },
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        width: 48,
                        margin: '0 4px',
                      },
                      '& .MuiPickersCalendarHeader-switchViewButton': {
                        color: theme.palette.primary.main,
                        fontSize: '1.2rem',
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.1),
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Paper>
        </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                  }
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, transparent 100%)`,
                      borderRadius: '2px'
                    }
                  }}
                >
                  <EventIcon sx={{ fontSize: '1.5rem' }} />
                  Eventos del día
                </Typography>
                {selectedDate && (
                  <List sx={{ p: 0 }}>
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map((event) => (
                        <React.Fragment key={event.id}>
                          <ListItem
                            sx={{
                              borderRadius: 2,
                              mb: 3,
                              background: alpha(theme.palette.background.paper, 0.9),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                                background: alpha(theme.palette.primary.main, 0.05),
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 48 }}>
                              {getEventIcon(event.type)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  {event.title}
                                </Typography>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                    sx={{ display: 'block', mt: 1 }}
                                  >
                                    {event.course}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                  >
                                    {event.professor}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </React.Fragment>
                      ))
                    ) : (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          textAlign: 'center',
                          background: alpha(theme.palette.background.paper, 0.9),
                          borderRadius: 2,
                          border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          No hay eventos programados para este día
                        </Typography>
                      </Paper>
                    )}
                  </List>
                )}
              </Paper>
        </Grid>
      </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default StudentDashboard; 