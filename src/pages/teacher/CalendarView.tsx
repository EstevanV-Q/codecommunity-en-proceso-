import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import FileDropzone from '../../components/FileDropzone';
import DeleteIcon from '@mui/icons-material/Delete';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  type: 'class' | 'meeting' | 'task';
  attachments: File[];
}

const CalendarView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventStartDate, setEventStartDate] = useState<Date>(new Date());
  const [eventEndDate, setEventEndDate] = useState<Date>(new Date());
  const [eventType, setEventType] = useState<'class' | 'meeting' | 'task'>('class');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFilesAccepted = (files: File[]) => {
    setAttachments(prevFiles => [...prevFiles, ...files]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAttachments([]);
  };

  const createEventData = (selectedEvent: CalendarEvent | null): CalendarEvent => {
    return {
      id: selectedEvent?.id || crypto.randomUUID(),
      title: selectedEvent?.title || '',
      description: selectedEvent?.description || '',
      start: selectedEvent?.start || new Date(),
      end: selectedEvent?.end || new Date(),
      type: selectedEvent?.type || 'class',
      attachments: selectedEvent?.attachments || []
    };
  };

  const handleSaveEvent = () => {
    const eventData = createEventData(selectedEvent);
    if (selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? eventData : event));
    } else {
      setEvents([...events, eventData]);
    }
    setOpenDialog(false);
  };

  return (
    <Box sx={{ height: '100vh', p: 3, bgcolor: '#f5f5f5' }}>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Attachments
              </Typography>
              <FileDropzone onFilesAccepted={handleFilesAccepted} />
              {attachments.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {attachments.map((file, index) => (
                      <Box
                        component="li"
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 1
                        }}
                      >
                        <Typography variant="body2">
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setAttachments(prevFiles =>
                              prevFiles.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveEvent}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarView; 