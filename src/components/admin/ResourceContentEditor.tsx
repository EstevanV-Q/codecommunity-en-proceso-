import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Preview as PreviewIcon, 
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Resource } from './ResourceManager';

// Tipos de secciones para diferentes recursos
interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'code' | 'image' | 'list';
  order: number;
}

// Tipo para el contenido completo de un recurso
interface ResourceContent {
  resourceId: string;
  title: string;
  description: string;
  sections: ContentSection[];
  updatedAt: string;
}

// Datos simulados de contenido para cada recurso
const mockResourceContents: { [key: string]: ResourceContent } = {
  '1': { // Tutoriales
    resourceId: '1',
    title: 'Tutoriales',
    description: 'Colección de tutoriales para mejorar tus habilidades de programación',
    sections: [
      {
        id: '1-1',
        title: 'Introducción a los Tutoriales',
        content: 'Bienvenido a nuestra sección de tutoriales. Aquí encontrarás guías paso a paso sobre diferentes tecnologías y conceptos de programación.',
        type: 'text',
        order: 1
      },
      {
        id: '1-2',
        title: 'Categorías Disponibles',
        content: 'Ofrecemos tutoriales en las siguientes categorías:\n- Desarrollo Web\n- Ciencia de Datos\n- Desarrollo Móvil\n- Inteligencia Artificial\n- Ciberseguridad',
        type: 'list',
        order: 2
      },
      {
        id: '1-3',
        title: 'Ejemplo de Código',
        content: 'function helloWorld() {\n  console.log("¡Hola mundo!");\n}\n\nhelloWorld();',
        type: 'code',
        order: 3
      }
    ],
    updatedAt: '2023-03-20T15:30:00Z'
  },
  '2': { // Documentación
    resourceId: '2',
    title: 'Documentación',
    description: 'Documentación técnica de la plataforma',
    sections: [
      {
        id: '2-1',
        title: 'Estructura de la Documentación',
        content: 'Nuestra documentación está organizada en secciones temáticas para facilitar la navegación y búsqueda de información.',
        type: 'text',
        order: 1
      },
      {
        id: '2-2',
        title: 'APIs Disponibles',
        content: 'Ofrecemos varias APIs para integrar con nuestra plataforma:\n- API de Usuarios\n- API de Contenido\n- API de Analytics',
        type: 'list',
        order: 2
      }
    ],
    updatedAt: '2023-03-21T10:15:00Z'
  },
  '3': { // Normas de la Comunidad
    resourceId: '3',
    title: 'Normas de la Comunidad',
    description: 'Directrices para participar en nuestra comunidad',
    sections: [
      {
        id: '3-1',
        title: 'Comportamiento Esperado',
        content: 'En nuestra comunidad esperamos que todos los miembros se comporten con respeto y profesionalismo.',
        type: 'text',
        order: 1
      },
      {
        id: '3-2',
        title: 'Contenido Prohibido',
        content: 'No se permite compartir:\n- Contenido ofensivo\n- Información personal de otros usuarios\n- Enlaces a sitios maliciosos',
        type: 'list',
        order: 2
      }
    ],
    updatedAt: '2023-03-22T14:45:00Z'
  }
};

// Tipos de pestañas del editor
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
      id={`resource-tabpanel-${index}`}
      aria-labelledby={`resource-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Componente principal
const ResourceContentEditor = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resourceContent, setResourceContent] = useState<ResourceContent | null>(null);
  const [resource, setResource] = useState<Resource | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Cargar datos del recurso y su contenido
  useEffect(() => {
    const loadResourceContent = async () => {
      try {
        setLoading(true);
        
        // Simulación de carga (en producción, esto sería una llamada a API)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!resourceId) {
          throw new Error('ID de recurso no proporcionado');
        }
        
        // Obtener datos del recurso (esto vendría de una API real)
        const mockResource = {
          id: resourceId,
          title: mockResourceContents[resourceId]?.title || 'Recurso',
          description: mockResourceContents[resourceId]?.description || 'Descripción no disponible',
          type: 'guide' as const,
          url: `/resource/${resourceId}`,
          icon: 'DescriptionIcon',
          category: 'learning',
          isPublished: true,
          createdAt: '2023-03-01T10:00:00Z',
          updatedAt: '2023-03-10T15:30:00Z'
        };
        
        setResource(mockResource);
        
        // Obtener contenido del recurso
        const content = mockResourceContents[resourceId];
        if (!content) {
          // Si no existe contenido, crear uno nuevo
          const newContent: ResourceContent = {
            resourceId,
            title: mockResource.title,
            description: mockResource.description,
            sections: [],
            updatedAt: new Date().toISOString()
          };
          setResourceContent(newContent);
        } else {
          setResourceContent(content);
        }
        
        setError(null);
      } catch (err: any) {
        console.error('Error al cargar contenido del recurso:', err);
        setError(err.message || 'Error al cargar el contenido del recurso');
      } finally {
        setLoading(false);
      }
    };
    
    loadResourceContent();
  }, [resourceId]);

  // Manejadores de eventos
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleSaveContent = async () => {
    try {
      setLoading(true);
      
      // Simular guardar en API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Actualizar fecha de actualización
      if (resourceContent) {
        setResourceContent({
          ...resourceContent,
          updatedAt: new Date().toISOString()
        });
      }
      
      setNotification({
        open: true,
        message: 'Contenido guardado correctamente',
        severity: 'success'
      });
    } catch (err: any) {
      console.error('Error al guardar el contenido:', err);
      setNotification({
        open: true,
        message: 'Error al guardar el contenido: ' + (err.message || 'Error desconocido'),
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreview = () => {
    // En una aplicación real, esto podría navegar a una vista previa
    window.open(`/preview/resource/${resourceId}`, '_blank');
  };
  
  const handleAddSection = () => {
    // Crear nueva sección
    const newSection: ContentSection = {
      id: `${resourceId}-${Date.now()}`,
      title: 'Nueva sección',
      content: 'Contenido de la sección...',
      type: 'text',
      order: resourceContent?.sections.length ? Math.max(...resourceContent.sections.map(s => s.order)) + 1 : 1
    };
    
    setEditingSection(newSection);
    setOpenDialog(true);
  };
  
  const handleEditSection = (section: ContentSection) => {
    setEditingSection({ ...section });
    setOpenDialog(true);
  };
  
  const handleDeleteSection = (sectionId: string) => {
    if (!resourceContent) return;
    
    const updatedSections = resourceContent.sections.filter(section => section.id !== sectionId);
    
    setResourceContent({
      ...resourceContent,
      sections: updatedSections
    });
    
    setNotification({
      open: true,
      message: 'Sección eliminada correctamente',
      severity: 'success'
    });
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSection(null);
  };
  
  const handleSaveSection = () => {
    if (!resourceContent || !editingSection) return;
    
    const isNewSection = !resourceContent.sections.some(section => section.id === editingSection.id);
    
    let updatedSections;
    if (isNewSection) {
      updatedSections = [...resourceContent.sections, editingSection];
    } else {
      updatedSections = resourceContent.sections.map(section => 
        section.id === editingSection.id ? editingSection : section
      );
    }
    
    // Ordenar secciones por orden
    updatedSections.sort((a, b) => a.order - b.order);
    
    setResourceContent({
      ...resourceContent,
      sections: updatedSections
    });
    
    setNotification({
      open: true,
      message: `Sección ${isNewSection ? 'añadida' : 'actualizada'} correctamente`,
      severity: 'success'
    });
    
    handleCloseDialog();
  };
  
  const handleSectionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingSection) return;
    
    const { name, value } = e.target;
    setEditingSection({
      ...editingSection,
      [name]: value
    });
  };
  
  const handleSectionTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingSection) return;
    
    setEditingSection({
      ...editingSection,
      type: e.target.value as 'text' | 'code' | 'image' | 'list'
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Renderizado de carga
  if (loading && !resourceContent) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Renderizado de error
  if (error) {
    return (
      <Alert 
        severity="error" 
        action={
          <Button color="inherit" size="small" onClick={() => navigate(-1)}>
            Volver
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (!resourceContent || !resource) {
    return (
      <Alert severity="warning">
        No se pudo cargar el contenido del recurso.
      </Alert>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Editor de Contenido: {resource.title}
          </Typography>
          
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<PreviewIcon />} 
              onClick={handlePreview}
              sx={{ mr: 2 }}
            >
              Vista Previa
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />} 
              onClick={handleSaveContent}
              disabled={loading}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Última actualización: {new Date(resourceContent.updatedAt).toLocaleString()}
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="editor tabs">
          <Tab label="Información General" />
          <Tab label="Secciones de Contenido" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={resourceContent.title}
                onChange={(e) => setResourceContent({ ...resourceContent, title: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={resourceContent.description}
                onChange={(e) => setResourceContent({ ...resourceContent, description: e.target.value })}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Secciones de Contenido
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleAddSection}
            >
              Añadir Sección
            </Button>
          </Box>
          
          {resourceContent.sections.length === 0 ? (
            <Alert severity="info" sx={{ my: 2 }}>
              No hay secciones de contenido. Haz clic en "Añadir Sección" para comenzar a crear contenido.
            </Alert>
          ) : (
            resourceContent.sections.map((section, index) => (
              <Paper key={section.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {index + 1}. {section.title}
                  </Typography>
                  <Box>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />} 
                      onClick={() => handleEditSection(section)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button 
                      size="small" 
                      color="error" 
                      startIcon={<DeleteIcon />} 
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tipo: {section.type}
                  </Typography>
                  
                  {section.type === 'code' ? (
                    <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'grey.100', fontFamily: 'monospace', overflow: 'auto' }}>
                      <pre>{section.content}</pre>
                    </Paper>
                  ) : section.type === 'list' ? (
                    <Box component="div" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>').replace(/- /g, '• ') }} />
                  ) : (
                    <Typography variant="body1">{section.content}</Typography>
                  )}
                </Box>
              </Paper>
            ))
          )}
        </TabPanel>
      </Paper>
      
      {/* Diálogo para añadir/editar sección */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingSection?.id.includes(`${resourceId}-`) ? 'Editar Sección' : 'Añadir Nueva Sección'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Título de la Sección"
                name="title"
                value={editingSection?.title || ''}
                onChange={handleSectionInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Orden"
                name="order"
                type="number"
                value={editingSection?.order || 1}
                onChange={handleSectionInputChange}
                helperText="Posición en la que aparecerá"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Tipo de Contenido"
                name="type"
                value={editingSection?.type || 'text'}
                onChange={handleSectionTypeChange}
                helperText="Selecciona el formato en que se mostrará el contenido"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="text">Texto</option>
                <option value="list">Lista</option>
                <option value="code">Código</option>
                <option value="image">Imagen</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contenido"
                name="content"
                multiline
                rows={6}
                value={editingSection?.content || ''}
                onChange={handleSectionInputChange}
                helperText={
                  editingSection?.type === 'list' 
                    ? 'Para listas, usa guiones (-) al principio de cada elemento' 
                    : editingSection?.type === 'code'
                      ? 'Escribe el código sin formato ni resaltado' 
                      : ''
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveSection}
          >
            Guardar
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

export default ResourceContentEditor; 