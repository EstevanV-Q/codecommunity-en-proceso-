import { StorageInterface } from './StorageInterface';
import IndexedDBStorage from './IndexedDBStorage';
import FirebaseStorage from './FirebaseStorage';
import BackendStorage from './BackendStorage';

export type StorageType = 'indexeddb' | 'firebase' | 'backend';

export const getStorage = (type: StorageType): StorageInterface => {
    console.log('Obteniendo almacenamiento de tipo:', type);
    
    try {
        switch (type) {
            case 'indexeddb':
                console.log('Usando IndexedDB Storage');
                return IndexedDBStorage;
            case 'firebase':
                console.log('Usando Firebase Storage');
                return FirebaseStorage;
            case 'backend':
                console.log('Usando Backend Storage');
                return BackendStorage;
            default:
                console.log('Tipo no reconocido, usando IndexedDB Storage');
                return IndexedDBStorage;
        }
    } catch (error) {
        console.error('Error al obtener almacenamiento:', error);
        throw error;
    }
};

// Configuración actual del almacenamiento
let currentStorage: StorageInterface = IndexedDBStorage;

export const initializeStorage = async (type: StorageType): Promise<void> => {
    console.log('Inicializando almacenamiento de tipo:', type);
    try {
        const storage = getStorage(type);
        await storage.initialize();
        currentStorage = storage;
        console.log('Almacenamiento inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar almacenamiento:', error);
        if (type !== 'indexeddb') {
            console.log('Intentando fallback a IndexedDB...');
            currentStorage = IndexedDBStorage;
            await currentStorage.initialize();
        } else {
            throw error;
        }
    }
};

export const getCurrentStorage = (): StorageInterface => {
    return currentStorage;
}; 