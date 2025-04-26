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
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  ShowChart as ShowChartIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FounderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalRevenue: 500000,
    activeUsers: 2500,
    growthRate: 45,
    platformHealth: 'excellent',
  });

  const founderStats = [
    { title: 'Ingresos Totales', value: `$${metrics.totalRevenue}`, icon: AccountBalanceIcon },
    { title: 'Usuarios Activos', value: metrics.activeUsers, icon: PeopleIcon },
    { title: 'Tasa de Crecimiento', value: `${metrics.growthRate}%`, icon: TrendingUpIcon },
    { title: 'Estado Plataforma', value: metrics.platformHealth, icon: SecurityIcon },
  ];

  const quickActions = [
    { title: 'Panel Ejecutivo', icon: BusinessIcon, path: '/founder/executive' },
    { title: 'Métricas Financieras', icon: AssessmentIcon, path: '/founder/financial' },
    { title: 'Gestión Organizacional', icon: PeopleIcon, path: '/founder/organization' },
    { title: 'Estrategia', icon: TimelineIcon, path: '/founder/strategy' },
    { title: 'Analíticas', icon: ShowChartIcon, path: '/founder/analytics' },
  ];

  const strategicInitiatives = [
    { id: 1, title: 'Expansión de Plataforma', status: 'en-progreso', priority: 'alta' },
    { id: 2, title: 'Entrada a Nuevos Mercados', status: 'planificación', priority: 'media' },
    { id: 3, title: 'Innovación de Producto', status: 'completado', priority: 'alta' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel Ejecutivo
        </Typography>
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {founderStats.map((stat, index) => (
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

      {/* Iniciativas Estratégicas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Iniciativas Estratégicas
            </Typography>
            <List>
              {strategicInitiatives.map((initiative) => (
                <React.Fragment key={initiative.id}>
                  <ListItem>
                    <ListItemText
                      primary={initiative.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={initiative.status}
                            color={
                              initiative.status === 'completado'
                                ? 'success'
                                : initiative.status === 'en-progreso'
                                ? 'warning'
                                : 'default'
                            }
                          />
                          <Chip
                            size="small"
                            label={initiative.priority}
                            color={initiative.priority === 'alta' ? 'error' : 'default'}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Estado del Sistema */}
        <Grid item xs={12} md={4}>
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

export default FounderDashboard; 