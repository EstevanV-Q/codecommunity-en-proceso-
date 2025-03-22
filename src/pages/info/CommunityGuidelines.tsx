import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Button,
  Link
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HelpOutline as HelpOutlineIcon,
  Gavel as GavelIcon,
  Forum as ForumIcon,
  Code as CodeIcon,
  ChatBubble as ChatBubbleIcon,
  Person as PersonIcon,
  Flag as FlagIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const CommunityGuidelines = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Normas de la Comunidad
      </Typography>
      
      <Typography variant="body1" paragraph>
        Bienvenido a CodeCommunity. Estas normas están diseñadas para crear un ambiente positivo, colaborativo y respetuoso para todos los miembros. Al unirte a nuestra comunidad, aceptas cumplir con estas directrices.
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        Estas normas se aplican a todos los espacios de CodeCommunity, incluyendo foros, comentarios, mensajes privados, código compartido y proyectos colaborativos.
      </Alert>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GavelIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Principios Fundamentales
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              Estos principios son la base de nuestra comunidad y guían todas nuestras interacciones:
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Respeto Mutuo" 
                  secondary="Trata a todos los miembros con respeto, independientemente de su nivel de experiencia, origen o identidad."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Inclusividad" 
                  secondary="Fomentamos un entorno acogedor para todos. La discriminación o el acoso no son tolerados."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Constructividad" 
                  secondary="Ofrece críticas constructivas y específicas. Enfócate en el código o las ideas, no en la persona."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Honestidad Académica" 
                  secondary="Publica solo contenido original o con las atribuciones adecuadas. El plagio no es aceptable."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Seguridad" 
                  secondary="No compartas código malicioso o contenido que pueda comprometer la seguridad de otros usuarios."
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ForumIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Directrices para el Foro
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Lo que debes hacer:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Utiliza títulos descriptivos para tus publicaciones que reflejen claramente el contenido." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Busca publicaciones existentes antes de crear una nueva sobre el mismo tema." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Formatea correctamente tu código usando los bloques de código disponibles." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Proporciona contexto suficiente al hacer preguntas, incluyendo lo que has intentado." />
              </ListItem>
            </List>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Lo que debes evitar:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Publicaciones sin contenido sustancial o respuestas como 'gracias' o '+1'." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Spam, publicidad no solicitada o promoción excesiva de servicios personales." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Respuestas que se burlan o menosprecian a otros por su falta de conocimiento." />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Desviar intencionalmente discusiones con temas fuera de contexto." />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Directrices para Compartir Código
              </Typography>
            </Box>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Licencias y Atribuciones" 
                  secondary="Incluye siempre información sobre la licencia de tu código. Si utilizas código de terceros, proporciona la atribución adecuada."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Documentación" 
                  secondary="Documenta tu código con comentarios claros, especialmente para funcionalidades complejas o no estándar."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Código Malicioso" 
                  secondary="No compartas código diseñado para dañar sistemas, robar datos o comprometer la seguridad de otros usuarios."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Compartir Credenciales" 
                  secondary="Nunca incluyas credenciales reales (API keys, contraseñas, tokens) en el código compartido."
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ChatBubbleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Comunicación Personal
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              La comunicación directa entre miembros debe seguir las mismas normas de respeto y profesionalismo:
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Consentimiento" 
                  secondary="Respeta cuando un miembro no desee continuar una conversación o rechace una solicitud de colaboración."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Acoso" 
                  secondary="No envíes mensajes no solicitados repetidamente o contenido ofensivo a otros miembros."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Extorsión o Presión" 
                  secondary="No presiones a otros miembros para obtener ayuda gratuita, código o servicios."
                />
              </ListItem>
            </List>
            
            <Alert severity="warning" sx={{ mt: 2 }}>
              Los mensajes privados no son completamente privados para los moderadores en caso de reportes por comportamientos inapropiados.
            </Alert>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FlagIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Reportar Infracciones
              </Typography>
            </Box>
            
            <Typography variant="body2" paragraph>
              Si observas contenido que viola estas normas, por favor repórtalo:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="1. Usa el botón 'Reportar' junto al contenido" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="2. Selecciona la categoría apropiada" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3. Proporciona una breve explicación" 
                />
              </ListItem>
            </List>
            
            <Typography variant="body2" paragraph sx={{ mt: 2 }}>
              Los moderadores revisarán cada reporte y tomarán las acciones necesarias. Gracias por ayudarnos a mantener la calidad de nuestra comunidad.
            </Typography>
            
            <Button 
              variant="outlined" 
              color="error" 
              fullWidth 
              href="/report"
              sx={{ mt: 1 }}
            >
              Reportar Contenido
            </Button>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GavelIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Consecuencias
              </Typography>
            </Box>
            
            <Typography variant="body2" paragraph>
              Las infracciones de estas normas pueden resultar en:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• Advertencia" 
                  secondary="Para infracciones leves o primeras infracciones" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Restricción temporal" 
                  secondary="Limitación de participación en ciertos espacios" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Suspensión" 
                  secondary="Inhabilitación temporal de la cuenta" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Expulsión permanente" 
                  secondary="Para infracciones graves o reincidentes" 
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Preguntas Frecuentes
              </Typography>
            </Box>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="¿Puedo compartir soluciones de ejercicios de cursos?" 
                  secondary="Sí, pero solo si el curso ya lo has completado y la discusión está marcada con 'spoiler'." 
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemText 
                  primary="¿Cómo puedo apelar una decisión de moderación?" 
                  secondary="Contacta al equipo de moderación a través del formulario de apelación en la sección de Ayuda." 
                />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemText 
                  primary="¿Puedo promocionar mi proyecto o startup?" 
                  secondary="Sí, pero solo en los canales designados para ello y sin spam repetitivo." 
                />
              </ListItem>
            </List>
            
            <Link href="/faq" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
              Ver todas las FAQs
            </Link>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Estas normas pueden ser actualizadas periódicamente. Última actualización: Marzo 2023
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Si tienes sugerencias para mejorar estas normas, por favor <Link href="/contact">contáctanos</Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default CommunityGuidelines; 