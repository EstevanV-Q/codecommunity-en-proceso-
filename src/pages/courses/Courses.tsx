import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CourseListCard from '../../components/courses/CourseListCard';
import { Course } from '../../types/course';
import { SelectChangeEvent } from '@mui/material/Select';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<Course['level']>('beginner');
  const [page, setPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockData: Course[] = [
          {
            id: '1',
            title: 'Curso de React',
            description: 'Aprende React desde cero',
            instructor: {
              name: 'Juan Pérez',
              avatar: '',
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
            thumbnail: '/images/react-course.jpg'
          },
          {
            id: '2',
            title: 'Machine Learning',
            description: 'Curso avanzado de Machine Learning',
            instructor: {
              name: 'Dr. Ana Martínez',
              avatar: '',
            },
            duration: 120,
            level: 'advanced',
            rating: 4.8,
            totalStudents: 200,
            category: 'Data Science',
            courseType: 'live',
            hasSpecificStartDate: true,
            startDate: '2024-02-15',
            price: 99.99,
            mentor: 'Dr. Ana Martínez',
            enrolledStudents: 180,
            isPublished: true,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20',
            status: 'published',
            technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
            requirements: ['Python intermedio', 'Álgebra lineal'],
            thumbnail: '/images/ml-course.jpg'
          },
          {
            id: '3',
            title: 'Introducción a la Programación',
            description: 'Curso básico de programación',
            instructor: {
              name: 'Prof. Carlos López',
              avatar: '',
            },
            duration: 60,
            level: 'beginner',
            rating: 4.7,
            totalStudents: 180,
            category: 'Programación',
            courseType: 'recorded',
            hasSpecificStartDate: false,
            startDate: '2024-03-01',
            price: 49.99,
            mentor: 'Prof. Carlos López',
            enrolledStudents: 160,
            isPublished: true,
            createdAt: '2024-02-01',
            updatedAt: '2024-02-15',
            status: 'published',
            technologies: ['Python', 'JavaScript'],
            requirements: ['Ninguno'],
            thumbnail: '/images/intro-course.jpg'
          },
        ];
        setCourses(mockData);
      } catch (err) {
        setError('Error al cargar los cursos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as Course['level']);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || course.category === category;
    const matchesLevel = !level || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const categories = ['Frontend', 'Backend', 'Data Science'];
  const levels = ['beginner', 'intermediate', 'advanced'];

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
      <Typography variant="h4" component="h1" gutterBottom>
        Cursos Disponibles
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Buscar cursos"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={category}
                label="Categoría"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Nivel</InputLabel>
              <Select
                value={level}
                label="Nivel"
                onChange={handleLevelChange}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="beginner">Principiante</MenuItem>
                <MenuItem value="intermediate">Intermedio</MenuItem>
                <MenuItem value="advanced">Avanzado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {currentCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseListCard
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              duration={course.duration}
              level={course.level}
              rating={course.rating}
              totalStudents={course.totalStudents}
              thumbnail={course.thumbnail}
              onClick={() => navigate(`/course/${course.id}`)}
            />
          </Grid>
        ))}
      </Grid>

      {filteredCourses.length > coursesPerPage && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredCourses.length / coursesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Courses; 