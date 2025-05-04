import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Book as BookIcon,
  Chat as ChatIcon,
  CalendarMonth as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Datos de ejemplo para estadísticas
  const stats = [
    { title: 'Cursos Activos', value: '12', icon: <SchoolIcon />, color: theme.palette.primary.main },
    { title: 'Estudiantes', value: '245', icon: <GroupIcon />, color: theme.palette.success.main },
    { title: 'Tareas Pendientes', value: '8', icon: <AssignmentIcon />, color: theme.palette.warning.main },
    { title: 'Clases Hoy', value: '3', icon: <LiveIcon />, color: theme.palette.error.main },
  ];

  const dashboardItems = [
    {
      title: 'Mis Cursos',
      description: 'Gestiona tus cursos, crea nuevos o edita los existentes',
      icon: <SchoolIcon fontSize="large" />,
      path: '/teacher/courses',
      color: theme.palette.primary.main,
    },
    {
      title: 'Clases en Vivo',
      description: 'Programa y gestiona tus clases en vivo',
      icon: <LiveIcon fontSize="large" />,
      path: '/teacher/live-classes',
      color: theme.palette.error.main,
    },
    {
      title: 'Contenido',
      description: 'Administra el contenido de tus cursos',
      icon: <VideoIcon fontSize="large" />,
      path: '/teacher/content',
      color: theme.palette.info.main,
    },
    {
      title: 'Estudiantes',
      description: 'Gestiona y monitorea el progreso de tus estudiantes',
      icon: <PeopleIcon fontSize="large" />,
      path: '/teacher/students',
      color: theme.palette.success.main,
    },
    {
      title: 'Tareas',
      description: 'Crea y revisa tareas y proyectos',
      icon: <AssignmentIcon fontSize="large" />,
      path: '/teacher/assignments',
      color: theme.palette.warning.main,
    },
    {
      title: 'Calificaciones',
      description: 'Administra las calificaciones y evaluaciones',
      icon: <AssessmentIcon fontSize="large" />,
      path: '/teacher/grades',
      color: theme.palette.secondary.main,
    },
    {
      title: 'Materiales',
      description: 'Gestiona tus materiales y recursos educativos',
      icon: <BookIcon fontSize="large" />,
      path: '/teacher/materials',
      color: theme.palette.info.main,
    },
    {
      title: 'Comunicación',
      description: 'Centro de comunicación con estudiantes',
      icon: <ChatIcon fontSize="large" />,
      path: '/teacher/communication',
      color: theme.palette.success.main,
    },
    {
      title: 'Calendario',
      description: 'Organiza tus clases y eventos',
      icon: <CalendarIcon fontSize="large" />,
      path: '/teacher/calendar',
      color: theme.palette.primary.main,
    },
    {
      title: 'Ganancias',
      description: 'Gestiona tus ganancias y transacciones',
      icon: <TrendingUpIcon fontSize="large" />,
      path: '/teacher/earnings',
      color: theme.palette.secondary.main
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Encabezado con estadísticas */}
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Bienvenido, Profesor
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.9 }}>
          Aquí tienes un resumen de tu actividad
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
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
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.common.white, 0.2),
                    mr: 2,
                    color: 'white',
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {stat.title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Sección de herramientas */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Herramientas del Profesor
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                background: `linear-gradient(135deg, ${alpha(item.color, 0.1)} 0%, ${alpha(item.color, 0.05)} 100%)`,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 16px ${alpha(item.color, 0.2)}`,
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha(item.color, 0.1),
                      color: item.color,
                      width: 56,
                      height: 56,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeacherDashboard; 