import React, { useState } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { getCurrentStorage } from '../../services/storage/config';
import { IndexedDBStorage } from '../../services/storage/IndexedDBStorage';

const StorageDebug = () => {
    const [dbState, setDbState] = useState<any>(null);

    const handleViewData = async () => {
        const storage = getCurrentStorage() as IndexedDBStorage;
        const state = await storage.debugDatabase();
        setDbState(state);
    };

    const handleClearData = async () => {
        const storage = getCurrentStorage();
        await storage.clear();
        setDbState(null);
        alert('Base de datos limpiada');
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Depuración de Almacenamiento
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleViewData} sx={{ mr: 1 }}>
                    Ver Datos
                </Button>
                <Button variant="contained" color="error" onClick={handleClearData}>
                    Limpiar Datos
                </Button>
            </Box>
            {dbState && (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Estado actual de la base de datos:
                    </Typography>
                    <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
                        {JSON.stringify(dbState, null, 2)}
                    </pre>
                </Paper>
            )}
        </Box>
    );
};

export default StorageDebug; 