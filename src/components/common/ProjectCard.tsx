import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  Button,
  LinearProgress,
  Tooltip,
  alpha,
  styled,
} from '@mui/material';
import {
  Code as CodeIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { colors, radii, shadows, transitions } from '../../theme/tokens';

// Tipos
export interface Contributor {
  id: string;
  name: string;
  avatar: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  technologies: string[];
  contributors: Contributor[];
  milestones: Milestone[];
  lastActivity: string;
}

// Estilos personalizados
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: radii.md,
  overflow: 'hidden',
  boxShadow: shadows.md,
  transition: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  position: 'relative',
  '&:hover': {
    boxShadow: shadows.lg,
    transform: 'translateY(-4px)',
  },
}));

const StatusIndicator = styled(Box)<{ status: string }>(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return colors.primary[500];
      case 'completed':
        return colors.secondary[500];
      case 'pending':
        return colors.alert[500];
      default:
        return colors.neutral[500];
    }
  };

  return {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: getStatusColor(),
  };
});

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(colors.accent[500], 0.1),
  color: colors.accent[700],
  fontSize: '0.75rem',
  height: 24,
  '&:hover': {
    backgroundColor: alpha(colors.accent[500], 0.2),
  },
}));

const ContributionGraph = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 40,
  gap: 2,
  marginBottom: theme.spacing(2),
}));

const ContributionBar = styled(Box)<{ intensity: number }>(({ theme, intensity }) => {
  const getIntensityColor = () => {
    if (intensity === 0) return colors.neutral[200];
    if (intensity < 3) return colors.secondary[300];
    if (intensity < 6) return colors.secondary[500];
    if (intensity < 9) return colors.primary[500];
    return colors.primary[700];
  };

  return {
    width: 8,
    height: '100%',
    backgroundColor: getIntensityColor(),
    borderRadius: 4,
  };
});

const MilestoneItem = styled(Box)<{ completed: boolean }>(({ theme, completed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  borderRadius: radii.sm,
  backgroundColor: completed ? alpha(colors.secondary[500], 0.1) : alpha(colors.neutral[500], 0.05),
  marginBottom: theme.spacing(1),
}));

// Componente ProjectCard
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  status,
  progress,
  technologies,
  contributors,
  milestones,
  lastActivity,
}) => {
  const navigate = useNavigate();

  // Generar datos de contribución simulados para el gráfico
  const contributionData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10));
  
  // Obtener el próximo hito
  const nextMilestone = milestones.find(m => !m.completed);
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <StyledCard>
      <StatusIndicator status={status} />
      <CardContent sx={{ p: 3 }}>
        {/* Título y descripción */}
        <Box component={RouterLink} to={`/projects/${id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: colors.neutral[800],
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CodeIcon color="primary" />
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '2.5rem',
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Progreso */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progreso
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {`${progress}%`}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(colors.neutral[300], 0.5),
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                backgroundColor: status === 'completed' ? colors.secondary[500] : colors.primary[500],
              },
            }}
          />
        </Box>

        {/* Gráfico de contribuciones */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Contribuciones recientes
        </Typography>
        <ContributionGraph>
          {contributionData.map((intensity, index) => (
            <Tooltip key={index} title={`${intensity} contribuciones`} arrow>
              <ContributionBar intensity={intensity} />
            </Tooltip>
          ))}
        </ContributionGraph>

        {/* Tecnologías */}
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {technologies.slice(0, 4).map((tech) => (
            <TechChip key={tech} label={tech} size="small" />
          ))}
          {technologies.length > 4 && (
            <TechChip label={`+${technologies.length - 4}`} size="small" />
          )}
        </Box>

        {/* Colaboradores */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Colaboradores
          </Typography>
          <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.875rem' } }}>
            {contributors.map((contributor) => (
              <Tooltip key={contributor.id} title={contributor.name} arrow>
                <Avatar alt={contributor.name} src={contributor.avatar} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>

        {/* Próximo hito */}
        {nextMilestone && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Próximo hito
            </Typography>
            <MilestoneItem completed={false}>
              <ScheduleIcon fontSize="small" sx={{ mr: 1, color: colors.primary[500] }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  {nextMilestone.title}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {formatDate(nextMilestone.dueDate)}
              </Typography>
            </MilestoneItem>
          </Box>
        )}

        {/* Última actividad y acción */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Última actividad: {formatDate(lastActivity)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(`/projects/${id}`)}
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'medium',
            }}
          >
            Ver detalles
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectCard;