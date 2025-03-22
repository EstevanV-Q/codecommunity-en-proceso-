import React, { useState, useEffect } from 'react';
import CoursesList from '../components/CoursesList';
import { Course } from '../types/course';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simular datos de cursos para demostración
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'Desarrollo Web con React',
            description: 'Aprende a crear aplicaciones web modernas con React, incluyendo hooks, context, y las mejores prácticas de desarrollo.',
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
            thumbnail: '/images/react-course.jpg',
          },
          {
            id: '2',
            title: 'Machine Learning en Tiempo Real',
            description: 'Curso en vivo sobre implementación de modelos de Machine Learning en aplicaciones del mundo real.',
            level: 'advanced',
            category: 'Machine Learning',
            duration: 30,
            technologies: ['Python', 'TensorFlow', 'scikit-learn'],
            requirements: ['Python intermedio', 'Estadística básica'],
            isPublished: true,
            price: 149.99,
            mentor: 'Ana García',
            enrolledStudents: 75,
            rating: 4.8,
            hasSpecificStartDate: true,
            startDate: '2024-05-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            courseType: 'live',
            thumbnail: '/images/ml-course.jpg',
          },
          {
            id: '3',
            title: 'Introducción a la Programación',
            description: 'Curso básico para principiantes que quieren empezar en el mundo de la programación.',
            level: 'beginner',
            category: 'Desarrollo Web',
            duration: 20,
            technologies: ['HTML', 'CSS', 'JavaScript'],
            requirements: ['Ninguno'],
            isPublished: true,
            price: 49.99,
            mentor: 'Carlos Rodríguez',
            enrolledStudents: 300,
            rating: 4.2,
            hasSpecificStartDate: false,
            startDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            courseType: 'recorded',
            thumbnail: '/images/intro-course.jpg',
          },
        ];

        setCourses(mockCourses);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los cursos');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId: string) => {
    // Aquí iría la lógica de inscripción
    setSnackbar({
      open: true,
      message: 'Inscripción exitosa',
      severity: 'success',
    });
    // Redirigir al usuario a la página del curso o checkout
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CoursesList courses={courses} onEnroll={handleEnroll} />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CoursesPage; 