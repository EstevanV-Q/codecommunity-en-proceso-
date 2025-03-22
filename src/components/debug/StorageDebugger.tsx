import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { getCurrentStorage } from '../../services/storage/config';
import { IndexedDBStorage } from '../../services/storage/IndexedDBStorage';

const StorageDebugger = () => {
    const [loading, setLoading] = useState(false);
    const [dbState, setDbState] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [dbInfo, setDbInfo] = useState<string>('');

    useEffect(() => {
        checkIndexedDB();
    }, []);

    const checkIndexedDB = async () => {
        try {
            const dbs = await window.indexedDB.databases();
            setDbInfo(`Bases de datos encontradas: ${dbs.map(db => db.name).join(', ')}`);
        } catch (error) {
            setDbInfo('No se pudo obtener información de las bases de datos');
            console.error('Error al verificar IndexedDB:', error);
        }
    };

    const handleCheckDB = async () => {
        setLoading(true);
        setError(null);
        try {
            const storage = getCurrentStorage() as IndexedDBStorage;
            const state = await storage.debugDatabase();
            console.log('Estado de la base de datos:', state);
            setDbState(state);
            await checkIndexedDB();
        } catch (err) {
            console.error('Error al verificar la base de datos:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const handleClearDB = async () => {
        if (!window.confirm('¿Estás seguro de que quieres limpiar la base de datos?')) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Primero intentamos eliminar la base de datos directamente
            await window.indexedDB.deleteDatabase('codecommunity');
            console.log('Base de datos eliminada directamente');

            // Luego limpiamos a través del storage
            const storage = getCurrentStorage() as IndexedDBStorage;
            await storage.clear();
            setDbState(null);
            console.log('Base de datos limpiada a través del storage');

            await checkIndexedDB();
        } catch (err) {
            console.error('Error al limpiar la base de datos:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const handleResetDB = async () => {
        if (!window.confirm('¿Estás seguro de que quieres reiniciar la base de datos?')) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Eliminar la base de datos existente
            await window.indexedDB.deleteDatabase('codecommunity');
            console.log('Base de datos eliminada');

            // Recargar la página para reinicializar todo
            window.location.reload();
        } catch (err) {
            console.error('Error al reiniciar la base de datos:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
            setLoading(false);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>
                Depurador de Almacenamiento
            </Typography>

            <Alert severity="info" sx={{ mb: 2 }}>
                {dbInfo}
            </Alert>
            
            <Box mb={2}>
                <Button 
                    variant="contained" 
                    onClick={handleCheckDB}
                    disabled={loading}
                    sx={{ mr: 1 }}
                >
                    Verificar DB
                </Button>
                <Button 
                    variant="contained" 
                    color="warning"
                    onClick={handleClearDB}
                    disabled={loading}
                    sx={{ mr: 1 }}
                >
                    Limpiar DB
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleResetDB}
                    disabled={loading}
                >
                    Reiniciar DB
                </Button>
            </Box>

            {loading && (
                <Box display="flex" justifyContent="center" my={2}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {dbState && (
                <Paper sx={{ p: 2, maxHeight: '500px', overflow: 'auto' }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Estado de la base de datos:
                    </Typography>
                    <pre style={{ margin: 0 }}>
                        {JSON.stringify(dbState, null, 2)}
                    </pre>
                </Paper>
            )}
        </Box>
    );
};

export default StorageDebugger; 