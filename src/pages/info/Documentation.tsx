import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid,
  Box,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  TextField,
  InputAdornment,
  Link,
  Breadcrumbs
} from '@mui/material';
import {
  Code as CodeIcon,
  Search as SearchIcon,
  Description as DescriptionIcon,
  Api as ApiIcon,
  GitHub as GitHubIcon,
  Book as BookIcon,
  Build as BuildIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Estructura de la documentación
const docSections = [
  {
    id: 'getting-started',
    title: 'Primeros Pasos',
    icon: <DescriptionIcon />,
    subsections: [
      { id: 'introduction', title: 'Introducción' },
      { id: 'installation', title: 'Instalación' },
      { id: 'quick-start', title: 'Guía Rápida' },
      { id: 'architecture', title: 'Arquitectura' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <CodeIcon />,
    subsections: [
      { id: 'react-components', title: 'Componentes React' },
      { id: 'styling', title: 'Estilos y Temas' },
      { id: 'state-management', title: 'Gestión de Estado' },
      { id: 'routing', title: 'Enrutamiento' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <ApiIcon />,
    subsections: [
      { id: 'api-reference', title: 'Referencia de API' },
      { id: 'data-models', title: 'Modelos de Datos' },
      { id: 'authentication', title: 'Autenticación y Autorización' },
      { id: 'error-handling', title: 'Manejo de Errores' }
    ]
  },
  {
    id: 'integration',
    title: 'Integración',
    icon: <BuildIcon />,
    subsections: [
      { id: 'third-party', title: 'Servicios de Terceros' },
      { id: 'webhooks', title: 'Webhooks' },
      { id: 'oauth', title: 'OAuth y Single Sign-On' }
    ]
  },
  {
    id: 'advanced',
    title: 'Temas Avanzados',
    icon: <PsychologyIcon />,
    subsections: [
      { id: 'performance', title: 'Optimización de Rendimiento' },
      { id: 'security', title: 'Seguridad' },
      { id: 'scaling', title: 'Escalabilidad' },
      { id: 'testing', title: 'Pruebas' }
    ]
  }
];

// Contenido de ejemplo para la sección activa
const getActiveContent = (section: string, subsection: string) => {
  if (section === 'getting-started' && subsection === 'introduction') {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Introducción a CodeCommunity
        </Typography>
        
        <Typography variant="body1" paragraph>
          CodeCommunity es una plataforma diseñada para desarrolladores que desean aprender, colaborar y crecer profesionalmente. Esta documentación proporciona información detallada sobre cómo utilizar e integrar con nuestra plataforma.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Características Principales
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Aprendizaje Interactivo
              </Typography>
              <Typography variant="body2">
                Cursos estructurados con ejercicios prácticos y feedback en tiempo real para maximizar la retención de conocimientos.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Editor de Código Integrado
              </Typography>
              <Typography variant="body2">
                Editor potente con resaltado de sintaxis, autocompletado y ejecución de código en tiempo real.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Comunidad Colaborativa
              </Typography>
              <Typography variant="body2">
                Foros, mensajería directa y espacios de colaboración para proyectos en equipo.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                API Extensible
              </Typography>
              <Typography variant="body2">
                API completa para integrar funcionalidades de CodeCommunity en tus propias aplicaciones.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography variant="h6" gutterBottom>
          Comenzando
        </Typography>
        
        <Typography variant="body1" paragraph>
          Para comenzar a utilizar CodeCommunity, recomendamos seguir estos pasos:
        </Typography>
        
        <ol>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Registro y Configuración de Perfil</strong>: Crea tu cuenta y configura tu perfil con tus habilidades e intereses.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Explorar Cursos</strong>: Navega por nuestro catálogo de cursos y elige uno que se alinee con tus objetivos.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Unirse a la Comunidad</strong>: Participa en foros de discusión relevantes para tu área de interés.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Colaborar en Proyectos</strong>: Únete a proyectos existentes o inicia uno propio para aplicar lo aprendido.
            </Typography>
          </li>
        </ol>
        
        <Box sx={{ bgcolor: 'info.50', p: 2, borderRadius: 2, mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Nota para Desarrolladores
          </Typography>
          <Typography variant="body2">
            Si eres un desarrollador interesado en integrar con nuestra plataforma, consulta la sección de <Link component={RouterLink} to="/documentation/api-reference">Referencia de API</Link> para detalles sobre nuestros endpoints y autenticación.
          </Typography>
        </Box>
      </>
    );
  }
  
  // Contenido por defecto
  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Selecciona una sección de la documentación
      </Typography>
      <Typography variant="body1" color="text.secondary">
        El contenido de la documentación para {section}/{subsection} se mostrará aquí.
      </Typography>
    </Box>
  );
};

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeSubsection, setActiveSubsection] = useState('introduction');
  
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Establecer la primera subsección como activa
    const firstSubsection = docSections.find(s => s.id === sectionId)?.subsections[0].id || '';
    setActiveSubsection(firstSubsection);
  };
  
  const handleSubsectionChange = (subsectionId: string) => {
    setActiveSubsection(subsectionId);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const activeContent = getActiveContent(activeSection, activeSubsection);
  const activeSectionObj = docSections.find(s => s.id === activeSection);
  const activeSubsectionObj = activeSectionObj?.subsections.find(s => s.id === activeSubsection);
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentación
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Explora nuestra documentación completa para entender cómo utilizar todas las funcionalidades de CodeCommunity.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Buscar en la documentación..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Contenido
            </Typography>
            
            <List component="nav" dense>
              {docSections.map((section) => (
                <React.Fragment key={section.id}>
                  <ListItemButton 
                    selected={activeSection === section.id} 
                    onClick={() => handleSectionChange(section.id)}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText primary={section.title} />
                  </ListItemButton>
                  
                  {activeSection === section.id && (
                    <List component="div" disablePadding>
                      {section.subsections.map((subsection) => (
                        <ListItemButton 
                          key={subsection.id}
                          selected={activeSubsection === subsection.id}
                          onClick={() => handleSubsectionChange(subsection.id)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={subsection.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Recursos
            </Typography>
            
            <List component="nav" dense>
              <ListItemButton component="a" href="/api/docs" target="_blank">
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ApiIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="API Reference" />
              </ListItemButton>
              
              <ListItemButton component="a" href="https://github.com/codecommunity/docs" target="_blank">
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <GitHubIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="GitHub" />
              </ListItemButton>
              
              <ListItemButton component={RouterLink} to="/documentation/faq">
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <BookIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
              </ListItemButton>
            </List>
          </Paper>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              ¿Necesitas ayuda?
            </Typography>
            <Typography variant="body2">
              Si no encuentras lo que buscas, contacta con nuestro equipo de soporte.
            </Typography>
            <Link component={RouterLink} to="/contact" underline="hover" sx={{ display: 'block', mt: 1 }}>
              Contactar Soporte
            </Link>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
              <Link component={RouterLink} to="/documentation" color="inherit">
                Documentación
              </Link>
              {activeSectionObj && (
                <Link 
                  component={RouterLink} 
                  to={`/documentation/${activeSection}`}
                  color="inherit"
                >
                  {activeSectionObj.title}
                </Link>
              )}
              {activeSubsectionObj && (
                <Typography color="text.primary">
                  {activeSubsectionObj.title}
                </Typography>
              )}
            </Breadcrumbs>
            
            {activeContent}
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ¿Encontraste un error o tienes sugerencias para mejorar nuestra documentación?
        </Typography>
        <Link 
          href="https://github.com/codecommunity/docs/issues/new" 
          target="_blank" 
          underline="hover"
        >
          Enviar feedback en GitHub
        </Link>
      </Box>
    </Container>
  );
};

export default Documentation; 