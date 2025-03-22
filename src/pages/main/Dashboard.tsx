import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Avatar,
  Button,
  Alert,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Forum as ForumIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Group as GroupIcon,
  SupervisorAccount as MentorIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  LiveHelp as HelpIcon,
  Announcement as AnnouncementIcon,
  AdminPanelSettings as AdminIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { AdminRole } from '../../context/AdminContext';
import { MockUser } from '../../mocks/users';

// Definición de tipos
type UserRole = 'admin' | 'mentor' | 'user';

interface DashboardUser {
  displayName?: string;
  role?: UserRole;
  photoURL?: string;
}

interface DashboardProps {
  user: MockUser;
}

// Componente para el Dashboard de Estudiante
const StudentDashboard: React.FC<DashboardProps> = ({ user }) => {
  const progressData = [
    { course: 'React Avanzado', progress: 75 },
    { course: 'Node.js Básico', progress: 90 },
    { course: 'TypeScript Fundamentals', progress: 60 },
  ];

  const recentActivities = [
    { type: 'course', text: 'Completaste la lección de React Hooks' },
    { type: 'forum', text: 'Respondiste una pregunta sobre TypeScript' },
    { type: 'project', text: 'Actualizaste tu proyecto E-commerce' },
  ];

  const stats = [
    { title: 'Cursos Activos', value: '3', icon: SchoolIcon },
    { title: 'Proyectos', value: '2', icon: AssignmentIcon },
    { title: 'Contribuciones', value: '15', icon: ForumIcon },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: '50%', mb: 2 }}>
              <stat.icon sx={{ color: 'primary.main' }} />
            </Box>
            <Typography variant="h4" component="div" gutterBottom>
              {stat.value}
            </Typography>
            <Typography color="textSecondary">{stat.title}</Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Progreso de Cursos" />
          <CardContent>
            <List>
              {progressData.map((item, index) => (
                <ListItem key={index}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{item.course}</Typography>
                      <Typography variant="body2">{item.progress}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={item.progress} sx={{ height: 8, borderRadius: 5 }} />
                  </Box>
                </ListItem>
              ))}
            </List>
            <Button component={RouterLink} to="/courses" fullWidth variant="outlined" sx={{ mt: 2 }}>
              Ver todos los cursos
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Actividad Reciente" />
          <CardContent>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.type === 'course' && <SchoolIcon color="primary" />}
                      {activity.type === 'forum' && <ForumIcon color="primary" />}
                      {activity.type === 'project' && <AssignmentIcon color="primary" />}
                    </ListItemIcon>
                    <ListItemText primary={activity.text} secondary={new Date().toLocaleDateString()} />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Componente para el Dashboard de Mentor
const MentorDashboard: React.FC<DashboardProps> = ({ user }) => {
  const mentorStats = [
    { title: 'Estudiantes Activos', value: '15', icon: PeopleIcon },
    { title: 'Cursos Asignados', value: '4', icon: SchoolIcon },
    { title: 'Consultas Pendientes', value: '8', icon: HelpIcon },
  ];

  const studentProgress = [
    { name: 'Ana García', course: 'React Avanzado', progress: 85 },
    { name: 'Carlos López', course: 'Node.js', progress: 60 },
    { name: 'María Rodríguez', course: 'TypeScript', progress: 75 },
  ];

  return (
    <Grid container spacing={3}>
      {mentorStats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Box sx={{ p: 1, bgcolor: 'secondary.light', borderRadius: '50%', mb: 2 }}>
              <stat.icon sx={{ color: 'secondary.main' }} />
            </Box>
            <Typography variant="h4" component="div" gutterBottom>
              {stat.value}
            </Typography>
            <Typography color="textSecondary">{stat.title}</Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Progreso de Estudiantes" />
          <CardContent>
            <List>
              {studentProgress.map((student, index) => (
                <ListItem key={index}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{student.name} - {student.course}</Typography>
                      <Typography variant="body2">{student.progress}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={student.progress} sx={{ height: 8, borderRadius: 5 }} />
                  </Box>
                </ListItem>
              ))}
            </List>
            <Button component={RouterLink} to="/mentor/students" fullWidth variant="outlined" sx={{ mt: 2 }}>
              Ver todos los estudiantes
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Consultas Pendientes" />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HelpIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Duda sobre Hooks en React"
                  secondary="Ana García - Hace 2 horas"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <HelpIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Problema con TypeScript"
                  secondary="Carlos López - Hace 3 horas"
                />
              </ListItem>
            </List>
            <Button component={RouterLink} to="/mentor/queries" fullWidth variant="contained" sx={{ mt: 2 }}>
              Responder consultas
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Componente para el Dashboard de Administrador
const AdminDashboard: React.FC<DashboardProps> = ({ user }) => {
  const adminStats = [
    { title: 'Usuarios Totales', value: '150', icon: PeopleIcon },
    { title: 'Cursos Activos', value: '12', icon: SchoolIcon },
    { title: 'Mentores', value: '8', icon: MentorIcon },
    { title: 'Pagos Totales', value: '₡1.2M', icon: PaymentIcon },
  ];

  const platformMetrics = [
    { metric: 'Usuarios Nuevos', value: '+25', change: '+15%', trend: 'up' },
    { metric: 'Tasa de Finalización', value: '78%', change: '+5%', trend: 'up' },
    { metric: 'Ingresos Mensuales', value: '₡2.5M', change: '+20%', trend: 'up' },
  ];

  const adminActions = [
    { title: 'Gestión de Usuarios', icon: PeopleIcon, path: '/admin/users' },
    { title: 'Gestión de Cursos', icon: SchoolIcon, path: '/admin/courses' },
    { title: 'Gestión de Pagos', icon: PaymentIcon, path: '/admin/payments' },
    { title: 'Analíticas', icon: AssessmentIcon, path: '/admin/analytics' },
  ];

  return (
    <Grid container spacing={3}>
      {adminStats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Box sx={{ p: 1, bgcolor: 'error.light', borderRadius: '50%', mb: 2 }}>
              <stat.icon sx={{ color: 'error.main' }} />
            </Box>
            <Typography variant="h4" component="div" gutterBottom>
              {stat.value}
            </Typography>
            <Typography color="textSecondary">{stat.title}</Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Acciones de Administración" />
          <CardContent>
            <Grid container spacing={2}>
              {adminActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Button
                    component={RouterLink}
                    to={action.path}
                    fullWidth
                    variant="outlined"
                    startIcon={<action.icon />}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Métricas de la Plataforma" />
          <CardContent>
            <Grid container spacing={2}>
              {platformMetrics.map((metric, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{metric.metric}</Typography>
                    <Typography variant="h4" color="primary">
                      {metric.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                    >
                      {metric.change}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Componente principal del Dashboard
const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    if (!user) return null;

    // Roles técnicos y administrativos muestran el dashboard de admin
    if (['founder', 'owner', 'cto', 'admin'].includes(user.role)) {
      return <AdminDashboard user={user} />;
    }
    
    // Roles de moderación y ayuda muestran el dashboard de mentor
    if (['moderator', 'helper', 'seniorDev'].includes(user.role)) {
      return <MentorDashboard user={user} />;
    }
    
    // El resto de roles muestra el dashboard de estudiante
    return <StudentDashboard user={user} />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Control
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Bienvenido de vuelta, {user?.displayName}
        </Typography>
        {['founder', 'owner', 'cto', 'admin'].includes(user?.role || '') && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Tienes acceso completo a todas las funciones de administración.
          </Alert>
        )}
        {['moderator', 'helper', 'seniorDev'].includes(user?.role || '') && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Tienes {8} consultas pendientes de tus estudiantes.
          </Alert>
        )}
      </Box>

      {renderDashboardByRole()}
    </Container>
  );
};

export default Dashboard; 