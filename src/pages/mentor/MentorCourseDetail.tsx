import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  price: number;
  enrolledStudents: number;
  rating: number;
  createdAt: string;
}

const MentorCourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        // TODO: Implement API call to fetch course details
        // const response = await getCourseDetails(courseId);
        // setCourse(response.data);
        
        // Temporary mock data
        setCourse({
          id: courseId || '',
          title: 'Sample Course',
          description: 'Course description goes here',
          level: 'Intermediate',
          category: 'Programming',
          duration: '10 hours',
          price: 99.99,
          enrolledStudents: 50,
          rating: 4.5,
          createdAt: new Date().toISOString(),
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to load course details');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">Course not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            {course.title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/mentor/courses/${courseId}/edit`)}
          >
            Edit Course
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Level
              </Typography>
              <Chip label={course.level} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Category
              </Typography>
              <Chip label={course.category} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Duration
              </Typography>
              <Typography variant="body1">{course.duration}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Price
              </Typography>
              <Typography variant="body1">${course.price}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Enrolled Students
              </Typography>
              <Typography variant="body1">{course.enrolledStudents}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Rating
              </Typography>
              <Typography variant="body1">{course.rating} / 5</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/mentor/courses')}
          >
            Back to Courses
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default MentorCourseDetail; 