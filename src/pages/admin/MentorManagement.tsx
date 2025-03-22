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

const MentorManagement = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [certifications, setCertifications] = useState<MentorCertification[]>([]);
  const [availability, setAvailability] = useState<MentorAvailability[]>([]);

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

  const renderMentorDetails = () => {
    if (!selectedMentor) return null;

    return (
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
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
              <Tab icon={<AttachMoneyIcon />} label="Precios" />
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
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Tarifa por Hora
                    </Typography>
                    <Typography variant="h4" color="primary">
                      ${selectedMentor.pricing?.hourlyRate}
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        {selectedMentor.pricing?.currency}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Paquetes Disponibles
                </Typography>
                <Grid container spacing={2}>
                  {selectedMentor.pricing?.packages.map((pkg, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {pkg.description}
                          </Typography>
                          <Typography variant="h4" color="primary" gutterBottom>
                            ${pkg.price}
                          </Typography>
                          <Typography variant="body2">
                            {pkg.hours} horas de mentoría
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${(pkg.price / pkg.hours).toFixed(2)} por hora
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
          <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              // Implementar lógica de edición
            }}
          >
            Editar Perfil
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
                      <IconButton onClick={() => handleMentorSelect(mentor)} size="small">
                        <AssessmentIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleMentorSelect(mentor)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" color="error">
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