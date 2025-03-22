import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Typography,
  Skeleton,
  Divider,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  School as SchoolIcon,
  Code as CodeIcon,
  Book as BookIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Build as BuildIcon,
  ChevronRight as ChevronRightIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { Resource } from '../admin/ResourceManager';

// Datos simulados para desarrollo (en producción, se cargarían desde una API)
import { sampleResources } from './sampleData';

// Mapeo de nombres de iconos a componentes de iconos reales
const iconMap: Record<string, React.ReactElement> = {
  SchoolIcon: <SchoolIcon />,
  CodeIcon: <CodeIcon />,
  BookIcon: <BookIcon />,
  QuestionAnswerIcon: <QuestionAnswerIcon />,
  DescriptionIcon: <DescriptionIcon />,
  SecurityIcon: <SecurityIcon />,
  PeopleIcon: <PeopleIcon />,
  SettingsIcon: <SettingsIcon />,
  BuildIcon: <BuildIcon />
};

interface DynamicResourcesProps {
  displayType?: 'list' | 'grid';
  category?: string;
  limit?: number;
  showHeader?: boolean;
}

const DynamicResources: React.FC<DynamicResourcesProps> = ({ 
  displayType = 'list',
  category,
  limit,
  showHeader = true
}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga de recursos desde API
    const fetchResources = async () => {
      try {
        setLoading(true);
        
        // En un entorno real, esto sería una llamada a API:
        // const response = await fetch('/api/resources');
        // const data = await response.json();
        
        // Simulación de retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredResources = [...sampleResources];
        
        // Filtrar por categoría si es necesario
        if (category) {
          filteredResources = filteredResources.filter(r => r.category === category);
        }
        
        // Filtrar recursos publicados
        filteredResources = filteredResources.filter(r => r.isPublished);
        
        // Limitar la cantidad si es necesario
        if (limit && limit > 0) {
          filteredResources = filteredResources.slice(0, limit);
        }
        
        setResources(filteredResources);
        setError(null);
      } catch (err) {
        console.error('Error al cargar recursos:', err);
        setError('No se pudieron cargar los recursos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, [category, limit]);
  
  // Renderizar lista de carga
  if (loading) {
    return (
      <Box>
        {showHeader && (
          <Typography variant="h6" gutterBottom>
            Recursos Adicionales
            <Skeleton width="100%" />
          </Typography>
        )}
        
        {displayType === 'list' ? (
          <List>
            {[...Array(limit || 4)].map((_, index) => (
              <ListItem key={index} divider={index < (limit || 4) - 1}>
                <ListItemIcon>
                  <Skeleton variant="circular" width={24} height={24} />
                </ListItemIcon>
                <ListItemText 
                  primary={<Skeleton width="60%" />} 
                  secondary={<Skeleton width="80%" />} 
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Grid container spacing={2}>
            {[...Array(limit || 4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  }
  
  // Mostrar mensaje de error si hay problemas al cargar
  if (error) {
    return (
      <Alert 
        severity="error" 
        icon={<ErrorIcon />}
        action={
          <Button color="inherit" size="small" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }
  
  // Mostrar mensaje si no hay recursos
  if (resources.length === 0) {
    return (
      <Alert severity="info">
        No hay recursos disponibles en este momento.
      </Alert>
    );
  }
  
  // Renderizar recursos según el tipo de visualización solicitado
  return (
    <Box>
      {showHeader && (
        <Typography variant="h6" gutterBottom>
          Recursos Adicionales
        </Typography>
      )}
      
      {displayType === 'list' ? (
        <Paper variant="outlined">
          <List>
            {resources.map((resource, index) => (
              <React.Fragment key={resource.id}>
                <ListItem 
                  component={RouterLink} 
                  to={resource.url}
                  sx={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon>
                    {iconMap[resource.icon] || <DescriptionIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={resource.title}
                    secondary={resource.description}
                  />
                  <ChevronRightIcon color="action" />
                </ListItem>
                {index < resources.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {resources.map(resource => (
            <Grid item xs={12} sm={6} md={limit && limit <= 4 ? 3 : 4} key={resource.id}>
              <Card>
                <CardActionArea 
                  component={RouterLink} 
                  to={resource.url}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Box sx={{ 
                        mr: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: 48, 
                        height: 48, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.50',
                        color: 'primary.main'
                      }}>
                        {iconMap[resource.icon] || <DescriptionIcon />}
                      </Box>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {resource.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {resource.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DynamicResources; 