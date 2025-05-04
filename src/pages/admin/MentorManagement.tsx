import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Alert,
  Snackbar,
  TablePagination,
  Tooltip,
  Grid,
  Rating,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  School as SchoolIcon,
  WorkHistory as WorkHistoryIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarMonth as CalendarMonthIcon,
  VerifiedUser as VerifiedUserIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { Mentor, MentorLevel, MentorSpecialty, MentorStatus } from '../../types/roles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mentor-tabpanel-${index}`}
      aria-labelledby={`mentor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface MentorSession {
  id: string;
  studentName: string;
  date: string;
  duration: number;
  status: 'completed' | 'scheduled' | 'cancelled';
  rating?: number;
  feedback?: string;
}

interface MentorCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
}

interface MentorAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface MentorFormData {
  name: string;
  email: string;
  level: MentorLevel;
  specialties: MentorSpecialty[];
  status: MentorStatus;
  availability: {
    hoursPerWeek: number;
    timeZone: string;
    preferredHours: string[];
  };
  experience: {
    yearsOfExperience: number;
    technologies: string[];
    languages: string[];
  };
}

interface MentorCourse {
  id: string;
  title: string;
  description: string;
  students: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
}

const INITIAL_FORM_DATA: MentorFormData = {
  name: '',
  email: '',
  level: 'junior',
  specialties: [],
  status: 'active',
  availability: {
    hoursPerWeek: 20,
    timeZone: 'UTC-3',
    preferredHours: []
  },
  experience: {
    yearsOfExperience: 0,
    technologies: [],
    languages: []
  }
};

const MentorManagement = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [certifications, setCertifications] = useState<MentorCertification[]>([]);
  const [availability, setAvailability] = useState<MentorAvailability[]>([]);
  const [formData, setFormData] = useState<MentorFormData>(INITIAL_FORM_DATA);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      // Simulación de carga de datos
      const mockMentors: Mentor[] = [
        {
          id: '1',
          name: 'Ana García',
          email: 'ana@example.com',
          level: 'senior',
          specialties: ['frontend', 'mobile'],
          status: 'active',
          createdAt: new Date().toISOString(),
          availability: {
            hoursPerWeek: 20,
            timeZone: 'UTC-3',
            preferredHours: ['9:00', '14:00', '18:00']
          },
          experience: {
            yearsOfExperience: 5,
            technologies: ['React', 'React Native', 'TypeScript'],
            languages: ['Español', 'Inglés']
          },
          metrics: {
            studentsHelped: 45,
            averageRating: 4.8,
            completedSessions: 120,
            successRate: 0.95
          },
          pricing: {
            hourlyRate: 50,
            currency: 'USD',
            packages: [
              {
                hours: 5,
                price: 225,
                description: 'Paquete básico'
              },
              {
                hours: 10,
                price: 400,
                description: 'Paquete estándar'
              }
            ]
          }
        }
      ];
      setMentors(mockMentors);

      // Simulación de sesiones
      const mockSessions: MentorSession[] = [
        {
          id: '1',
          studentName: 'Carlos Pérez',
          date: '2024-03-20T15:00:00',
          duration: 60,
          status: 'completed',
          rating: 5,
          feedback: 'Excelente sesión, muy clara la explicación'
        },
        {
          id: '2',
          studentName: 'María López',
          date: '2024-03-25T10:00:00',
          duration: 90,
          status: 'scheduled'
        }
      ];
      setSessions(mockSessions);

      // Simulación de certificaciones
      const mockCertifications: MentorCertification[] = [
        {
          id: '1',
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023-12-01',
          verified: true
        },
        {
          id: '2',
          name: 'React Native Specialist',
          issuer: 'Meta',
          date: '2023-10-15',
          verified: true
        }
      ];
      setCertifications(mockCertifications);

    } catch (err) {
      setError('Error al cargar los datos de mentores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMentorSelect = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setTabValue(0);
    setOpenDialog(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditClick = (mentor: Mentor) => {
    setFormData({
      name: mentor.name,
      email: mentor.email,
      level: mentor.level,
      specialties: mentor.specialties,
      status: mentor.status,
      availability: mentor.availability,
      experience: mentor.experience
    });
    setSelectedMentor(mentor);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedMentor(null);
    setFormData(INITIAL_FORM_DATA);
  };

  const renderMentorDetails = () => {
    if (!selectedMentor || editMode) return null;

    return (
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {selectedMentor.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">
              {selectedMentor.name}
              {selectedMentor.status === 'active' && (
                <Chip
                  icon={<VerifiedUserIcon />}
                  label="Verificado"
                  color="success"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab icon={<AssessmentIcon />} label="Resumen" />
              <Tab icon={<CalendarMonthIcon />} label="Sesiones" />
              <Tab icon={<SchoolIcon />} label="Certificaciones" />
              <Tab icon={<BookIcon />} label="Cursos" />
              <Tab icon={<ScheduleIcon />} label="Disponibilidad" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Métricas de Desempeño
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating
                        value={selectedMentor.metrics?.averageRating || 0}
                        readOnly
                        precision={0.1}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({selectedMentor.metrics?.averageRating || 0})
                      </Typography>
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      Estudiantes ayudados: {selectedMentor.metrics?.studentsHelped}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Sesiones completadas: {selectedMentor.metrics?.completedSessions}
                    </Typography>
                    <Typography variant="body2">
                      Tasa de éxito: {(selectedMentor.metrics?.successRate || 0) * 100}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Especialidades
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedMentor.specialties.map((specialty) => (
                        <Chip
                          key={specialty}
                          label={specialty}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                      Tecnologías
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedMentor.experience.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <List>
              {sessions.map((session) => (
                <React.Fragment key={session.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          Sesión con {session.studentName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2">
                            Fecha: {new Date(session.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            Duración: {session.duration} minutos
                          </Typography>
                          {session.rating && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={session.rating} readOnly size="small" />
                              <Typography variant="body2" sx={{ ml: 1 }}>
                                {session.feedback}
                              </Typography>
                            </Box>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={session.status}
                        color={
                          session.status === 'completed' ? 'success' :
                          session.status === 'scheduled' ? 'primary' :
                          'error'
                        }
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <List>
              {certifications.map((cert) => (
                <React.Fragment key={cert.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {cert.name}
                          </Typography>
                          {cert.verified && (
                            <VerifiedUserIcon color="success" sx={{ ml: 1 }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2">
                            Emisor: {cert.issuer}
                          </Typography>
                          <Typography variant="body2">
                            Fecha: {new Date(cert.date).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Cursos Impartidos
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      id: '1',
                      title: 'React desde Cero',
                      description: 'Aprende React desde los fundamentos hasta conceptos avanzados',
                      students: 125,
                      rating: 4.8,
                      status: 'active',
                      lastUpdated: '2024-03-15'
                    },
                    {
                      id: '2',
                      title: 'TypeScript Avanzado',
                      description: 'Domina TypeScript y sus características más avanzadas',
                      students: 85,
                      rating: 4.6,
                      status: 'active',
                      lastUpdated: '2024-03-10'
                    },
                    {
                      id: '3',
                      title: 'Node.js y Express',
                      description: 'Desarrollo backend con Node.js y Express',
                      students: 95,
                      rating: 4.7,
                      status: 'active',
                      lastUpdated: '2024-03-01'
                    }
                  ].map((course) => (
                    <Grid item xs={12} md={4} key={course.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" gutterBottom>
                              {course.title}
                          </Typography>
                            <Chip
                              label={course.status === 'active' ? 'Activo' : course.status === 'draft' ? 'Borrador' : 'Archivado'}
                              color={course.status === 'active' ? 'success' : 'default'}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {course.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating value={course.rating} readOnly precision={0.1} size="small" />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              ({course.rating})
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {course.students} estudiantes
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Última actualización: {new Date(course.lastUpdated).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Disponibilidad Semanal
                    </Typography>
                    <Typography variant="body1">
                      {selectedMentor.availability.hoursPerWeek} horas por semana
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Zona horaria: {selectedMentor.availability.timeZone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Horarios Preferidos
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedMentor.availability.preferredHours.map((hour) => (
                    <Chip
                      key={hour}
                      icon={<ScheduleIcon />}
                      label={hour}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              setFormData({
                name: selectedMentor.name,
                email: selectedMentor.email,
                level: selectedMentor.level,
                specialties: selectedMentor.specialties,
                status: selectedMentor.status,
                availability: selectedMentor.availability,
                experience: selectedMentor.experience
              });
              setEditMode(true);
            }}
          >
            Editar Perfil
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleCreate = async () => {
    try {
      // Simular creación de mentor
      const newMentor: Mentor = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        metrics: {
          studentsHelped: 0,
          averageRating: 0,
          completedSessions: 0,
          successRate: 0
        }
      };

      setMentors([...mentors, newMentor]);
      setOpenDialog(false);
      setFormData(INITIAL_FORM_DATA);
      setSnackbar({
        open: true,
        message: 'Mentor creado exitosamente',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error al crear mentor:', error);
      setSnackbar({
        open: true,
        message: 'Error al crear el mentor',
        severity: 'error'
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedMentor) return;

    try {
      const updatedMentor: Mentor = {
        ...selectedMentor,
        ...formData
      };

      setMentors(mentors.map(m => m.id === selectedMentor.id ? updatedMentor : m));
      setOpenDialog(false);
      setFormData(INITIAL_FORM_DATA);
      setSelectedMentor(null);
      setSnackbar({
        open: true,
        message: 'Mentor actualizado exitosamente',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error al actualizar mentor:', error);
      setSnackbar({
        open: true,
        message: 'Error al actualizar el mentor',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (mentorId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este mentor?')) {
      return;
    }

    try {
      setMentors(mentors.filter(m => m.id !== mentorId));
      setSnackbar({
        open: true,
        message: 'Mentor eliminado exitosamente',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error al eliminar mentor:', error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar el mentor',
        severity: 'error'
      });
    }
  };

  const renderMentorForm = () => {
    if (!editMode && selectedMentor) return null;
    
    return (
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedMentor ? 'Editar Mentor' : 'Nuevo Mentor'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nivel</InputLabel>
                <Select
                  value={formData.level}
                  label="Nivel"
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as MentorLevel })}
                >
                  <MenuItem value="junior">Junior</MenuItem>
                  <MenuItem value="intermediate">Intermedio</MenuItem>
                  <MenuItem value="senior">Senior</MenuItem>
                  <MenuItem value="expert">Experto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formData.status}
                  label="Estado"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as MentorStatus })}
                >
                  <MenuItem value="active">Activo</MenuItem>
                  <MenuItem value="inactive">Inactivo</MenuItem>
                  <MenuItem value="pending">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Especialidades</InputLabel>
                <Select
                  multiple
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value as MentorSpecialty[] })}
                  label="Especialidades"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="frontend">Frontend</MenuItem>
                  <MenuItem value="backend">Backend</MenuItem>
                  <MenuItem value="mobile">Mobile</MenuItem>
                  <MenuItem value="devops">DevOps</MenuItem>
                  <MenuItem value="data">Data Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Horas por semana"
                value={formData.availability.hoursPerWeek}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    hoursPerWeek: parseInt(e.target.value)
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zona horaria"
                value={formData.availability.timeZone}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    timeZone: e.target.value
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Años de experiencia"
                value={formData.experience.yearsOfExperience}
                onChange={(e) => setFormData({
                  ...formData,
                  experience: {
                    ...formData.experience,
                    yearsOfExperience: parseInt(e.target.value)
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tecnologías (separadas por coma)"
                value={formData.experience.technologies.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  experience: {
                    ...formData.experience,
                    technologies: e.target.value.split(',').map(t => t.trim())
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Idiomas (separados por coma)"
                value={formData.experience.languages.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  experience: {
                    ...formData.experience,
                    languages: e.target.value.split(',').map(l => l.trim())
                  }
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={selectedMentor ? handleEdit : handleCreate} 
            variant="contained" 
            color="primary"
          >
            {selectedMentor ? 'Guardar cambios' : 'Crear mentor'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestión de Mentores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedMentor(null);
            setFormData(INITIAL_FORM_DATA);
            setEditMode(true);
            setOpenDialog(true);
          }}
        >
          Nuevo Mentor
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mentor</TableCell>
              <TableCell>Nivel y Especialidades</TableCell>
              <TableCell>Métricas</TableCell>
              <TableCell>Disponibilidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{mentor.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{mentor.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {mentor.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Chip
                        label={mentor.level}
                        color={
                          mentor.level === 'expert' ? 'error' :
                          mentor.level === 'senior' ? 'warning' :
                          mentor.level === 'intermediate' ? 'info' :
                          'default'
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {mentor.specialties.map((specialty) => (
                          <Chip
                            key={specialty}
                            label={specialty}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating
                          value={mentor.metrics?.averageRating || 0}
                          readOnly
                          size="small"
                          precision={0.1}
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({mentor.metrics?.averageRating || 0})
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {mentor.metrics?.studentsHelped} estudiantes
                      </Typography>
                      <Typography variant="body2">
                        {mentor.metrics?.completedSessions} sesiones
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {mentor.availability.hoursPerWeek}h/semana
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {mentor.availability.timeZone}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {mentor.availability.preferredHours.slice(0, 2).map((hour) => (
                          <Chip
                            key={hour}
                            label={hour}
                            size="small"
                            variant="outlined"
                            icon={<ScheduleIcon />}
                          />
                        ))}
                        {mentor.availability.preferredHours.length > 2 && (
                          <Chip
                            label={`+${mentor.availability.preferredHours.length - 2}`}
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={mentor.status === 'active' ? <CheckCircleIcon /> : <BlockIcon />}
                      label={mentor.status}
                      color={mentor.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver detalles">
                      <IconButton onClick={() => {
                        setSelectedMentor(mentor);
                        setTabValue(0);
                        setOpenDialog(true);
                        setEditMode(false);
                      }} size="small">
                        <AssessmentIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEditClick(mentor)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton 
                        onClick={() => handleDelete(mentor.id)} 
                        size="small" 
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mentors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>

      {renderMentorDetails()}
      {renderMentorForm()}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MentorManagement; 