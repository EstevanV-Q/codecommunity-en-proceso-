import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CardActions,
  Tooltip,
  Stack,
  Badge,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
  CalendarToday as CalendarIcon,
  PlayCircle as PlayCircleIcon,
  FiberManualRecord as LiveDotIcon,
} from '@mui/icons-material';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  mentor: string;
  rating: number;
  enrolledStudents: number;
  courseType: 'recorded' | 'live';
  startDate: string;
  hasSpecificStartDate: boolean;
  thumbnail?: string;
  onEnroll?: (courseId: string) => void;
  onWatchContent?: (courseId: string, type: 'video' | 'live') => void;
  isLiveActive?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  level,
  duration,
  price,
  mentor,
  rating,
  enrolledStudents,
  courseType,
  startDate,
  hasSpecificStartDate,
  thumbnail = '/default-course-image.jpg',
  onEnroll,
  onWatchContent,
  isLiveActive = false,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (date: string) => {
    if (courseType === 'recorded') {
      return 'Disponible desde: ' + new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      // Para cursos en directo, mostrar fecha y hora
      return 'Próxima clase: ' + new Date(date).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' hrs';
    }
  };

  const getNextSessionInfo = () => {
    if (courseType === 'live') {
      const now = new Date();
      const startTime = new Date(startDate);
      
      if (isLiveActive) {
        return (
          <Typography variant="subtitle2" color="error" sx={{ fontWeight: 'bold' }}>
            <LiveDotIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom', color: '#ff0000' }} />
            En directo ahora
          </Typography>
        );
      } else if (startTime > now) {
        const timeUntil = startTime.getTime() - now.getTime();
        const daysUntil = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hoursUntil = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        return (
          <Typography variant="subtitle2" color="warning.main">
            <CalendarIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            {daysUntil > 0 
              ? `Comienza en ${daysUntil} días y ${hoursUntil} horas`
              : `Comienza en ${hoursUntil} horas`}
          </Typography>
        );
      }
    }
    return null;
  };

  const renderWatchButton = () => {
    if (courseType === 'recorded') {
      return (
        <Button
          variant="outlined"
          startIcon={<PlayCircleIcon />}
          onClick={() => onWatchContent?.(id, 'video')}
          fullWidth
        >
          Ver Videos
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          startIcon={
            <Badge
              variant="dot"
              color={isLiveActive ? "error" : "default"}
              sx={{
                '& .MuiBadge-badge': {
                  animation: isLiveActive ? 'pulse 1.5s infinite' : 'none',
                },
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              <LiveIcon />
            </Badge>
          }
          onClick={() => onWatchContent?.(id, 'live')}
          disabled={!isLiveActive}
          fullWidth
        >
          {isLiveActive ? 'Unirse al Directo' : 'Clase no iniciada'}
        </Button>
      );
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}>
      <CardMedia
        component="img"
        height="140"
        image={thumbnail}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title}
        </Typography>
        
        <Stack direction="row" spacing={1} mb={2}>
          <Chip
            size="small"
            label={level.charAt(0).toUpperCase() + level.slice(1)}
            color={getLevelColor(level) as any}
          />
          <Chip
            size="small"
            icon={courseType === 'recorded' ? <VideoIcon /> : <LiveIcon />}
            label={courseType === 'recorded' ? 'Video/Capítulos' : 'En directo'}
            color={courseType === 'recorded' ? 'info' : 'warning'}
          />
          {courseType === 'live' && isLiveActive && (
            <Chip
              size="small"
              icon={<LiveDotIcon sx={{ color: '#ff0000' }} />}
              label="EN VIVO"
              color="error"
              sx={{ animation: 'pulse 1.5s infinite' }}
            />
          )}
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 2,
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <SchoolIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            Instructor: {mentor}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            Duración: {duration} horas
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <CalendarIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            {formatDate(startDate)}
          </Typography>
          {getNextSessionInfo()}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({enrolledStudents} estudiantes)
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ flexDirection: 'column', p: 2, gap: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="primary">
            ${price.toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => onEnroll?.(id)}
          >
            Inscribirse
          </Button>
        </Box>
        {renderWatchButton()}
      </CardActions>
    </Card>
  );
};

export default CourseCard; 