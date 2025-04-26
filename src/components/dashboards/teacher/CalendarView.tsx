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
  Card,
  CardContent,
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
    
    // Add days from previous month to start the calendar from Sunday
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days from next month to complete the calendar
    const remainingDays = 42 - days.length; // 6 rows * 7 days
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
    setSelectedEvent(null);
  };

  const handleDelete = async (eventId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEvents(events.filter(e => e.id !== eventId));
    setLoading(false);
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

  const getEventColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'primary';
      case 'assignment':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5">Calendar</Typography>
          <Box>
            <IconButton onClick={handlePrevMonth}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" component="span" sx={{ mx: 2 }}>
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Event
          </Button>
        </Box>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs key={day}>
            <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'grey.100' }}>
              <Typography variant="subtitle2">{day}</Typography>
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
                  p: 1,
                  minHeight: 120,
                  bgcolor: isCurrentMonth ? 'white' : 'grey.50',
                  opacity: isCurrentMonth ? 1 : 0.7,
                }}
              >
                <Typography
                  variant="body2"
                  color={isCurrentMonth ? 'textPrimary' : 'textSecondary'}
                >
                  {date.getDate()}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {dayEvents.map(event => (
                    <Chip
                      key={event.id}
                      icon={getEventIcon(event.type)}
                      label={event.title}
                      size="small"
                      color={getEventColor(event.type)}
                      onClick={() => handleOpenDialog(event)}
                      sx={{ mb: 0.5, width: '100%' }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog for creating/editing events */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as 'assignment' | 'course' | 'meeting' 
                })}
              >
                <MenuItem value="course">Class</MenuItem>
                <MenuItem value="assignment">Assignment</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              value={formData.start}
              onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              value={formData.end}
              onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button
              color="error"
              onClick={() => {
                handleDelete(selectedEvent.id);
                handleCloseDialog();
              }}
              sx={{ mr: 'auto' }}
            >
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedEvent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default CalendarView; 