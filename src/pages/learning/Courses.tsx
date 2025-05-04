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
  instructor: {
    name: string;
    avatar: string;
  };
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  price: number;
  image: string;
  isBookmarked: boolean;
  courseType: 'recorded' | 'live';
  tags: string[];
  students: number;
  videos?: {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
  }[];
  liveClassroom?: {
    meetingLink: string;
    meetingId: string;
    meetingPassword: string;
    schedule: {
      date: string;
      startTime: string;
      endTime: string;
      topic: string;
    }[];
  };
}

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
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
=======
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Curso de React Avanzado',
      description: 'Aprende React desde cero hasta nivel avanzado con proyectos prácticos',
      instructor: {
        name: 'Juan Pérez',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      level: 'beginner',
      duration: '8 semanas',
      rating: 4.8,
      price: 49.99,
      image: 'https://source.unsplash.com/random/300x200?react',
      isBookmarked: false,
      courseType: 'recorded',
      tags: ['React', 'JavaScript', 'Frontend'],
      students: 150,
      videos: [
        {
          id: '1',
          title: 'Introducción a React',
          description: 'Conceptos básicos de React',
          duration: '15:30',
          videoUrl: 'https://example.com/video1'
        },
        {
          id: '2',
          title: 'Componentes y Props',
          description: 'Aprende sobre componentes y props en React',
          duration: '20:15',
          videoUrl: 'https://example.com/video2'
        }
      ]
    },
    {
      id: '2',
      title: 'Clase en Vivo: Desarrollo de APIs con Node.js',
      description: 'Únete a esta clase en vivo para aprender a crear APIs robustas con Node.js',
      instructor: {
        name: 'María García',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      level: 'intermediate',
      duration: '2 horas',
      rating: 4.9,
      price: 29.99,
      image: 'https://source.unsplash.com/random/300x200?nodejs',
      isBookmarked: true,
      courseType: 'live',
      tags: ['Node.js', 'Backend', 'API'],
      students: 30,
      liveClassroom: {
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        meetingId: 'abc-def-ghi',
        meetingPassword: '123456',
        schedule: [
          {
            date: '2024-03-20',
            startTime: '15:00',
            endTime: '17:00',
            topic: 'Introducción a APIs con Node.js'
          }
        ]
      }
    },
    {
      id: '3',
      title: 'Curso de TypeScript',
      description: 'Domina TypeScript y mejora tus proyectos de JavaScript',
      instructor: {
        name: 'Carlos López',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      level: 'intermediate',
      duration: '6 semanas',
      rating: 4.7,
      price: 39.99,
      image: 'https://source.unsplash.com/random/300x200?typescript',
      isBookmarked: false,
      courseType: 'recorded',
      tags: ['TypeScript', 'JavaScript', 'Frontend'],
      students: 200,
      videos: [
        {
          id: '1',
          title: 'Fundamentos de TypeScript',
          description: 'Conceptos básicos de TypeScript',
          duration: '18:45',
          videoUrl: 'https://example.com/video1'
        },
        {
          id: '2',
          title: 'Tipos Avanzados',
          description: 'Tipos avanzados en TypeScript',
          duration: '22:30',
          videoUrl: 'https://example.com/video2'
        }
      ]
>>>>>>> mejoras
    }
  ]);

  const handleBookmark = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isBookmarked: !course.isBookmarked }
        : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesType = filterType === 'all' || course.courseType === filterType;
    return matchesSearch && matchesLevel && matchesType;
  });

<<<<<<< HEAD
      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
=======
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cursos Disponibles
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
>>>>>>> mejoras
            <TextField
              fullWidth
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
<<<<<<< HEAD
          <Grid item xs={12} md={2}>
=======
          <Grid item xs={12} sm={6} md={4}>
>>>>>>> mejoras
            <FormControl fullWidth>
              <InputLabel>Nivel</InputLabel>
              <Select
                value={filterLevel}
                label="Nivel"
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <MenuItem value="all">Todos los niveles</MenuItem>
                <MenuItem value="beginner">Principiante</MenuItem>
                <MenuItem value="intermediate">Intermedio</MenuItem>
                <MenuItem value="advanced">Avanzado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={filterType}
                label="Tipo"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">Todos los tipos</MenuItem>
                <MenuItem value="recorded">Grabados</MenuItem>
                <MenuItem value="live">En vivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={selectedLevel}
                label="Tipo"
                onChange={handleLevelChange}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="video">Videos</MenuItem>
                <MenuItem value="live">En Vivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image}
                  alt={course.title}
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

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
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
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Ver Curso
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Courses;