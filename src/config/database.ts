import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface CodeCommunityDB extends DBSchema {
  users: {
    key: number;
    value: {
      id: number;
      email: string;
      password: string;
      displayName: string;
      photoURL?: string;
      experienceLevel?: string;
      bio?: string;
      emailVerified: boolean;
      createdAt: string;
      lastLoginAt: string;
    };
    indexes: { 'by-email': string };
  };
  user_technologies: {
    key: [number, string];
    value: {
      userId: number;
      technology: string;
    };
    indexes: { 'by-user': number };
  };
}

let dbPromise: Promise<IDBPDatabase<CodeCommunityDB>>;

export const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB<CodeCommunityDB>('codecommunity', 1, {
      upgrade(db) {
        // Crear store de usuarios
        const userStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        userStore.createIndex('by-email', 'email', { unique: true });

        // Crear store de tecnologías
        const techStore = db.createObjectStore('user_technologies', {
          keyPath: ['userId', 'technology'],
        });
        techStore.createIndex('by-user', 'userId');
      },
    });
  }
  return dbPromise;
};

export const getDB = () => {
  if (!dbPromise) {
    throw new Error('Database not initialized. Call initDB first.');
  }
  return dbPromise;
};

export default { initDB, getDB }; 