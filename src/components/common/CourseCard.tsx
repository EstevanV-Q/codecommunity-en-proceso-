import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  LinearProgress,
  Stack,
  alpha,
  styled,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';
import { colors, dimensions, radii, shadows, transitions } from '../../theme/tokens';

// Tipos
export interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  enrolledCount: number;
  progress?: number;
  technologies: string[];
  isSaved?: boolean;
  onSaveToggle?: (id: string) => void;
}

// Estilos personalizados
const StyledCard = styled(Card)(({ theme }) => ({
  width: dimensions.courseCard.width,
  height: dimensions.courseCard.height,
  borderRadius: radii.md,
  overflow: 'hidden',
  boxShadow: shadows.md,
  transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: shadows.lg,
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 180,
  transition: `transform ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
}));

const ProgressOverlay = styled(Box)<{ value: number }>(({ theme, value }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 180,
  background: `linear-gradient(to right, ${alpha(colors.primary[700], 0.7)} ${value}%, transparent ${value}%)`,
  zIndex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: theme.spacing(1),
}));

const LevelBadge = styled(Chip)<{ level: string }>(({ theme, level }) => {
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return colors.secondary[500];
      case 'Intermediate':
        return colors.accent[500];
      case 'Advanced':
        return colors.primary[500];
      case 'Expert':
        return colors.alert[500];
      default:
        return colors.secondary[500];
    }
  };

  return {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 2,
    backgroundColor: getLevelColor(),
    color: colors.neutral.white,
    fontWeight: 'bold',
    boxShadow: shadows.sm,
  };
});

const SaveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 2,
  minWidth: 'auto',
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  backgroundColor: alpha(colors.neutral.white, 0.8),
  color: colors.primary[500],
  '&:hover': {
    backgroundColor: colors.neutral.white,
  },
}));

const MetadataItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: colors.neutral[600],
  fontSize: '0.875rem',
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(colors.accent[500], 0.1),
  color: colors.accent[700],
  fontSize: '0.75rem',
  height: 24,
  '&:hover': {
    backgroundColor: alpha(colors.accent[500], 0.2),
  },
}));

// Componente CourseCard
const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  thumbnail,
  rating,
  reviewCount,
  duration,
  level,
  enrolledCount,
  progress,
  technologies,
  isSaved = false,
  onSaveToggle,
}) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSaveToggle) {
      onSaveToggle(id);
    }
  };

  return (
    <StyledCard>
      {/* Nivel del curso */}
      <LevelBadge level={level} label={level} size="small" />

      {/* Botón de guardar */}
      <SaveButton onClick={handleSaveClick}>
        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </SaveButton>

      {/* Imagen y progreso */}
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia
          image={thumbnail}
          title={title}
        />
        {progress !== undefined && (
          <ProgressOverlay value={progress}>
            <Typography variant="body2" sx={{ color: colors.neutral.white, fontWeight: 'bold' }}>
              {`${progress}%`}
            </Typography>
          </ProgressOverlay>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        {/* Título y autor */}
        <Box component={RouterLink} to={`/courses/${id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '2.75rem',
              color: colors.neutral[800],
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {instructor}
          </Typography>
        </Box>

        {/* Rating y metadata */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={rating} precision={0.5} size="small" readOnly sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              ({reviewCount})
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <MetadataItem>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{duration}</Typography>
            </MetadataItem>
            <MetadataItem>
              <PeopleIcon fontSize="small" />
              <Typography variant="body2">{enrolledCount}</Typography>
            </MetadataItem>
          </Stack>
        </Box>

        {/* Tecnologías */}
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {technologies.slice(0, 3).map((tech) => (
            <TechChip key={tech} label={tech} size="small" />
          ))}
          {technologies.length > 3 && (
            <TechChip label={`+${technologies.length - 3}`} size="small" />
          )}
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/courses/${id}`}
            sx={{
              borderRadius: radii.sm,
              textTransform: 'none',
              fontWeight: 'medium',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: shadows.sm,
              },
            }}
          >
            {progress !== undefined ? 'Continuar' : 'Ver curso'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: radii.sm,
              textTransform: 'none',
              fontWeight: 'medium',
            }}
          >
            Detalles
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CourseCard; 