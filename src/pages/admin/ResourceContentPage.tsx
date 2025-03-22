import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link, Button } from '@mui/material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import ResourceContentEditor from '../../components/admin/ResourceContentEditor';
import { Home as HomeIcon, MenuBook as MenuBookIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const ResourceContentPage = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              to="/admin"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Admin
            </Link>
            <Link
              component={RouterLink}
              to="/admin/resources"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Recursos
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              Editar Contenido
            </Typography>
          </Breadcrumbs>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/admin/resources"
          >
            Volver a Recursos
          </Button>
        </Box>
        
        <Typography variant="body1" paragraph color="text.secondary">
          Aquí puedes editar el contenido detallado del recurso. Agrega, modifica o elimina secciones según sea necesario.
        </Typography>
      </Paper>
      
      <ResourceContentEditor />
    </Container>
  );
};

export default ResourceContentPage; 