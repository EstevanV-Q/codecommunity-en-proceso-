import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    deleteDoc, 
    query, 
    where, 
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
    Firestore
} from 'firebase/firestore';
import { User, StorageInterface } from './StorageInterface';
import { app } from '../../config/firebase';

export class FirebaseStorage implements StorageInterface {
    private db: Firestore;
    private static instance: FirebaseStorage;

    private constructor() {
        this.db = getFirestore(app);
    }

    public static getInstance(): FirebaseStorage {
        if (!FirebaseStorage.instance) {
            FirebaseStorage.instance = new FirebaseStorage();
        }
        return FirebaseStorage.instance;
    }

    async initialize(): Promise<void> {
        // Firebase se inicializa automáticamente
    }

    async clear(): Promise<void> {
        // En Firebase, la limpieza se maneja a través del panel de administración
        throw new Error('La operación clear() no está soportada en Firebase');
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const usersRef = collection(this.db, 'users');
        const userDoc = doc(usersRef);
        const newUser = {
            ...userData,
            id: userDoc.id,
            technologies: [],
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
        };

        await setDoc(userDoc, newUser);
        return newUser;
    }

    async getUserById(id: string | number): Promise<User | null> {
        const userDoc = doc(this.db, 'users', id.toString());
        const userSnap = await getDoc(userDoc);

        if (!userSnap.exists()) return null;
        return userSnap.data() as User;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const usersRef = collection(this.db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;
        return querySnapshot.docs[0].data() as User;
    }

    async updateUser(id: string | number, data: Partial<User>): Promise<User> {
        const userDoc = doc(this.db, 'users', id.toString());
        await updateDoc(userDoc, { ...data });
        
        const updatedUser = await this.getUserById(id);
        if (!updatedUser) throw new Error('Usuario no encontrado después de la actualización');
        return updatedUser;
    }

    async deleteUser(id: string | number): Promise<void> {
        const userDoc = doc(this.db, 'users', id.toString());
        await deleteDoc(userDoc);
    }

    async addTechnology(userId: string | number, technology: string): Promise<void> {
        const userDoc = doc(this.db, 'users', userId.toString());
        await updateDoc(userDoc, {
            technologies: arrayUnion(technology)
        });
    }

    async removeTechnology(userId: string | number, technology: string): Promise<void> {
        const userDoc = doc(this.db, 'users', userId.toString());
        await updateDoc(userDoc, {
            technologies: arrayRemove(technology)
        });
    }

    async getUserTechnologies(userId: string): Promise<string[]> {
        const techsRef = collection(this.db, 'users', userId, 'technologies');
        const snapshot = await getDocs(techsRef);
        return snapshot.docs.map(doc => doc.data().name);
    }

    async getAllUsers(): Promise<User[]> {
        const usersRef = collection(this.db, 'users');
        const snapshot = await getDocs(usersRef);
        
        return Promise.all(
            snapshot.docs.map(async (doc) => {
                const userData = doc.data();
                const technologies = await this.getUserTechnologies(doc.id);
                return {
                    ...userData,
                    id: doc.id,
                    technologies
                } as User;
            })
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

export default FirebaseStorage.getInstance(); 