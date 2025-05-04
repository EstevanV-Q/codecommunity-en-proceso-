import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  School as ClassIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { CalendarEvent } from '../../../types/dashboard';

// Mock data
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Web Development Class',
    description: 'Introduction to HTML and CSS',
    type: 'course',
    start: '2024-03-15T10:00:00Z',
    end: '2024-03-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'Final Project Due',
    description: 'Submit final project',
    type: 'assignment',
    start: '2024-03-20T23:59:00Z',
    end: '2024-03-20T23:59:00Z',
  },
  // ... más eventos mock
];

interface CalendarFormData {
  title: string;
  description: string;
  type: 'assignment' | 'course' | 'meeting';
  start: string;
  end: string;
  courseId?: string;
}

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const [formData, setFormData] = useState<CalendarFormData>({
    title: '',
    description: '',
    type: 'course',
    start: '',
    end: '',
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getEventsByDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const handleOpenDialog = (event?: CalendarEvent) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        description: event.description || '',
        type: event.type,
        start: event.start,
        end: event.end,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        title: '',
        description: '',
        type: 'course',
        start: '',
        end: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleSubmit = () => {
    if (selectedEvent) {
      setEvents(events.map(event =>
        event.id === selectedEvent.id
          ? {
              ...event,
              title: formData.title,
              description: formData.description,
              type: formData.type,
              start: formData.start,
              end: formData.end,
            }
          : event
      ));
    } else {
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        start: formData.start,
        end: formData.end,
      };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };

  const handleDelete = async (eventId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEvents(events.filter(e => e.id !== eventId));
    setLoading(false);
    handleCloseDialog();
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <ClassIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type: string): "primary" | "secondary" | "error" | "warning" | "info" | "success" => {
    switch (type) {
      case 'course':
        return 'primary';
      case 'assignment':
        return 'warning';
      case 'meeting':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)',
      borderRadius: 4,
      p: 3,
      minHeight: '80vh',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #3498db, #2ecc71, #3498db)',
          backgroundSize: '200% 100%',
          animation: 'gradient 15s ease infinite',
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2c3e50, #3498db)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Calendario
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={handlePrevMonth}
              sx={{
                color: '#2c3e50',
                '&:hover': {
                  backgroundColor: 'rgba(44, 62, 80, 0.1)',
                  transform: 'translateX(-2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                mx: 2,
                color: '#34495e',
                fontWeight: 500,
                minWidth: 200,
                textAlign: 'center'
              }}
            >
              {selectedDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
            </Typography>
            <IconButton 
              onClick={handleNextMonth}
              sx={{
                color: '#2c3e50',
                '&:hover': {
                  backgroundColor: 'rgba(44, 62, 80, 0.1)',
                  transform: 'translateX(2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(45deg, #3498db, #2ecc71)',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
            borderRadius: 2,
            '&:hover': {
              background: 'linear-gradient(45deg, #2ecc71, #3498db)',
              boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s'
          }}
        >
          Nuevo Evento
        </Button>
      </Box>

      <Grid container spacing={1}>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <Grid item xs key={day}>
            <Paper 
              sx={{ 
                p: 1.5, 
                textAlign: 'center', 
                bgcolor: 'rgba(52, 152, 219, 0.1)',
                color: '#2c3e50',
                fontWeight: 600,
                border: 'none',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {day}
              </Typography>
            </Paper>
          </Grid>
        ))}
        
        {getDaysInMonth(selectedDate).map((date, index) => {
          const dayEvents = getEventsByDate(date);
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
          
          return (
            <Grid item xs key={index}>
              <Paper
                sx={{
                  p: 1.5,
                  minHeight: 120,
                  bgcolor: isCurrentMonth ? 'white' : 'rgba(236, 240, 241, 0.5)',
                  opacity: isCurrentMonth ? 1 : 0.7,
                  cursor: 'pointer',
                  border: isToday(date) ? '2px solid #3498db' : '1px solid #ecf0f1',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    bgcolor: 'rgba(236, 240, 241, 0.8)'
                  }
                }}
                onClick={() => handleOpenDialog()}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: isCurrentMonth ? '#2c3e50' : '#95a5a6',
                    fontWeight: isToday(date) ? 600 : 400,
                    position: 'absolute',
                    top: 8,
                    right: 8
                  }}
                >
                  {date.getDate()}
                </Typography>
                <Box sx={{ mt: 4 }}>
                  {dayEvents.map(event => (
                    <Chip
                      key={event.id}
                      icon={getEventIcon(event.type)}
                      label={event.title}
                      size="small"
                      color={getEventColor(event.type)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(event);
                      }}
                      sx={{ 
                        mb: 0.5, 
                        width: '100%',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2,
          borderBottom: '1px solid #ecf0f1',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #3498db, #2ecc71, #3498db)',
            backgroundSize: '200% 100%',
            animation: 'gradient 15s ease infinite',
          }
        }}>
          <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 600 }}>
            {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                }
              }}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={formData.type}
                label="Tipo"
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as 'assignment' | 'course' | 'meeting' 
                })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3498db',
                    },
                  }
                }}
              >
                <MenuItem value="course">Clase</MenuItem>
                <MenuItem value="assignment">Tarea</MenuItem>
                <MenuItem value="meeting">Reunión</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Fecha y Hora de Inicio"
              type="datetime-local"
              fullWidth
              value={formData.start}
              onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                }
              }}
            />
            <TextField
              label="Fecha y Hora de Fin"
              type="datetime-local"
              fullWidth
              value={formData.end}
              onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #ecf0f1' }}>
          {selectedEvent && (
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(selectedEvent.id)}
              sx={{ 
                mr: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(231, 76, 60, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              Eliminar
            </Button>
          )}
          <Button 
            onClick={handleCloseDialog}
            sx={{
              color: '#7f8c8d',
              '&:hover': {
                backgroundColor: 'rgba(127, 140, 141, 0.1)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #3498db, #2ecc71)',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2ecc71, #3498db)',
                boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s'
            }}
          >
            {selectedEvent ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default CalendarView; 