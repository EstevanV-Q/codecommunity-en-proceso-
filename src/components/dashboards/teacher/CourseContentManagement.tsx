import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { Course } from '../../../types/dashboard';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

interface LiveSession {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  streamUrl: string;
  isActive: boolean;
}

interface CourseContent {
  courseId: string;
  videos: VideoContent[];
  liveSessions: LiveSession[];
}

const CourseContentManagement: React.FC<{ course: Course }> = ({ course }) => {
  const [content, setContent] = useState<CourseContent>({
    courseId: course.id,
    videos: [],
    liveSessions: [],
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'video' | 'live' | null>(null);
  const [selectedContent, setSelectedContent] = useState<VideoContent | LiveSession | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoUrl: '',
    streamUrl: '',
    startDate: '',
    endDate: '',
  });

  const generateVideoUrl = (title: string) => {
    const baseUrl = 'https://your-platform.com/videos';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${baseUrl}/${course.id}/${slug}-${Date.now()}`;
  };

  const generateStreamUrl = (title: string) => {
    const baseUrl = 'https://your-platform.com/live';
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${baseUrl}/${course.id}/${slug}-${Date.now()}`;
  };

  const handleOpenDialog = (type: 'video' | 'live', content?: VideoContent | LiveSession) => {
    setDialogType(type);
    if (content) {
      setSelectedContent(content);
      setFormData({
        title: content.title,
        description: content.description,
        duration: type === 'video' ? (content as VideoContent).duration : '',
        videoUrl: type === 'video' ? (content as VideoContent).videoUrl : '',
        streamUrl: type === 'live' ? (content as LiveSession).streamUrl : '',
        startDate: type === 'live' ? (content as LiveSession).startDate : '',
        endDate: type === 'live' ? (content as LiveSession).endDate : '',
      });
    } else {
      setSelectedContent(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        videoUrl: '',
        streamUrl: '',
        startDate: '',
        endDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      videoUrl: dialogType === 'video' ? generateVideoUrl(title) : prev.videoUrl,
      streamUrl: dialogType === 'live' ? generateStreamUrl(title) : prev.streamUrl,
    }));
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setSnackbar({ open: true, message: 'URL copied to clipboard!' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType(null);
    setSelectedContent(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (dialogType === 'video') {
      const newVideo: VideoContent = {
        id: selectedContent?.id || String(Date.now()),
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        videoUrl: formData.videoUrl || generateVideoUrl(formData.title),
        isPublished: true,
        createdAt: new Date().toISOString(),
      };

      if (selectedContent) {
        setContent({
          ...content,
          videos: content.videos.map(v => v.id === selectedContent.id ? newVideo : v),
        });
      } else {
        setContent({
          ...content,
          videos: [...content.videos, newVideo],
        });
      }
    } else if (dialogType === 'live') {
      const newLiveSession: LiveSession = {
        id: selectedContent?.id || String(Date.now()),
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        streamUrl: formData.streamUrl || generateStreamUrl(formData.title),
        isActive: new Date(formData.startDate) <= new Date() && new Date(formData.endDate) >= new Date(),
      };

      if (selectedContent) {
        setContent({
          ...content,
          liveSessions: content.liveSessions.map(s => s.id === selectedContent.id ? newLiveSession : s),
        });
      } else {
        setContent({
          ...content,
          liveSessions: [...content.liveSessions, newLiveSession],
        });
      }
    }

    setLoading(false);
    handleCloseDialog();
  };

  const handleDelete = async (type: 'video' | 'live', id: string) => {
    setLoading(true);
    // Simular eliminación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (type === 'video') {
      setContent({
        ...content,
        videos: content.videos.filter(v => v.id !== id),
      });
    } else {
      setContent({
        ...content,
        liveSessions: content.liveSessions.filter(s => s.id !== id),
      });
    }
    
    setLoading(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Course Content Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<VideoIcon />}
            onClick={() => handleOpenDialog('video')}
          >
            Add Video
          </Button>
          {course.courseType === 'live' && (
            <Button
              variant="contained"
              startIcon={<LiveIcon />}
              onClick={() => handleOpenDialog('live')}
            >
              Add Live Session
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Videos Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              <List>
                {content.videos.map((video) => (
                  <React.Fragment key={video.id}>
                    <ListItem>
                      <ListItemText
                        primary={video.title}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {video.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Duration: {video.duration}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                URL: {video.videoUrl}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleCopyUrl(video.videoUrl)}
                              >
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleOpenDialog('video', video)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDelete('video', video.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Live Sessions Section */}
        {course.courseType === 'live' && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Live Sessions
                </Typography>
                <List>
                  {content.liveSessions.map((session) => (
                    <React.Fragment key={session.id}>
                      <ListItem>
                        <ListItemText
                          primary={session.title}
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {session.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(session.startDate).toLocaleString()} - {new Date(session.endDate).toLocaleString()}
                              </Typography>
                              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Stream URL: {session.streamUrl}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => handleCopyUrl(session.streamUrl)}
                                >
                                  <CopyIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              {session.isActive && (
                                <Chip
                                  label="Live Now"
                                  color="error"
                                  size="small"
                                  sx={{ mt: 1 }}
                                />
                              )}
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleOpenDialog('live', session)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDelete('live', session.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Dialog for adding/editing content */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedContent ? 'Edit' : 'Add'} {dialogType === 'video' ? 'Video' : 'Live Session'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleTitleChange}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {dialogType === 'video' ? (
              <>
                <TextField
                  label="Duration (e.g., 1:30:00)"
                  fullWidth
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label="Video URL"
                    fullWidth
                    value={formData.videoUrl}
                    disabled
                  />
                  <IconButton onClick={() => handleCopyUrl(formData.videoUrl)}>
                    <CopyIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label="Stream URL"
                    fullWidth
                    value={formData.streamUrl}
                    disabled
                  />
                  <IconButton onClick={() => handleCopyUrl(formData.streamUrl)}>
                    <CopyIcon />
                  </IconButton>
                </Box>
                <TextField
                  label="Start Date"
                  type="datetime-local"
                  fullWidth
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="datetime-local"
                  fullWidth
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedContent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default CourseContentManagement; 