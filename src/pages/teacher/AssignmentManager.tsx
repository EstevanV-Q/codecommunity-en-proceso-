import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AssignmentManager: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Tareas
        </Typography>
        <Typography variant="body1">
          Crea y gestiona las tareas y proyectos para tus cursos.
        </Typography>
      </Box>
    </Container>
  );
};

export default AssignmentManager; 