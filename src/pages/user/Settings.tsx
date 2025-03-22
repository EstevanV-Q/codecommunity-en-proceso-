import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      updates: true,
      newsletter: false,
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showActivity: true,
    },
    theme: 'light',
    language: 'es',
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
    },
  });

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [name]: checked,
      },
    }));
  };

  const handleSocialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    try {
      // Aquí iría la lógica para guardar las configuraciones
      setMessage('Configuración guardada exitosamente');
      setError('');
    } catch (err) {
      setError('Error al guardar la configuración');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuración
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notificaciones */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              Notificaciones
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Notificaciones por correo"
                  secondary="Recibe actualizaciones importantes por correo"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="email"
                    checked={settings.notifications.email}
                    onChange={handleNotificationChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Notificaciones push"
                  secondary="Recibe notificaciones en tiempo real"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="push"
                    checked={settings.notifications.push}
                    onChange={handleNotificationChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Actualizaciones de cursos"
                  secondary="Notificaciones sobre nuevos contenidos"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="updates"
                    checked={settings.notifications.updates}
                    onChange={handleNotificationChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Newsletter"
                  secondary="Recibe nuestro boletín mensual"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="newsletter"
                    checked={settings.notifications.newsletter}
                    onChange={handleNotificationChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Privacidad */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ mr: 1 }} />
              Privacidad
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Perfil público"
                  secondary="Tu perfil será visible para otros usuarios"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="profilePublic"
                    checked={settings.privacy.profilePublic}
                    onChange={handlePrivacyChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Mostrar correo"
                  secondary="Tu correo será visible en tu perfil"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="showEmail"
                    checked={settings.privacy.showEmail}
                    onChange={handlePrivacyChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Actividad pública"
                  secondary="Mostrar tu actividad en la plataforma"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    name="showActivity"
                    checked={settings.privacy.showActivity}
                    onChange={handlePrivacyChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Preferencias */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PaletteIcon sx={{ mr: 1 }} />
              Preferencias
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Tema
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.theme === 'dark'}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      theme: e.target.checked ? 'dark' : 'light'
                    }))}
                  />
                }
                label="Modo oscuro"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Idioma
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.language === 'en'}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      language: e.target.checked ? 'en' : 'es'
                    }))}
                  />
                }
                label="English"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Redes Sociales */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Redes Sociales
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="GitHub"
                name="github"
                value={settings.socials.github}
                onChange={handleSocialChange}
                InputProps={{
                  startAdornment: (
                    <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={settings.socials.linkedin}
                onChange={handleSocialChange}
                InputProps={{
                  startAdornment: (
                    <LinkedInIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={settings.socials.twitter}
                onChange={handleSocialChange}
                InputProps={{
                  startAdornment: (
                    <TwitterIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Botones de acción */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => window.location.reload()}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings; 