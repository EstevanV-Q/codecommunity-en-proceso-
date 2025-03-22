import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import {
  Announcement as AnnouncementIcon,
  Event as EventIcon,
  NewReleases as NewReleasesIcon,
} from '@mui/icons-material';

const Announcements: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: 'Nuevo Curso de React Native',
      content: 'Nos complace anunciar el lanzamiento de nuestro nuevo curso de React Native. ¡Aprende a crear aplicaciones móviles!',
      date: '2024-03-27',
      type: 'course',
      icon: <NewReleasesIcon />,
    },
    {
      id: 2,
      title: 'Webinar: Introducción a Docker',
      content: 'No te pierdas nuestro próximo webinar gratuito sobre Docker y contenedores. Regístrate ahora.',
      date: '2024-04-05',
      type: 'event',
      icon: <EventIcon />,
    },
    {
      id: 3,
      title: 'Actualización de la Plataforma',
      content: 'Hemos realizado mejoras significativas en nuestra plataforma de aprendizaje. Descubre las nuevas características.',
      date: '2024-03-25',
      type: 'update',
      icon: <AnnouncementIcon />,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'primary';
      case 'event':
        return 'warning';
      case 'update':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return 'Nuevo Curso';
      case 'event':
        return 'Evento';
      case 'update':
        return 'Actualización';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Anuncios
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Mantente al día con las últimas novedades y actualizaciones
        </Typography>

        <Grid container spacing={3}>
          {announcements.map((announcement) => (
            <Grid item xs={12} key={announcement.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {announcement.icon}
                    </Box>
                    <Typography variant="h6" component="h2">
                      {announcement.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {announcement.content}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={getTypeLabel(announcement.type)}
                      color={getTypeColor(announcement.type) as any}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(announcement.date)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Announcements; 