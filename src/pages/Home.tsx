import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a CodeCommunity
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Aprende, crece y conéctate con otros desarrolladores
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/courses')}
            sx={{ mr: 2 }}
          >
            Ver Cursos
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/community')}
          >
            Unirse a la Comunidad
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 