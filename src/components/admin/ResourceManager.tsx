import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { useAdmin } from '../../context/AdminContext';
import { Link as RouterLink } from 'react-router-dom';

// Tipos para los recursos
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'tutorial' | 'documentation' | 'guide' | 'faq' | 'policy';
  url: string;
  icon: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Iconos disponibles para los recursos
const availableIcons = [
  { value: 'SchoolIcon', label: 'Educación' },
  { value: 'CodeIcon', label: 'Código' },
  { value: 'BookIcon', label: 'Libro' },
  { value: 'QuestionAnswerIcon', label: 'Preguntas' },
  { value: 'DescriptionIcon', label: 'Documento' },
  { value: 'SecurityIcon', label: 'Seguridad' },
  { value: 'PeopleIcon', label: 'Comunidad' },
  { value: 'SettingsIcon', label: 'Configuración' },
  { value: 'BuildIcon', label: 'Herramientas' }
];

// Categorías de recursos
const resourceCategories = [
  { value: 'learning', label: 'Aprendizaje' },
  { value: 'community', label: 'Comunidad' },
  { value: 'policy', label: 'Políticas' },
  { value: 'technical', label: 'Técnico' },
  { value: 'support', label: 'Soporte' }
];

// Tipos de recursos
const resourceTypes = [
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'documentation', label: 'Documentación' },
  { value: 'guide', label: 'Guía' },
  { value: 'faq', label: 'FAQ' },
  { value: 'policy', label: 'Política' }
];

// Datos de ejemplo para recursos
const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Tutoriales',
    description: 'Colección de tutoriales para mejorar tus habilidades de programación',
    type: 'tutorial',
    url: '/tutorials',
    icon: 'SchoolIcon',
    category: 'learning',
    isPublished: true,
    createdAt: '2023-03-01T10:00:00Z',
    updatedAt: '2023-03-10T15:30:00Z'
  },
  {
    id: '2',
    title: 'Documentación',
    description: 'Documentación técnica de la plataforma',
    type: 'documentation',
    url: '/documentation',
    icon: 'CodeIcon',
    category: 'technical',
    isPublished: true,
    createdAt: '2023-03-02T09:15:00Z',
    updatedAt: '2023-03-12T11:45:00Z'
  },
  {
    id: '3',
    title: 'Normas de la Comunidad',
    description: 'Directrices para participar en nuestra comunidad',
    type: 'policy',
    url: '/community-guidelines',
    icon: 'PeopleIcon',
    category: 'community',
    isPublished: true,
    createdAt: '2023-03-03T14:20:00Z',
    updatedAt: '2023-03-15T16:10:00Z'
  },
  {
    id: '4',
    title: 'Preguntas Frecuentes',
    description: 'Respuestas a las preguntas más comunes',
    type: 'faq',
    url: '/faq',
    icon: 'QuestionAnswerIcon',
    category: 'support',
    isPublished: true,
    createdAt: '2023-03-04T11:30:00Z',
    updatedAt: '2023-03-16T10:20:00Z'
  },
  {
    id: '5',
    title: 'Política de Privacidad',
    description: 'Información sobre cómo manejamos tus datos',
    type: 'policy',
    url: '/privacy',
    icon: 'SecurityIcon',
    category: 'policy',
    isPublished: true,
    createdAt: '2023-03-05T13:45:00Z',
    updatedAt: '2023-03-17T09:30:00Z'
  }
];

const ResourceManager: React.FC = () => {
  const { checkPermission } = useAdmin();
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: '',
    description: '',
    type: 'tutorial',
    url: '',
    icon: 'SchoolIcon',
    category: 'learning',
    isPublished: true
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // En una aplicación real, esto cargaría los recursos desde una API
  useEffect(() => {
    // Simulando carga de datos
    console.log('Cargando recursos...');
    // En un entorno real: fetchResources()
  }, []);

  // Manejadores de eventos
  const handleOpenDialog = (mode: 'add' | 'edit', resource?: Resource) => {
    setDialogMode(mode);
    if (mode === 'edit' && resource) {
      setCurrentResource(resource);
      setFormData(resource);
    } else {
      setCurrentResource(null);
      setFormData({
        title: '',
        description: '',
        type: 'tutorial',
        url: '',
        icon: 'SchoolIcon',
        category: 'learning',
        isPublished: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Manejador para cambios en inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value
    }));
  };

  // Manejador específico para cambios en selects
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSaveResource = () => {
    if (!formData.title || !formData.url) {
      setNotification({
        open: true,
        message: 'El título y la URL son obligatorios',
        severity: 'error'
      });
      return;
    }

    if (dialogMode === 'add') {
      // Crear nuevo recurso
      const newResource: Resource = {
        id: Date.now().toString(),
        ...formData as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResources([...resources, newResource]);
      setNotification({
        open: true,
        message: 'Recurso añadido correctamente',
        severity: 'success'
      });
    } else if (dialogMode === 'edit' && currentResource) {
      // Actualizar recurso existente
      const updatedResources = resources.map(resource => 
        resource.id === currentResource.id 
          ? { ...resource, ...formData, updatedAt: new Date().toISOString() } 
          : resource
      );
      setResources(updatedResources);
      setNotification({
        open: true,
        message: 'Recurso actualizado correctamente',
        severity: 'success'
      });
    }

    handleCloseDialog();
  };

  const handleDeleteResource = (id: string) => {
    // En un entorno real, podríamos mostrar un diálogo de confirmación
    setResources(resources.filter(resource => resource.id !== id));
    setNotification({
      open: true,
      message: 'Recurso eliminado correctamente',
      severity: 'success'
    });
  };

  const handleTogglePublish = (id: string) => {
    setResources(resources.map(resource => 
      resource.id === id 
        ? { ...resource, isPublished: !resource.isPublished, updatedAt: new Date().toISOString() } 
        : resource
    ));
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Mapear categorías a colores
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'primary';
      case 'community': return 'secondary';
      case 'policy': return 'error';
      case 'technical': return 'info';
      case 'support': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Administración de Recursos
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenDialog('add')}
          disabled={false} // No verificamos permisos por ahora
        >
          Añadir Recurso
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Última actualización</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
                      {resource.title}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={resourceCategories.find(cat => cat.value === resource.category)?.label || resource.category} 
                      color={getCategoryColor(resource.category) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {resourceTypes.find(type => type.value === resource.type)?.label || resource.type}
                  </TableCell>
                  <TableCell>{resource.url}</TableCell>
                  <TableCell>
                    <Chip 
                      label={resource.isPublished ? 'Publicado' : 'Borrador'} 
                      color={resource.isPublished ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(resource.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      href={resource.url} 
                      target="_blank"
                      title="Ver recurso"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDialog('edit', resource)}
                      title="Editar recurso"
                      disabled={false}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDeleteResource(resource.id)}
                      title="Eliminar recurso"
                      color="error"
                      disabled={false} 
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      component={RouterLink}
                      to={`/admin/resources/${resource.id}`}
                      sx={{ ml: 1 }}
                    >
                      Editar Contenido
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Diálogo para añadir/editar recursos */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Añadir Nuevo Recurso' : 'Editar Recurso'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth
                label="Título"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth
                label="URL"
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                required
                helperText="Por ejemplo: /tutorials, /documentation, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="category"
                  value={formData.category || 'learning'}
                  label="Categoría"
                  onChange={handleSelectChange} // Usar el manejador específico para selects
                >
                  {resourceCategories.map(category => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  name="type"
                  value={formData.type || 'tutorial'}
                  label="Tipo"
                  onChange={handleSelectChange} // Usar el manejador específico para selects
                >
                  {resourceTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Icono</InputLabel>
                <Select
                  name="icon"
                  value={formData.icon || 'SchoolIcon'}
                  label="Icono"
                  onChange={handleSelectChange} // Usar el manejador específico para selects
                >
                  {availableIcons.map(icon => (
                    <MenuItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Typography variant="subtitle2" gutterBottom>
                  Estado de publicación
                </Typography>
                <Select
                  name="isPublished"
                  value={formData.isPublished ? 'true' : 'false'}
                  onChange={(e: SelectChangeEvent) => {
                    setFormData(prev => ({
                      ...prev,
                      isPublished: e.target.value === 'true'
                    }));
                  }}
                  size="small"
                >
                  <MenuItem value="true">Publicado</MenuItem>
                  <MenuItem value="false">Borrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSaveResource} 
            variant="contained"
          >
            {dialogMode === 'add' ? 'Añadir' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación de éxito/error */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResourceManager; 