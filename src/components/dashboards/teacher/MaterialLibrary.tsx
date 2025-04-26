import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudUpload as UploadIcon,
  Description as DocumentIcon,
  VideoLibrary as VideoIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  Folder as FolderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'image' | 'code';
  url: string;
  courseId: string;
  folder: string;
  createdAt: string;
  size?: number;
  shared: boolean;
}

// Mock data
const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Course Introduction',
    description: 'Introduction to Web Development basics',
    type: 'document',
    url: '/materials/intro.pdf',
    courseId: '1',
    folder: 'Week 1',
    createdAt: '2024-01-15T10:00:00Z',
    size: 1024576, // 1MB
    shared: true,
  },
  {
    id: '2',
    title: 'HTML Tutorial',
    description: 'Complete guide to HTML5',
    type: 'video',
    url: 'https://example.com/video1',
    courseId: '1',
    folder: 'Week 1',
    createdAt: '2024-01-16T10:00:00Z',
    shared: false,
  },
  // ... más materiales mock
];

const MaterialLibrary: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    folder: 'all',
    course: 'all',
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'document',
    url: '',
    courseId: '',
    folder: '',
  });

  const getIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return <DocumentIcon />;
      case 'video':
        return <VideoIcon />;
      case 'link':
        return <LinkIcon />;
      case 'image':
        return <ImageIcon />;
      case 'code':
        return <CodeIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const handleOpenDialog = (material?: Material) => {
    if (material) {
      setSelectedMaterial(material);
      setFormData({
        title: material.title,
        description: material.description,
        type: material.type,
        url: material.url,
        courseId: material.courseId,
        folder: material.folder,
      });
    } else {
      setSelectedMaterial(null);
      setFormData({
        title: '',
        description: '',
        type: 'document',
        url: '',
        courseId: '',
        folder: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMaterial(null);
  };

  const handleSubmit = () => {
    if (selectedMaterial) {
      setMaterials(materials.map(material =>
        material.id === selectedMaterial.id
          ? {
              ...material,
              ...formData,
              type: formData.type as 'document' | 'video' | 'link' | 'image' | 'code'
            }
          : material
      ));
    } else {
      const newMaterial: Material = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        type: formData.type as 'document' | 'video' | 'link' | 'image' | 'code',
        url: formData.url,
        courseId: formData.courseId,
        folder: formData.folder,
        createdAt: new Date().toISOString(),
        shared: false
      };
      setMaterials([...materials, newMaterial]);
    }
  };

  const handleDelete = async (materialId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMaterials(materials.filter(m => m.id !== materialId));
    setLoading(false);
  };

  const handleShare = async (materialId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setMaterials(materials.map(material =>
      material.id === materialId
        ? { ...material, shared: !material.shared }
        : material
    ));
    setLoading(false);
  };

  const folders = Array.from(new Set(materials.map(m => m.folder)));

  const filteredMaterials = materials.filter(material => {
    if (filters.type !== 'all' && material.type !== filters.type) return false;
    if (filters.folder !== 'all' && material.folder !== filters.folder) return false;
    if (filters.course !== 'all' && material.courseId !== filters.course) return false;
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Material Library</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => setOpenUploadDialog(true)}
            sx={{ mr: 1 }}
          >
            Upload
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Material
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="document">Documents</MenuItem>
              <MenuItem value="video">Videos</MenuItem>
              <MenuItem value="link">Links</MenuItem>
              <MenuItem value="image">Images</MenuItem>
              <MenuItem value="code">Code</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Folder</InputLabel>
            <Select
              value={filters.folder}
              label="Folder"
              onChange={(e) => setFilters({ ...filters, folder: e.target.value })}
            >
              <MenuItem value="all">All Folders</MenuItem>
              {folders.map(folder => (
                <MenuItem key={folder} value={folder}>{folder}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <List>
        {filteredMaterials.map((material, index) => (
          <React.Fragment key={material.id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemIcon>
                {getIcon(material.type)}
              </ListItemIcon>
              <ListItemText
                primary={material.title}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" color="textSecondary">
                      {material.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={material.folder}
                        size="small"
                        icon={<FolderIcon />}
                      />
                      <Chip
                        label={formatSize(material.size)}
                        size="small"
                      />
                      {material.shared && (
                        <Chip
                          label="Shared"
                          size="small"
                          color="primary"
                        />
                      )}
                    </Box>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleShare(material.id)}
                  sx={{ mr: 1 }}
                >
                  <ShareIcon color={material.shared ? 'primary' : 'inherit'} />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleOpenDialog(material)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(material.id)}
                  sx={{ mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end">
                  <DownloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      {/* Dialog for creating/editing materials */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedMaterial ? 'Edit Material' : 'New Material'}
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
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Material['type'] })}
              >
                <MenuItem value="document">Document</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="link">Link</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="code">Code</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="URL/Path"
              fullWidth
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
            <TextField
              label="Folder"
              fullWidth
              value={formData.folder}
              onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedMaterial ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Material</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, textAlign: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ mb: 2 }}
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  // Manejar la carga de archivos
                  console.log(e.target.files);
                }}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              Supported formats: PDF, DOC, DOCX, PPT, PPTX, MP4, JPG, PNG
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
          <Button variant="contained" disabled>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default MaterialLibrary; 