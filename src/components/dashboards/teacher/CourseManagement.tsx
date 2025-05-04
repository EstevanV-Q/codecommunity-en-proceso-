import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Autocomplete,
  Tabs,
  Tab,
  Avatar,
  Stack,
  useTheme,
  alpha,
  CardMedia,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  LiveTv as LiveIcon,
} from '@mui/icons-material';
import { Course } from '../../../types/dashboard';
import CourseContentManagement from './CourseContentManagement';

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    level: 'beginner',
    category: 'Web Development',
    duration: 40,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    requirements: ['Basic computer knowledge'],
    isPublished: true,
    price: 99.99,
    mentor: 'John Doe',
    enrolledStudents: 25,
    rating: 4.5,
    hasSpecificStartDate: true,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-15',
    courseType: 'recorded',
    isPublic: true,
    coverImage: 'https://example.com/course1.jpg',
  },
  {
    id: '2',
    title: 'Advanced React',
    description: 'Master React hooks, context, and advanced patterns',
    level: 'advanced',
    category: 'Web Development',
    duration: 60,
    technologies: ['React', 'TypeScript', 'Redux'],
    requirements: ['JavaScript basics', 'HTML/CSS'],
    isPublished: true,
    price: 149.99,
    mentor: 'Jane Smith',
    enrolledStudents: 18,
    rating: 4.8,
    hasSpecificStartDate: true,
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    createdAt: '2023-12-10',
    updatedAt: '2023-12-20',
    courseType: 'live',
    isPublic: true,
    coverImage: 'https://example.com/course2.jpg',
    liveClassroom: {
      meetingLink: 'https://example.com/live/123',
      meetingId: '123',
      meetingPassword: 'abc123',
      schedule: [
        {
          date: '2024-02-01',
          startTime: '10:00',
          endTime: '12:00',
          topic: 'Introduction to Advanced React'
        }
      ]
    }
  },

  // ... más cursos mock
];

interface CourseManagementProps {
  courseType?: 'recorded' | 'live';
}

const CourseManagement: React.FC<CourseManagementProps> = ({ courseType }) => {
  const theme = useTheme();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourseForMenu, setSelectedCourseForMenu] = useState<Course | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedCourseForContent, setSelectedCourseForContent] = useState<Course | null>(null);

  // Filter courses based on courseType prop
  const filteredCourses = courseType 
    ? courses.filter(course => course.courseType === courseType)
    : courses;

  const [formData, setFormData] = useState<Partial<Course>>({
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
    courseType: courseType || 'recorded',
    isPublic: false,
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, course: Course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseForMenu(course);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCourseForMenu(undefined);
  };

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
        courseType: course.courseType,
        isPublic: course.isPublic,
        coverImage: course.coverImage || '',
      });
      setPreviewImage(course.coverImage || null);
    } else {
      setSelectedCourse(null);
      setFormData({
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
        courseType: courseType || 'recorded',
        isPublic: false,
        coverImage: '',
      });
      setPreviewImage(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (selectedCourse) {
      // Actualizar curso existente
      setCourses(courses.map(course =>
        course.id === selectedCourse.id
          ? { 
              ...course, 
              ...formData,
              coverImage: previewImage || course.coverImage,
              updatedAt: new Date().toISOString()
            }
          : course
      ));
    } else {
      // Crear nuevo curso
      const newCourse: Course = {
        id: String(Date.now()),
        title: formData.title || '',
        description: formData.description || '',
        level: formData.level || 'beginner',
        category: formData.category || '',
        duration: formData.duration || 0,
        technologies: formData.technologies || [],
        requirements: formData.requirements || [],
        isPublished: formData.isPublished || false,
        price: formData.price || 0,
        mentor: formData.mentor || '',
        enrolledStudents: 0,
        rating: 0,
        hasSpecificStartDate: false,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        courseType: formData.courseType || 'recorded',
        isPublic: formData.isPublic || false,
        coverImage: previewImage || '',
        liveClassroom: formData.courseType === 'live' ? {
          meetingLink: '',
          meetingId: '',
          meetingPassword: '',
          schedule: []
        } : undefined
      };
      setCourses([...courses, newCourse]);
    }

    setLoading(false);
    handleCloseDialog();
  };

  const handleDelete = async (courseId: string) => {
    setLoading(true);
    // Simular eliminación
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCourses(courses.filter(course => course.id !== courseId));
    setLoading(false);
    handleCloseMenu();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourseForContent(course);
    setTabValue(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {courseType === 'live' ? 'Clases en Vivo' : 'Gestión de Cursos'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
            }}
          >
            Crear Nuevo
        </Button>
      </Box>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {courseType === 'live' 
            ? 'Gestiona tus clases en vivo y su programación' 
            : 'Administra tus cursos y su contenido'}
        </Typography>
      </Paper>

      {/* Tabs Section */}
      <Paper elevation={0} sx={{ mb: 4, borderRadius: 2, p: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab label="Todos los Cursos" />
          <Tab label="Publicados" />
          <Tab label="Borradores" />
      </Tabs>
      </Paper>

      {/* Courses Grid */}
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.coverImage || 'https://source.unsplash.com/random/400x200?education'}
                        alt={course.title}
                sx={{ objectFit: 'cover' }}
                      />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                      {course.title}
                    </Typography>
                  <IconButton
                    onClick={(e) => handleOpenMenu(e, course)}
                    sx={{ color: theme.palette.text.secondary }}
                  >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                    icon={<SchoolIcon />}
                      label={course.level}
                      size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                    />
                    <Chip
                    icon={course.courseType === 'live' ? <LiveIcon /> : <VideoIcon />}
                    label={course.courseType === 'live' ? 'En Vivo' : 'Grabado'}
                      size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                    }}
                  />
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon sx={{ color: theme.palette.warning.main, mr: 0.5 }} />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                    <Typography variant="body2">{course.enrolledStudents}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ color: theme.palette.info.main, mr: 0.5 }} />
                    <Typography variant="body2">{course.duration}h</Typography>
                  </Box>
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  ${course.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog(course)}
                      fullWidth
                    >
                  Editar
                    </Button>
              </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      {/* Course Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
        >
        <DialogTitle sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {selectedCourse ? 'Editar Curso' : 'Crear Nuevo Curso'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Course Title"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </Box>

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={formData.level}
                  label="Level"
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Duration (hours)"
                type="number"
                fullWidth
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              />
              <TextField
                label="Mentor"
                fullWidth
                value={formData.mentor}
                onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Course Type</InputLabel>
                <Select
                  value={formData.courseType}
                  label="Course Type"
                  onChange={(e) => setFormData({ ...formData, courseType: e.target.value as any })}
                >
                  <MenuItem value="recorded">Recorded</MenuItem>
                  <MenuItem value="live">Live</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Autocomplete
              multiple
              options={[]}
              freeSolo
              value={formData.technologies}
              onChange={(_, newValue) => setFormData({ ...formData, technologies: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Technologies"
                  placeholder="Add technology"
                />
              )}
            />

            <Autocomplete
              multiple
              options={[]}
              freeSolo
              value={formData.requirements}
              onChange={(_, newValue) => setFormData({ ...formData, requirements: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Requirements"
                  placeholder="Add requirement"
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                }
                label="Published"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                }
                label="Public"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                fullWidth
              >
                Upload Cover Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {previewImage && (
                <Box sx={{ mt: 2, height: 200, overflow: 'hidden', borderRadius: 1 }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {selectedCourse ? 'Guardar Cambios' : 'Crear Curso'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Course Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
          },
        }}
      >
        <MenuItem onClick={() => selectedCourseForMenu && handleOpenDialog(selectedCourseForMenu)}>
          <EditIcon sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedCourseForMenu?.id || '')}>
          <DeleteIcon sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CourseManagement; 