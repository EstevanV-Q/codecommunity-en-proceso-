import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Tipos
interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
}

// Datos de ejemplo
const mockThreads: ForumThread[] = [
  {
    id: '1',
    title: '¿Cómo implementar autenticación con JWT en React?',
    content: 'Estoy construyendo una aplicación React y necesito implementar autenticación usando JWT...',
    author: {
      id: '1',
      name: 'Ana García',
      avatar: '/avatars/ana.jpg'
    },
    category: 'Frontend',
    tags: ['React', 'JWT', 'Autenticación'],
    createdAt: '2024-03-15',
    likes: 24,
    comments: 12,
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Mejores prácticas para API REST con Node.js',
    content: 'Quiero compartir algunas mejores prácticas que he aprendido desarrollando APIs REST con Node.js...',
    author: {
      id: '2',
      name: 'Carlos Ruiz',
      avatar: '/avatars/carlos.jpg'
    },
    category: 'Backend',
    tags: ['Node.js', 'API REST', 'Express'],
    createdAt: '2024-03-14',
    likes: 45,
    comments: 18,
    isBookmarked: true
  },
  {
    id: '3',
    title: 'Guía de TypeScript para principiantes',
    content: 'Una guía completa para empezar con TypeScript desde cero...',
    author: {
      id: '3',
      name: 'Laura Martínez',
      avatar: '/avatars/laura.jpg'
    },
    category: 'Frontend',
    tags: ['TypeScript', 'JavaScript', 'Programación'],
    createdAt: '2024-03-13',
    likes: 67,
    comments: 25,
    isBookmarked: false
  }
];

const Forum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [threads, setThreads] = useState<ForumThread[]>(mockThreads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  // Categorías disponibles
  const categories = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Bases de Datos', 'UI/UX', 'Otros'];

  // Filtros disponibles
  const filters = [
    { value: 'recent', label: 'Más recientes' },
    { value: 'popular', label: 'Más populares' },
    { value: 'commented', label: 'Más comentados' }
  ];

  // Efecto para filtrar hilos
  useEffect(() => {
    let filtered = mockThreads;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(thread => thread.category === selectedCategory);
    }

    // Filtrar solo marcados
    if (bookmarkedOnly) {
      filtered = filtered.filter(thread => thread.isBookmarked);
    }

    // Ordenar según el filtro seleccionado
    switch (selectedFilter) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      case 'commented':
        filtered = [...filtered].sort((a, b) => b.comments - a.comments);
        break;
      default: // 'recent'
        filtered = [...filtered].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    setThreads(filtered);
  }, [searchTerm, selectedCategory, selectedFilter, bookmarkedOnly]);

  const handleBookmark = (threadId: string) => {
    setThreads(prevThreads =>
      prevThreads.map(thread =>
        thread.id === threadId
          ? { ...thread, isBookmarked: !thread.isBookmarked }
          : thread
      )
    );
  };

  const handleCreateThread = () => {
    navigate('/forum/new');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Foro
      </Typography>

      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Foro de Discusión
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comparte conocimientos y aprende de la comunidad
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateThread}
        >
          Nuevo Tema
        </Button>
      </Box>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Buscar en el foro"
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={selectedCategory}
                label="Categoría"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">Todas</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={selectedFilter}
                label="Ordenar por"
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map(filter => (
                  <MenuItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant={bookmarkedOnly ? "contained" : "outlined"}
              startIcon={bookmarkedOnly ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            >
              Guardados
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de hilos */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {threads.length > 0 ? (
            <Paper>
              <List>
                {threads.map((thread, index) => (
                  <React.Fragment key={thread.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      onClick={() => navigate(`/forum/thread/${thread.id}`)}
                    >
                      <ListItemAvatar>
                        <Avatar src={thread.author.avatar} alt={thread.author.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" component="div">
                              {thread.title}
                            </Typography>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(thread.id);
                              }}
                            >
                              {thread.isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                            </IconButton>
                          </Box>
                        }
                        secondary={
                          <>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.primary">
                                {thread.author.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {thread.createdAt}
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 1, mb: 1 }}>
                              {thread.tags.map(tag => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ThumbUpIcon fontSize="small" />
                                <Typography variant="body2">{thread.likes}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CommentIcon fontSize="small" />
                                <Typography variant="body2">{thread.comments}</Typography>
                              </Box>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    {index < threads.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No se encontraron discusiones
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Intenta ajustar los filtros o crea una nueva discusión
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={handleCreateThread}
              >
                Crear Nueva Discusión
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forum; 