import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  alpha,
  styled,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Collapse,
  ListItemButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Forum as ForumIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Help as HelpIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Announcement as AnnouncementIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { useAuth } from '../../context/AuthContext';
import { colors, dimensions, transitions, typography } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../NotificationBell';

// Estilos personalizados
const NavbarRoot = styled(AppBar)(({ theme }) => ({
  height: dimensions.navbar.height,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(90deg, ${colors.primary[700]} 0%, ${colors.primary[500]} 100%)`
    : `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  boxShadow: theme.palette.mode === 'light'
    ? 'none'
    : '0 1px 3px rgba(255, 255, 255, 0.05)',
  borderBottom: `1px solid ${alpha(theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.divider, 0.1)}`,
}));

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.text.primary,
  margin: theme.spacing(0, 1),
  fontWeight: typography.weight.medium,
  fontSize: typography.size.sm,
  textTransform: 'none',
  letterSpacing: '0.5px',
  padding: theme.spacing(0.75, 2),
  borderRadius: '4px',
  transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.action.hover, 0.1),
    transform: 'translateY(-2px)',
  },
}));

const NavIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.text.primary,
  margin: theme.spacing(0, 0.5),
  transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.action.hover, 0.1),
    transform: 'scale(1.1)',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: typography.fontFamily.primary,
  fontWeight: typography.weight.bold,
  color: theme.palette.mode === 'light' ? colors.neutral.white : theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  minWidth: '120px',
  zIndex: theme.zIndex.drawer + 1,
  marginRight: theme.spacing(40),
  '& svg': {
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
  },
  '& a': {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontSize: '1.1rem',
  },
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up('md')]: {
    justifyContent: 'space-between',
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
  '&:first-of-type': {
    minWidth: 160,
  },
}));

// Componente RouterLinkComponent para usar con MUI
const RouterLinkComponent = React.forwardRef<HTMLAnchorElement, { href: string; to: string }>((props, ref) => {
  const { href, to, ...other } = props;
  return <RouterLink ref={ref} to={to || href} {...other} />;
});

// Componente Navbar
const Navbar = ({ onDrawerToggle }: { onDrawerToggle?: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Enum para identificar qué menú está abierto
  type OpenMenu = 'none' | 'notifications' | 'menu';
  const [openMenu, setOpenMenu] = useState<OpenMenu>('none');

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      // Simular búsqueda en tiempo real
      const results = mockSearch(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const mockSearch = (query: string) => {
    // Simular resultados de búsqueda
    const allItems = [
      { type: 'curso', title: 'Curso de React', url: '/courses/react' },
      { type: 'curso', title: 'Curso de TypeScript', url: '/courses/typescript' },
      { type: 'proyecto', title: 'Proyecto Chat App', url: '/projects/chat' },
      { type: 'foro', title: 'Ayuda con React Hooks', url: '/forum/react-hooks' },
      { type: 'usuario', title: 'John Developer', url: '/profile/john' },
    ];

    return allItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMobileMenuClose}
      sx={{ mt: 5 }}
    >
      <MenuItem onClick={() => handleNavigate('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigate('/announcements')}>
        <ListItemIcon>
          <AnnouncementIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Anuncios</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigate('/courses')}>
        <ListItemIcon>
          <SchoolIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cursos</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigate('/projects')}>
        <ListItemIcon>
          <CodeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Proyectos</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigate('/community')}>
        <ListItemIcon>
          <ForumIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Comunidad</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => handleNavigate('/settings')}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Configuración</ListItemText>
      </MenuItem>
      
      <Divider />
      
      {/* <MenuItem onClick={toggleTheme}>
        <ListItemIcon>
          {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </ListItemIcon>
        <ListItemText>{mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</ListItemText>
      </MenuItem> */}
      
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cerrar Sesión</ListItemText>
      </MenuItem>
    </Menu>
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { text: 'Anuncios', path: '/announcements', icon: <AnnouncementIcon fontSize="small" /> },
    { text: 'Cursos', path: '/courses', icon: <SchoolIcon fontSize="small" /> },
    { text: 'Proyectos', path: '/projects', icon: <CodeIcon fontSize="small" /> },
    { text: 'Comunidad', path: '/community', icon: <ForumIcon fontSize="small" /> },
    { text: 'Foro', path: '/forum', icon: <ComputerIcon fontSize="small" /> },
    { text: 'Carrito', path: '/Cart', icon: <ShoppingBasketIcon fontSize="small" /> },
    // { text: 'Perfil', path: '/profile', icon: <PersonIcon fontSize="small" /> },
    // { text: 'Configuración', path: '/settings', icon: <SettingsIcon fontSize="small" /> },
    { text: 'Ayuda', path: '/help', icon: <HelpIcon fontSize="small" /> },
  ];

  const handleMenuToggle = () => {
    setOpenMenu(openMenu === 'menu' ? 'none' : 'menu');
  };

  const handleNotificationsToggle = () => {
    setOpenMenu(openMenu === 'notifications' ? 'none' : 'notifications');
  };

  const notificationItems = [
    { 
      title: 'Nuevo comentario en tu publicación',
      description: 'Juan comentó en tu post sobre React',
      time: '5 min',
      icon: <ForumIcon />,
      path: '/forum/post/1'
    },
    {
      title: 'Curso completado',
      description: 'Has completado el curso de TypeScript',
      time: '1 hora',
      icon: <SchoolIcon />,
      path: '/courses/typescript'
    },
    {
      title: 'Nueva respuesta',
      description: 'María respondió a tu pregunta',
      time: '2 horas',
      icon: <PersonIcon />,
      path: '/forum/question/2'
    },
    {
      title: 'Proyecto actualizado',
      description: 'Se han realizado cambios en el proyecto Chat App',
      time: '3 horas',
      icon: <CodeIcon />,
      path: '/projects/chat'
    }
  ];

  return (
    <NavbarRoot position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'row' }, // Keep items in a row
          alignItems: 'center',
          px: { xs: 1, sm: 2, md: 3 },
          width: '100%',
        }}
      >
        {/* Left Section: Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Logo variant="h6" noWrap>
            <RouterLink
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <CodeIcon sx={{ fontSize: '1.5rem' }} />
              <Typography
                component="span"
                sx={{
                  whiteSpace: 'nowrap',
                  display: { xs: 'none', md: 'inline' },
                  fontSize: '1.1rem',
                }}
              >
                CodeCommunity
              </Typography>
            </RouterLink>
          </Logo>
        </Box>

        {/* Center Section: Search Bar */}
        <Box
          sx={{
            flexGrow: 2,
            justifyContent: 'center',
            display: { xs: 'none', sm: 'flex'}, // Hide search bar on mobile
            width: "auto",
            marginLeft: { xs: 0, sm: 2 }, // Adjust margin for mobile
          }}
        >
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit}>
              <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </SearchBar>
        </Box>

        {/* Right Section: Menu, Notifications, and Profile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
           
            flexGrow: 1,
            justifyContent: { xs: 'flex-end', sm: 'flex-end' }, // Align items to the right
            marginLeft: "-50px",
          }}
        >
          <IconButton onClick={handleMenuToggle} color="inherit">
            <MenuIcon />
          </IconButton>
          <NotificationBell />
          <NavIconButton onClick={toggleTheme} color="inherit" aria-label="cambiar tema">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </NavIconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="cuenta del usuario actual"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            {user?.photoURL ? (
              <Avatar
                src={user.photoURL}
                alt={user.displayName || 'Usuario'}
                sx={{ width: 32, height: 32, border: `2px solid ${colors.primary[400]}` }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Menú desplegable lateral */}
      <Menu
        anchorEl={menuAnchorEl}
        open={openMenu === 'menu'}
        onClose={() => setOpenMenu('none')}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 7,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -10,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              mt: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              handleNavigate(item.path);
              setOpenMenu('none');
            }}
            sx={{
              py: 1.5,
              px: 2,
              gap: 2,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.text}</Typography>
          </MenuItem>
        ))}
        <Divider />
      </Menu>

      {/* Menú de perfil */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: '',
              position: '',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigate('/user/profile')}>
          <Avatar src={user?.photoURL || ''} />
          <Typography>Mi Perfil</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleNavigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Configuración</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>

      {renderMobileMenu}
    </NavbarRoot>
  );
};

export default Navbar;