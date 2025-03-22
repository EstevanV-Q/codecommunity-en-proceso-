import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  useTheme,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  percentage?: number;
}

interface Analytics {
  totalUsers: number;
  totalMentors: number;
  totalCourses: number;
  activeStudents: number;
  courseEnrollments: {
    courseName: string;
    students: number;
    percentage: number;
  }[];
  usersByRole: {
    role: string;
    count: number;
    percentage: number;
  }[];
  monthlyStats: {
    month: string;
    users: number;
    revenue: number;
  }[];
}

const Analytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Aquí iría la llamada a la API real
        const mockAnalytics: Analytics = {
          totalUsers: 1250,
          totalMentors: 45,
          totalCourses: 78,
          activeStudents: 890,
          courseEnrollments: [
            { courseName: 'React Avanzado', students: 245, percentage: 85 },
            { courseName: 'Node.js Básico', students: 180, percentage: 65 },
            { courseName: 'TypeScript', students: 165, percentage: 60 },
            { courseName: 'Python para IA', students: 150, percentage: 55 },
            { courseName: 'AWS Cloud', students: 120, percentage: 45 },
          ],
          usersByRole: [
            { role: 'Estudiantes', count: 1100, percentage: 95 },
            { role: 'Mentores', count: 45, percentage: 4 },
            { role: 'Administradores', count: 5, percentage: 1 },
          ],
          monthlyStats: [
            { month: 'Enero', users: 800, revenue: 15000 },
            { month: 'Febrero', users: 950, revenue: 18500 },
            { month: 'Marzo', users: 1100, revenue: 22000 },
            { month: 'Abril', users: 1250, revenue: 25000 },
          ],
        };
        setAnalytics(mockAnalytics);
      } catch (err) {
        setError('Error al cargar los datos analíticos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!analytics) {
    return null;
  }

  const statCards: StatCard[] = [
    {
      title: 'Usuarios Totales',
      value: analytics.totalUsers,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
      percentage: 71,
    },
    {
      title: 'Mentores',
      value: analytics.totalMentors,
      icon: <SchoolIcon />,
      color: theme.palette.success.main,
      percentage: 85,
    },
    {
      title: 'Cursos',
      value: analytics.totalCourses,
      icon: <MenuBookIcon />,
      color: theme.palette.warning.main,
      percentage: 62,
    },
    {
      title: 'Estudiantes Activos',
      value: analytics.activeStudents,
      icon: <TrendingUpIcon />,
      color: theme.palette.info.main,
      percentage: 89,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Panel de Análisis
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/courses/new')}
          color="primary"
        >
          Nuevo Curso
        </Button>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: `${card.color}20`,
                    color: card.color,
                    mr: 2,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography color="text.secondary" variant="subtitle1">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {card.value.toLocaleString()}
              </Typography>
              {card.percentage && (
                <Box sx={{ width: '100%', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progreso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={card.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: `${card.color}20`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: card.color,
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Inscripciones por curso */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Cursos por Inscripciones
            </Typography>
            <Box sx={{ mt: 2 }}>
              {analytics.courseEnrollments.map((course, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{course.courseName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.students} estudiantes
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={course.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: `${theme.palette.warning.main}20`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.warning.main,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Distribución de usuarios */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Distribución de Usuarios
            </Typography>
            <Box sx={{ mt: 2 }}>
              {analytics.usersByRole.map((role, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{role.role}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role.count} ({role.percentage}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={role.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: `${theme.palette.primary.main}20`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Estadísticas mensuales */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estadísticas Mensuales
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {analytics.monthlyStats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                          {stat.month}
                        </Typography>
                        <Typography variant="h6" component="div" gutterBottom>
                          {stat.users} usuarios
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ingresos: ${stat.revenue.toLocaleString()}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(stat.users / analytics.totalUsers) * 100}
                          sx={{
                            mt: 2,
                            height: 6,
                            borderRadius: 3,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 