import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Button,
  Box,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Language as LanguageIcon,
  Devices as DevicesIcon,
  Security as SecurityIcon,
  SmartToy as SmartToyIcon
} from '@mui/icons-material';

// Datos de ejemplo de tutoriales
const tutorialCategories = [
  {
    id: 'web',
    title: 'Desarrollo Web',
    icon: <LanguageIcon />,
    description: 'Aprende a desarrollar aplicaciones web modernas con las tecnologías más demandadas.',
    tutorials: [
      {
        id: 'react-basics',
        title: 'Fundamentos de React',
        level: 'Principiante',
        duration: '3 horas',
        image: 'https://via.placeholder.com/300x150?text=React',
        description: 'Aprende los conceptos básicos de React, desde componentes hasta estado y props.'
      },
      {
        id: 'typescript-intro',
        title: 'Introducción a TypeScript',
        level: 'Intermedio',
        duration: '2.5 horas',
        image: 'https://via.placeholder.com/300x150?text=TypeScript',
        description: 'Mejora tus habilidades de JavaScript con tipado estático usando TypeScript.'
      },
      {
        id: 'nodejs-api',
        title: 'Creando APIs con Node.js',
        level: 'Intermedio',
        duration: '4 horas',
        image: 'https://via.placeholder.com/300x150?text=Node.js',
        description: 'Aprende a construir APIs RESTful con Node.js, Express y MongoDB.'
      }
    ]
  },
  {
    id: 'data',
    title: 'Ciencia de Datos',
    icon: <StorageIcon />,
    description: 'Explora el mundo del análisis de datos, machine learning e inteligencia artificial.',
    tutorials: [
      {
        id: 'python-datascience',
        title: 'Python para Ciencia de Datos',
        level: 'Principiante',
        duration: '5 horas',
        image: 'https://via.placeholder.com/300x150?text=Python',
        description: 'Domina las bibliotecas esenciales: NumPy, Pandas y Matplotlib.'
      },
      {
        id: 'ml-basics',
        title: 'Fundamentos de Machine Learning',
        level: 'Intermedio',
        duration: '6 horas',
        image: 'https://via.placeholder.com/300x150?text=ML',
        description: 'Comprende los algoritmos básicos de machine learning y cómo implementarlos.'
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Desarrollo Móvil',
    icon: <DevicesIcon />,
    description: 'Crea aplicaciones móviles para iOS y Android con frameworks modernos.',
    tutorials: [
      {
        id: 'react-native-intro',
        title: 'Introducción a React Native',
        level: 'Intermedio',
        duration: '4 horas',
        image: 'https://via.placeholder.com/300x150?text=React+Native',
        description: 'Aprende a construir aplicaciones móviles multiplataforma con React Native.'
      }
    ]
  },
  {
    id: 'ai',
    title: 'Inteligencia Artificial',
    icon: <SmartToyIcon />,
    description: 'Sumérgete en el fascinante mundo de la inteligencia artificial y sus aplicaciones.',
    tutorials: [
      {
        id: 'gpt-basics',
        title: 'Introducción a GPT y LLMs',
        level: 'Avanzado',
        duration: '3 horas',
        image: 'https://via.placeholder.com/300x150?text=GPT',
        description: 'Comprende cómo funcionan los modelos de lenguaje y cómo utilizarlos en tus proyectos.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Ciberseguridad',
    icon: <SecurityIcon />,
    description: 'Aprende a proteger tus aplicaciones y datos contra amenazas cibernéticas.',
    tutorials: [
      {
        id: 'web-security',
        title: 'Seguridad en Aplicaciones Web',
        level: 'Intermedio',
        duration: '3.5 horas',
        image: 'https://via.placeholder.com/300x150?text=Security',
        description: 'Protege tus aplicaciones web contra vulnerabilidades comunes como XSS y CSRF.'
      }
    ]
  }
];

const Tutorials = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tutoriales
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Explora nuestra colección de tutoriales para mejorar tus habilidades de programación y desarrollo. Desde conceptos básicos hasta técnicas avanzadas, tenemos recursos para todos los niveles.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          ¿Por dónde empezar?
        </Typography>
        <Typography variant="body1">
          Si eres nuevo en programación, te recomendamos comenzar con nuestros tutoriales de "Fundamentos de Programación" y luego avanzar hacia tecnologías específicas según tus intereses.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} href="/courses/programming-fundamentals">
          Curso de Fundamentos
        </Button>
      </Paper>
      
      {tutorialCategories.map((category) => (
        <Box key={category.id} sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {category.icon}
            <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
              {category.title}
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            {category.description}
          </Typography>
          
          <Grid container spacing={3}>
            {category.tutorials.map((tutorial) => (
              <Grid item xs={12} sm={6} md={4} key={tutorial.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea href={`/tutorials/${category.id}/${tutorial.id}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={tutorial.image}
                      alt={tutorial.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {tutorial.title}
                      </Typography>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <Chip 
                          label={tutorial.level} 
                          size="small" 
                          sx={{ mr: 1 }} 
                          color={
                            tutorial.level === 'Principiante' ? 'success' : 
                            tutorial.level === 'Intermedio' ? 'primary' : 
                            'secondary'
                          }
                        />
                        <Chip 
                          label={tutorial.duration} 
                          size="small" 
                          variant="outlined" 
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {tutorial.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      
      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h5" component="h2" gutterBottom>
        Recursos Destacados
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Ruta de Aprendizaje: Desarrollador Full Stack
            </Typography>
            <Typography variant="body2" paragraph>
              Sigue esta ruta paso a paso para convertirte en un desarrollador full stack competente:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="HTML, CSS y JavaScript básico" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="React y gestión de estado" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Node.js y Express" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Bases de datos SQL y NoSQL" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Herramientas de desarrollo y DevOps" />
              </ListItem>
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }} href="/learning-paths/full-stack">
              Ver Ruta Completa
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Webinars y Eventos
            </Typography>
            <Typography variant="body2" paragraph>
              Participa en nuestros próximos eventos en vivo con expertos de la industria:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Desarrollo de Microservicios con Docker y Kubernetes" 
                  secondary="25 de Marzo, 18:00 - Carlos Martínez, Sr. DevOps Engineer" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Mejores Prácticas en React en 2023" 
                  secondary="3 de Abril, 19:00 - Ana Rodríguez, Frontend Lead Developer" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Inteligencia Artificial para Desarrolladores" 
                  secondary="15 de Abril, 17:30 - Dr. Juan López, AI Research Engineer" 
                />
              </ListItem>
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }} href="/events">
              Ver Todos los Eventos
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tutorials; 