import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  CircularProgress,
  alpha,
  styled,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Bookmark as BookmarkIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AdminPanelSettings as AdminIcon,
  AccountTree as AccountTreeIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  MenuBook as MenuBookIcon,
  Description as DescriptionIcon,
  Announcement as AnnouncementIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { colors, dimensions, transitions } from '../../theme/tokens';

// Tipos
interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  badge?: number | undefined;
  progress?: number | undefined;
}

// Estilos personalizados
const SidebarRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: colors.professional.grisAntracita,
  color: colors.neutral[100],
  transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  height: dimensions.navbar.height,
  borderBottom: `1px solid ${alpha(colors.neutral.white, 0.1)}`,
}));

const SidebarFooter = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  borderTop: `1px solid ${alpha(colors.neutral.white, 0.1)}`,
}));

const ProgressRing = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  marginLeft: 'auto',
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
}));

const NavItemBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: colors.alert[500],
  color: colors.neutral.white,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  marginLeft: 'auto',
  padding: '0 6px',
}));

// Definir los elementos de navegación
const getNavItems = (isAuthenticated: boolean, isAdmin: boolean): NavItem[] => {
  const authItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
      requiresAuth: true,
    },
    {
      title: 'Anuncios',
      path: '/announcements',
      icon: <AnnouncementIcon />,
      requiresAuth: true,
    },
    {
      title: 'Cursos',
      path: '/courses',
      icon: <SchoolIcon />,
      requiresAuth: true,
      progress: 65,
    },
    {
      title: 'Proyectos',
      path: '/projects',
      icon: <CodeIcon />,
      requiresAuth: true,
      badge: 2,
    },
    {
      title: 'Comunidad',
      path: '/community',
      icon: <PeopleIcon />,
      requiresAuth: true,
    },
    {
      title: 'Guardados',
      path: '/bookmarks',
      icon: <BookmarkIcon />,
      requiresAuth: true,
    },
    {
      title: 'Notificaciones',
      path: '/notifications',
      icon: <NotificationsIcon />,
      requiresAuth: true,
      badge: 4,
    },
  ];

  const adminItems: NavItem[] = [
    {
      title: 'Administración',
      path: '/admin',
      icon: <AdminIcon />,
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      title: 'Gestión de Pagos',
      path: '/admin/payments',
      icon: <MoneyIcon />,
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      title: 'Gestión de Usuarios',
      path: '/admin/users',
      icon: <PeopleIcon />,
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      title: 'Gestión de Contenido',
      path: '/admin/content',
      icon: <DescriptionIcon />,
      requiresAuth: true,
      requiresAdmin: true,
    },
    {
      title: 'Recursos Adicionales',
      path: '/admin/resources',
      icon: <MenuBookIcon />,
      requiresAuth: true,
      requiresAdmin: true,
    },
  ];

  const configItems: NavItem[] = [
    {
      title: 'Configuración',
      path: '/settings',
      icon: <SettingsIcon />,
      requiresAuth: true,
    },
  ];

  const publicItems: NavItem[] = [
    {
      title: 'Iniciar Sesión',
      path: '/login',
      icon: <LoginIcon />,
      requiresAuth: false,
    },
    {
      title: 'Registrarse',
      path: '/register',
      icon: <PersonAddIcon />,
      requiresAuth: false,
    },
    {
      title: 'Acerca de',
      path: '/about',
      icon: <InfoIcon />,
      requiresAuth: false,
    },
    {
      title: 'Contacto',
      path: '/contact',
      icon: <ContactMailIcon />,
      requiresAuth: false,
    },
    {
      title: 'Ayuda',
      path: '/help',
      icon: <HelpIcon />,
      requiresAuth: false,
    },
  ];

  if (!isAuthenticated) {
    return publicItems;
  }

  return [
    ...authItems,
    ...(isAdmin ? adminItems : []),
    ...configItems,
  ];
};

// Componente Sidebar
const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navItems = getNavItems(isAuthenticated, isAdmin);

  const drawerWidth = collapsed ? dimensions.sidebar.collapsedWidth : dimensions.sidebar.width;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: `width ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
          overflowX: 'hidden',
        },
      }}
    >
      <SidebarRoot>
        <SidebarHeader>
          {!collapsed && (
            <Typography variant="h6" fontWeight="bold">
              Navegación
            </Typography>
          )}
          <IconButton onClick={toggleCollapsed} sx={{ color: colors.neutral[100] }}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </SidebarHeader>

        <Divider sx={{ borderColor: alpha(colors.neutral.white, 0.1) }} />

        <List sx={{ py: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            
            return (
              <ListItem key={item.path} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <Tooltip title={collapsed ? item.title : ''} placement="right">
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      py: 1,
                      borderRadius: '0 24px 24px 0',
                      marginRight: 1,
                      justifyContent: collapsed ? 'center' : 'initial',
                      backgroundColor: isActive ? alpha(colors.primary[500], 0.2) : 'transparent',
                      '&:hover': {
                        backgroundColor: isActive ? alpha(colors.primary[500], 0.3) : alpha(colors.neutral.white, 0.1),
                      },
                      '&::before': isActive ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 4,
                        height: '60%',
                        backgroundColor: colors.primary[500],
                        borderRadius: '0 4px 4px 0',
                      } : {},
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: collapsed ? 0 : 2,
                        justifyContent: 'center',
                        color: isActive ? colors.primary[500] : colors.neutral[300],
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    
                    {!collapsed && (
                      <ListItemText 
                        primary={item.title} 
                        sx={{ 
                          opacity: 1,
                          '& .MuiTypography-root': {
                            fontWeight: isActive ? 'medium' : 'normal',
                            color: isActive ? colors.neutral[50] : colors.neutral[300],
                          }
                        }} 
                      />
                    )}

                    {!collapsed && item.badge && (
                      <NavItemBadge>{item.badge}</NavItemBadge>
                    )}

                    {!collapsed && item.progress !== undefined && (
                      <ProgressRing>
                        <CircularProgress
                          variant="determinate"
                          value={item.progress}
                          size={32}
                          thickness={4}
                          sx={{
                            color: colors.secondary[500],
                            '& .MuiCircularProgress-circle': {
                              strokeLinecap: 'round',
                            },
                          }}
                        />
                        <ProgressText>{`${item.progress}%`}</ProgressText>
                      </ProgressRing>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        <SidebarFooter>
          {!collapsed && (
            <Typography variant="caption" color={colors.neutral[400]}>
              © 2023 CodeCommunity
            </Typography>
          )}
        </SidebarFooter>
      </SidebarRoot>
    </Drawer>
  );
};

export default Sidebar; 