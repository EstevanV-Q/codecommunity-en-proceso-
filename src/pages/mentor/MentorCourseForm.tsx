import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  SelectChangeEvent,
  Stepper,
  Step,
  StepLabel,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  DragHandle as DragHandleIcon,
} from '@mui/icons-material';
import VideoUploader from '../../components/mentor/VideoUploader';

interface CourseFormData {
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  price: number;
  chapters: ChapterData[];
}

interface ChapterData {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration?: string;
}

const generateChapterId = () => Math.random().toString(36).substr(2, 9);

const MentorCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    level: '',
    category: '',
    duration: '',
    price: 0,
    chapters: [],
  });
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterFormData, setChapterFormData] = useState<Omit<ChapterData, 'id'>>({
    title: '',
    description: '',
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddChapter = () => {
    if (!chapterFormData.title) return;

    const newChapter: ChapterData = {
      id: generateChapterId(),
      ...chapterFormData,
    };

    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter],
    }));

    setChapterFormData({
      title: '',
      description: '',
    });
  };

  const handleEditChapter = (chapter: ChapterData) => {
    setSelectedChapter(chapter.id);
    setChapterFormData({
      title: chapter.title,
      description: chapter.description,
    });
  };

  const handleUpdateChapter = () => {
    if (!selectedChapter || !chapterFormData.title) return;

    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter =>
        chapter.id === selectedChapter
          ? { ...chapter, ...chapterFormData }
          : chapter
      ),
    }));

    setSelectedChapter(null);
    setChapterFormData({
      title: '',
      description: '',
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter(chapter => chapter.id !== chapterId),
    }));
  };

  const handleVideoUpload = (chapterId: string, videoUrl: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter =>
        chapter.id === chapterId
          ? { ...chapter, videoUrl }
          : chapter
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to create course
      // await createCourse(formData);
      navigate('/mentor/courses');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const steps = ['Información Básica', 'Contenido del Curso', 'Revisión'];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Curso
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Box>
              <TextField
                fullWidth
                label="Título del Curso"
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Nivel</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  label="Nivel"
                  onChange={handleSelectChange}
                  required
                >
                  <MenuItem value="beginner">Principiante</MenuItem>
                  <MenuItem value="intermediate">Intermedio</MenuItem>
                  <MenuItem value="advanced">Avanzado</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleTextChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Duración (en horas)"
                name="duration"
                value={formData.duration}
                onChange={handleTextChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleTextChange}
                margin="normal"
                required
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Capítulos del Curso
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Título del Capítulo"
                  value={chapterFormData.title}
                  onChange={(e) => setChapterFormData(prev => ({ ...prev, title: e.target.value }))}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Descripción del Capítulo"
                  value={chapterFormData.description}
                  onChange={(e) => setChapterFormData(prev => ({ ...prev, description: e.target.value }))}
                  margin="normal"
                  multiline
                  rows={2}
                />
                <Button
                  variant="contained"
                  startIcon={selectedChapter ? <EditIcon /> : <AddIcon />}
                  onClick={selectedChapter ? handleUpdateChapter : handleAddChapter}
                  sx={{ mt: 2 }}
                >
                  {selectedChapter ? 'Actualizar Capítulo' : 'Agregar Capítulo'}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <List>
                {formData.chapters.map((chapter, index) => (
                  <React.Fragment key={chapter.id}>
                    <ListItem
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        mb: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <DragHandleIcon />
                      </IconButton>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {index + 1}. {chapter.title}
                          </Typography>
                        }
                        secondary={chapter.description}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditChapter(chapter)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteChapter(chapter.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    
                    <Box sx={{ ml: 6, mb: 3 }}>
                      <VideoUploader
                        courseId={formData.title} // Temporal, debería ser el ID real del curso
                        chapterId={chapter.id}
                        onUploadComplete={(videoUrl) => handleVideoUpload(chapter.id, videoUrl)}
                        onError={(error) => console.error(error)}
                      />
                    </Box>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Resumen del Curso
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Información Básica
                </Typography>
                <Typography>Título: {formData.title}</Typography>
                <Typography>Descripción: {formData.description}</Typography>
                <Typography>Nivel: {formData.level}</Typography>
                <Typography>Categoría: {formData.category}</Typography>
                <Typography>Duración: {formData.duration} horas</Typography>
                <Typography>Precio: ${formData.price}</Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Contenido del Curso
                </Typography>
                <List>
                  {formData.chapters.map((chapter, index) => (
                    <ListItem key={chapter.id}>
                      <ListItemText
                        primary={`${index + 1}. ${chapter.title}`}
                        secondary={
                          <>
                            {chapter.description}
                            {chapter.videoUrl && (
                              <Typography variant="caption" display="block" color="success.main">
                                Video cargado ✓
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} variant="outlined">
                Atrás
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Crear Curso
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => navigate('/mentor/courses')}
              size="large"
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MentorCourseForm; 