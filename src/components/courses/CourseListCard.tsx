import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  Avatar,
} from '@mui/material';
import { Course } from '../../types/course';

interface CourseListCardProps {
  id: string;
  title: string;
  description: string;
  instructor: Course['instructor'];
  duration: number;
  level: Course['level'];
  rating: number;
  totalStudents: number;
  thumbnail?: string;
  onClick?: () => void;
}

const CourseListCard: React.FC<CourseListCardProps> = ({
  id,
  title,
  description,
  instructor,
  duration,
  level,
  rating,
  totalStudents,
  thumbnail,
  onClick,
}) => {
  const getLevelText = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return level;
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
      onClick={onClick}
    >
      {thumbnail && (
        <CardMedia
          component="img"
          height="140"
          image={thumbnail}
          alt={title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Avatar
            src={instructor.avatar}
            alt={instructor.name}
            sx={{ width: 24, height: 24 }}
          >
            {instructor.name.charAt(0)}
          </Avatar>
          <Typography variant="body2">
            {instructor.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="body2" color="text.secondary">
            {duration} semanas
          </Typography>
          <Chip
            label={getLevelText(level)}
            size="small"
            color="primary"
          />
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({totalStudents} estudiantes)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseListCard; 