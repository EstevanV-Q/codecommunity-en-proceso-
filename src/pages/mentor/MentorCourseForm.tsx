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
} from '@mui/material';

interface CourseFormData {
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  price: number;
}

const MentorCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    level: '',
    category: '',
    duration: '',
    price: 0,
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

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Course
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleTextChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select
              name="level"
              value={formData.level}
              label="Level"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleTextChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Duration (in hours)"
            name="duration"
            value={formData.duration}
            onChange={handleTextChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleTextChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Create Course
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/mentor/courses')}
              size="large"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MentorCourseForm; 