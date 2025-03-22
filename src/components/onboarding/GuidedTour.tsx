import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TourStep {
  title: string;
  description: string;
  path: string;
}

const tourSteps: TourStep[] = [
  {
    title: 'Catálogo de Cursos',
    description: 'Explora nuestra colección de cursos organizados por tecnología y nivel de dificultad.',
    path: '/courses',
  },
  {
    title: 'Foros de Discusión',
    description: 'Conecta con otros desarrolladores, haz preguntas y comparte conocimientos.',
    path: '/forums',
  },
  {
    title: 'Proyectos Colaborativos',
    description: 'Únete a proyectos reales y practica tus habilidades en equipo.',
    path: '/projects',
  },
  {
    title: 'Tu Perfil',
    description: 'Personaliza tu perfil, sigue tu progreso y gestiona tus logros.',
    path: '/profile',
  },
];

interface GuidedTourProps {
  open: boolean;
  onClose: () => void;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === tourSteps.length - 1) {
      onClose();
      navigate(tourSteps[activeStep].path);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleStepClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Bienvenido a CodeCommunity</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {tourSteps.map((step, index) => (
            <Step key={step.title}>
              <StepLabel
                onClick={() => handleStepClick(step.path)}
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="subtitle1">{step.title}</Typography>
              </StepLabel>
              {activeStep === index && (
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography>{step.description}</Typography>
                  </Paper>
                </Box>
              )}
            </Step>
          ))}
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkip}>Saltar Tour</Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuidedTour;