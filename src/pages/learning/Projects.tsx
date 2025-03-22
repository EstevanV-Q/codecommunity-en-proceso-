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
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo para proyectos
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con carrito de compras, pagos y panel de administración.',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Web Development',
    progress: 75,
    collaborators: 4,
    github: 'https://github.com/example/ecommerce',
    website: 'https://example-ecommerce.com',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con características colaborativas y tiempo real.',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['Vue.js', 'Firebase', 'TypeScript'],
    category: 'Productivity',
    progress: 90,
    collaborators: 3,
    github: 'https://github.com/example/task-app',
    website: 'https://example-tasks.com',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Social Media Dashboard',
    description: 'Panel de control para análisis de redes sociales con visualización de datos.',
    image: 'https://via.placeholder.com/300x200',
    technologies: ['Angular', 'D3.js', 'Express'],
    category: 'Analytics',
    progress: 60,
    collaborators: 2,
    github: 'https://github.com/example/social-dashboard',
    status: 'In Progress',
  },
];

// Categorías disponibles
const categories = [
  'All',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Productivity',
  'Analytics',
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Proyectos
      </Typography>

      {/* Encabezado y Filtros */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar proyectos..."
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
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => navigate('/projects/new')}
            >
              Nuevo Proyecto
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Lista de Proyectos */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progreso
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {project.progress}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {project.collaborators} colaboradores
                </Typography>
              </CardContent>
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    {project.github && (
                      <IconButton
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <GitHubIcon />
                      </IconButton>
                    )}
                    {project.website && (
                      <IconButton
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <WebsiteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron proyectos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta ajustar los filtros de búsqueda o crea un nuevo proyecto
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() => navigate('/projects/new')}
          >
            Crear Nuevo Proyecto
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Projects; 