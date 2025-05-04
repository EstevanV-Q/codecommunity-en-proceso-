import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Message as MessageIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StudyGroup as StudyGroupType } from '../../types/student';

const StudyGroupsList: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [groups, setGroups] = useState<StudyGroupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroupOpen, setNewGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // TODO: Implementar llamada a la API
        const mockGroups: StudyGroupType[] = [
          {
            id: '1',
            name: 'Grupo de React',
            activeDiscussions: 3,
            members: [],
            description: 'Grupo de estudio para principiantes en React',
            discussions: [],
          },
          {
            id: '2',
            name: 'JavaScript Avanzado',
            activeDiscussions: 2,
            members: [],
            description: 'Grupo para discutir conceptos avanzados de JavaScript',
            discussions: [],
          },
          {
            id: '3',
            name: 'Desarrollo Web',
            activeDiscussions: 5,
            members: [],
            description: 'Grupo para compartir recursos y proyectos web',
            discussions: [],
          },
        ];
        setGroups(mockGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (groupId: string) => {
    navigate(`/community/groups/${groupId}`);
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) return;

    try {
      // TODO: Implementar llamada a la API
      const newGroup: StudyGroupType = {
        id: String(Date.now()),
        name: newGroupName,
        description: newGroupDescription,
        activeDiscussions: 0,
        members: [],
        discussions: [],
      };

      setGroups(prev => [...prev, newGroup]);
      setNewGroupName('');
      setNewGroupDescription('');
      setNewGroupOpen(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Grupos de Estudio
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Únete a grupos de estudio y colabora con otros estudiantes
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewGroupOpen(true)}
            sx={{
              background: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                background: alpha(theme.palette.common.white, 0.9),
              }
            }}
          >
            Crear Grupo
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar grupos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {filteredGroups.map((group) => (
          <Grid item xs={12} md={6} lg={4} key={group.id}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s',
                  boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
              onClick={() => handleGroupClick(group.id)}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '1.5rem',
                    mr: 2,
                  }}
                >
                  {group.name.charAt(0)}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {group.description}
                  </Typography>
                </Box>
              </Box>
              <Box mt="auto" display="flex" alignItems="center" justifyContent="space-between">
                <Chip
                  icon={<MessageIcon />}
                  label={`${group.activeDiscussions} discusiones activas`}
                  color="primary"
                  variant="outlined"
                />
                <IconButton>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={newGroupOpen}
        onClose={() => setNewGroupOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crear Nuevo Grupo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Grupo"
            type="text"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewGroupOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateGroup}
            disabled={!newGroupName.trim() || !newGroupDescription.trim()}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyGroupsList; 