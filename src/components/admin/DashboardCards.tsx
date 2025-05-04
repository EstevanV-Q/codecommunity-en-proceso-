import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  CardActions,
  IconButton,
  Divider,
  Paper,
  Chip,
  Avatar,
  styled,
} from '@mui/material';
import { 
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  AttachMoney as MoneyIcon,
  Work as WorkIcon,
  ViewQuilt as ViewQuiltIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminPermissions } from '../../context/AdminContext';
// Estilos para las tarjetas
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
}));

// Componente principal
const DashboardCards = () => {
  const navigate = useNavigate();
  const { checkPermission } = useAdmin();

  // Datos para las tarjetas
  const cards = [
    {
      id: 'payments',
      title: 'Pagos',
      description: 'Gestiona los pagos, transacciones y facturación de la plataforma.',
      color: '#7E57C2',
      icon: <MoneyIcon fontSize="large" />,
      path: '/admin/payments',
      action: 'Ver pagos',
      stats: {
        total: 450,
        active: 25
      },
      requiredPermission: 'finance.manage' as keyof AdminPermissions
    },
    {
      id: 'announcements',
      title: 'Anuncios',
      description: 'Crea y gestiona anuncios para la comunidad y toda la plataforma.',
      color: '#FFA726',
      icon: <AnnouncementIcon fontSize="large" />,
      path: '/admin/announcements',
      action: 'Crear anuncio',
      stats: {
        total: 12,
        active: 5
      }
    },
    {
      id: 'courses',
      title: 'Cursos',
      description: 'Añade nuevos cursos y gestiona el contenido educativo existente.',
      color: '#42A5F5',
      icon: <SchoolIcon fontSize="large" />,
      path: '/admin/courses',
      action: 'Nuevo curso',
      stats: {
        total: 24,
        active: 18
      }
    },
    {
      id: 'mentors',
      title: 'Mentores',
      description: 'Gestiona el equipo de mentores y sus asignaciones con estudiantes.',
      color: '#66BB6A',
      icon: <GroupIcon fontSize="large" />,
      path: '/admin/mentors',
      action: 'Gestionar mentores',
      stats: {
        total: 15,
        active: 10
      }
    },
    {
      id: 'users',
      title: 'Usuarios',
      description: 'Gestiona los usuarios de la plataforma, sus roles y permisos.',
      color: '#EC407A',
      icon: <PersonIcon fontSize="large" />,
      path: '/admin/users',
      action: 'Gestionar usuarios',
      stats: {
        total: 1250,
        active: 820
      }
    },
    {
      id: 'jobs',
      title: 'Ofertas de trabajo',
      description: 'Gestiona las ofertas de trabajo de la plataforma.',
      color: '#FFA726',
      icon: <WorkIcon fontSize="large" />,
      path: '/admin/jobs',
      action: 'Gestionar ofertas de trabajo',
      stats: {
        total: 1250,
        active: 820
      }
    },
    {
      id: 'studyGroups',
      title: 'Grupos de Estudio',
      description: 'Gestiona los grupos de estudio y sus miembros.',
      color: '#4CAF50',
      icon: <GroupIcon fontSize="large" />,
      path: '/admin/community/groups',
      action: 'Gestionar grupos',
      stats: {
        total: 45,
        active: 32
      }
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Gestiona la comunidad de la plataforma.',
      color: '#46d9f0',
      icon: <ViewQuiltIcon fontSize="large" />,
      path: '/admin/community',
      action: 'Gestionar comunidad',
      stats: {
        total: 1250,
        active: 820
      }
    }
  ];

  // Filtrar tarjetas según permisos
  const filteredCards = cards.filter(card => {
    if (!card.requiredPermission) return true;
    return checkPermission(card.requiredPermission);
  });

  // Manejador para navegar a la página correspondiente
  const handleCardAction = (path: string) => {
    navigate(path);
  };

  // Manejador para crear un nuevo elemento
  const handleAddNew = (id: string) => {
    switch(id) {
      case 'payments':
        navigate('/admin/payments');
        break;
      case 'announcements':
        navigate('/admin/announcements/new');
        break;
      case 'courses':
        navigate('/admin/courses/new');
        break;
      case 'mentors':
        navigate('/admin/mentors');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'jobs':
        navigate('/admin/jobs');
        break;
      case 'studyGroups':
        navigate('/admin/community/groups');
        break;
      case 'community':
        navigate('/admin/community');
        break;
      default:
        navigate('/admin');
    }
  };

  return (
    <Grid container spacing={3}>
      {filteredCards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <IconContainer sx={{ bgcolor: `${card.color}20`, color: card.color }}>
                {card.icon}
              </IconContainer>
              
              <Typography variant="h6" component="h2" gutterBottom>
                {card.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {card.description}
              </Typography>
              
              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <Chip 
                  label={`Total: ${card.stats.total}`} 
                  size="small" 
                  variant="outlined" 
                />
                <Chip 
                  label={`Activos: ${card.stats.active}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
            </CardContent>
            
            <Divider />
            
            <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
              <Button 
                size="small" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleAddNew(card.id)}
              >
                {card.action}
              </Button>
              
              <IconButton 
                size="small" 
                color="primary"
                onClick={() => handleCardAction(card.path)}
                aria-label={`Ver todos los ${card.title.toLowerCase()}`}
              >
                <ArrowForwardIcon />
              </IconButton>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards; 