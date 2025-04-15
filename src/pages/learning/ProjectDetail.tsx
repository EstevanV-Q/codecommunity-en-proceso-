import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Button,
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Divider,
  Link,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos del proyecto
    const fetchProject = async () => {
      try {
        // Aquí normalmente harías una llamada a tu API
        // Por ahora usamos datos de ejemplo
        const mockProject = {
          id: projectId,
          title: 'E-commerce Platform',
          description: 'Plataforma de comercio electrónico con carrito de compras, pagos y panel de administración.',
          technologies: ['React', 'Node.js', 'MongoDB'],
          category: 'Web Development',
          progress: 75,
          collaborators: [
            { id: 1, name: 'John Doe', avatar: '/avatars/1.jpg' },
            { id: 2, name: 'Jane Smith', avatar: '/avatars/2.jpg' },
          ],
          github: 'https://github.com/example/ecommerce',
          website: 'https://example-ecommerce.com',
          status: 'In Progress',
          lastUpdate: new Date().toISOString(),
        };

        setProject(mockProject);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <LinearProgress />;
  }

  if (!project) {
    return (
      <Container>
        <Typography>Proyecto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ mb: 2 }}
        >
          Volver a Proyectos
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {project.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {project.technologies.map((tech: string) => (
                <Chip
                  key={tech}
                  label={tech}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Información del Proyecto
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Estado
                </Typography>
                <Chip
                  label={project.status}
                  color={project.status === 'Completed' ? 'success' : 'primary'}
                  sx={{ mt: 1 }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Enlaces
                </Typography>
                {project.github && (
                  <Link href={project.github} target="_blank" rel="noopener">
                    <IconButton>
                      <GitHubIcon />
                    </IconButton>
                  </Link>
                )}
                {project.website && (
                  <Link href={project.website} target="_blank" rel="noopener">
                    <IconButton>
                      <WebsiteIcon />
                    </IconButton>
                  </Link>
                )}
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Colaboradores
                </Typography>
                <AvatarGroup max={4}>
                  {project.collaborators.map((collaborator: any) => (
                    <Avatar
                      key={collaborator.id}
                      alt={collaborator.name}
                      src={collaborator.avatar}
                    />
                  ))}
                </AvatarGroup>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProjectDetail;