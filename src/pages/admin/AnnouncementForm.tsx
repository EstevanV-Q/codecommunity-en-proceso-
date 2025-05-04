import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  FormControlLabel, 
  Switch, 
  Grid,
  MenuItem,
  IconButton,
  Divider,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { 
  Save as SaveIcon, 
  Preview as PreviewIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';
import { useAnnouncements, Announcement } from '../../context/AnnouncementContext';

// Tipo para los datos del formulario
type FormData = Omit<Announcement, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>;
 
const AnnouncementForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Usar el contexto de anuncios
  const { 
    getAnnouncementById, 
    addAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement,
    loading: contextLoading,
    error: contextError
  } = useAnnouncements();
  
  // Estado inicial para un nuevo anuncio
  const initialFormState: FormData = {
    title: '',
    content: '',
    type: 'general',
    isActive: true,
    isPinned: false,
    publishDate: new Date().toISOString(),
    expiryDate: null,
    targetAudience: 'all',
    createdBy: 'Admin', // Esto podría venir del contexto de autenticación
  };
  
  // Estados para el formulario
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      
      // Obtener el anuncio existente
      const existingAnnouncement = getAnnouncementById(id);
      
      if (existingAnnouncement) {
        // Extraer solo los campos necesarios para el formulario
        const { id: _, createdAt: __, updatedAt: ___, viewCount: ____, ...formFields } = existingAnnouncement;
        setFormData(formFields);
      } else {
        // Si no se encuentra el anuncio, mostrar error y redirigir
        setNotification({
          open: true,
          message: 'No se encontró el anuncio solicitado',
          severity: 'error'
        });
        
        setTimeout(() => {
          navigate('/admin/announcements');
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [id, isEditMode, getAnnouncementById, navigate]);

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
      isValid = false;
    } else if (formData.content.length < 10) {
      newErrors.content = 'El contenido debe tener al menos 10 caracteres';
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = 'El tipo es requerido';
      isValid = false;
    }

    if (!formData.targetAudience) {
      newErrors.targetAudience = 'La audiencia objetivo es requerida';
      isValid = false;
    }

    // Validar fecha de publicación
    if (!formData.publishDate) {
      newErrors.publishDate = 'La fecha de publicación es requerida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar el error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      type: e.target.value as 'general' | 'course' | 'event' | 'maintenance'
    }));
    
    // Limpiar error
    if (errors.type) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.type;
        return newErrors;
      });
    }
  };
  
  const handleAudienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      targetAudience: e.target.value as 'all' | 'students' | 'mentors' | 'admins'
    }));
    
    // Limpiar error
    if (errors.targetAudience) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.targetAudience;
        return newErrors;
      });
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    try {
      // Convertir el valor del input date-time a ISO string
      const dateValue = value ? new Date(value).toISOString() : null;
      
      setFormData(prevData => ({
        ...prevData,
        [name]: dateValue
      }));
      
      // Limpiar error
      if (errors[name]) {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error al convertir fecha:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: 'Formato de fecha inválido'
      }));
    }
  };
  
  // Manejar envío del formulario
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotification({
        open: true,
        message: 'Por favor, corrija los errores en el formulario',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditMode && id) {
        // Actualizar anuncio existente
        await updateAnnouncement(id, formData);
        
        setNotification({
          open: true,
          message: 'Anuncio actualizado correctamente',
          severity: 'success'
        });
      } else {
        // Crear nuevo anuncio
        await addAnnouncement(formData);
        
        setNotification({
          open: true,
          message: 'Anuncio creado correctamente',
          severity: 'success'
        });
      }
      
      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate('/admin/announcements');
      }, 1500);
    } catch (error) {
      console.error('Error al guardar el anuncio:', error);
      setNotification({
        open: true,
        message: 'Error al guardar el anuncio. Por favor, intenta de nuevo más tarde.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreview = () => {
    // Abrir una nueva ventana para previsualizar el anuncio
    const previewWindow = window.open('/announcements', '_blank');
    
    // No podemos pasar datos directamente, pero podríamos usar localStorage
    if (previewWindow) {
      localStorage.setItem('previewAnnouncement', JSON.stringify(formData));
    }
  };
  
  const handleDelete = async () => {
    if (!isEditMode || !id) return;
    
    if (window.confirm('¿Estás seguro que deseas eliminar este anuncio? Esta acción no se puede deshacer.')) {
      setLoading(true);
      
      try {
        await deleteAnnouncement(id);
        
        setNotification({
          open: true,
          message: 'Anuncio eliminado correctamente',
          severity: 'success'
        });
        
        // Redirigir después de un breve retraso
        setTimeout(() => {
          navigate('/admin/announcements');
        }, 1500);
      } catch (error) {
        console.error('Error al eliminar el anuncio:', error);
        setNotification({
          open: true,
          message: 'Error al eliminar el anuncio. Por favor, intenta de nuevo más tarde.',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Función para formatear fechas para inputs
  const formatDateForInput = (dateString: string | null): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Formato YYYY-MM-DDTHH:MM para input datetime-local
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  };

  // Mostrar cargando mientras se obtienen los datos
  if ((loading || contextLoading) && isEditMode) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {contextError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {contextError}
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
          <Link
            component={RouterLink}
            to="/admin/announcements"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AnnouncementIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Anuncios
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            {isEditMode ? 'Editar Anuncio' : 'Nuevo Anuncio'}
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            {isEditMode ? 'Editar Anuncio' : 'Crear Nuevo Anuncio'}
          </Typography>
          
          <Box>
            {isEditMode && (
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />} 
                onClick={handleDelete}
                sx={{ mr: 2 }}
                disabled={loading}
              >
                Eliminar
              </Button>
            )}
            <Button 
              variant="outlined" 
              startIcon={<PreviewIcon />} 
              onClick={handlePreview}
              sx={{ mr: 2 }}
              disabled={loading}
            >
              Vista Previa
            </Button>
            <Button 
              variant="contained" 
              startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
              onClick={handleSaveAnnouncement}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handleSaveAnnouncement}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título del anuncio"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                required
                variant="outlined"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contenido"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                error={!!errors.content}
                helperText={errors.content}
                required
                variant="outlined"
                multiline
                rows={6}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Tipo de anuncio"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                error={!!errors.type}
                helperText={errors.type}
                variant="outlined"
                disabled={loading}
                required
              >
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="course">Curso</MenuItem>
                <MenuItem value="event">Evento</MenuItem>
                <MenuItem value="maintenance">Mantenimiento</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Audiencia objetivo"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleAudienceChange}
                error={!!errors.targetAudience}
                helperText={errors.targetAudience}
                variant="outlined"
                disabled={loading}
                required
              >
                <MenuItem value="all">Todos los usuarios</MenuItem>
                <MenuItem value="students">Solo estudiantes</MenuItem>
                <MenuItem value="mentors">Solo mentores</MenuItem>
                <MenuItem value="admins">Solo administradores</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de publicación"
                name="publishDate"
                type="datetime-local"
                value={formatDateForInput(formData.publishDate)}
                onChange={handleDateChange}
                error={!!errors.publishDate}
                helperText={errors.publishDate}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={loading}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de expiración (opcional)"
                name="expiryDate"
                type="datetime-local"
                value={formatDateForInput(formData.expiryDate)}
                onChange={handleDateChange}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                    color="primary"
                    disabled={loading}
                  />
                }
                label="Anuncio activo"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPinned}
                    onChange={handleInputChange}
                    name="isPinned"
                    color="primary"
                    disabled={loading}
                  />
                }
                label="Fijar anuncio (aparecerá destacado)"
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AnnouncementForm; 