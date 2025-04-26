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
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCourse, setMenuCourse] = useState<Course | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCourseForContent, setSelectedCourseForContent] = useState<Course | null>(null);

  // Filter courses based on courseType prop
  const filteredCourses = courseType 
    ? courses.filter(course => course.courseType === courseType)
    : courses;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: '',
    duration: 0,
    technologies: [] as string[],
    requirements: [] as string[],
    isPublished: false,
    price: 0,
    mentor: '',
    hasSpecificStartDate: false,
    startDate: '',
    courseType: 'recorded' as 'recorded' | 'live',
    isPublic: false,
    coverImage: '',
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, course: Course) => {
    setAnchorEl(event.currentTarget);
    setMenuCourse(course);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuCourse(null);
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
        hasSpecificStartDate: course.hasSpecificStartDate,
        startDate: course.startDate,
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
        hasSpecificStartDate: false,
        startDate: '',
        courseType: 'recorded',
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
        ...formData,
        enrolledStudents: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: previewImage || '',
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
    setActiveTab(newValue);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourseForContent(course);
    setActiveTab(1);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          {courseType === 'recorded' ? 'Videos Grabados' : 
           courseType === 'live' ? 'Clases en Vivo' : 'Mis Cursos'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Curso
        </Button>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Cursos" />
        <Tab label="Gestión de Contenido" disabled={!selectedCourseForContent} />
      </Tabs>

      {activeTab === 0 ? (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card>
                <CardContent>
                  {course.coverImage && (
                    <Box sx={{ mb: 2, height: 140, overflow: 'hidden', borderRadius: 1 }}>
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>
                      {course.title}
                    </Typography>
                    <IconButton onClick={(e) => handleOpenMenu(e, course)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  <Typography color="textSecondary" gutterBottom>
                    {course.description}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<PeopleIcon />}
                      label={`${course.enrolledStudents} Students`}
                      size="small"
                    />
                    <Chip
                      label={course.level}
                      size="small"
                      color="primary"
                    />
                    <Chip
                      label={course.courseType}
                      size="small"
                      color="secondary"
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      {`${new Date(course.startDate).toLocaleDateString()} - ${course.duration} hours`}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<VideoIcon />}
                      onClick={() => handleCourseSelect(course)}
                      fullWidth
                    >
                      Manage Content
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        selectedCourseForContent && <CourseContentManagement course={selectedCourseForContent} />
      )}

      {/* Menu for course actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => {
          handleCloseMenu();
          menuCourse && handleOpenDialog(menuCourse);
        }}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => menuCourse && handleDelete(menuCourse.id)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Dialog for creating/editing courses */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? 'Edit Course' : 'New Course'}
        </DialogTitle>
        <DialogContent>
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
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default CourseManagement; 