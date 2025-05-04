import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CalendarToday,
  ViewWeek,
  ViewDay,
  Add,
  Edit,
  Delete,
  Sync,
  FilterList,
} from '@mui/icons-material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import es from 'date-fns/locale/es';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  courseId?: string;
  category: 'clase' | 'reunion' | 'examen' | 'otro';
}

const CalendarView: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    category: 'clase',
  });

  const handleViewChange = (newView: 'month' | 'week' | 'day') => {
    setView(newView);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: selectedDate,
      startTime: '09:00',
      endTime: '10:00',
      category: 'clase',
    });
    setOpenDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setOpenDialog(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...newEvent } as Event : event
      ));
    } else {
      setEvents([...events, { ...newEvent, id: Date.now().toString() } as Event]);
    }
    setOpenDialog(false);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const renderMonthView = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <Grid container spacing={1}>
        {days.map((day, index) => (
          <Grid item xs={12} sm={4} md={1.7} key={index}>
            <Paper
              elevation={isSameDay(day, new Date()) ? 3 : 1}
              sx={{
                p: 1,
                minHeight: 120,
                bgcolor: isSameDay(day, new Date()) ? 'primary.light' : 'background.paper',
              }}
            >
              <Typography variant="subtitle2" align="center">
                {format(day, 'EEE d', { locale: es })}
              </Typography>
              {getEventsForDate(day).map(event => (
                <Chip
                  key={event.id}
                  label={event.title}
                  size="small"
                  sx={{ m: 0.5 }}
                  onClick={() => handleEditEvent(event)}
                />
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {days.map((day, index) => (
          <Paper
            key={index}
            elevation={isSameDay(day, new Date()) ? 3 : 1}
            sx={{
              p: 2,
              bgcolor: isSameDay(day, new Date()) ? 'primary.light' : 'background.paper',
            }}
          >
            <Typography variant="subtitle1">
              {format(day, 'EEEE d MMMM', { locale: es })}
            </Typography>
            {getEventsForDate(day).map(event => (
              <Box
                key={event.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 1,
                }}
              >
                <Typography variant="body2">
                  {event.startTime} - {event.endTime}
                </Typography>
                <Chip
                  label={event.title}
                  size="small"
                  onClick={() => handleEditEvent(event)}
                />
              </Box>
            ))}
          </Paper>
        ))}
      </Box>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(selectedDate);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" align="center">
          {format(selectedDate, 'EEEE d MMMM yyyy', { locale: es })}
        </Typography>
        {dayEvents.map(event => (
          <Paper
            key={event.id}
            elevation={2}
            sx={{ p: 2 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{event.title}</Typography>
              <Box>
                <IconButton onClick={() => handleEditEvent(event)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteEvent(event.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {event.startTime} - {event.endTime}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {event.description}
            </Typography>
            <Chip
              label={event.category}
              size="small"
              sx={{ mt: 1 }}
            />
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => handleViewChange('month')}
            color={view === 'month' ? 'primary' : 'default'}
          >
            <CalendarToday />
          </IconButton>
          <IconButton
            onClick={() => handleViewChange('week')}
            color={view === 'week' ? 'primary' : 'default'}
          >
            <ViewWeek />
          </IconButton>
          <IconButton
            onClick={() => handleViewChange('day')}
            color={view === 'day' ? 'primary' : 'default'}
          >
            <ViewDay />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {/* Implementar filtros */}}
          >
            Filtrar
          </Button>
          <Button
            variant="outlined"
            startIcon={<Sync />}
            onClick={() => {/* Implementar sincronización con Google Calendar */}}
          >
            Sincronizar
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddEvent}
          >
            Nuevo Evento
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 2, minHeight: 500 }}>
            {view === 'month' && renderMonthView()}
            {view === 'week' && renderWeekView()}
            {view === 'day' && renderDayView()}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Título"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Descripción"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Categoría"
              select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as Event['category'] })}
              fullWidth
            >
              <MenuItem value="clase">Clase</MenuItem>
              <MenuItem value="reunion">Reunión</MenuItem>
              <MenuItem value="examen">Examen</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Hora de inicio"
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                fullWidth
              />
              <TextField
                label="Hora de fin"
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                fullWidth
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarView; 