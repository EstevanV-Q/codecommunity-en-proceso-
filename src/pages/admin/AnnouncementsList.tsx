import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  Divider,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  PushPin as PushPinIcon,
  Home as HomeIcon,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAnnouncements, Announcement } from '../../context/AnnouncementContext';

const AnnouncementsList = () => {
  // Usar el contexto de anuncios
  const { 
    announcements, 
    loading, 
    error, 
    deleteAnnouncement, 
    toggleActiveStatus,
    togglePinnedStatus,
    clearError
  } = useAnnouncements();

  // Estados locales
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Filtrar anuncios al cambiar el término de búsqueda o al actualizar los anuncios
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAnnouncements(announcements);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = announcements.filter(announcement => 
      announcement.title.toLowerCase().includes(term) ||
      announcement.type.toLowerCase().includes(term) ||
      announcement.targetAudience.toLowerCase().includes(term)
    );
    
    setFilteredAnnouncements(filtered);
  }, [searchTerm, announcements]);

  // Manejadores
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDeleteClick = (id: string) => {
    setAnnouncementToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!announcementToDelete) return;
    
    setActionInProgress(true);
    try {
      await deleteAnnouncement(announcementToDelete);
      setDeleteDialogOpen(false);
      setAnnouncementToDelete(null);
    } catch (err) {
      console.error('Error al eliminar anuncio:', err);
    } finally {
      setActionInProgress(false);
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAnnouncementToDelete(null);
  };
  
  const handleToggleStatus = async (id: string) => {
    setActionInProgress(true);
    try {
      await toggleActiveStatus(id);
    } catch (err) {
      console.error('Error al cambiar estado del anuncio:', err);
    } finally {
      setActionInProgress(false);
    }
  };
  
  const handleTogglePinned = async (id: string) => {
    setActionInProgress(true);
    try {
      await togglePinnedStatus(id);
    } catch (err) {
      console.error('Error al destacar/quitar destacado del anuncio:', err);
    } finally {
      setActionInProgress(false);
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
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'primary';
      case 'course': return 'success';
      case 'event': return 'secondary';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };
  
  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'all': return 'Todos';
      case 'students': return 'Estudiantes';
      case 'mentors': return 'Mentores';
      case 'admins': return 'Administradores';
      default: return audience;
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
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            component={RouterLink}
            to="/admin"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Admin
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <AnnouncementIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Anuncios
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            Gestión de Anuncios
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/admin/announcements/new"
            disabled={actionInProgress}
          >
            Crear Anuncio
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
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
        
        <Divider sx={{ mb: 3 }} />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Audiencia</TableCell>
                <TableCell>Publicación</TableCell>
                <TableCell>Expiración</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAnnouncements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No se encontraron anuncios
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {announcement.isPinned && (
                          <Tooltip title="Anuncio fijado">
                            <PushPinIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          </Tooltip>
                        )}
                        {announcement.title}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={announcement.type} 
                        color={getTypeColor(announcement.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{getAudienceLabel(announcement.targetAudience)}</TableCell>
                    <TableCell>{formatDate(announcement.publishDate)}</TableCell>
                    <TableCell>{announcement.expiryDate ? formatDate(announcement.expiryDate) : 'Sin expiración'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={announcement.isActive ? 'Activo' : 'Inactivo'} 
                        color={announcement.isActive ? 'success' : 'default'}
                        size="small"
                        onClick={() => handleToggleStatus(announcement.id)}
                        disabled={actionInProgress}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Ver anuncio">
                        <IconButton 
                          size="small" 
                          color="info"
                          component={RouterLink}
                          to={`/announcements?id=${announcement.id}`}
                          disabled={actionInProgress}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar anuncio">
                        <IconButton 
                          size="small" 
                          color="primary"
                          component={RouterLink}
                          to={`/admin/announcements/${announcement.id}`}
                          disabled={actionInProgress}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar anuncio">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteClick(announcement.id)}
                          disabled={actionInProgress}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={announcement.isPinned ? "Desfijar anuncio" : "Fijar anuncio"}>
                        <IconButton 
                          size="small" 
                          color={announcement.isPinned ? "primary" : "default"}
                          onClick={() => handleTogglePinned(announcement.id)}
                          disabled={actionInProgress}
                        >
                          <PushPinIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar este anuncio? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={actionInProgress}>Cancelar</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            autoFocus
            disabled={actionInProgress}
            startIcon={actionInProgress ? <CircularProgress size={20} /> : undefined}
          >
            {actionInProgress ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AnnouncementsList; 