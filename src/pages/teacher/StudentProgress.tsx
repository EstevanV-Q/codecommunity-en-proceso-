import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const StudentProgress: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Progreso de Estudiantes
        </Typography>
        <Typography variant="body1">
          Aquí podrás ver el progreso de tus estudiantes en cada curso.
        </Typography>
      </Box>
    </Container>
  );
};

export default StudentProgress; 