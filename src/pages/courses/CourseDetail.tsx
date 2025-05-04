import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Rating,
  Avatar,
  Chip,
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { CourseDetail as CourseDetailType } from '../../types/course';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-detail-tabpanel-${index}`}
      aria-labelledby={`course-detail-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData: CourseDetailType = {
          id: '1',
          title: 'Curso de React',
          description: 'Aprende React desde cero',
          instructor: {
            name: 'Juan Pérez',
            avatar: '',
            bio: 'Desarrollador senior con más de 10 años de experiencia.',
          },
          duration: 8,
          level: 'intermediate',
          rating: 4.5,
          totalStudents: 150,
          category: 'Frontend',
          courseType: 'recorded',
          hasSpecificStartDate: false,
          startDate: '2024-01-01',
          price: 99.99,
          mentor: 'Juan Pérez',
          enrolledStudents: 150,
          isPublished: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
          status: 'published',
          technologies: ['React', 'JavaScript', 'TypeScript'],
          requirements: ['JavaScript básico', 'HTML', 'CSS'],
          lessons: [
            {
              id: '1',
              title: 'Introducción a React',
              type: 'video',
              duration: '30 minutos',
              completed: false,
            },
            {
              id: '2',
              title: 'Componentes y Props',
              type: 'video',
              duration: '45 minutos',
              completed: false,
            },
            {
              id: '3',
              title: 'Estado y Ciclo de Vida',
              type: 'video',
              duration: '60 minutos',
              completed: false,
            },
          ],
          whatYouWillLearn: [
            'Fundamentos de React',
            'Componentes y Props',
            'Estado y Ciclo de Vida',
            'Hooks y Context',
            'Routing con React Router',
            'Manejo de formularios',
            'Consumo de APIs',
          ],
        };
        setCourse(mockData);
      } catch (err) {
        setError('Error al cargar los datos del curso');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStartCourse = () => {
    // TODO: Implementar lógica para iniciar el curso
    navigate(`/course/${courseId}/lesson/1`);
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

  if (!course) return <div>Curso no encontrado</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Información Principal */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {course.description}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Rating value={course.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              ({course.totalStudents} estudiantes)
            </Typography>
          </Box>

          <Box display="flex" gap={2} mb={3}>
            <Chip
              icon={<TimeIcon />}
              label={`${course.duration} semanas`}
              variant="outlined"
            />
            <Chip
              icon={<SchoolIcon />}
              label={course.level === 'beginner' ? 'Principiante' :
                     course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              variant="outlined"
            />
          </Box>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Contenido" />
              <Tab label="Requisitos" />
              <Tab label="Lo que aprenderás" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <List>
                {course.lessons.map((lesson) => (
                  <ListItem
                    key={lesson.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon>
                      {lesson.type === 'video' ? (
                        <PlayIcon color="primary" />
                      ) : (
                        <QuizIcon color="primary" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={lesson.title}
                      secondary={lesson.duration}
                    />
                    {lesson.completed && (
                      <Chip
                        label="Completado"
                        color="success"
                        size="small"
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <List>
                {course.requirements.map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AssignmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <List>
                {course.whatYouWillLearn.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar
                src={course.instructor.avatar}
                alt={course.instructor.name}
                sx={{ width: 64, height: 64 }}
              >
                {course.instructor.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{course.instructor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" paragraph>
              {course.instructor.bio}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleStartCourse}
            >
              Comenzar Curso
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailPage; 