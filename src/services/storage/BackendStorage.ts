import { User, StorageInterface } from './StorageInterface';

export class BackendStorage implements StorageInterface {
    private static instance: BackendStorage;
    private apiUrl: string;

    private constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    }

    public static getInstance(): BackendStorage {
        if (!BackendStorage.instance) {
            BackendStorage.instance = new BackendStorage();
        }
        return BackendStorage.instance;
    }

    async initialize(): Promise<void> {
        // Verificar que el backend está disponible
        try {
            const response = await fetch(this.apiUrl + '/users');
            if (!response.ok) throw new Error('Backend no disponible');
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        // Esta operación no está soportada en el backend por seguridad
        throw new Error('Operación no soportada en el backend');
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const response = await fetch(this.apiUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear usuario');
        }

        return response.json();
    }

    async getUserById(id: string | number): Promise<User | null> {
        const response = await fetch(this.apiUrl + '/users/' + id);
        
        if (response.status === 404) return null;
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al obtener usuario');
        }

        return response.json();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const response = await fetch(this.apiUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.status === 404) return null;
        if (!response.ok) return null;

        return response.json();
    }

    async updateUser(id: string | number, data: Partial<User>): Promise<User> {
        const response = await fetch(this.apiUrl + '/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar usuario');
        }

        return this.getUserById(id) as Promise<User>;
    }

    async deleteUser(id: string | number): Promise<void> {
        const response = await fetch(this.apiUrl + '/users/' + id, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar usuario');
        }
    }

    async addTechnology(userId: string | number, technology: string): Promise<void> {
        const response = await fetch(this.apiUrl + `/users/${userId}/technologies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ technology }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al agregar tecnología');
        }
    }

    async removeTechnology(userId: string | number, technology: string): Promise<void> {
        const response = await fetch(this.apiUrl + `/users/${userId}/technologies/${technology}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar tecnología');
        }
    }

    async getUserTechnologies(userId: string): Promise<string[]> {
        const response = await fetch(`${this.apiUrl}/users/${userId}/technologies`);
        if (!response.ok) {
            throw new Error('Error al obtener tecnologías del usuario');
        }
        return response.json();
    }

    async getAllUsers(): Promise<User[]> {
        const response = await fetch(`${this.apiUrl}/users`);
        if (!response.ok) {
            throw new Error('Error al obtener todos los usuarios');
        }
        const users = await response.json();
        
        // Obtener tecnologías para cada usuario
        return Promise.all(
            users.map(async (user: User) => ({
                ...user,
                technologies: await this.getUserTechnologies(user.id)
            }))
        );
    }

    async debugDatabase(): Promise<{ users: User[]; technologies: any[] }> {
        const users = await this.getAllUsers();
        const technologies: { userId: string; technology: string }[] = [];
        
        // Obtener todas las tecnologías
        await Promise.all(
            users.map(async (user) => {
                const userTechs = await this.getUserTechnologies(user.id);
                userTechs.forEach(tech => {
                    technologies.push({ userId: user.id, technology: tech });
                });
            })
        );

        console.log('Estado actual de la base de datos:', {
            users,
            technologies
        });

        return { users, technologies };
    }
}

export default BackendStorage.getInstance(); 