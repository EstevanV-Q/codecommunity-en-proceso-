import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Event as EventIcon,
  Forum as ForumIcon,
  People as PeopleIcon,
  Link as LinkIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CommunityAdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'topic' | 'event' | 'contributor' | 'link'>('topic');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    author: '',
    points: 0,
    url: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: 'topic' | 'event' | 'contributor' | 'link') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      author: '',
      points: 0,
      url: ''
    });
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar los datos
    console.log('Form data:', formData);
    handleCloseDialog();
  };

  // Datos de ejemplo
  const topics = [
    { id: 1, title: 'Guía para principiantes en React', author: 'Carlos Martínez', replies: 24, views: 352 },
    { id: 2, title: 'Mejores prácticas en Node.js', author: 'Ana García', replies: 18, views: 245 }
  ];

  const events = [
    { id: 1, title: 'Hackathon de Verano', date: '15 de Junio, 2023', participants: 42 },
    { id: 2, title: 'Workshop: Introducción a TypeScript', date: '22 de Junio, 2023', participants: 25 }
  ];

  const contributors = [
    { id: 1, name: 'Laura Fernández', points: 1250, role: 'Líder' },
    { id: 2, name: 'David Rodríguez', points: 980, role: 'Moderador' }
  ];

  const usefulLinks = [
    { id: 1, title: 'Centro de Ayuda', url: '/help' },
    { id: 2, title: 'Normas de la Comunidad', url: '/community-guidelines' }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Temas" icon={<ForumIcon />} />
            <Tab label="Eventos" icon={<EventIcon />} />
            <Tab label="Contribuidores" icon={<PeopleIcon />} />
            <Tab label="Enlaces" icon={<LinkIcon />} />
          </Tabs>
        </Box>

        {/* Panel de Temas */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Temas del Foro</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('topic')}
            >
              Nuevo Tema
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Respuestas</TableCell>
                  <TableCell>Vistas</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell>{topic.title}</TableCell>
                    <TableCell>{topic.author}</TableCell>
                    <TableCell>{topic.replies}</TableCell>
                    <TableCell>{topic.views}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Panel de Eventos */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Eventos</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('event')}
            >
              Nuevo Evento
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Participantes</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.participants}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Panel de Contribuidores */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Contribuidores</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('contributor')}
            >
              Nuevo Contribuidor
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Puntos</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contributors.map((contributor) => (
                  <TableRow key={contributor.id}>
                    <TableCell>{contributor.name}</TableCell>
                    <TableCell>{contributor.points}</TableCell>
                    <TableCell>
                      <Chip label={contributor.role} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Panel de Enlaces */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Enlaces Útiles</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('link')}
            >
              Nuevo Enlace
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usefulLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>{link.title}</TableCell>
                    <TableCell>{link.url}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Diálogo para crear/editar elementos */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'topic' && 'Nuevo Tema'}
          {dialogType === 'event' && 'Nuevo Evento'}
          {dialogType === 'contributor' && 'Nuevo Contribuidor'}
          {dialogType === 'link' && 'Nuevo Enlace'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            {dialogType !== 'link' && (
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ mb: 2 }}
              />
            )}
            {dialogType === 'event' && (
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            )}
            {dialogType === 'contributor' && (
              <TextField
                fullWidth
                label="Puntos"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                sx={{ mb: 2 }}
              />
            )}
            {dialogType === 'link' && (
              <TextField
                fullWidth
                label="URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                sx={{ mb: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommunityAdminPanel; 