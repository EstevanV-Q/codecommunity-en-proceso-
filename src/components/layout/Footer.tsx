import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
  styled,
  useTheme,
  Button,
  Paper,
  alpha,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Code as CodeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../../theme/tokens';

const FooterRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' 
    ? colors.primary[900]
    : theme.palette.background.paper,
  color: theme.palette.mode === 'light' 
    ? colors.neutral.white 
    : theme.palette.text.primary,
  padding: theme.spacing(6, 0, 4),
  marginTop: 'auto',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${colors.primary[500]} 0%, ${colors.primary[300]} 100%)`,
  },
}));

const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
  padding: theme.spacing(0.5, 0),
  transition: 'all 0.2s',
  '&:hover': {
    color: colors.primary[300],
    transform: 'translateX(5px)',
  },
}));

const SocialButton = styled('a')(({ theme }) => ({
  color: theme.palette.mode === 'light' 
    ? colors.neutral.white 
    : theme.palette.text.primary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: alpha(colors.primary[300], 0.2),
    transform: 'translateY(-3px)',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ScrollTopButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: -20,
  right: 20,
  minWidth: 40,
  width: 40,
  height: 40,
  borderRadius: '50%',
  padding: 0,
  backgroundColor: colors.primary[500],
  color: colors.neutral.white,
  boxShadow: theme.shadows[4],
  '&:hover': {
    backgroundColor: colors.primary[400],
    transform: 'translateY(-2px)',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterRoot>
      <Container maxWidth="lg">
        <ScrollTopButton
          onClick={handleScrollTop}
          variant="contained"
          aria-label="Volver arriba"
        >
          <KeyboardArrowUpIcon />
        </ScrollTopButton>

        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <LogoSection>
              <CodeIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight="bold">
                CodeCommunity
              </Typography>
            </LogoSection>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Una comunidad vibrante de desarrolladores compartiendo conocimiento,
              experiencias y construyendo el futuro del código juntos.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <SocialButton href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </SocialButton>
              <SocialButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon />
              </SocialButton>
              <SocialButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </SocialButton>
            </Box>
          </Grid>

          {/* Enlaces rápidos */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Explorar
            </Typography>
            <FooterLink to="/courses">Cursos</FooterLink>
            <FooterLink to="/projects">Proyectos</FooterLink>
            <FooterLink to="/forum">Foro</FooterLink>
            <FooterLink to="/community">Comunidad</FooterLink>
            <FooterLink to="/announcements">Anuncios</FooterLink>
          </Grid>

          {/* Recursos */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Recursos
            </Typography>
            <FooterLink to="/documentation">Documentación</FooterLink>
            <FooterLink to="/tutorials">Tutoriales</FooterLink>
            <FooterLink to="/help">Centro de Ayuda</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Legal
            </Typography>
            <FooterLink to="/privacy">Privacidad</FooterLink>
            <FooterLink to="/terms">Términos</FooterLink>
            <FooterLink to="/cookies">Cookies</FooterLink>
            <FooterLink to="/guidelines">Normas</FooterLink>
          </Grid>

          {/* Contacto */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contacto
            </Typography>
            <MuiLink
              href="mailto:contact@codecommunity.com"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
                '&:hover': {
                  color: colors.primary[300],
                },
              }}
            >
              <EmailIcon fontSize="small" />
              Escríbenos
            </MuiLink>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${alpha(theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.text.primary, 0.1)}`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} CodeCommunity. Todos los derechos reservados.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5 
            }}
          >
            Hecho con ❤️ por la comunidad
          </Typography>
        </Box>
      </Container>
    </FooterRoot>
  );
};

export default Footer; 