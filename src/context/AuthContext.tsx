import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockUser, validateUserCredentials, mockUsers } from '../mocks/users';

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (data: Partial<MockUser>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<MockUser>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const validatedUser = await validateUserCredentials(email.trim(), password.trim());
      
      if (validatedUser) {
        // Asegurarse de que el usuario tenga roles definidos
        const userWithRoles = {
          ...validatedUser,
          roles: validatedUser.roles || [validatedUser.role],
          role: validatedUser.role || 'user' // Asegurar que siempre haya un rol principal
        };
        
        console.log('Usuario validado:', userWithRoles);
        console.log('Roles del usuario:', userWithRoles.roles);
        console.log('Rol principal:', userWithRoles.role);
        
        // Verificar si el usuario tiene roles administrativos
        const adminRoles = [
          'founder', 
          'owner', 
          'cto',
          'admin', 
          'professor',
          'seniorMentor',
          'seniorDev',
          'moderator',
          'accounting',
          'marketing'
        ];
        
        const hasAdminRole = userWithRoles.roles.some(r => adminRoles.includes(r));
        console.log('¿Tiene rol administrativo?:', hasAdminRole);
        
        // Si tiene roles administrativos, usar el rol más alto según la jerarquía
        if (hasAdminRole) {
          const effectiveRole = userWithRoles.roles.reduce((highest, current) => {
            const currentIndex = adminRoles.indexOf(current);
            const highestIndex = adminRoles.indexOf(highest);
            return currentIndex < highestIndex ? current : highest;
          }, userWithRoles.roles[0]);
          
          console.log('Rol efectivo:', effectiveRole);
          userWithRoles.role = effectiveRole;
        }
        
        setUser(userWithRoles);
        localStorage.setItem('user', JSON.stringify(userWithRoles));
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: Partial<MockUser>) => {
    try {
      setError(null);
      setLoading(true);

      // Simular registro
      const userData: MockUser = {
        id: (mockUsers.length + 1).toString(),
        email: data.email || '',
        password: data.password || '',
        displayName: data.displayName || '',
        role: 'user',
        roles: ['user'],
        emailVerified: true,
        ...data
      };

      console.log('Nuevo usuario registrado:', userData);
      mockUsers.push(userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Simular login con Google
      const userData: MockUser = {
        id: 'google-user',
        email: 'google@user.com',
        password: '',
        displayName: 'Usuario de Google',
        role: 'viewer',
        roles: ['viewer'],
        emailVerified: true,
        photoURL: 'https://example.com/google-avatar.jpg'
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión con Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      setLoading(true);
      // Simular envío de email
      console.log('Email de recuperación enviado a:', email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar email de recuperación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<MockUser>) => {
    try {
      setError(null);
      setLoading(true);

      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      const updatedUser = {
        ...user,
        ...data
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setError(null);
      setLoading(true);

      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      // Validar contraseña actual
      if (currentPassword !== user.password) {
        throw new Error('Contraseña actual incorrecta');
      }

      const updatedUser = {
        ...user,
        password: newPassword
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar contraseña');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    register,
    loginWithGoogle,
    resetPassword,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};