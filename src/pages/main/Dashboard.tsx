import React, { useState, useEffect } from 'react';
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
  // Avatar,
  Button,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';

import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Forum as ForumIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Group as PeopleIcon,
  SupervisorAccount as MentorIcon,
  Assessment as AssessmentIcon,
  Code as CodeIcon,
  Help as HelpIcon,
  Announcement as AnnouncementIcon,
  AdminPanelSettings as AdminIcon,
  Payment as PaymentIcon,
  Flag as FlagIcon,
  Timer as TimerIcon,
  Campaign as CampaignIcon,
  ShowChart as ShowChartIcon,
  AccountBalance as AccountBalanceIcon,
  ArrowUpward as TrendingUpwardIcon,
  ArrowDownward as TrendingDownwardIcon,
  Brush as BrushIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  // Chat as ChatIcon,
  Android as AndroidIcon,
} from '@mui/icons-material';

import { useAuth } from '../../context/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MockUser } from '../../mocks/users';
import MentorCoursesDashboard from '../../components/mentor/MentorCoursesDashboard';
import { Role } from '../../types/roles';

// Definición de tipos específicos para el dashboard
type SpecializedRole = 'marketing' | 'accounting' | 'designer';

interface StatItem {
  title: string;
  value: string;
  icon: React.ElementType;
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
  const [activeTab, setActiveTab] = useState(0);

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
    <Box>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
        <Tab label="Resumen" />
        <Tab label="Mis Cursos" />
        <Tab label="Estudiantes" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
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
          </Grid>
        )}
        
        {activeTab === 1 && <MentorCoursesDashboard />}
        
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Estudiantes Asignados
            </Typography>
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
          </Box>
        )}
      </Box>
    </Box>
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
    { title: 'Gestión de Tutor', icon: CodeIcon, path: '/admin/tutors' },
    { title: 'Gestión de Cursos', icon: SchoolIcon, path: '/admin/courses' },
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

// Componente para el Dashboard de Fundador/Owner
const FounderDashboard: React.FC<DashboardProps> = ({ user }) => {
  const founderStats = [
    { title: 'Ingresos Totales', value: '₡5.2M', icon: PaymentIcon },
    { title: 'Usuarios Activos', value: '2.5K', icon: PeopleIcon },
    { title: 'Crecimiento', value: '+45%', icon: TrendingUpIcon },
    { title: 'ROI', value: '320%', icon: StarIcon },
  ];

  const platformMetrics = [
    { metric: 'Retención de Usuarios', value: '92%', change: '+8%', trend: 'up' },
    { metric: 'Satisfacción', value: '4.8/5', change: '+0.3', trend: 'up' },
    { metric: 'Ingresos Anuales', value: '₡15M', change: '+45%', trend: 'up' },
  ];
// acciones rapidas de fundador/owner
  const quickActions = [
    { title: 'Panel Ejecutivo', icon: AdminIcon, path: '/admin' },
    { title: 'Métricas Financieras', icon: AssessmentIcon, path: '/admin/analytics' },
    { title: 'Gestión Organizacional', icon: PeopleIcon, path: '/admin/organization' },
    { title: 'Anuncios Globales', icon: AnnouncementIcon, path: '/admin/announcements' },
  ];

  return (
    <Grid container spacing={3}>
      {founderStats.map((stat, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Box sx={{ p: 1, bgcolor: 'primary.dark', borderRadius: '50%', mb: 2 }}>
              <stat.icon sx={{ color: 'primary.light' }} />
            </Box>
            <Typography variant="h4" component="div" gutterBottom>
              {stat.value}
            </Typography>
            <Typography color="textSecondary">{stat.title}</Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Métricas de la Plataforma
          </Typography>
          <Grid container spacing={3}>
            {platformMetrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {metric.value}
                  </Typography>
                  <Typography variant="subtitle1">{metric.metric}</Typography>
                  <Typography
                    variant="body2"
                    color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                  >
                    {metric.change}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Acciones Rápidas
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                component={RouterLink}
                to={action.path}
                variant="outlined"
                fullWidth
                startIcon={<action.icon />}
                sx={{ p: 2, height: '100%' }}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// Componente para el Dashboard de CTO/Senior Dev
const TechnicalDashboard: React.FC<DashboardProps> = ({ user }) => {
  const techStats = [
    { title: 'Uptime', value: '99.9%', icon: StarIcon },
    { title: 'Deploy Success Rate', value: '98%', icon: CodeIcon },
    { title: 'Code Coverage', value: '87%', icon: AssessmentIcon },
    { title: 'Active Projects', value: '12', icon: AssignmentIcon },
  ];

  const systemMetrics = [
    { metric: 'CPU Usage', value: '45%', status: 'normal' },
    { metric: 'Memory Usage', value: '65%', status: 'warning' },
    { metric: 'Storage', value: '32%', status: 'normal' },
  ];

  const quickActions = [
    { title: 'Monitoreo', icon: AssessmentIcon, path: '/admin/monitoring' },
    //{ title: 'Gestión de Código', icon: CodeIcon, path: '/admin/code' },
    //{ title: 'CI/CD', icon: AndroidIcon, path: '/admin/cicd' },
    //{ title: 'Logs', icon: AssignmentIcon, path: '/admin/logs' },
  ];

  return (
    <Grid container spacing={3}>
      {techStats.map((stat, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Box sx={{ p: 1, bgcolor: 'info.light', borderRadius: '50%', mb: 2 }}>
              <stat.icon sx={{ color: 'info.main' }} />
            </Box>
            <Typography variant="h4" component="div" gutterBottom>
              {stat.value}
            </Typography>
            <Typography color="textSecondary">{stat.title}</Typography>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Métricas del Sistema
          </Typography>
          <Grid container spacing={3}>
            {systemMetrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color={metric.status === 'warning' ? 'warning.main' : 'success.main'}>
                    {metric.value}
                  </Typography>
                  <Typography variant="subtitle1">{metric.metric}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Acciones Rápidas
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                component={RouterLink}
                to={action.path}
                variant="outlined"
                fullWidth
                startIcon={<action.icon />}
                sx={{ p: 2, height: '100%' }}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// Componente para el Dashboard de Moderación
const ModeratorDashboard: React.FC<DashboardProps> = ({ user }) => {
  const modStats = [
    { title: 'Reportes Pendientes', value: '8', icon: FlagIcon },
    { title: 'Usuarios Activos', value: '1.2K', icon: PeopleIcon },
    { title: 'Posts Moderados', value: '45', icon: ForumIcon },
    { title: 'Tiempo Respuesta', value: '15m', icon: TimerIcon },
  ];

  return (
    <Grid container spacing={3}>
      {modStats.map((stat, index) => (
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
    </Grid>
  );
};

// Componente para el Dashboard Especializado (Marketing/Accounting/Designer)
const SpecializedDashboard: React.FC<DashboardProps> = ({ user }) => {
  const getSpecializedStats = (role: SpecializedRole): StatItem[] => {
    switch (role) {
      case 'marketing':
        return [
          { title: 'Campañas Activas', value: '5', icon: CampaignIcon },
          { title: 'Leads', value: '250', icon: TrendingUpwardIcon },
          { title: 'Conversión', value: '3.2%', icon: ShowChartIcon },
        ];
      case 'accounting':
        return [
          { title: 'Balance', value: '₡2.5M', icon: AccountBalanceIcon },
          { title: 'Ingresos Mes', value: '₡450K', icon: TrendingUpwardIcon },
          { title: 'Gastos Mes', value: '₡280K', icon: TrendingDownwardIcon },
        ];
      case 'designer':
        return [
          { title: 'Proyectos', value: '8', icon: BrushIcon },
          { title: 'En Revisión', value: '3', icon: VisibilityIcon },
          { title: 'Completados', value: '45', icon: CheckCircleIcon },
        ];
      default:
        return [];
    }
  };

  // Verificar si el rol del usuario es un rol especializado
  const isSpecializedRole = (role: string): role is SpecializedRole => {
    return ['marketing', 'accounting', 'designer'].includes(role);
  };

  // Solo proceder si el rol es válido
  if (!isSpecializedRole(user.role)) {
    return (
      <Alert severity="error">
        Rol no válido para el dashboard especializado
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {getSpecializedStats(user.role).map((stat, index) => (
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
    </Grid>
  );
};

// Componente para el Dashboard de Profesor
const TeacherDashboard: React.FC<DashboardProps> = ({ user }) => {
  const teacherStats = [
    { title: 'Cursos Activos', value: '4', icon: SchoolIcon },
    { title: 'Estudiantes', value: '120', icon: PeopleIcon },
    { title: 'Tareas Pendientes', value: '15', icon: AssignmentIcon },
    { title: 'Calificación', value: '4.8', icon: StarIcon },
  ];

  const quickActions = [
    { title: 'Panel de Control profesor', icon: AssessmentIcon, path: '/teacher/Maestro' },
//      { title: 'Mis Cursos', icon: SchoolIcon, path: '/teacher/courses' },
  //    { title: 'Calificaciones', icon: StarIcon, path: '/teacher/grades' },
    //  { title: 'Asignaciones', icon: AssignmentIcon, path: '/teacher/assignments' },
      //{ title: 'Estudiantes', icon: PeopleIcon, path: '/teacher/students' },
      //{ title: 'Anuncios', icon: AnnouncementIcon, path: '/teacher/announcements' },
  ];

  return (
    <Grid container spacing={3}>
      {teacherStats.map((stat, index) => (
        <Grid item xs={12} sm={3} key={index}>
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

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Acciones Rápidas
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                component={RouterLink}
                to={action.path}
                variant="outlined"
                fullWidth
                startIcon={<action.icon />}
                sx={{ p: 2, height: '100%' }}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

// Componente principal del Dashboard
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (["professor", "instructor", "teachingAssistant"].includes(user.role)) {
        navigate("/teacher/dashboard");
      }
      if (["support", "supportll", "supportManager"].includes(user.role)) {
        navigate("/support/dashboard");
      }
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const renderDashboardByRole = () => {
    const role = user.role as Role;
    
    switch (role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'mentor':
      case 'seniorMentor':
      case 'juniorMentor':
        return <MentorDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'founder':
      case 'owner':
        return <FounderDashboard user={user} />;
      case 'cto':
      case 'seniorDev':
      case 'juniorDev':
      case 'devOps':
        return <TechnicalDashboard user={user} />;
      case 'moderator':
      case 'helper':
        return <ModeratorDashboard user={user} />;
      case 'marketing':
      case 'accounting':
      case 'designer':
        return <SpecializedDashboard user={user} />;
      case 'professor':
      case 'instructor':
      case 'teachingAssistant':
        return <TeacherDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
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