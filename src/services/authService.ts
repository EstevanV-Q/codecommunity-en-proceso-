import { getDB } from '../config/database';

export interface User {
    id: number;
    email: string;
    displayName: string;
    photoURL?: string;
    experienceLevel?: string;
    technologies?: string[];
    bio?: string;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: string;
    password?: string;
}

interface DBUser extends Omit<User, 'technologies'> {
    id: number;
    password: string;
}

class AuthService {
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private hashPassword(password: string): string {
        // En una aplicación real, usarías una función de hash más segura
        return btoa(password);
    }

    private comparePassword(password: string, hash: string): boolean {
        return this.hashPassword(password) === hash;
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const db = await getDB();
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const userIndex = store.index('by-email');
        const user = await userIndex.get(email) as DBUser | undefined;

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (!this.comparePassword(password, user.password)) {
            throw new Error('Contraseña incorrecta');
        }

        // Actualizar último login
        const updateTx = db.transaction('users', 'readwrite');
        const updateStore = updateTx.objectStore('users');
        const updatedUser: DBUser = {
            ...user,
            lastLoginAt: new Date().toISOString()
        };
        await updateStore.put(updatedUser);

        // Obtener tecnologías del usuario
        const techTx = db.transaction('user_technologies', 'readonly');
        const techStore = techTx.objectStore('user_technologies');
        const techIndex = techStore.index('by-user');
        const technologies = await techIndex.getAll(user.id);

        const userData: User = {
            ...user,
            technologies: technologies.map(t => t.technology)
        };

        const token = this.generateToken(user.id);

        return { user: userData, token };
    }

    async register(email: string, password: string, firstName: string, lastName: string): Promise<{ user: User; token: string }> {
        const db = await getDB();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const userIndex = store.index('by-email');

        // Verificar si el email ya existe
        const existingUser = await userIndex.get(email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const now = new Date().toISOString();
        const newUser: DBUser = {
            id: Date.now(),
            email,
            password: this.hashPassword(password),
            displayName: `${firstName} ${lastName}`,
            emailVerified: false,
            createdAt: now,
            lastLoginAt: now
        };

        await store.add(newUser);
        const createdUser = await store.get(newUser.id) as DBUser;

        if (!createdUser) {
            throw new Error('Error al crear usuario');
        }

        const token = this.generateToken(createdUser.id);
        const userData: User = {
            ...createdUser,
            technologies: []
        };

        return { user: userData, token };
    }

    async updateProfile(userId: number, data: Partial<User>): Promise<User> {
        const db = await getDB();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');

        const user = await store.get(userId) as DBUser | undefined;
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const updatedUser: DBUser = {
            ...user,
            ...data,
            id: userId,
            password: user.password // Mantener la contraseña existente
        };

        await store.put(updatedUser);

        if (data.technologies) {
            const techTx = db.transaction('user_technologies', 'readwrite');
            const techStore = techTx.objectStore('user_technologies');
            
            // Eliminar tecnologías existentes
            const techIndex = techStore.index('by-user');
            const existingTechs = await techIndex.getAllKeys(userId);
            await Promise.all(existingTechs.map(key => techStore.delete(key)));

            // Insertar nuevas tecnologías
            await Promise.all(data.technologies.map(tech => 
                techStore.add({ userId, technology: tech })
            ));
        }

        return this.getUserById(userId);
    }

    async getUserById(userId: number): Promise<User> {
        const db = await getDB();
        const tx = db.transaction(['users', 'user_technologies'], 'readonly');
        
        const user = await tx.objectStore('users').get(userId) as DBUser | undefined;
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const techIndex = tx.objectStore('user_technologies').index('by-user');
        const technologies = await techIndex.getAll(userId);

        const userData: User = {
            ...user,
            technologies: technologies.map(t => t.technology)
        };

        return userData;
    }

    private generateToken(userId: number): string {
        const payload = {
            userId,
            exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
        };
        return btoa(JSON.stringify(payload));
    }

    verifyToken(token: string): number {
        try {
            const decoded = JSON.parse(atob(token)) as { userId: number; exp: number };
            if (decoded.exp < Date.now()) {
                throw new Error('Token expirado');
            }
            return decoded.userId;
        } catch {
            throw new Error('Token inválido');
        }
    }

    async resetPassword(email: string): Promise<void> {
        const db = await getDB();
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const userIndex = store.index('by-email');
        const user = await userIndex.get(email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // En una aplicación real, enviarías un email con un link para restablecer la contraseña
        console.log('Email de restablecimiento enviado a:', email);
    }

    async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
        const db = await getDB();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const user = await store.get(userId) as DBUser | undefined;

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (!this.comparePassword(currentPassword, user.password)) {
            throw new Error('Contraseña actual incorrecta');
        }

        const updatedUser: DBUser = {
            ...user,
            password: this.hashPassword(newPassword)
        };

        await store.put(updatedUser);
    }

    async sendVerificationEmail(userId: number): Promise<void> {
        const db = await getDB();
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const user = await store.get(userId) as DBUser | undefined;

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const updatedUser: DBUser = {
            ...user,
            emailVerified: true
        };

        await store.put(updatedUser);
    }
}

export default AuthService.getInstance(); 