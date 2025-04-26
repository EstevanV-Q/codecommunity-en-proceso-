import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalUsers: 1250,
    activeCourses: 45,
    totalRevenue: 25000,
    platformHealth: 'excellent',
  });

  const adminStats = [
    { title: 'Usuarios Totales', value: metrics.totalUsers, icon: PeopleIcon },
    { title: 'Cursos Activos', value: metrics.activeCourses, icon: SchoolIcon },
    { title: 'Ingresos Totales', value: `$${metrics.totalRevenue}`, icon: PaymentIcon },
    { title: 'Estado Plataforma', value: metrics.platformHealth, icon: SecurityIcon },
  ];

  const quickActions = [
    { title: 'Gestión de Usuarios', icon: PeopleIcon, path: '/admin/users' },
    { title: 'Gestión de Cursos', icon: SchoolIcon, path: '/admin/courses' },
    { title: 'Analíticas', icon: AnalyticsIcon, path: '/admin/analytics' },
    { title: 'Configuración', icon: SettingsIcon, path: '/admin/settings' },
    { title: 'Anuncios', icon: AnnouncementIcon, path: '/admin/announcements' },
    { title: 'Pagos', icon: PaymentIcon, path: '/admin/payments' },
  ];

  const recentActivities = [
    { id: 1, type: 'user', description: 'Nuevo usuario registrado', time: '5 min ago' },
    { id: 2, type: 'course', description: 'Curso actualizado', time: '15 min ago' },
    { id: 3, type: 'payment', description: 'Nuevo pago procesado', time: '30 min ago' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Administración
        </Typography>
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: '50%', mr: 2 }}>
                    <stat.icon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" color="textSecondary">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Acciones Rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Acciones Rápidas
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<action.icon />}
                  onClick={() => navigate(action.path)}
                  sx={{ p: 2, height: '100%' }}
                >
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Actividad Reciente */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Actividad Reciente
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.type === 'user' && <PeopleIcon color="primary" />}
                      {activity.type === 'course' && <SchoolIcon color="primary" />}
                      {activity.type === 'payment' && <PaymentIcon color="primary" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.description}
                      secondary={activity.time}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Estado del Sistema */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Estado del Sistema
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Uptime"
                  secondary={
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <LinearProgress variant="determinate" value={99.9} />
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        99.9% en los últimos 30 días
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Rendimiento"
                  secondary={
                    <Box sx={{ width: '100%', mt: 1 }}>
                      <LinearProgress variant="determinate" value={95} />
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Excelente
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 