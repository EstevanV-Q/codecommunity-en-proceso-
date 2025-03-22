import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Aprendizaje',
      links: [
        { name: 'Cursos', path: '/courses' },
        { name: 'Tutoriales', path: '/tutorials' },
        { name: 'Recursos', path: '/resources' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { name: 'Foro', path: '/forum' },
        { name: 'Proyectos', path: '/projects' },
        { name: 'Eventos', path: '/events' },
        { name: 'Mentorías', path: '/mentorship' },
      ],
    },
    {
      title: 'Compañía',
      links: [
        { name: 'Acerca de', path: '/about' },
        { name: 'Contacto', path: '/contact' },
        { name: 'Términos', path: '/terms' },
        { name: 'Privacidad', path: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/codecommunity' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/codecommunity' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/codecommunity' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com/codecommunity' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ py: 0.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} CodeCommunity. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hecho con ❤️ por la comunidad
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 