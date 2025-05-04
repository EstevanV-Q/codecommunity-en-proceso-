import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const GradeBook: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Libro de Calificaciones
        </Typography>
        <Typography variant="body1">
          Administra las calificaciones y evaluaciones de tus estudiantes.
        </Typography>
      </Box>
    </Container>
  );
};

export default GradeBook; 