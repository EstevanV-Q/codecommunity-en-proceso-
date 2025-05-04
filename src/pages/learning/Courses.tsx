import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Chip,
  Rating,
  Avatar,
  SelectChangeEvent
} from '@mui/material';
import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon
} from '@mui/icons-material';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  price: number;
  duration: string;
  rating: number;
  students: number;
  tags: string[];
  isBookmarked: boolean;
  instructor: {
    name: string;
    avatar: string;
  };
  courseType: string;
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Curso de React Avanzado',
      description: 'Aprende React desde cero hasta nivel avanzado',
      image: '/images/course1.jpg',
      level: 'intermediate',
      price: 49.99,
      duration: '8 semanas',
      rating: 4.8,
      students: 1200,
      tags: ['React', 'JavaScript', 'Frontend'],
      isBookmarked: false,
      instructor: {
        name: 'Juan Pérez',
        avatar: '/images/instructor1.jpg'
      },
      courseType: 'recorded'
    },
    // ... más cursos
  ]);

  const handleBookmark = (courseId: string) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, isBookmarked: !course.isBookmarked }
        : course
    ));
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value);
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    setSelectedPrice(event.target.value);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.price === 0) ||
                        (selectedPrice === 'paid' && course.price > 0);
    return matchesSearch && matchesLevel && matchesPrice;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Nivel</InputLabel>
                <Select
                  value={selectedLevel}
                  label="Nivel"
                  onChange={handleLevelChange}
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
                <InputLabel>Precio</InputLabel>
                <Select
                  value={selectedPrice}
                  label="Precio"
                  onChange={handlePriceChange}
                >
                  <MenuItem value="all">Todos los precios</MenuItem>
                  <MenuItem value="free">Gratis</MenuItem>
                  <MenuItem value="paid">De pago</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

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