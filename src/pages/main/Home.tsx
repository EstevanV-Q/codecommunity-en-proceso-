import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import StorageDebugger from '../../components/debug/StorageDebugger';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Bienvenido{user ? `, ${user.displayName?.split(' ')[0] || ''}` : ''} a CodeCommunity
              </Typography>
              <Typography variant="h5" paragraph>
                Aprende, colabora y crece junto a otros desarrolladores. Únete a nuestra
                comunidad y lleva tus habilidades al siguiente nivel.
              </Typography>
              {!user && (
                <Stack direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Empezar ahora
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    color="inherit"
                    size="large"
                  >
                    Conoce más
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Aprende a tu ritmo
              </Typography>
              <Typography>
                Accede a cursos y recursos de alta calidad. Aprende las tecnologías
                más demandadas con proyectos prácticos y feedback en tiempo real.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Colabora en proyectos
              </Typography>
              <Typography>
                Únete a proyectos reales, trabaja en equipo y construye un portafolio
                sólido mientras aprendes de otros desarrolladores.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Crece profesionalmente
              </Typography>
              <Typography>
                Recibe mentoría, participa en discusiones técnicas y construye una
                red de contactos profesionales en el mundo del desarrollo.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Box textAlign="center" py={8}>
          <Typography variant="h4" gutterBottom>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="body1" paragraph>
            Únete a miles de desarrolladores que ya son parte de nuestra comunidad.
          </Typography>
          {!user && (
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
            >
              Crear cuenta gratis
            </Button>
          )}
        </Box>
      </Container>

      {/* Características principales */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/assets/images/courses.jpg"
                alt="Cursos interactivos"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Cursos Interactivos
                </Typography>
                <Typography>
                  Aprende con cursos prácticos diseñados por expertos. Ejercicios
                  interactivos y proyectos reales.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/assets/images/community.jpg"
                alt="Comunidad activa"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Comunidad Activa
                </Typography>
                <Typography>
                  Conecta con otros desarrolladores, comparte conocimientos y
                  resuelve dudas en nuestro foro.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="/assets/images/projects.jpg"
                alt="Proyectos colaborativos"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Proyectos Colaborativos
                </Typography>
                <Typography>
                  Participa en proyectos reales, construye tu portafolio y
                  desarrolla habilidades de trabajo en equipo.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Sección de estadísticas */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                1,000+
              </Typography>
              <Typography variant="h6">Estudiantes Activos</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                50+
              </Typography>
              <Typography variant="h6">Cursos Disponibles</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h3" color="primary" gutterBottom>
                100+
              </Typography>
              <Typography variant="h6">Proyectos Completados</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Agregar al final del contenido */}
      {process.env.NODE_ENV === 'development' && (
        <StorageDebugger />
      )}
    </Box>
  );
};

export default Home; 