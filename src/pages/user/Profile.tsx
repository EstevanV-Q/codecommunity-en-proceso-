import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tab,
  Tabs,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Collapse,
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface ProfileData {
  displayName: string;
  bio: string;
  country: string;
  city: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  skills: string[];
  programmingLevel: string;
  languages: { language: string; level: string }[];
  interests: string[];
  specialization: string;
  yearsOfExperience: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const programmingLevels = ['Principiante', 'Intermedio', 'Avanzado', 'Experto'];
  const languageLevels = ['Básico', 'Intermedio', 'Avanzado', 'Nativo'];
  const specializationAreas = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile Development',
    'DevOps',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
  ];

  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: user?.displayName || '',
    bio: 'Desarrollador Full Stack apasionado por la tecnología y el aprendizaje continuo.',
    country: 'España',
    city: 'Madrid',
    email: user?.email || '',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    website: 'https://myportfolio.com',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    programmingLevel: 'Intermedio',
    languages: [
      { language: 'Español', level: 'Nativo' },
      { language: 'Inglés', level: 'Avanzado' },
    ],
    interests: ['Web Development', 'Cloud Computing', 'AI/ML', 'Open Source'],
    specialization: 'Full Stack Development',
    yearsOfExperience: 3,
  });

  const certifications = [
    {
      name: 'React Developer Certification',
      issuer: 'CodeCommunity',
      date: '2023',
      credential: 'CERT-12345',
    },
    {
      name: 'Node.js Advanced',
      issuer: 'CodeCommunity',
      date: '2023',
      credential: 'CERT-67890',
    },
  ];

  const achievements = [
    {
      title: 'Top Contributor',
      description: 'Reconocido como uno de los principales contribuidores de la comunidad',
      date: '2023',
    },
    {
      title: 'Project Excellence',
      description: 'Premio al mejor proyecto del mes',
      date: '2023',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restaurar datos originales
  };

  const handlePhotoUpload = () => {
    setOpenPhotoDialog(true);
  };

  useEffect(() => {
    // Verificar si el perfil está completo
    const isProfileComplete = Boolean(
      profileData.displayName &&
      profileData.bio &&
      profileData.country &&
      profileData.city &&
      profileData.skills.length > 0 &&
      profileData.languages.length > 0
    );

    setProfileCompleted(isProfileComplete);
  }, [profileData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Alerta de Perfil Incompleto */}
      <Collapse in={showAlert && !profileCompleted}>
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              ¡Importante! Completa tu perfil profesional
            </Typography>
            <Typography variant="body2">
              Un perfil completo aumenta tu visibilidad en la comunidad y te ayuda a conectar con otros desarrolladores.
              Asegúrate de incluir:
            </Typography>
            <Box component="ul" sx={{ mt: 1, mb: 0 }}>
              <li>Información personal y de contacto</li>
              <li>Nivel de programación y especialización</li>
              <li>Habilidades técnicas e idiomas</li>
              <li>Foto de perfil profesional</li>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleEditProfile}
              sx={{ mt: 1 }}
            >
              Completar Perfil
            </Button>
          </Box>
        </Alert>
      </Collapse>

      {/* Perfil Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
          <IconButton
                  size="small"
            sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                  onClick={handlePhotoUpload}
                >
                  <PhotoCameraIcon fontSize="small" />
          </IconButton>
              }
            >
              <Avatar
                src={user?.photoURL || undefined}
                sx={{ width: 120, height: 120 }}
              />
            </Badge>
          </Grid>
          <Grid item xs={12} sm>
            {isEditing ? (
              <Box>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={profileData.displayName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, displayName: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                />
              </Box>
            ) : (
              <Box>
                <Typography variant="h4" gutterBottom>
                  {profileData.displayName}
                </Typography>
                <Typography color="textSecondary" paragraph>
                  {profileData.bio}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item>
            {isEditing ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
              >
                Editar Perfil
              </Button>
            )}
          </Grid>
              </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} color="action" />
                <Typography>{profileData.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WebsiteIcon sx={{ mr: 1 }} color="action" />
                <Typography>{profileData.city}, {profileData.country}</Typography>
              </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <IconButton href={profileData.github} target="_blank">
                  <GitHubIcon />
                </IconButton>
                <IconButton href={profileData.linkedin} target="_blank">
                  <LinkedInIcon />
                </IconButton>
                <IconButton href={profileData.twitter} target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton href={profileData.website} target="_blank">
                  <WebsiteIcon />
                </IconButton>
              </Box>
              </Grid>
              </Grid>
        </Box>
      </Paper>

      {/* Tabs de Contenido */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
            <Tab label="Información" />
            <Tab label="Desarrollo" />
            <Tab label="Certificaciones" />
            <Tab label="Logros" />
          </Tabs>
        </Box>

        {/* Tab: Información Personal */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Información Personal
                </Typography>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                        label="País"
                        value={profileData.country}
                        onChange={(e) =>
                          setProfileData({ ...profileData, country: e.target.value })
                        }
                      />
                <TextField
                  fullWidth
                        label="Ciudad"
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({ ...profileData, city: e.target.value })
                        }
                      />
                <TextField
                  fullWidth
                        label="Biografía"
                        multiline
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bio: e.target.value })
                        }
                      />
                    </Box>
                  ) : (
                    <>
                      <Typography variant="body1" paragraph>
                        <strong>Ubicación:</strong> {profileData.city}, {profileData.country}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Bio:</strong> {profileData.bio}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
              </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Idiomas
                </Typography>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {profileData.languages.map((lang, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                            label="Idioma"
                            value={lang.language}
                            onChange={(e) => {
                              const newLanguages = [...profileData.languages];
                              newLanguages[index].language = e.target.value;
                              setProfileData({ ...profileData, languages: newLanguages });
                            }}
                          />
                          <FormControl fullWidth>
                            <InputLabel>Nivel</InputLabel>
                            <Select
                              value={lang.level}
                              label="Nivel"
                              onChange={(e) => {
                                const newLanguages = [...profileData.languages];
                                newLanguages[index].level = e.target.value;
                                setProfileData({ ...profileData, languages: newLanguages });
                              }}
                            >
                              {languageLevels.map((level) => (
                                <MenuItem key={level} value={level}>
                                  {level}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                          setProfileData({
                            ...profileData,
                            languages: [
                              ...profileData.languages,
                              { language: '', level: 'Básico' },
                            ],
                          })
                        }
                      >
                        Añadir Idioma
                      </Button>
                    </Box>
                  ) : (
                    <List>
                      {profileData.languages.map((lang, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={lang.language}
                            secondary={`Nivel: ${lang.level}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab: Desarrollo */}
        <TabPanel value={tabValue} index={1}>
      <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
            <Typography variant="h6" gutterBottom>
                    Perfil Técnico
                  </Typography>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel>Nivel de Programación</InputLabel>
                        <Select
                          value={profileData.programmingLevel}
                          label="Nivel de Programación"
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              programmingLevel: e.target.value,
                            })
                          }
                        >
                          {programmingLevels.map((level) => (
                            <MenuItem key={level} value={level}>
                              {level}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Especialización</InputLabel>
                        <Select
                          value={profileData.specialization}
                          label="Especialización"
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              specialization: e.target.value,
                            })
                          }
                        >
                          {specializationAreas.map((area) => (
                            <MenuItem key={area} value={area}>
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        type="number"
                        label="Años de Experiencia"
                        value={profileData.yearsOfExperience}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            yearsOfExperience: parseInt(e.target.value),
                          })
                        }
                      />
                    </Box>
                  ) : (
                    <>
                      <Typography variant="body1" paragraph>
                        <strong>Nivel:</strong> {profileData.programmingLevel}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Especialización:</strong> {profileData.specialization}
                  </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Experiencia:</strong> {profileData.yearsOfExperience} años
                  </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Habilidades e Intereses
                  </Typography>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Habilidades"
                        placeholder="Separadas por comas"
                        value={profileData.skills.join(', ')}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            skills: e.target.value.split(',').map((s) => s.trim()),
                          })
                        }
                      />
                      <TextField
                        fullWidth
                        label="Intereses"
                        placeholder="Separados por comas"
                        value={profileData.interests.join(', ')}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            interests: e.target.value.split(',').map((s) => s.trim()),
                          })
                        }
                      />
                </Box>
                  ) : (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Habilidades
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {profileData.skills.map((skill) => (
                          <Chip key={skill} label={skill} />
                        ))}
              </Box>
                      <Typography variant="subtitle1" gutterBottom>
              Intereses
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {profileData.interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        </TabPanel>

        {/* Tab: Certificaciones */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {certifications.map((cert, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
            <Typography variant="h6" gutterBottom>
                      {cert.name}
            </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {cert.issuer}
                    </Typography>
                    <Typography variant="body2">
                      Expedido: {cert.date}
                  </Typography>
                    <Typography variant="body2">
                      Credencial: {cert.credential}
            </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
              </Grid>
        </TabPanel>

        {/* Tab: Logros */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {achievement.title}
                  </Typography>
                    <Typography color="textSecondary" paragraph>
                      {achievement.description}
                  </Typography>
                    <Typography variant="body2">
                      Conseguido: {achievement.date}
                  </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            </Grid>
        </TabPanel>
      </Box>

      {/* Diálogo para cambiar foto */}
      <Dialog open={openPhotoDialog} onClose={() => setOpenPhotoDialog(false)}>
        <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-upload"
              type="file"
            />
            <label htmlFor="photo-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCameraIcon />}
              >
                Seleccionar Foto
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPhotoDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenPhotoDialog(false)}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 