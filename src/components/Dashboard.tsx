import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import { AdminRole, DashboardConfig } from '../types/dashboard';
import { DASHBOARD_CONFIGS } from '../config/dashboardConfig';

interface DashboardProps {
  user: {
    role: AdminRole;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const config = DASHBOARD_CONFIGS[user.role];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {config.features.map((feature) => (
            <Grid item xs={12} md={6} lg={4} key={feature.id}>
              {/* Renderizar el componente de la feature */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}; 