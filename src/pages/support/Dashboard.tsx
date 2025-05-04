import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const SupportDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Soporte
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Bienvenido, {user?.displayName}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Estadísticas rápidas */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tickets Abiertos
            </Typography>
            <Typography component="p" variant="h4">
              12
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tickets Resueltos
            </Typography>
            <Typography component="p" variant="h4">
              45
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tiempo Promedio
            </Typography>
            <Typography component="p" variant="h4">
              2h 30m
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Satisfacción
            </Typography>
            <Typography component="p" variant="h4">
              92%
            </Typography>
          </Paper>
        </Grid>

        {/* Lista de tickets recientes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tickets Recientes
            </Typography>
            {/* Aquí iría la lista de tickets */}
            <Typography variant="body1" color="text.secondary">
              No hay tickets recientes
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SupportDashboard; 