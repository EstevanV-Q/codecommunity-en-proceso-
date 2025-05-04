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
  Switch,
  FormControlLabel,
  Autocomplete,
  DialogContentText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
  LiveTv as LiveIcon,
  PlayCircle as PlayCircleIcon,
  Lock as LockIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import CourseContentService from '../../services/CourseContentService';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import ChapterManager from '../../components/admin/ChapterManager';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // en horas
  technologies: string[];
  requirements: string[];
  isPublished: boolean;
  price: number;
  mentor: string;
  enrolledStudents: number;
  rating: number;
  hasSpecificStartDate: boolean;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  courseType: 'recorded' | 'live';
  isPublic: boolean;
  type: string;
  status: string;
}

interface CourseFormData {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number;
  technologies: string[];
  requirements: string[];
  isPublished: boolean;
  price: number;
  mentor: string;
  hasSpecificStartDate: boolean;
  startDate: string;
  courseType: 'recorded' | 'live';
  isPublic: boolean;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  videoUrl?: string;
}

const INITIAL_FORM_DATA: CourseFormData = {
  title: '',
  description: '',
  level: 'beginner',
  category: '',
  duration: 0,
  technologies: [],
  requirements: [],
  isPublished: false,
  price: 0,
  mentor: '',
  hasSpecificStartDate: false,
  startDate: new Date().toISOString().split('T')[0],
  courseType: 'recorded',
  isPublic: false,
};

const CATEGORIES = [
  'Desarrollo Web',
  'Desarrollo Móvil',
  'Bases de Datos',
  'DevOps',
  'Inteligencia Artificial',
  'Machine Learning',
  'Cloud Computing',
  'Seguridad',
  'Blockchain',
  'IoT',
];

const TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Python', 'Java', 'C#', '.NET',
  'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
  'Kotlin', 'AWS', 'Azure', 'GCP', 'Docker',
];

interface CourseManagementProps {
  mode?: 'create' | 'list' | 'edit';
  courseType?: 'recorded' | 'live';
}

const CourseManagement: React.FC<CourseManagementProps> = ({ mode = 'list', courseType }) => {
  const { user } = useAuth();
  const { checkPermission } = useAdmin();
  const { courseId } = useParams<{ courseId: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(mode === 'create' || mode === 'edit');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    ...INITIAL_FORM_DATA,
    courseType: courseType || 'recorded'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [contentDialog, setContentDialog] = useState<{
    open: boolean;
    courseId: string | null;
  }>({
    open: false,
    courseId: null
  });
  const [chapters, setChapters] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && courseId) {
      // Cargar el curso específico para edición
      const courseToEdit = courses.find(c => c.id === courseId);
      if (courseToEdit) {
        setSelectedCourse(courseToEdit);
        setFormData({
          title: courseToEdit.title,
          description: courseToEdit.description,
          level: courseToEdit.level,
          category: courseToEdit.category,
          duration: courseToEdit.duration,
          technologies: courseToEdit.technologies,
          requirements: courseToEdit.requirements,
          isPublished: courseToEdit.isPublished,
          price: courseToEdit.price,
          mentor: courseToEdit.mentor,
          hasSpecificStartDate: courseToEdit.hasSpecificStartDate,
          startDate: courseToEdit.startDate,
          courseType: courseToEdit.courseType,
          isPublic: courseToEdit.isPublic,
        });
      }
    }
  }, [mode, courseId, courses]);

  const getCourseStatus = (course: Course) => {
    const now = new Date();
    const startDate = new Date(course.startDate);
    
    if (!course.isPublished) {
      return {
        label: 'No publicado',
        color: 'default' as const,
        icon: <VisibilityOffIcon />
      };
    }
    
    if (course.hasSpecificStartDate && startDate > now) {
      return {
        label: 'Próximamente',
        color: 'warning' as const,
        icon: <SchoolIcon />
      };
    }
    
    return {
      label: 'En curso',
      color: 'success' as const,
      icon: <VisibilityIcon />
    };
  };

  // Función para verificar si el usuario puede editar un curso específico
  const canEditCourse = (course: Course) => {
    if (['founder', 'owner', 'admin'].includes(user?.role || '')) {
      return true; // Roles administrativos pueden editar cualquier curso
    }
    
    if (user?.role === 'seniorMentor') {
      return true; // Senior mentores pueden editar cualquier curso
    }
    
    if (user?.role === 'mentor') {
      return course.mentor === user.displayName; // Mentores solo pueden editar sus propios cursos
    }
    
    if (user?.role === 'juniorMentor') {
      return false; // Junior mentores no pueden editar cursos
    }
    
    return false;
  };

  // Función para filtrar cursos según el rol
  const filterCoursesByRole = (allCourses: Course[]) => {
    if (!user) return [];

    if (['founder', 'owner', 'admin'].includes(user.role)) {
      return allCourses; // Ven todos los cursos
    }

    if (user.role === 'seniorMentor') {
      return allCourses; // Ven todos los cursos
    }

    if (user.role === 'mentor') {
      return allCourses.filter(course => course.mentor === user.displayName);
    }

    if (user.role === 'juniorMentor') {
      return allCourses.filter(course => course.mentor === user.displayName);
    }

    return [];
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'Desarrollo Web con React',
            description: 'Aprende a crear aplicaciones web modernas con React',
            level: 'intermediate',
            category: 'Desarrollo Web',
            duration: 40,
            technologies: ['React', 'JavaScript', 'TypeScript'],
            requirements: ['JavaScript básico', 'HTML', 'CSS'],
            isPublished: true,
            price: 99.99,
            mentor: 'Juan Pérez',
            enrolledStudents: 150,
            rating: 4.5,
            hasSpecificStartDate: true,
            startDate: '2024-04-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            courseType: 'recorded',
            isPublic: true,
            type: 'recorded',
            status: 'published'
          },
        ];
        
        // Filtrar cursos según el rol del usuario
        const filteredCourses = filterCoursesByRole(mockCourses);
        setCourses(filteredCourses);
      } catch (err) {
        setError('Error al cargar los cursos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        level: course.level,
        category: course.category,
        duration: course.duration,
        technologies: course.technologies,
        requirements: course.requirements,
        isPublished: course.isPublished,
        price: course.price,
        mentor: course.mentor,
        hasSpecificStartDate: course.hasSpecificStartDate,
        startDate: course.startDate,
        courseType: course.courseType,
        isPublic: course.isPublic || false,
      });
    } else {
      setSelectedCourse(null);
      setFormData(INITIAL_FORM_DATA);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
    setFormData(INITIAL_FORM_DATA);
    if (mode === 'create' && !contentDialog.open) {
      navigate('/admin/courses');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title || !formData.description || !formData.category || formData.duration <= 0 || formData.price < 0) {
      setSnackbar({
        open: true,
        message: 'Por favor, completa todos los campos requeridos',
        severity: 'error'
      });
      return;
    }

    try {
      if (selectedCourse) {
        await handleUpdateCourse(formData);
      } else {
        await handleCreateCourse(formData);
      }
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al guardar el curso', severity: 'error' });
      console.error(err);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        // Aquí iría la llamada a la API real
        setCourses(courses.filter(c => c.id !== courseToDelete.id));
        setSnackbar({ 
          open: true, 
          message: 'Curso eliminado correctamente', 
          severity: 'success' 
        });
      } catch (err) {
        setSnackbar({ 
          open: true, 
          message: 'Error al eliminar el curso', 
          severity: 'error' 
        });
        console.error(err);
      } finally {
        setDeleteDialogOpen(false);
        setCourseToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const togglePublish = async (courseId: string) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const updatedCourse = {
          ...course,
          isPublished: !course.isPublished,
          updatedAt: new Date().toISOString(),
        };
        setCourses(courses.map(c => c.id === courseId ? updatedCourse : c));
        setSnackbar({
          open: true,
          message: `Curso ${updatedCourse.isPublished ? 'publicado' : 'despublicado'} correctamente`,
          severity: 'success'
        });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al cambiar el estado del curso', severity: 'error' });
      console.error(err);
    }
  };

  const handleCreateCourse = async (data: CourseFormData) => {
    const newCourse: Course = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enrolledStudents: 0,
      rating: 0,
      isPublished: data.isPublic,
      type: data.courseType,
      status: data.isPublic ? 'published' : 'draft'
    };

    try {
      // Crear el contenido del curso primero
      await CourseContentService.createCourse(newCourse.id, data.courseType === 'recorded' ? 'video' : 'live');
      await CourseContentService.setPublicStatus(newCourse.id, data.isPublic);

      // Si es un curso de video, abrir el diálogo de contenido automáticamente
      if (data.courseType === 'recorded') {
        setCourses(prev => [...prev, newCourse]);
        setSnackbar({ 
          open: true, 
          message: 'Curso creado. Ahora puedes subir los videos para cada capítulo.', 
          severity: 'success' 
        });
        await handleOpenContent(newCourse.id);
      } else {
        setCourses(prev => [...prev, newCourse]);
        setSnackbar({ open: true, message: 'Curso creado correctamente', severity: 'success' });
      }
    } catch (error) {
      console.error('Error al crear el curso:', error);
      throw error;
    }
  };

  const handleUpdateCourse = async (data: CourseFormData) => {
    if (!selectedCourse) return;

    const updatedCourse = {
      ...selectedCourse,
      ...data,
      updatedAt: new Date().toISOString(),
      isPublished: data.isPublic
    };

    try {
      // Actualizar el estado público del curso
      await CourseContentService.setPublicStatus(selectedCourse.id, data.isPublic);

      setCourses(prev => prev.map(course => 
        course.id === selectedCourse.id ? updatedCourse : course
      ));
      setSnackbar({ open: true, message: 'Curso actualizado correctamente', severity: 'success' });
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      throw error;
    }
  };

  const handleOpenContent = async (courseId: string) => {
    try {
      // Datos simulados de capítulos para demostración
      const mockChapters: Chapter[] = [
        {
          id: '1',
          title: 'Introducción al Curso',
          description: 'Bienvenida y visión general del curso',
          order: 1,
          videoUrl: 'https://example.com/videos/intro.mp4'
        },
        {
          id: '2',
          title: 'Configuración del Entorno',
          description: 'Instalación y configuración de herramientas necesarias',
          order: 2,
          videoUrl: 'https://example.com/videos/setup.mp4'
        },
        {
          id: '3',
          title: 'Fundamentos Básicos',
          description: 'Conceptos fundamentales y primeros pasos',
          order: 3,
          videoUrl: 'https://example.com/videos/basics.mp4'
        }
      ];

      setChapters(mockChapters);
      setContentDialog({
        open: true,
        courseId
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseContent = () => {
    setContentDialog({
      open: false,
      courseId: null
    });
  };

  const handleChaptersUpdate = async (updatedChapters: Chapter[]) => {
    try {
      await CourseContentService.updateChapters(contentDialog.courseId!, updatedChapters);
      setChapters(updatedChapters);
      setSnackbar({
        open: true,
        message: 'Capítulos actualizados correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating chapters:', error);
      setSnackbar({
        open: true,
        message: 'Error al actualizar los capítulos',
        severity: 'error'
      });
    }
  };

  const renderActions = (course: Course) => {
    return (
      <TableCell align="right">
        {canEditCourse(course) && (
          <>
            <IconButton
              onClick={() => handleOpenDialog(course)}
              size="small"
              color="primary"
            >
              <EditIcon />
            </IconButton>
            {checkPermission('courses.manage') && (
              <IconButton
                onClick={() => handleDeleteClick(course)}
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        )}
        {course.courseType === 'recorded' && (
          <IconButton
            onClick={() => handleOpenContent(course.id)}
            size="small"
            color="primary"
          >
            <PlayCircleIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => navigate(`/courses/${course.id}`)}
          size="small"
        >
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {mode === 'create' ? 'Nuevo Curso' : mode === 'edit' ? 'Editar Curso' : 'Gestión de Cursos'}
        </Typography>
        {mode === 'list' && checkPermission('courses.create') && (
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mr: 2 }}
            >
              Nuevo Curso
            </Button>
          </Box>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {user?.role === 'juniorMentor' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Como Mentor Junior, solo puedes ver los cursos pero no puedes editarlos.
        </Alert>
      )}

      {mode === 'list' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Nivel</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Mentor</TableCell>
                <TableCell>Inicio</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Estudiantes</TableCell>
                {checkPermission('courses.manage') && <TableCell>Contenido</TableCell>}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course) => {
                  const status = getCourseStatus(course);
                  return (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>
                        <Chip label={course.category} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          color={
                            course.level === 'beginner' ? 'success' :
                            course.level === 'intermediate' ? 'warning' :
                            'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{course.duration}h</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.mentor}</TableCell>
                      <TableCell>
                        {course.hasSpecificStartDate 
                          ? new Date(course.startDate).toLocaleDateString()
                          : new Date(course.startDate).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={status.label}>
                          <Chip
                            icon={status.icon}
                            label={status.label}
                            color={status.color}
                            size="small"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.courseType === 'recorded' ? 'Video/Capítulos' : 'En directo'}
                          color={course.courseType === 'recorded' ? 'info' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{course.enrolledStudents}</TableCell>
                      <TableCell>
                        {renderActions(course)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="Filas por página"
          />
        </TableContainer>
      )}

      {/* Diálogo de confirmación para eliminar curso */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon color="warning" sx={{ mr: 1 }} />
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar el curso "{courseToDelete?.title}"?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para crear/editar curso */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        disableEscapeKeyDown={mode === 'create'}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedCourse ? (
              <>
                <EditIcon sx={{ mr: 1 }} />
                Editar Curso
              </>
            ) : (
              <>
                <AddIcon sx={{ mr: 1 }} />
                Nuevo Curso
              </>
            )}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  margin="normal"
                  error={!formData.title}
                  helperText={!formData.title ? "El título es requerido" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  multiline
                  rows={4}
                  margin="normal"
                  error={!formData.description}
                  helperText={!formData.description ? "La descripción es requerida" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required error={!formData.level}>
                  <InputLabel>Nivel</InputLabel>
                  <Select
                    value={formData.level}
                    label="Nivel"
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                  >
                    <MenuItem value="beginner">Principiante</MenuItem>
                    <MenuItem value="intermediate">Intermedio</MenuItem>
                    <MenuItem value="advanced">Avanzado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required error={!formData.category}>
                  <Autocomplete
                    options={CATEGORIES}
                    value={formData.category}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, category: newValue || '' });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categoría"
                        required
                        error={!formData.category}
                        helperText={!formData.category ? "La categoría es requerida" : ""}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duración (horas)"
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  required
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                  error={formData.duration <= 0}
                  helperText={formData.duration <= 0 ? "La duración debe ser mayor a 0" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio ($)"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  error={formData.price < 0}
                  helperText={formData.price < 0 ? "El precio no puede ser negativo" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mentor"
                  name="mentor"
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  required
                  margin="normal"
                  error={!formData.mentor}
                  helperText={!formData.mentor ? "El mentor es requerido" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.hasSpecificStartDate}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        hasSpecificStartDate: e.target.checked,
                        startDate: e.target.checked ? formData.startDate : new Date().toISOString().split('T')[0]
                      })}
                    />
                  }
                  label="Establecer fecha específica de inicio"
                />
              </Grid>
              {formData.hasSpecificStartDate && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de inicio"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!formData.startDate}
                    helperText={!formData.startDate ? "La fecha de inicio es requerida" : ""}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    multiple
                    options={TECHNOLOGIES}
                    value={formData.technologies}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, technologies: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tecnologías"
                        helperText="Selecciona las tecnologías relacionadas con el curso (opcional)"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requisitos (uno por línea)"
                  name="requirements"
                  value={formData.requirements.join('\n')}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split('\n').filter(r => r.trim()) })}
                  multiline
                  rows={4}
                  margin="normal"
                  helperText="Ingresa cada requisito en una nueva línea (opcional)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Tipo de Curso</InputLabel>
                  <Select
                    value={formData.courseType}
                    label="Tipo de Curso"
                    onChange={(e) => setFormData({ ...formData, courseType: e.target.value as 'recorded' | 'live' })}
                  >
                    <MenuItem value="recorded">Video/Capítulos</MenuItem>
                    <MenuItem value="live">En directo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    />
                  }
                  label="Publicar curso"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={selectedCourse ? <EditIcon /> : <AddIcon />}
            >
              {selectedCourse ? 'Guardar Cambios' : 'Crear Curso'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog para gestionar capítulos */}
      <Dialog
        open={contentDialog.open}
        onClose={handleCloseContent}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PlayCircleIcon color="primary" />
          Gestión de Contenido del Curso
        </DialogTitle>
        <DialogContent>
          {contentDialog.courseId && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Organiza los capítulos y gestiona los videos del curso
              </Typography>
              <ChapterManager
                courseId={contentDialog.courseId}
                initialChapters={chapters}
                onChaptersUpdate={handleChaptersUpdate}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContent} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagement; 