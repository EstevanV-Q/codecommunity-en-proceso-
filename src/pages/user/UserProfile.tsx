import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Card,
  CardContent,
  Tab,
  Tabs,
  IconButton,
  Link,
} from '@mui/material';
import {
  School as SchoolIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

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

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
  type: 'codecommunity' | 'external';
  attachment?: {
    type: 'image' | 'link';
    url: string;
  };
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
  certifications: Certification[];
  photoURL?: string;
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [certificationTab, setCertificationTab] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener los datos del usuario
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Simular llamada a API
        // const response = await fetch(`/api/users/${userId}`);
        // const data = await response.json();
        
        // Datos de ejemplo
        const mockData: ProfileData = {
          displayName: 'Usuario Ejemplo',
          bio: 'Desarrollador Full Stack con pasión por la tecnología',
          country: 'España',
          city: 'Madrid',
          email: 'usuario@ejemplo.com',
          github: 'https://github.com/usuario',
          linkedin: 'https://linkedin.com/in/usuario',
          twitter: 'https://twitter.com/usuario',
          website: 'https://usuario.com',
          photoURL: 'https://via.placeholder.com/150',
          skills: ['React', 'TypeScript', 'Node.js', 'Python'],
          programmingLevel: 'Avanzado',
          languages: [
            { language: 'Español', level: 'Nativo' },
            { language: 'Inglés', level: 'Avanzado' }
          ],
          interests: ['Web Development', 'Machine Learning', 'Cloud Computing'],
          specialization: 'Full Stack Development',
          yearsOfExperience: 5,
          certifications: [
            {
              id: '1',
              name: 'React Developer Certification',
              issuer: 'CodeCommunity',
              date: '2023',
              credential: 'CERT-12345',
              type: 'codecommunity'
            },
            {
              id: '2',
              name: 'AWS Certified Developer',
              issuer: 'Amazon',
              date: '2023',
              credential: 'AWS-DEV-123',
              type: 'external',
              attachment: {
                type: 'link',
                url: 'https://aws.amazon.com/verification'
              }
            }
          ]
        };

        setProfileData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCertificationTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCertificationTab(newValue);
  };

  if (loading || !profileData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Cargando perfil...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Perfil Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={profileData.photoURL}
              sx={{ width: 120, height: 120 }}
            />
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h4" gutterBottom>
              {profileData.displayName}
            </Typography>
            <Typography color="textSecondary" paragraph>
              {profileData.bio}
            </Typography>
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
                  <Typography variant="body1" paragraph>
                    <strong>Ubicación:</strong> {profileData.city}, {profileData.country}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Bio:</strong> {profileData.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Idiomas
                  </Typography>
                  {profileData.languages.map((lang, index) => (
                    <Typography key={index} variant="body1" paragraph>
                      <strong>{lang.language}:</strong> {lang.level}
                    </Typography>
                  ))}
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
                  <Typography variant="body1" paragraph>
                    <strong>Nivel:</strong> {profileData.programmingLevel}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Especialización:</strong> {profileData.specialization}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Experiencia:</strong> {profileData.yearsOfExperience} años
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Habilidades e Intereses
                  </Typography>
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab: Certificaciones */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={certificationTab} onChange={handleCertificationTabChange}>
              <Tab label="CodeCommunity" />
              <Tab label="Externas" />
            </Tabs>
          </Box>

          {/* Certificaciones CodeCommunity */}
          <TabPanel value={certificationTab} index={0}>
            <Grid container spacing={3}>
              {profileData.certifications
                .filter(cert => cert.type === 'codecommunity')
                .map((cert) => (
                  <Grid item xs={12} md={6} key={cert.id}>
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
                        {cert.credential && (
                          <Typography variant="body2">
                            Credencial: {cert.credential}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </TabPanel>

          {/* Certificaciones Externas */}
          <TabPanel value={certificationTab} index={1}>
            <Grid container spacing={3}>
              {profileData.certifications
                .filter(cert => cert.type === 'external')
                .map((cert) => (
                  <Grid item xs={12} md={6} key={cert.id}>
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
                        {cert.credential && (
                          <Typography variant="body2">
                            Credencial: {cert.credential}
                          </Typography>
                        )}
                        {cert.attachment && (
                          <Box sx={{ mt: 2 }}>
                            {cert.attachment.type === 'image' ? (
                              <img 
                                src={cert.attachment.url} 
                                alt={cert.name}
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                              />
                            ) : (
                              cert.attachment.url && (
                                <Link
                                  href={cert.attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    '&:hover': {
                                      textDecoration: 'underline'
                                    }
                                  }}
                                >
                                  <LinkIcon fontSize="small" />
                                  Ver Certificación
                                </Link>
                              )
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </TabPanel>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default UserProfile; 