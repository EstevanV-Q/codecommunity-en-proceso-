import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  MenuItem,
  IconButton
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Opciones para el campo de asunto
  const subjectOptions = [
    'Consulta general',
    'Soporte técnico',
    'Facturación',
    'Sugerencia',
    'Otro'
  ];

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'El asunto es requerido';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Limpiar el error cuando el usuario escribe
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulación de envío de formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resetear el formulario después del éxito
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSnackbar({
        open: true,
        message: '¡Mensaje enviado correctamente! Te responderemos a la brevedad.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSnackbar({
        open: true,
        message: 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Cerrar la notificación
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
          ¿Tienes alguna pregunta o comentario? ¡Nos encantaría saber de ti! Completa el formulario a continuación 
          o utiliza nuestros datos de contacto directo.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Información de contacto */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Información de Contacto
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    contacto@codecommunity.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2">Teléfono</Typography>
                  <Typography variant="body2" color="text.secondary">
                    +34 912 345 678
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <LocationIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2">Dirección</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Calle Principal 123<br />
                    28001 Madrid, España
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Horario de Atención
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lunes a Viernes: 9:00 - 18:00<br />
              Sábados: 10:00 - 14:00<br />
              Domingos: Cerrado
            </Typography>
          </Paper>
        </Grid>
        
        {/* Formulario de contacto */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Envíanos un Mensaje
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="subject"
                    select
                    label="Asunto"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    fullWidth
                    required
                    disabled={loading}
                  >
                    {subjectOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Mensaje"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={loading}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Mapa o información adicional */}
      <Paper elevation={1} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Preguntas Frecuentes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              ¿Cuál es el tiempo de respuesta?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Nos comprometemos a responder todas las consultas dentro de las 24-48 horas hábiles.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              ¿Ofrecen soporte técnico personalizado?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sí, ofrecemos soporte técnico personalizado para todos nuestros usuarios premium.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              ¿Cómo puedo reportar un problema técnico?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Puedes reportar problemas técnicos a través de este formulario seleccionando "Soporte técnico" como asunto.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              ¿Puedo solicitar una característica nueva?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ¡Claro! Selecciona "Sugerencia" como asunto en el formulario y describe la característica que te gustaría ver.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Notificación después de enviar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 