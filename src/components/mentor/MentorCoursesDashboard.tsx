import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MentorCourse {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  students: number;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
}

const MentorCoursesDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<MentorCourse[]>([]);

  useEffect(() => {
    // Aquí irá la lógica para cargar los cursos del mentor actual
    const fetchMentorCourses = async () => {
      // Simulación de datos
      const mockCourses: MentorCourse[] = [
        {
          id: '1',
          title: 'Introducción a React',
          level: 'beginner',
          students: 15,
          status: 'active',
          lastUpdated: new Date().toISOString()
        },
        // ... más cursos mock
      ];
      setCourses(mockCourses);
    };

    fetchMentorCourses();
  }, [user?.id]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Mis Cursos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/mentor/courses/new')}
        >
          Crear Curso
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total de Cursos</Typography>
              </Box>
              <Typography variant="h3">{courses.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Puedes agregar más cards con estadísticas */}
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Estudiantes</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Última Actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  <Chip
                    label={course.level}
                    color={getLevelColor(course.level) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>
                  <Chip
                    label={course.status}
                    color={course.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(course.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/mentor/courses/${course.id}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MentorCoursesDashboard; 