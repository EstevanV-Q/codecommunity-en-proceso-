import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  VideoLibrary,
  Description,
  Assignment,
  Edit,
  Delete,
  Add,
  Schedule,
  Visibility,
  Download,
  Upload,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  content: ContentItem[];
}

interface ContentItem {
  id: string;
  type: 'video' | 'document' | 'assignment';
  title: string;
  description: string;
  uploadDate: string;
  views: number;
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
}

const ContentManagement: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    type: 'video',
    title: '',
    description: '',
    status: 'draft',
  });

  // Mock data - En producción esto vendría de una API
  useEffect(() => {
    setCourses([
      {
        id: '1',
        title: 'Introducción a React',
        description: 'Curso básico de React para principiantes',
        students: 45,
        content: [
          {
            id: '1',
            type: 'video',
            title: 'Componentes en React',
            description: 'Aprende a crear y usar componentes en React',
            uploadDate: '2024-04-20',
            views: 120,
            status: 'published',
          },
          {
            id: '2',
            type: 'document',
            title: 'Guía de Hooks',
            description: 'Documentación completa sobre React Hooks',
            uploadDate: '2024-04-21',
            views: 85,
            status: 'published',
          },
        ],
      },
    ]);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAddContent = () => {
    if (selectedCourse) {
      const newContentItem: ContentItem = {
        id: Date.now().toString(),
        type: newContent.type as 'video' | 'document' | 'assignment',
        title: newContent.title || '',
        description: newContent.description || '',
        uploadDate: new Date().toISOString().split('T')[0],
        views: 0,
        status: newContent.status as 'published' | 'draft' | 'scheduled',
        scheduledDate: newContent.scheduledDate,
      };

      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === selectedCourse.id
            ? { ...course, content: [...course.content, newContentItem] }
            : course
        )
      );
      setOpenDialog(false);
      setNewContent({
        type: 'video',
        title: '',
        description: '',
        status: 'draft',
      });
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoLibrary />;
      case 'document':
        return <Description />;
      case 'assignment':
        return <Assignment />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'scheduled':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Lista de Cursos */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Mis Cursos
            </Typography>
            <List>
              {courses.map((course) => (
                <ListItem
                  key={course.id}
                  button
                  selected={selectedCourse?.id === course.id}
                  onClick={() => setSelectedCourse(course)}
                >
                  <ListItemText
                    primary={course.title}
                    secondary={`${course.students} estudiantes`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Contenido del Curso */}
        <Grid item xs={12} md={8}>
          {selectedCourse ? (
            <Paper sx={{ p: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Contenido" />
                  <Tab label="Estadísticas" />
                  <Tab label="Programación" />
                </Tabs>
              </Box>

              {selectedTab === 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Contenido del Curso</Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setOpenDialog(true)}
                    >
                      Agregar Contenido
                    </Button>
                  </Box>

                  <List>
                    {selectedCourse.content.map((item) => (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Box>
                            <IconButton edge="end" aria-label="edit">
                              <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <Delete />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemIcon>{getContentIcon(item.type)}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <Box>
                              <Typography variant="body2">{item.description}</Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip
                                  size="small"
                                  label={item.status}
                                  color={getStatusColor(item.status) as any}
                                />
                                <Chip
                                  size="small"
                                  icon={<Visibility />}
                                  label={`${item.views} vistas`}
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {selectedTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Estadísticas de Contenido
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedCourse.content.map((item) => (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{item.title}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                              <Visibility sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                {item.views} vistas
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(item.views / selectedCourse.students) * 100}
                              sx={{ mt: 1 }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {selectedTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Contenido Programado
                  </Typography>
                  <List>
                    {selectedCourse.content
                      .filter((item) => item.status === 'scheduled')
                      .map((item) => (
                        <ListItem key={item.id}>
                          <ListItemIcon>
                            <Schedule />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            secondary={`Programado para: ${item.scheduledDate}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              )}
            </Paper>
          ) : (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">
                Selecciona un curso para ver su contenido
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Diálogo para agregar nuevo contenido */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nuevo Contenido</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Contenido</InputLabel>
              <Select
                value={newContent.type}
                label="Tipo de Contenido"
                onChange={(e) =>
                  setNewContent({ ...newContent, type: e.target.value as any })
                }
              >
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="document">Documento</MenuItem>
                <MenuItem value="assignment">Tarea</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Título"
              fullWidth
              value={newContent.title}
              onChange={(e) =>
                setNewContent({ ...newContent, title: e.target.value })
              }
            />

            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              value={newContent.description}
              onChange={(e) =>
                setNewContent({ ...newContent, description: e.target.value })
              }
            />

            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={newContent.status}
                label="Estado"
                onChange={(e) =>
                  setNewContent({ ...newContent, status: e.target.value as any })
                }
              >
                <MenuItem value="published">Publicado</MenuItem>
                <MenuItem value="draft">Borrador</MenuItem>
                <MenuItem value="scheduled">Programado</MenuItem>
              </Select>
            </FormControl>

            {newContent.status === 'scheduled' && (
              <TextField
                label="Fecha Programada"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newContent.scheduledDate}
                onChange={(e) =>
                  setNewContent({ ...newContent, scheduledDate: e.target.value })
                }
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddContent} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContentManagement; 