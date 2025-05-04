import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StudyGroup as StudyGroupType } from '../../types/student';

const StudyGroupsAdmin: React.FC = () => {
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
            members: [
              { id: 'user1', name: 'Usuario 1', role: 'member' as const },
              { id: 'user2', name: 'Usuario 2', role: 'member' as const },
              { id: 'user3', name: 'Usuario 3', role: 'admin' as const }
            ],
            description: 'Grupo de estudio para principiantes en React',
            discussions: [],
          },
          {
            id: '2',
            name: 'JavaScript Avanzado',
            activeDiscussions: 2,
            members: [
              { id: 'user4', name: 'Usuario 4', role: 'admin' as const },
              { id: 'user5', name: 'Usuario 5', role: 'member' as const }
            ],
            description: 'Grupo para discutir conceptos avanzados de JavaScript',
            discussions: [],
          },
          {
            id: '3',
            name: 'Desarrollo Web',
            activeDiscussions: 5,
            members: [
              { id: 'user6', name: 'Usuario 6', role: 'admin' as const },
              { id: 'user7', name: 'Usuario 7', role: 'member' as const },
              { id: 'user8', name: 'Usuario 8', role: 'member' as const },
              { id: 'user9', name: 'Usuario 9', role: 'member' as const }
            ],
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

  const handleEditGroup = (groupId: string) => {
    // TODO: Implementar edición de grupo
    console.log('Edit group:', groupId);
  };

  const handleDeleteGroup = (groupId: string) => {
    // TODO: Implementar eliminación de grupo
    console.log('Delete group:', groupId);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Administración de Grupos de Estudio
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Gestiona los grupos de estudio y sus miembros
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

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grupo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Miembros</TableCell>
              <TableCell>Discusiones Activas</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        mr: 2,
                      }}
                    >
                      {group.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {group.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Chip
                    icon={<GroupIcon />}
                    label={`${group.members.length} miembros`}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<MessageIcon />}
                    label={`${group.activeDiscussions} discusiones`}
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditGroup(group.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default StudyGroupsAdmin; 