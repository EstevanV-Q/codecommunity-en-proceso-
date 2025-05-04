import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Switch,
  FormControlLabel,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel as MuiFormControlLabel,
  Link as MuiLink,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  ContentCopy as CopyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  VideoCall as VideoCallIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { Course } from '../../../types/dashboard';
import { useAuth } from '../../../context/AuthContext';
import { MockUser } from '../../../mocks/users';
import { useNavigate } from 'react-router-dom';

const TeacherCourseAdmin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [showLinks, setShowLinks] = useState<{ [key: string]: boolean }>({});

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
    hasSpecificStartDate: false,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    courseType: 'recorded' as 'recorded' | 'live',
    isPublic: false,
    coverImage: '',
    liveClassroom: {
      meetingLink: '',
      meetingId: '',
      meetingPassword: '',
      schedule: [] as Array<{
        date: string;
        startTime: string;
        endTime: string;
        topic: string;
      }>,
    },
  });

  useEffect(() => {
    // Simular carga de cursos del profesor
    const loadTeacherCourses = async () => {
      setLoading(true);
      try {
        // Aquí iría la llamada real a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses([
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
            mentor: (user as MockUser)?.displayName || 'John Doe',
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
          // ... más cursos mock
        ]);
      } catch (err) {
        setError('Error loading courses');
        setSnackbar({ open: true, message: 'Error loading courses', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadTeacherCourses();
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
        hasSpecificStartDate: course.hasSpecificStartDate,
        startDate: course.startDate,
        endDate: course.endDate || new Date(new Date(course.startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        courseType: course.courseType,
        isPublic: course.isPublic,
        coverImage: course.coverImage || '',
        liveClassroom: {
          ...course.liveClassroom,
          meetingLink: course.liveClassroom?.meetingLink || '',
          meetingId: course.liveClassroom?.meetingId || '',
          meetingPassword: course.liveClassroom?.meetingPassword || '',
          schedule: course.liveClassroom?.schedule || [],
        },
      });
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
        hasSpecificStartDate: false,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        courseType: 'recorded',
        isPublic: false,
        coverImage: '',
        liveClassroom: {
          meetingLink: '',
          meetingId: '',
          meetingPassword: '',
          schedule: [],
        },
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const meetingPassword = Math.random().toString(36).substring(2, 8);
    return {
      meetingId,
      meetingPassword,
      meetingLink: `${window.location.origin}/live-classroom/${meetingId}`,
    };
  };

  const handleAddSchedule = () => {
    setFormData({
      ...formData,
      liveClassroom: {
        ...formData.liveClassroom,
        schedule: [
          ...formData.liveClassroom.schedule,
          {
            date: '',
            startTime: '',
            endTime: '',
            topic: '',
          },
        ],
      },
    });
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedule = [...formData.liveClassroom.schedule];
    newSchedule[index] = {
      ...newSchedule[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      liveClassroom: {
        ...formData.liveClassroom,
        schedule: newSchedule,
      },
    });
  };

  const toggleLinks = (courseId: string) => {
    setShowLinks(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'Link copied to clipboard', severity: 'success' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Si es un curso en vivo, generar el enlace de la reunión
      if (formData.courseType === 'live' && !selectedCourse) {
        const meetingInfo = generateMeetingLink();
        formData.liveClassroom = {
          ...formData.liveClassroom,
          ...meetingInfo,
        };
      }

      // Calcular la fecha de finalización si no está establecida
      const calculatedEndDate = formData.endDate || 
        (formData.startDate 
          ? new Date(new Date(formData.startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedCourse) {
        // Actualizar curso existente
        setCourses(courses.map(course =>
          course.id === selectedCourse.id
            ? {
                ...course,
                ...formData,
                endDate: calculatedEndDate,
                updatedAt: new Date().toISOString(),
              }
            : course
        ));
      } else {
        // Crear nuevo curso
        const newCourse: Course = {
          id: String(Date.now()),
          ...formData,
          endDate: calculatedEndDate,
          mentor: (user as MockUser)?.displayName || 'Unknown Teacher',
          enrolledStudents: 0,
          rating: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCourses([...courses, newCourse]);
      }

      setSnackbar({ open: true, message: 'Course saved successfully', severity: 'success' });
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving course', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId: string) => {
    setLoading(true);
    try {
      // Simular eliminación
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourses(courses.filter(course => course.id !== courseId));
      setSnackbar({ open: true, message: 'Course deleted successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting course', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">My Courses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          New Course
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {course.coverImage && (
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                        />
                      )}
                      <Typography>{course.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={course.level}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{course.duration} hours</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>{course.enrolledStudents}</TableCell>
                  <TableCell>
                    <Chip
                      icon={course.isPublished ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      label={course.isPublished ? 'Published' : 'Draft'}
                      color={course.isPublished ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={course.courseType === 'live' ? <LiveIcon /> : <VideoIcon />}
                      label={course.courseType}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {course.courseType === 'live' && course.liveClassroom?.meetingLink && (
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Button
                          variant="outlined"
                          endIcon={<ArrowDropDownIcon />}
                          onClick={() => toggleLinks(course.id)}
                        >
                          Links
                        </Button>
                        {showLinks[course.id] && (
                          <Paper
                            sx={{
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              mt: 1,
                              zIndex: 1,
                              minWidth: 200,
                              p: 2,
                            }}
                          >
                            <Typography variant="subtitle2" gutterBottom>
                              Teacher Link
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <Typography variant="body2" sx={{ flex: 1, wordBreak: 'break-all' }}>
                                {course.liveClassroom.meetingLink}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => copyToClipboard(course.liveClassroom!.meetingLink)}
                              >
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Student Link
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ flex: 1, wordBreak: 'break-all' }}>
                                {course.liveClassroom.meetingLink}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => copyToClipboard(course.liveClassroom!.meetingLink)}
                              >
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Paper>
                        )}
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenDialog(course)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VideoIcon />}
                        onClick={() => navigate(`/teacher/courses/${course.id}/content`)}
                      >
                        Contenido
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(course.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

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
                label="Start Date"
                type="date"
                fullWidth
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Course Type
              </Typography>
              <RadioGroup
                value={formData.courseType}
                onChange={(e) => setFormData({ ...formData, courseType: e.target.value as 'recorded' | 'live' })}
              >
                <MuiFormControlLabel
                  value="recorded"
                  control={<Radio />}
                  label="Recorded Videos"
                />
                <MuiFormControlLabel
                  value="live"
                  control={<Radio />}
                  label="Live Classroom"
                />
              </RadioGroup>
            </FormControl>

            <Collapse in={formData.courseType === 'live'}>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Live Classroom Settings
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Class Schedule
                </Typography>
                {formData.liveClassroom.schedule.map((session, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      label="Date"
                      type="date"
                      value={session.date}
                      onChange={(e) => handleScheduleChange(index, 'date', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Start Time"
                      type="time"
                      value={session.startTime}
                      onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="End Time"
                      type="time"
                      value={session.endTime}
                      onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Topic"
                      value={session.topic}
                      onChange={(e) => handleScheduleChange(index, 'topic', e.target.value)}
                    />
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<CalendarIcon />}
                  onClick={handleAddSchedule}
                  sx={{ mt: 1 }}
                >
                  Add Session
                </Button>

                {formData.liveClassroom.meetingLink && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Meeting Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <MuiLink
                        href={formData.liveClassroom.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="contained"
                          startIcon={<VideoCallIcon />}
                          color="primary"
                        >
                          Join Classroom
                        </Button>
                      </MuiLink>
                      <Typography variant="body2">
                        Meeting ID: {formData.liveClassroom.meetingId}
                      </Typography>
                      <Typography variant="body2">
                        Password: {formData.liveClassroom.meetingPassword}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Collapse>

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
                startIcon={<UploadIcon />}
                fullWidth
              >
                Upload Cover Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, coverImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
              {formData.coverImage && (
                <Box sx={{ mt: 2, height: 200, overflow: 'hidden', borderRadius: 1 }}>
                  <img
                    src={formData.coverImage}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default TeacherCourseAdmin; 