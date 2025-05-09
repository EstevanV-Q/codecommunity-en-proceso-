import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Divider, 
  Card, 
  CardContent, 
  CardActions, 
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  People as PeopleIcon, 
  Forum as ForumIcon, 
  Event as EventIcon, 
  QuestionAnswer as QuestionAnswerIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { useAuth } from '../../context/AuthContext'; // Import AuthContext

const Community = () => {
  const theme = useTheme(); // Use the theme hook
  const { user } = useAuth(); // Get the current user

  // Datos de ejemplo para mostrar en la página
  const featuredTopics = [
    { id: '1', title: 'Guía para principiantes en React', author: 'Carlos Martínez', replies: 24, views: 352 },
    { id: '2', title: 'Mejores prácticas en Node.js', author: 'Ana García', replies: 18, views: 245 },
    { id: '3', title: 'Consejos para mejorar el rendimiento en aplicaciones web', author: 'Miguel López', replies: 31, views: 420 },
  ];
  
  const upcomingEvents = [
    { id: '1', title: 'Hackathon de Verano', date: '15 de Junio, 2023', participants: 42 },
    { id: '2', title: 'Workshop: Introducción a TypeScript', date: '22 de Junio, 2023', participants: 25 },
  ];
  
  const topContributors = [
    { id: '1', name: 'Laura Fernández', points: 1250, avatar: 'L' },
    { id: '2', name: 'David Rodríguez', points: 980, avatar: 'D' },
    { id: '3', name: 'Marta González', points: 820, avatar: 'M' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 4, 
          height: 'auto',
          background: theme.palette.mode === 'light' 
        ? 'linear-gradient(to right, rgb(1, 62, 122), rgb(6, 97, 189))' 
        : 'linear-gradient(to right, rgb(152, 207, 255), rgb(68, 169, 252))',
          color: 'white',
          boxShadow: 1, 
          textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
        }}
      >
        <Typography 
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
        fontWeight: 'bold',
        animation: 'bounce 3s infinite',
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fontSize: { xs: '1.8rem', md: '2.125rem' }, // Adjust font size for mobile
          }}
        >
          Comunidad
        </Typography>
        <Typography 
          variant="body1" 
          color="white" 
          sx={{ mt: -2, fontSize: { xs: '0.9rem', md: '1rem' } }} // Adjust font size for mobile
        >
          Conecta con otros desarrolladores, participa en discusiones, eventos y mucho más.
        </Typography>
        {['founder', 'owner', 'admin', 'moderator'].includes(user?.role || '') && ( // Show only for admins
          <Box 
        sx={{ 
          mt: 2, // Adjust spacing for mobile
          display: 'flex', 
          justifyContent: { xs: 'center', md: 'flex-start' }, // Center button on mobile
        }}
          >
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/community-management"
          sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', md: '1rem' } }} // Adjust button font size for mobile
        >
          Ir al Panel de Gestión
        </Button>
          </Box>
        )}
      </Box>
      
      {/* Sección de bienvenida y estadísticas */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              ¡Bienvenido a nuestra comunidad!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Forma parte de una red global de desarrolladores apasionados por la tecnología y el aprendizaje continuo.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              component={RouterLink} 
              to="/forum"
              sx={{ fontWeight: 'bold' }}
            >
              Explorar el Foro
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold">2.4K</Typography>
                <Typography variant="body2">Miembros</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold">850+</Typography>
                <Typography variant="body2">Temas</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold">12K</Typography>
                <Typography variant="body2">Mensajes</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Secciones principales */}
      <Grid container spacing={3}>
        {/* Sección izquierda */}
        <Grid item xs={12} md={8}>
          {/* Temas destacados */}
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ForumIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Temas Destacados</Typography>
              </Box>
              <Button 
                endIcon={<ArrowForwardIcon />} 
                component={RouterLink} 
                to="/forum"
                color="primary"
              >
                Ver todos
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {featuredTopics.map((topic) => (
                <React.Fragment key={topic.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ 
                      px: 2, 
                      borderRadius: 1,
                      '&:hover': { 
                        backgroundColor: 'action.hover' 
                      } 
                    }}
                    component={RouterLink}
                    to={`/forum/topic/${topic.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText
                      primary={topic.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            por {topic.author}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {topic.replies} respuestas
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {topic.views} vistas
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                component={RouterLink} 
                to="/forum/new"
                startIcon={<QuestionAnswerIcon />}
              >
                Crear Nuevo Tema
              </Button>
            </Box>
          </Paper>
          
          {/* Próximos eventos */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Próximos Eventos</Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} key={event.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {event.date}
                      </Typography>
                      <Chip 
                        label={`${event.participants} participantes`} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Ver Detalles
                      </Button>
                      <Button size="small" color="secondary">
                        Participar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                component={RouterLink} 
                to="/events"
              >
                Ver Todos los Eventos
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Sección derecha */}
        <Grid item xs={12} md={4}>
          {/* Top contribuidores */}
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Top Contribuidores</Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {topContributors.map((contributor, index) => (
                <ListItem key={contributor.id}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `primary.${index === 0 ? 'main' : index === 1 ? 'dark' : 'light'}` }}>
                      {contributor.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={contributor.name} 
                    secondary={`${contributor.points} puntos`} 
                  />
                  {index === 0 && (
                    <Chip label="🏆 Líder" size="small" color="primary" />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
          
          {/* Enlaces útiles */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Enlaces Útiles
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <List sx={{ p: 0 }}>
              <ListItem component={RouterLink} to="/help" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Centro de Ayuda" />
              </ListItem>
              <ListItem component={RouterLink} to="/community-guidelines" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Normas de la Comunidad" />
              </ListItem>
              <ListItem component={RouterLink} to="/faq" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Preguntas Frecuentes" />
              </ListItem>
              <ListItem component={RouterLink} to="/contact" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary="Contactar con Soporte" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Community;