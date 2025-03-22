import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Group as GroupIcon,
  Forum as ForumIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Community: React.FC = () => {
  const communityFeatures = [
    {
      title: 'Grupos de Estudio',
      description: 'Únete a grupos de estudio específicos por tecnología o tema',
      icon: <GroupIcon fontSize="large" />,
      action: 'Explorar Grupos',
    },
    {
      title: 'Foros de Discusión',
      description: 'Participa en discusiones técnicas y comparte conocimientos',
      icon: <ForumIcon fontSize="large" />,
      action: 'Ver Foros',
    },
    {
      title: 'Eventos',
      description: 'Asiste a webinars, workshops y encuentros de la comunidad',
      icon: <EventIcon fontSize="large" />,
      action: 'Ver Calendario',
    },
  ];

  const activeCommunities = [
    {
      name: 'React Developers',
      members: 1250,
      topics: ['Frontend', 'React', 'JavaScript'],
      avatar: '/images/react-community.jpg',
    },
    {
      name: 'Python Enthusiasts',
      members: 980,
      topics: ['Python', 'Data Science', 'Machine Learning'],
      avatar: '/images/python-community.jpg',
    },
    {
      name: 'DevOps Masters',
      members: 750,
      topics: ['Docker', 'Kubernetes', 'CI/CD'],
      avatar: '/images/devops-community.jpg',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Nuestra Comunidad
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
          Únete a una comunidad activa de desarrolladores y expertos
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {communityFeatures.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="large" variant="outlined">
                    {feature.action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Comunidades Activas
        </Typography>
        <Grid container spacing={4}>
          {activeCommunities.map((community) => (
            <Grid item xs={12} md={4} key={community.name}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={community.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {community.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {community.members} miembros
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {community.topics.map((topic) => (
                      <Chip
                        key={topic}
                        label={topic}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" fullWidth variant="contained">
                    Unirse
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Community; 