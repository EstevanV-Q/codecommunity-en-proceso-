import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ResourceManager from '../../components/admin/ResourceManager';
import { Home as HomeIcon, MenuBook as MenuBookIcon } from '@mui/icons-material';

const ResourcesManagement = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            component={RouterLink}
            to="/admin"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Admin
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Gestión de Recursos
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Recursos Adicionales
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          Desde aquí puedes crear, editar y eliminar los recursos adicionales que aparecen en la sección de Ayuda. 
          Estos recursos incluyen tutoriales, documentación, guías, preguntas frecuentes y políticas.
        </Typography>
      </Paper>
      
      <ResourceManager />
    </Container>
  );
};

export default ResourcesManagement; 