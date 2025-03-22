import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Chip, 
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Badge,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import { 
  Search as SearchIcon,
  PushPin as PushPinIcon, 
  Visibility as VisibilityIcon,
  Event as EventIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { useAnnouncements } from '../../context/AnnouncementContext';

// Interfaz para las pestañas
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`announcement-tabpanel-${index}`}
      aria-labelledby={`announcement-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const Announcements = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams] = useSearchParams();
  
  // Usar el contexto de anuncios
  const { announcements, loading, error, incrementViewCount } = useAnnouncements();
  
  // Estados locales
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<typeof announcements>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  // Cargar anuncios e incrementar contador de vistas si se proporciona un ID específico
  useEffect(() => {
    const announcementId = searchParams.get('id');
    if (announcementId) {
      incrementViewCount(announcementId);
    }
  }, [searchParams, incrementViewCount]);

  // Filtrar solo anuncios activos y ordenarlos
  useEffect(() => {
    // Filtrar anuncios activos
    const activeAnnouncements = announcements
      .filter(announcement => announcement.isActive)
      .sort((a, b) => {
        // Primero los fijados
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }
        // Luego por fecha de publicación (más recientes primero)
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
    
    setFilteredAnnouncements(activeAnnouncements);
  }, [announcements]);

  // Filtrar anuncios al cambiar el término de búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todos o filtrar por pestaña
      filterByTab(tabValue);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = announcements
      .filter(announcement => announcement.isActive)
      .filter(announcement => 
        announcement.title.toLowerCase().includes(term) ||
        announcement.content.toLowerCase().includes(term)
      );
    
    setFilteredAnnouncements(filtered);
  }, [searchTerm, announcements, tabValue]);

  // Manejadores
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    filterByTab(newValue);
  };
  
  const filterByTab = (tabIndex: number) => {
    // Si hay un término de búsqueda, no aplicar filtro de pestaña
    if (searchTerm.trim()) return;
    
    const activeAnnouncements = announcements.filter(announcement => announcement.isActive);
    
    if (tabIndex === 0) {
      // Todos los anuncios activos
      setFilteredAnnouncements(activeAnnouncements);
    } else {
      // Filtrar por tipo
      const types = ['general', 'course', 'event', 'maintenance'];
      const selectedType = types[tabIndex - 1]; // -1 porque la primera pestaña es "Todos"
      
      const filtered = activeAnnouncements.filter(
        announcement => announcement.type === selectedType
      );
      
      setFilteredAnnouncements(filtered);
    }
  };

  // Funciones de utilidad
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return 'Fecha inválida';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'general':
        return <AnnouncementIcon />;
      case 'course':
        return <SchoolIcon />;
      case 'event':
        return <EventIcon />;
      case 'maintenance':
        return <BuildIcon />;
      default:
        return <AnnouncementIcon />;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'primary';
      case 'course': return 'success';
      case 'event': return 'secondary';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  // Renderizado condicional para carga y error
  if (loading && filteredAnnouncements.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Anuncios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mantente al día con los últimos anuncios, eventos y actualizaciones.
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Buscar anuncios..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="announcement tabs"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
        >
          <Tab label="Todos" />
          <Tab label="General" />
          <Tab label="Cursos" />
          <Tab label="Eventos" />
          <Tab label="Mantenimiento" />
        </Tabs>
      </Box>
      
      {filteredAnnouncements.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">
            No se encontraron anuncios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No hay anuncios que coincidan con tu búsqueda o filtro seleccionado.
          </Typography>
        </Box>
      ) : (
        <TabPanel value={tabValue} index={tabValue}>
          <Grid container spacing={3}>
            {filteredAnnouncements.map(announcement => (
              <Grid item xs={12} key={announcement.id}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    position: 'relative',
                    border: announcement.isPinned ? 2 : 1,
                    borderColor: announcement.isPinned ? 'primary.main' : 'divider',
                  }}
                >
                  {announcement.isPinned && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        right: 10, 
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'primary.light',
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        opacity: 0.9
                      }}
                    >
                      <PushPinIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="bold">
                        Destacado
                      </Typography>
                    </Box>
                  )}
                  
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: `${getTypeColor(announcement.type)}.light`,
                          color: `${getTypeColor(announcement.type)}.main`,
                          mr: 2
                        }}
                      >
                        {getTypeIcon(announcement.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {announcement.title}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                          <Chip 
                            label={announcement.type} 
                            size="small" 
                            color={getTypeColor(announcement.type) as any} 
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            Publicado: {formatDate(announcement.publishDate)}
                          </Typography>
                          {announcement.expiryDate && (
                            <Typography variant="caption" color="text.secondary">
                              Válido hasta: {formatDate(announcement.expiryDate)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                      {announcement.content}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Por: {announcement.createdBy}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {announcement.viewCount || 0} vistas
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      component={Link}
                      to={`/announcements?id=${announcement.id}`}
                      onClick={() => incrementViewCount(announcement.id)}
                    >
                      Leer más
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      )}
    </Container>
  );
};

export default Announcements; 