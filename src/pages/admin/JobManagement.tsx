import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
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
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { JobPosting } from '../../types/JobPosting';

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState<Partial<JobPosting>>({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: [],
    type: 'full-time',
    workMode: 'on-site',
    salary: '',
    contactEmail: '',
  });

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener los trabajos
    const fetchJobs = async () => {
      try {
        // const response = await fetch('/api/jobs');
        // const data = await response.json();
        // setJobs(data);
        
        // Datos de ejemplo
        const mockJobs: JobPosting[] = [
          {
            id: '1',
            title: 'Senior React Developer',
            company: 'Tech Corp',
            location: 'Madrid, España',
            description: 'Buscamos un desarrollador React senior...',
            requirements: ['React', 'TypeScript', '5+ años de experiencia'],
            salary: '45,000€ - 60,000€',
            contactEmail: 'jobs@techcorp.com',
            createdAt: new Date().toISOString(),
            createdBy: 'Admin',
            type: 'full-time',
            workMode: 'hybrid',
          },
        ];
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleOpenDialog = (job?: JobPosting) => {
    if (job) {
      setSelectedJob(job);
      setFormData(job);
    } else {
      setSelectedJob(null);
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: [],
        type: 'full-time',
        workMode: 'on-site',
        salary: '',
        contactEmail: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequirementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const requirements = event.target.value.split(',').map(req => req.trim());
    setFormData(prev => ({ ...prev, requirements }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedJob) {
        // Actualizar trabajo existente
        // await fetch(`/api/jobs/${selectedJob.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
        setJobs(prev => prev.map(job => 
          job.id === selectedJob.id ? { ...formData as JobPosting, id: job.id } : job
        ));
      } else {
        // Crear nuevo trabajo
        // await fetch('/api/jobs', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
        const newJob: JobPosting = {
          ...formData as JobPosting,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          createdBy: 'Admin',
        };
        setJobs(prev => [...prev, newJob]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Gestión de Ofertas de Trabajo
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Nueva Oferta
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Modalidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  {job.type === 'full-time' ? 'Tiempo Completo' :
                   job.type === 'part-time' ? 'Medio Tiempo' :
                   job.type === 'contract' ? 'Contrato' : 'Freelance'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      job.workMode === 'remote' ? 'Remoto' :
                      job.workMode === 'hybrid' ? 'Híbrido' : 'Presencial'
                    }
                    size="small"
                    color={
                      job.workMode === 'remote' ? 'success' :
                      job.workMode === 'hybrid' ? 'warning' : 'info'
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(job)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(job.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedJob ? 'Editar Oferta' : 'Nueva Oferta'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del Puesto"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Empresa"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requisitos (separados por comas)"
                  name="requirements"
                  value={formData.requirements?.join(', ')}
                  onChange={handleRequirementsChange}
                  helperText="Ejemplo: React, TypeScript, 3+ años de experiencia"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Trabajo</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="full-time">Tiempo Completo</MenuItem>
                    <MenuItem value="part-time">Medio Tiempo</MenuItem>
                    <MenuItem value="contract">Contrato</MenuItem>
                    <MenuItem value="freelance">Freelance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Modalidad de Trabajo</InputLabel>
                  <Select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="remote">Remoto</MenuItem>
                    <MenuItem value="hybrid">Híbrido</MenuItem>
                    <MenuItem value="on-site">Presencial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Salario (opcional)"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email de Contacto"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedJob ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobManagement; 