import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { JobPosting } from '../../types/JobPosting';

const JobListings: React.FC = () => {
  const theme = useTheme();

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobPosting>>({
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

  // Mock data for demonstration
  useEffect(() => {
    const mockJobs: JobPosting[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'Tech Corp',
        location: 'Madrid, España',
        description: 'Buscamos un desarrollador React senior para unirse a nuestro equipo...',
        requirements: ['React', 'TypeScript', '5+ años de experiencia'],
        salary: '45,000€ - 60,000€',
        contactEmail: 'jobs@techcorp.com',
        createdAt: new Date().toISOString(),
        createdBy: 'Tech Corp',
        type: 'full-time',
        workMode: 'hybrid',
      },
      // Add more mock jobs here
    ];
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleRequirementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const requirements = event.target.value.split(',').map(req => req.trim());
    setNewJob(prev => ({ ...prev, requirements }));
  };

  const handleSubmit = () => {
    const jobPosting: JobPosting = {
      ...newJob as JobPosting,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // This should come from authentication
    };

    setJobs(prev => [...prev, jobPosting]);
    setFilteredJobs(prev => [...prev, jobPosting]);
    setNewJob({
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
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          height: { xs: 'auto', md: '120px' },
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to right, rgb(1, 62, 122), rgb(6, 97, 189))'
            : 'linear-gradient(to right, rgb(152, 207, 255), rgb(68, 169, 252))',
          color: 'white',
          boxShadow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 }, width: '100%' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '1.5rem', md: '2.125rem' },
              textAlign: { xs: 'center', md: 'left' },
              animation: 'bounce 3s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
              },
            }}
          >
            Ofertas de Trabajo
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{
              whiteSpace: 'normal',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Encuentra oportunidades laborales y conecta con empresas
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, width: '100%' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            Publicar Oferta
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Buscar por título, empresa o descripción..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BusinessIcon sx={{ mr: 1, color: 'action.active' }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    {job.company}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: 'action.active' }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    {job.location}
                  </Typography>
                  <Chip
                    label={
                      job.workMode === 'remote' ? 'Remoto' :
                      job.workMode === 'hybrid' ? 'Híbrido' : 'Presencial'
                    }
                    size="small"
                    sx={{ ml: 1 }}
                    color={
                      job.workMode === 'remote' ? 'success' :
                      job.workMode === 'hybrid' ? 'warning' : 'info'
                    }
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Requisitos:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.requirements.map((req, index) => (
                      <Chip key={index} label={req} size="small" />
                    ))}
                  </Box>
                </Box>
                {job.salary && (
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Salario: {job.salary}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<EmailIcon />}
                  href={`mailto:${job.contactEmail}`}
                  color="primary"
                >
                  Contactar
                </Button>
                <Typography variant="caption" sx={{ ml: 'auto' }}>
                  Publicado: {new Date(job.createdAt).toLocaleDateString()}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New Job Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Publicar Nueva Oferta de Trabajo</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del Puesto"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Empresa"
                  name="company"
                  value={newJob.company}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="location"
                  value={newJob.location}
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
                  value={newJob.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requisitos (separados por comas)"
                  name="requirements"
                  value={newJob.requirements?.join(', ')}
                  onChange={handleRequirementsChange}
                  helperText="Ejemplo: React, TypeScript, 3+ años de experiencia"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Trabajo</InputLabel>
                  <Select
                    name="type"
                    value={newJob.type}
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
                    value={newJob.workMode}
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
                  value={newJob.salary}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email de Contacto"
                  name="contactEmail"
                  type="email"
                  value={newJob.contactEmail}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobListings;