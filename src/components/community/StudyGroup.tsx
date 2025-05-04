import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Chat as ChatIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { StudyGroup as StudyGroupType } from '../../types/student';

const StudyGroup: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StudyGroupType | null>(null);
  const [loading, setLoading] = useState(true);
  const [newDiscussionOpen, setNewDiscussionOpen] = useState(false);
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [discussionContent, setDiscussionContent] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockGroup: StudyGroupType = {
          id: groupId || '1',
          name: 'Grupo de React',
          members: [
            { id: '1', name: 'Juan Pérez', role: 'admin' },
            { id: '2', name: 'María García', role: 'member' },
            { id: '3', name: 'Carlos López', role: 'member' }
          ],
          activeDiscussions: 3,
          description: 'Grupo de estudio para principiantes en React',
          discussions: [
            {
              id: '1',
              title: '¿Cómo usar useEffect correctamente?',
              author: 'Juan Pérez',
              replies: 5,
              lastActivity: '2024-03-15T10:30:00Z'
            },
            {
              id: '2',
              title: 'Mejores prácticas para manejar el estado',
              author: 'María García',
              replies: 3,
              lastActivity: '2024-03-14T15:45:00Z'
            }
          ]
        };
        setGroup(mockGroup);
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleAddDiscussion = async () => {
    if (!discussionTitle.trim() || !discussionContent.trim()) return;

    try {
      // TODO: Implementar llamada a la API
      const newDiscussion = {
        id: String(Date.now()),
        title: discussionTitle,
        author: 'Tú',
        replies: 0,
        lastActivity: new Date().toISOString()
      };

      setGroup(prev => prev ? {
        ...prev,
        discussions: [...(prev.discussions || []), newDiscussion],
        activeDiscussions: (prev.activeDiscussions || 0) + 1
      } : null);

      setDiscussionTitle('');
      setDiscussionContent('');
      setNewDiscussionOpen(false);
    } catch (error) {
      console.error('Error adding discussion:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!group) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6" color="error">
          Grupo no encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          {group.name}
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          {group.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PersonIcon />
          <Typography variant="body2">
            {group.members.length} miembros
          </Typography>
          <Chip
            icon={group.isPrivate ? <LockIcon /> : undefined}
            label={group.isPrivate ? 'Privado' : 'Público'}
            size="small"
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewDiscussionOpen(true)}
        >
          Nueva Discusión
        </Button>
      </Paper>

      <Grid container spacing={3}>
        {/* Miembros */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Miembros
              </Typography>
              <List>
                {group.members.map((member) => (
                  <ListItem key={member.id}>
                    <ListItemAvatar>
                      <Avatar>
                        {member.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.role === 'admin' ? 'Administrador' : 'Miembro'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Discusiones */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Discusiones Activas
              </Typography>
              {group.discussions?.map((discussion) => (
                <Paper
                  key={discussion.id}
                  elevation={1}
                  sx={{ p: 2, mb: 2 }}
                >
                  <Typography variant="subtitle1">
                    {discussion.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Por {discussion.author}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <MessageIcon fontSize="small" />
                    <Typography variant="body2">
                      {discussion.replies} respuestas
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Última actividad: {new Date(discussion.lastActivity).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={newDiscussionOpen}
        onClose={() => setNewDiscussionOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Nueva Discusión</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={discussionTitle}
            onChange={(e) => setDiscussionTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Contenido"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={discussionContent}
            onChange={(e) => setDiscussionContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDiscussionOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleAddDiscussion}
            disabled={!discussionTitle.trim() || !discussionContent.trim()}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyGroup; 