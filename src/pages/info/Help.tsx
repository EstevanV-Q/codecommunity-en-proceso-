import React, { useState } from 'react';
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
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert as MuiAlert
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import DynamicResources from '../../components/help/DynamicResources';
import { useAdmin } from '../../context/AdminContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Help = () => {
  const theme = useTheme();
  const { isAdmin } = useAdmin();
  const [openTicket, setOpenTicket] = useState(false);
  const [ticket, setTicket] = useState({ title: '', description: '', priority: 'medium' });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOpenTicket = () => setOpenTicket(true);
  const handleCloseTicket = () => setOpenTicket(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTicket({ ...ticket, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    // Guardar ticket en localStorage
    const tickets = JSON.parse(localStorage.getItem('studentTickets') || '[]');
    const newTicket = {
      id: Date.now().toString(),
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      date: new Date().toISOString(),
      status: 'open',
    };
    localStorage.setItem('studentTickets', JSON.stringify([...tickets, newTicket]));
    setOpenTicket(false);
    setSuccess(true);
    setTicket({ title: '', description: '', priority: 'medium' });
    setTimeout(() => {
      setSuccess(false);
      navigate(`/tickets/${newTicket.id}`);
    }, 1200);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          height: { xs: 'auto', md: '120px' },
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to right, rgb(1, 62, 122), rgb(6, 97, 189))'
            : 'linear-gradient(to right, rgb(152, 207, 255), rgb(68, 169, 252))',
          color: 'white',
          boxShadow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 }, width: '100%' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '1.5rem', md: '2.125rem' },
              textAlign: { xs: 'center', md: 'left' },
              animation: 'bounce 3s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
              },
            }}
          >
            Centro de Ayuda
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{
              whiteSpace: 'normal',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Encuentra respuestas y guías para aprovechar al máximo nuestra plataforma
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, width: '100%' }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpenTicket}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            Abrir Ticket
          </Button>
        </Box>
      </Box>

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
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleOpenTicket}
            >
              Abrir Ticket
            </Button>
            <Dialog open={openTicket} onClose={handleCloseTicket} maxWidth="sm" fullWidth>
              <DialogTitle>Abrir Ticket de Soporte</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Título"
                  name="title"
                  fullWidth
                  value={ticket.title}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  label="Descripción"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  value={ticket.description}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  label="Prioridad"
                  name="priority"
                  select
                  fullWidth
                  value={ticket.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="low">Baja</MenuItem>
                  <MenuItem value="medium">Media</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                  <MenuItem value="critical">Crítica</MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseTicket}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={!ticket.title || !ticket.description}>Enviar</Button>
              </DialogActions>
            </Dialog>
            <Snackbar open={success} autoHideDuration={1200} onClose={() => setSuccess(false)}>
              <MuiAlert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                ¡Ticket enviado correctamente! Redirigiendo a tu detalle de ticket...
              </MuiAlert>
            </Snackbar>
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