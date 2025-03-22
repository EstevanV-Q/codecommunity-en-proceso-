import React, { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Code as CodeIcon,
  Forum as ForumIcon,
  Group as GroupIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme/tokens';

const CreateButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const actions = [
    {
      icon: <CodeIcon />,
      name: 'Nuevo Proyecto',
      route: '/projects/new',
      tooltip: 'Crear un nuevo proyecto',
    },
    {
      icon: <ForumIcon />,
      name: 'Nueva Discusión',
      route: '/forum/new',
      tooltip: 'Iniciar una nueva discusión en el foro',
    },
    {
      icon: <GroupIcon />,
      name: 'Publicación Comunidad',
      route: '/community/new',
      tooltip: 'Crear una publicación en la comunidad',
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel="Crear nuevo contenido"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        '& .MuiSpeedDial-fab': {
          bgcolor: theme.palette.mode === 'light' ? colors.primary[600] : colors.primary[500],
          '&:hover': {
            bgcolor: theme.palette.mode === 'light' ? colors.primary[700] : colors.primary[400],
          },
        },
      }}
      icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.tooltip}
          tooltipOpen
          onClick={() => {
            navigate(action.route);
            handleClose();
          }}
          sx={{
            '& .MuiSpeedDialAction-fab': {
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' 
                  ? colors.neutral[100] 
                  : colors.neutral[800],
              },
            },
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default CreateButton; 