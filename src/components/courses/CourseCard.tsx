import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface CourseCardProps {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextLesson?: string;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  progress,
  lastAccessed,
  nextLesson,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/course/${id}`);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="140"
        image="/images/course-placeholder.jpg"
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progreso del curso
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {progress}% completado
          </Typography>
        </Box>
        {nextLesson && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Próxima lección:
            </Typography>
            <Typography variant="body2">{nextLesson}</Typography>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Último acceso:
          </Typography>
          <Typography variant="body2">
            {new Date(lastAccessed).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard; 