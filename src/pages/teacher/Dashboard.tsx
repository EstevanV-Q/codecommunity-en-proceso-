import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import type { TeacherDashboard as TeacherDashboardType } from '../../types/teacher';
import StudentManagement from './StudentManagement';

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  date: string;
  status: string;
  studentName?: string;
}

interface TeacherDashboard {
  courses: Array<{
    id: string;
    title: string;
    students: number;
    status: string;
  }>;
  earnings: {
    total: number;
    monthly: number;
    pending: number;
  };
  students: {
    total: number;
    active: number;
    new: number;
  };
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      studentQuestions: boolean;
      courseUpdates: boolean;
      paymentNotifications: boolean;
    };
    availability: {
      timeZone: string;
      workingHours: {
        start: string;
        end: string;
      };
      days: string[];
    };
    communication: {
      preferredLanguage: string;
      responseTime: string;
    };
  };
  recentActivity: RecentActivity[];
}

const TeacherDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<TeacherDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses'>('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData: TeacherDashboard = {
          courses: [
            {
              id: '1',
              title: 'Introducción a React',
              students: 150,
              status: 'active'
            },
            {
              id: '2',
              title: 'Machine Learning',
              students: 200,
              status: 'active'
            }
          ],
          earnings: {
            total: 1500,
            monthly: 150,
            pending: 500
          },
          students: {
            total: 1000,
            active: 800,
            new: 200
          },
          preferences: {
            notifications: {
              email: true,
              push: true,
              studentQuestions: true,
              courseUpdates: true,
              paymentNotifications: true
            },
            availability: {
              timeZone: 'UTC-5',
              workingHours: {
                start: '09:00',
                end: '18:00'
              },
              days: ['Lunes', 'Miércoles', 'Viernes']
            },
            communication: {
              preferredLanguage: 'es',
              responseTime: '24h'
            }
          },
          recentActivity: [
            {
              id: '1',
              type: 'course',
              title: 'Introducción a React',
              date: new Date().toISOString(),
              status: 'completed',
              studentName: 'Juan Pérez'
            },
            {
              id: '2',
              type: 'course',
              title: 'Machine Learning',
              date: new Date().toISOString(),
              status: 'in progress',
              studentName: 'María Gómez'
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

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'courses':
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Gestión de Cursos
            </Typography>
            {/* TODO: Implementar gestión de cursos */}
          </Paper>
        );
      default:
        return (
          <Grid container spacing={3}>
            {/* Resumen */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total de Estudiantes
                  </Typography>
                  <Typography variant="h3">
                    {dashboardData?.students.total}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setActiveTab('students')}>
                    Ver Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Cursos Activos
                  </Typography>
                  <Typography variant="h3">
                    {dashboardData?.courses.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setActiveTab('courses')}>
                    Ver Cursos
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tareas Pendientes
                  </Typography>
                  <Typography variant="h3">
                    {dashboardData?.courses.filter(course => course.status === 'pending').length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Ver Tareas</Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Actividad Reciente */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Actividad Reciente
                </Typography>
                {dashboardData?.recentActivity.map((activity: RecentActivity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{activity.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.studentName && `${activity.studentName} - `}
                        {new Date(activity.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color={
                        activity.status === 'completed'
                          ? 'success.main'
                          : 'warning.main'
                      }
                    >
                      {activity.status}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel del Profesor
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant={activeTab === 'overview' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('overview')}
          sx={{ mr: 2 }}
        >
          Resumen
        </Button>
        <Button
          variant={activeTab === 'students' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('students')}
          sx={{ mr: 2 }}
        >
          Estudiantes
        </Button>
        <Button
          variant={activeTab === 'courses' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('courses')}
        >
          Cursos
        </Button>
      </Box>

      {renderContent()}
    </Container>
  );
};

export default TeacherDashboardPage; 