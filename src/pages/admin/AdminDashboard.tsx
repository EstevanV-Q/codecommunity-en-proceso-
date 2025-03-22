import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Divider 
} from '@mui/material';
import DashboardCards from '../../components/admin/DashboardCards';
import { 
  TrendingUp as TrendingUpIcon,
  PeopleAlt as PeopleAltIcon,
  Assignment as AssignmentIcon,
  SupervisorAccount as SupervisorAccountIcon
} from '@mui/icons-material';

// Componente para mostrar una estadística simple
const StatItem = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Box
      sx={{
        backgroundColor: `${color}20`,
        color: color,
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Box>
);

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Panel de Administración
      </Typography>

      {/* Sección de resumen */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Resumen General
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StatItem 
              icon={<PeopleAltIcon />} 
              title="Usuarios Totales" 
              value="1,250" 
              color="#EC407A" 
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatItem 
              icon={<AssignmentIcon />} 
              title="Cursos Activos" 
              value="24" 
              color="#42A5F5" 
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatItem 
              icon={<SupervisorAccountIcon />} 
              title="Mentores" 
              value="15" 
              color="#66BB6A" 
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatItem 
              icon={<TrendingUpIcon />} 
              title="Crecimiento Mensual" 
              value="+12.5%" 
              color="#FFA726" 
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Sección de Tarjetas de Acciones */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Acciones Rápidas
      </Typography>
      
      <DashboardCards />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Bienvenido al Panel de Administración. Desde aquí puedes gestionar todos los aspectos de la plataforma.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 