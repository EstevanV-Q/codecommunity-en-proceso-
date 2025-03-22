import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Avatar,
  CardActions,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    avatar: string;
  };
  level: string;
  duration: string;
  rating: number;
  students: number;
  price: number;
  isBookmarked: boolean;
  tags: string[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React desde Cero hasta Experto',
    description: 'Aprende React.js desde lo básico hasta conceptos avanzados con proyectos prácticos.',
    image: '/assets/courses/react.jpg',
    instructor: {
      name: 'Ana García',
      avatar: '/avatars/ana.jpg'
    },
    level: 'Intermedio',
    duration: '20 horas',
    rating: 4.8,
    students: 1500,
    price: 49.99,
    isBookmarked: false,
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'Node.js y Express: API REST',
    description: 'Construye APIs REST robustas con Node.js y Express desde cero.',
    image: '/assets/courses/node.jpg',
    instructor: {
      name: 'Carlos Ruiz',
      avatar: '/avatars/carlos.jpg'
    },
    level: 'Avanzado',
    duration: '25 horas',
    rating: 4.9,
    students: 1200,
    price: 59.99,
    isBookmarked: true,
    tags: ['Node.js', 'Express', 'Backend', 'API']
  },
  {
    id: '3',
    title: 'TypeScript Fundamentals',
    description: 'Domina TypeScript y mejora la calidad de tu código JavaScript.',
    image: '/assets/courses/typescript.jpg',
    instructor: {
      name: 'Laura Martínez',
      avatar: '/avatars/laura.jpg'
    },
    level: 'Principiante',
    duration: '15 horas',
    rating: 4.7,
    students: 800,
    price: 39.99,
    isBookmarked: false,
    tags: ['TypeScript', 'JavaScript', 'Programación']
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const levels = ['Principiante', 'Intermedio', 'Avanzado'];
  const priceRanges = [
    { value: 'free', label: 'Gratis' },
    { value: 'paid', label: 'De pago' },
    { value: 'all', label: 'Todos los precios' }
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterCourses(event.target.value, selectedLevel, selectedPrice);
  };

  const handleLevelChange = (event: any) => {
    setSelectedLevel(event.target.value);
    filterCourses(searchTerm, event.target.value, selectedPrice);
  };

  const handlePriceChange = (event: any) => {
    setSelectedPrice(event.target.value);
    filterCourses(searchTerm, selectedLevel, event.target.value);
  };

  const filterCourses = (search: string, level: string, price: string) => {
    let filtered = mockCourses;

    // Filtrar por búsqueda
    if (search) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filtrar por nivel
    if (level !== 'all') {
      filtered = filtered.filter(course => course.level === level);
    }

    // Filtrar por precio
    if (price === 'free') {
      filtered = filtered.filter(course => course.price === 0);
    } else if (price === 'paid') {
      filtered = filtered.filter(course => course.price > 0);
    }

    setCourses(filtered);
  };

  const handleBookmark = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, isBookmarked: !course.isBookmarked }
          : course
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cursos Disponibles
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Nivel</InputLabel>
              <Select
                value={selectedLevel}
                label="Nivel"
                onChange={handleLevelChange}
              >
                <MenuItem value="all">Todos los niveles</MenuItem>
                {levels.map(level => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Precio</InputLabel>
              <Select
                value={selectedPrice}
                label="Precio"
                onChange={handlePriceChange}
              >
                {priceRanges.map(range => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de cursos */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  <IconButton
                    onClick={() => handleBookmark(course.id)}
                    size="small"
                  >
                    {course.isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {course.instructor.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  {course.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.level}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={course.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({course.students})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${course.price}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Ver Curso
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {courses.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron cursos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta ajustar los filtros de búsqueda
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Courses; 