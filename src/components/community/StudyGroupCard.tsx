import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface StudyGroupCardProps {
  id: string;
  name: string;
  members: number;
  activeDiscussions: number;
  description?: string;
  isPrivate?: boolean;
  onClick?: () => void;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({
  id,
  name,
  members,
  activeDiscussions,
  description,
  isPrivate,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/study-group/${id}`);
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          {isPrivate && (
            <Chip
              label="Privado"
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <AvatarGroup max={4}>
              {Array.from({ length: Math.min(members, 4) }).map((_, index) => (
                <Avatar
                  key={index}
                  sx={{ width: 24, height: 24 }}
                >
                  {String.fromCharCode(65 + index)}
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="body2">
              {members} miembros
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={`${activeDiscussions} discusiones activas`}
              size="small"
              color="secondary"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudyGroupCard; 