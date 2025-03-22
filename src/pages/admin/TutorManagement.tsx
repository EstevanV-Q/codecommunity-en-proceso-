import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, School as SchoolIcon } from '@mui/icons-material';
import TutorManagementPanel from '../../components/admin/TutorManagementPanel';

const TutorManagement = () => {
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
            <SchoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Gestión de Tutores
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Tutores
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          Desde aquí puedes gestionar los tutores de la plataforma, incluyendo su información, 
          especializaciones, disponibilidad y asignaciones de estudiantes.
        </Typography>
      </Paper>
      
      <TutorManagementPanel />
    </Container>
  );
};

export default TutorManagement; 