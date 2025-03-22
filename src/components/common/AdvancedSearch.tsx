import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Popover,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface SearchFilter {
  field: string;
  value: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  placeholder?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  placeholder = 'Buscar...',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [newFilter, setNewFilter] = useState<SearchFilter>({
    field: '',
    value: '',
  });

  const searchFields = [
    { value: 'title', label: 'Título' },
    { value: 'author', label: 'Autor' },
    { value: 'category', label: 'Categoría' },
    { value: 'date', label: 'Fecha' },
    { value: 'status', label: 'Estado' },
  ];

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleAddFilter = () => {
    if (newFilter.field && newFilter.value) {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: '', value: '' });
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onSearch(searchQuery, filters);
    handleFilterClose();
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilters([]);
    onSearch('', []);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          borderRadius: 2,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 3,
          },
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        {(searchQuery || filters.length > 0) && (
          <IconButton onClick={handleClear} sx={{ p: '10px' }}>
            <ClearIcon />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color={filters.length > 0 ? 'primary' : 'default'}
          onClick={handleFilterClick}
          sx={{ p: '10px' }}
        >
          <FilterListIcon />
        </IconButton>
      </Paper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Filtros de búsqueda
          </Typography>

          <Stack spacing={2} sx={{ mb: 2 }}>
            {filters.map((filter, index) => (
              <Chip
                key={index}
                label={`${searchFields.find(f => f.value === filter.field)?.label}: ${filter.value}`}
                onDelete={() => handleRemoveFilter(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Campo</InputLabel>
            <Select
              value={newFilter.field}
              label="Campo"
              onChange={(e: SelectChangeEvent) =>
                setNewFilter({ ...newFilter, field: e.target.value })
              }
            >
              {searchFields.map((field) => (
                <MenuItem key={field.value} value={field.value}>
                  {field.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Valor"
            value={newFilter.value}
            onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleAddFilter}
              disabled={!newFilter.field || !newFilter.value}
            >
              Agregar Filtro
            </Button>
            <Button
              variant="outlined"
              onClick={handleSearch}
              disabled={!searchQuery && filters.length === 0}
            >
              Buscar
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default AdvancedSearch; 