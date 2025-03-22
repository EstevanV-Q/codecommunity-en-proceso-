import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, StorageInterface } from './StorageInterface';

interface CodeCommunityDB extends DBSchema {
    users: {
        key: string;
        value: User;
        indexes: { 'by-email': string };
    };
    user_technologies: {
        key: [string, string];
        value: {
            userId: string;
            technology: string;
        };
        indexes: { 'by-user': string };
    };
}

export class IndexedDBStorage implements StorageInterface {
    private db: Promise<IDBPDatabase<CodeCommunityDB>>;
    private static instance: IndexedDBStorage;
    private dbInitialized = false;
    private readonly DB_NAME = 'codecommunity';
    private readonly DB_VERSION = 1;

    private constructor() {
        this.db = this.initDB();
    }

    public static getInstance(): IndexedDBStorage {
        if (!IndexedDBStorage.instance) {
            IndexedDBStorage.instance = new IndexedDBStorage();
        }
        return IndexedDBStorage.instance;
    }

    private async initDB(): Promise<IDBPDatabase<CodeCommunityDB>> {
        try {
            // Eliminar la base de datos existente si hay problemas
            try {
                const dbs = await window.indexedDB.databases();
                const existingDB = dbs.find(db => db.name === this.DB_NAME);
                if (existingDB) {
                    await window.indexedDB.deleteDatabase(this.DB_NAME);
                    console.log('Base de datos anterior eliminada');
                }
            } catch (error) {
                console.warn('No se pudo verificar/eliminar la base de datos anterior:', error);
            }

            // Crear nueva base de datos
            console.log('Creando nueva base de datos...');
            const db = await openDB<CodeCommunityDB>(this.DB_NAME, this.DB_VERSION, {
                upgrade(db, oldVersion, newVersion, transaction) {
                    console.log('Ejecutando upgrade...', { oldVersion, newVersion });
                    
                    // Eliminar stores existentes si es necesario
                    if (db.objectStoreNames.contains('users')) {
                        db.deleteObjectStore('users');
                    }
                    if (db.objectStoreNames.contains('user_technologies')) {
                        db.deleteObjectStore('user_technologies');
                    }

                    // Crear store de usuarios
                    console.log('Creando store users...');
                    const userStore = db.createObjectStore('users', {
                        keyPath: 'id'
                    });
                    userStore.createIndex('by-email', 'email', { unique: true });
                    console.log('Store users creado');

                    // Crear store de tecnologías
                    console.log('Creando store user_technologies...');
                    const techStore = db.createObjectStore('user_technologies', {
                        keyPath: ['userId', 'technology']
                    });
                    techStore.createIndex('by-user', 'userId');
                    console.log('Store user_technologies creado');
                },
                blocked() {
                    console.warn('Base de datos bloqueada. Por favor, cierre otras pestañas.');
                },
                blocking() {
                    console.warn('Base de datos bloqueando otras conexiones.');
                },
                terminated() {
                    console.warn('Conexión terminada inesperadamente');
                }
            });

            // Verificar que los stores se crearon correctamente
            const storeNames = Array.from(db.objectStoreNames);
            console.log('Stores creados:', storeNames);

            if (!storeNames.includes('users') || !storeNames.includes('user_technologies')) {
                throw new Error('No se crearon todos los stores necesarios');
            }

            this.dbInitialized = true;
            console.log('Base de datos inicializada correctamente');
            return db;
        } catch (error) {
            console.error('Error al inicializar la base de datos:', error);
            this.dbInitialized = false;
            throw error;
        }
    }

    async initialize(): Promise<void> {
        if (this.dbInitialized) {
            console.log('La base de datos ya está inicializada');
            return;
        }

        try {
            await this.db;
            this.dbInitialized = true;
            console.log('IndexedDB inicializado y listo para usar');
        } catch (error) {
            console.error('Error al inicializar IndexedDB:', error);
            // Intentar reinicializar
            this.db = this.initDB();
            await this.db;
        }
    }

    private async ensureInitialized(): Promise<IDBPDatabase<CodeCommunityDB>> {
        if (!this.dbInitialized) {
            await this.initialize();
        }
        return this.db;
    }

    async clear(): Promise<void> {
        const db = await this.ensureInitialized();
        try {
            const tx = db.transaction(['users', 'user_technologies'], 'readwrite');
            await Promise.all([
                tx.objectStore('users').clear(),
                tx.objectStore('user_technologies').clear(),
            ]);
            console.log('Base de datos limpiada correctamente');
        } catch (error) {
            console.error('Error al limpiar la base de datos:', error);
            throw error;
        }
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const db = await this.ensureInitialized();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');

        const id = await store.add({
            ...userData,
            id: Date.now().toString(),
            technologies: [],
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
        });

        const user = await store.get(id);
        if (!user) throw new Error('Error al crear usuario');

        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const db = await this.ensureInitialized();
        const user = await db.get('users', id);
        if (!user) return null;

        const technologies = await this.getUserTechnologies(id);
        return { ...user, technologies };
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const db = await this.ensureInitialized();
        const user = await db.getFromIndex('users', 'by-email', email);
        if (!user) return null;

        const technologies = await this.getUserTechnologies(user.id);
        return { ...user, technologies };
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        const db = await this.ensureInitialized();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');

        const user = await store.get(id);
        if (!user) throw new Error('Usuario no encontrado');

        const updatedUser = {
            ...user,
            ...data,
            id,
        };

        await store.put(updatedUser);
        const result = await this.getUserById(id);
        if (!result) throw new Error('Error al actualizar usuario');
        return result;
    }

    async deleteUser(id: string): Promise<void> {
        const db = await this.ensureInitialized();
        const tx = db.transaction(['users', 'user_technologies'], 'readwrite');
        
        await tx.objectStore('users').delete(id);
        
        const techIndex = tx.objectStore('user_technologies').index('by-user');
        const technologies = await techIndex.getAllKeys(id);
        await Promise.all(
            technologies.map(key => tx.objectStore('user_technologies').delete(key))
        );
    }

    async addTechnology(userId: string, technology: string): Promise<void> {
        const db = await this.ensureInitialized();
        await db.add('user_technologies', { userId, technology });
    }

    async removeTechnology(userId: string, technology: string): Promise<void> {
        const db = await this.ensureInitialized();
        await db.delete('user_technologies', [userId, technology]);
    }

    async getUserTechnologies(userId: string): Promise<string[]> {
        const db = await this.ensureInitialized();
        const technologies = await db.getAllFromIndex('user_technologies', 'by-user', userId);
        return technologies.map(t => t.technology);
    }

    // Método para listar todos los usuarios (útil para debugging)
    async getAllUsers(): Promise<User[]> {
        const db = await this.ensureInitialized();
        const users = await db.getAll('users');
        return Promise.all(
            users.map(async (user) => ({
                ...user,
                technologies: await this.getUserTechnologies(user.id)
            }))
        );
    }

    // Método para mostrar el estado actual de la base de datos
    async debugDatabase(): Promise<{ users: User[]; technologies: any[] }> {
        const db = await this.ensureInitialized();
        const users = await this.getAllUsers();
        const technologies = await db.getAll('user_technologies');
        
        console.log('Estado actual de la base de datos:', {
            users,
            technologies
        });

        return { users, technologies };
    }
}

export default IndexedDBStorage.getInstance(); 