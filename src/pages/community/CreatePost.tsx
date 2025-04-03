import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PostFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  type: 'project' | 'forum' | 'community';
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Determinar el tipo de publicación basado en la URL
  const getPostType = () => {
    if (location.pathname.includes('projects')) return 'project';
    if (location.pathname.includes('forum')) return 'forum';
    return 'community';
  };

  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    tags: [],
    type: getPostType(),
  });

  const categories = {
    project: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'Data Science', 'Machine Learning'],
    forum: ['Preguntas', 'Discusión', 'Ayuda', 'Recursos', 'Consejos'],
    community: ['General', 'Eventos', 'Empleos', 'Networking', 'Proyectos'],
  };

  const suggestedTags = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
    'Angular', 'Vue.js', 'Docker', 'AWS', 'Git', 'MongoDB',
    'SQL', 'REST API', 'GraphQL', 'Testing', 'CI/CD',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para publicar');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Aquí iría la lógica para enviar los datos al backend
      console.log('Enviando datos:', formData);
      
      // Simular una llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => {
        navigate(`/${formData.type}s`);
      }, 1500);
    } catch (error) {
      setError('Error al crear la publicación. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (formData.type) {
      case 'project':
        return 'Nuevo Proyecto';
      case 'forum':
        return 'Nueva Discusión';
      case 'community':
        return 'Nueva Publicación';
      default:
        return 'Crear Contenido';
    }
  };

  const getContentPlaceholder = () => {
    switch (formData.type) {
      case 'project':
        return 'Describe tu proyecto, tecnologías utilizadas, objetivos, etc...';
      case 'forum':
        return 'Escribe tu pregunta o tema de discusión...';
      case 'community':
        return '¿Qué quieres compartir con la comunidad?';
      default:
        return 'Escribe tu contenido aquí...';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        sx={{ 
          p: 8,
          '& .MuiTypography-subtitle1': {
            fontSize: '1.2rem',
            color: 'primary.main',
          }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 8,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '2.5rem'
          }}
        >
          {getTitle()}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 8 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 8 }}>
            ¡Publicación creada exitosamente! Redirigiendo...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 8 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
              Información básica
            </Typography>
            
            <TextField
              fullWidth
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              sx={{ mt: 2 }}
            />
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
              Categorización
            </Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formData.category}
                label="Categoría"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        py: 2,
                        px: 3,
                        fontSize: '1rem',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                        '&:last-child': {
                          borderBottom: 'none'
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: 'primary.light'
                          }
                        }
                      }
                    }
                  }
                }}
              >
                {categories[formData.type].map((category) => (
                  <MenuItem 
                    key={category} 
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
              Etiquetas relevantes
            </Typography>

            <Autocomplete
              multiple
              options={suggestedTags}
              value={formData.tags}
              onChange={(_, newValue) => setFormData({ ...formData, tags: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Etiquetas"
                  placeholder="Añade etiquetas relevantes"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              sx={{ mt: 2 }}
            />
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ mb: 8 }}>
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
              Contenido detallado
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              label="Contenido"
              placeholder={getContentPlaceholder()}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={loading}
              size="large"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
              size="large"
            >
              {loading ? 'Publicando...' : 'Publicar'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost; 