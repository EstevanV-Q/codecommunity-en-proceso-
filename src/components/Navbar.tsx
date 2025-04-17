import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on mobile
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 0 },
          width: '100%',
        }}
      >
        <Typography
          variant="h4" // Make the logo larger
          component="div"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            mb: { xs: 1, sm: 0 }, // Add margin on mobile
          }}
          onClick={() => navigate('/')}
        >
          {'<>'}
        </Typography>

        {user ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-end' }, // Center items on mobile
              gap: 2, // Add spacing between items
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Button
              color="inherit"
              onClick={() => navigate('/courses')}
              sx={{ display: { xs: 'inline-flex', sm: 'inline-flex' } }} // Ensure visibility on mobile
            >
              Cursos
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/projects')}
              sx={{ display: { xs: 'inline-flex', sm: 'inline-flex' } }} // Ensure visibility on mobile
            >
              Proyectos
            </Button>

            <NotificationBell />

            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                src={user.photoURL || undefined}
                sx={{ width: 32, height: 32 }}
              >
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Mi Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-end' }, // Center items on mobile
              gap: 2, // Add spacing between items
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;