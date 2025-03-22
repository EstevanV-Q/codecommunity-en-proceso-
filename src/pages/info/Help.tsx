import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as QuestionAnswerIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import DynamicResources from '../../components/help/DynamicResources';
import { useAdmin } from '../../context/AdminContext';
import { Link as RouterLink } from 'react-router-dom';

const Help = () => {
  const { isAdmin } = useAdmin();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Centro de Ayuda
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Bienvenido al Centro de Ayuda de CodeCommunity. Aquí encontrarás respuestas a las preguntas más frecuentes y guías para aprovechar al máximo nuestra plataforma.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Preguntas Frecuentes
            </Typography>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="medium">¿Cómo empiezo a usar la plataforma?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Para comenzar, completa tu perfil con información relevante sobre tus habilidades e intereses. Luego, explora los cursos disponibles o únete a la comunidad para conectar con otros desarrolladores. Si tienes interés en algún tema específico, usa la búsqueda para encontrar contenido relacionado.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography fontWeight="medium">¿Cómo puedo acceder a los cursos?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Puedes acceder a todos los cursos desde la sección "Cursos" en el menú lateral. Los cursos están organizados por categorías y niveles de dificultad. Puedes filtrar por tecnología, duración o popularidad. Una vez inscrito en un curso, aparecerá en tu Dashboard personal para acceso rápido.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography fontWeight="medium">¿Cómo funciona el editor de código?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nuestro editor de código integrado te permite escribir, ejecutar y compartir código directamente en la plataforma. Soporta múltiples lenguajes de programación y cuenta con resaltado de sintaxis. Para guardar tu trabajo, simplemente haz clic en el botón "Guardar" o usa el atajo Ctrl+S (Cmd+S en Mac).
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography fontWeight="medium">¿Cómo puedo compartir mi proyecto con la comunidad?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Para compartir tu proyecto, ve a la sección "Proyectos" y haz clic en "Crear Nuevo Proyecto". Completa el formulario con título, descripción y etiquetas relevantes. Puedes adjuntar archivos o enlazar a repositorios externos. Una vez publicado, tu proyecto será visible para toda la comunidad, donde podrán comentar y darte feedback.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography fontWeight="medium">¿Cómo puedo cambiar mi configuración de cuenta?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Para modificar tu configuración, dirígete a la sección "Configuración" en el menú lateral. Allí podrás cambiar tu información personal, preferencias de notificaciones, privacidad y temas visuales. Los cambios se guardarán automáticamente al modificar cada configuración.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Guías Paso a Paso
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Completar tu perfil
              </Typography>
              <Typography variant="body1" paragraph>
                Un perfil completo aumenta tus posibilidades de conectar con otros desarrolladores:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. Navega a 'Mi Perfil' desde el menú del avatar" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Haz clic en 'Editar Perfil'" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Completa todos los campos relevantes" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Añade tus habilidades y experiencia" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. Sube una foto de perfil profesional" />
                </ListItem>
              </List>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="h6" gutterBottom>
                Participar en la comunidad
              </Typography>
              <Typography variant="body1" paragraph>
                Interactúa con otros desarrolladores para maximizar tu aprendizaje:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="1. Únete a discusiones relevantes en el foro" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Comenta en proyectos que te interesen" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Comparte tus propios proyectos y avances" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Ofrece ayuda a otros miembros cuando puedas" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. Participa en desafíos y eventos de código" />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body1" paragraph>
              ¿No encontraste lo que buscabas? Nuestro equipo de soporte está disponible para ayudarte.
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              startIcon={<EmailIcon />}
              href="mailto:soporte@codecommunity.com"
              sx={{ mb: 2 }}
            >
              Contactar Soporte
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Tiempo de respuesta promedio: 24 horas
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Recursos Adicionales
              </Typography>
              
              {isAdmin && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="primary"
                  component={RouterLink}
                  to="/admin/resources"
                  startIcon={<EditIcon />}
                >
                  Gestionar Recursos
                </Button>
              )}
            </Box>
            
            <DynamicResources displayType="list" showHeader={false} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Help; 