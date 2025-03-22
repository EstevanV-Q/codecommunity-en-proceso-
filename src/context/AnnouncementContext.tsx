import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir la interfaz para los anuncios
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'course' | 'event' | 'maintenance';
  isActive: boolean;
  isPinned: boolean;
  publishDate: string;
  expiryDate: string | null;
  targetAudience: 'all' | 'students' | 'mentors' | 'admins';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
}

// Interfaz para el contexto
interface AnnouncementContextType {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => Promise<Announcement>;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<Announcement>;
  deleteAnnouncement: (id: string) => Promise<void>;
  toggleActiveStatus: (id: string) => Promise<Announcement>;
  togglePinnedStatus: (id: string) => Promise<Announcement>;
  incrementViewCount: (id: string) => Promise<void>;
  getAnnouncementById: (id: string) => Announcement | undefined;
  clearError: () => void;
}

// Crear el contexto
const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

// Datos iniciales de ejemplo para anuncios
const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Bienvenidos a la plataforma',
    content: 'Estamos emocionados de dar la bienvenida a todos los nuevos miembros de nuestra comunidad. En los próximos días estaremos lanzando nuevas funcionalidades.',
    type: 'general',
    isActive: true,
    isPinned: true,
    publishDate: new Date().toISOString(),
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    targetAudience: 'all',
    createdBy: 'Admin',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 245
  },
  {
    id: '2',
    title: 'Nuevo curso de React disponible',
    content: 'Hemos lanzado un nuevo curso de React con las últimas actualizaciones de React 18. El curso incluye secciones sobre hooks, context, y la nueva API de concurrencia.',
    type: 'course',
    isActive: true,
    isPinned: false,
    publishDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    expiryDate: null,
    targetAudience: 'students',
    createdBy: 'Admin',
    createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    viewCount: 124
  },
  {
    id: '3',
    title: 'Mantenimiento programado',
    content: 'La plataforma estará en mantenimiento el próximo viernes de 2am a 4am UTC. Durante este tiempo, la plataforma no estará disponible.',
    type: 'maintenance',
    isActive: true,
    isPinned: true,
    publishDate: new Date().toISOString(),
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    targetAudience: 'all',
    createdBy: 'System',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    viewCount: 189
  }
];

// Proveedor del contexto
export const AnnouncementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar anuncios al iniciar la aplicación
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);

        // Intentar cargar desde localStorage primero
        const savedAnnouncements = localStorage.getItem('announcements');
        
        if (savedAnnouncements) {
          setAnnouncements(JSON.parse(savedAnnouncements));
        } else {
          // Si no hay datos guardados, usar los iniciales y guardarlos
          setAnnouncements(initialAnnouncements);
          localStorage.setItem('announcements', JSON.stringify(initialAnnouncements));
        }

        setError(null);
      } catch (err) {
        console.error('Error al cargar anuncios:', err);
        setError('Error al cargar los anuncios. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    loadAnnouncements();
  }, []);

  // Guardar anuncios en localStorage cuando cambian
  useEffect(() => {
    if (announcements.length > 0) {
      localStorage.setItem('announcements', JSON.stringify(announcements));
    }
  }, [announcements]);

  // Agregar un nuevo anuncio
  const addAnnouncement = async (newAnnouncementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<Announcement> => {
    try {
      setLoading(true);
      
      // Simular retardo de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = new Date().toISOString();
      const newAnnouncement: Announcement = {
        ...newAnnouncementData,
        id: `ann_${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        viewCount: 0
      };
      
      setAnnouncements(prevAnnouncements => [...prevAnnouncements, newAnnouncement]);
      
      return newAnnouncement;
    } catch (err) {
      console.error('Error al agregar anuncio:', err);
      setError('Error al agregar el anuncio. Por favor, intenta de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un anuncio existente
  const updateAnnouncement = async (id: string, updatedData: Partial<Announcement>): Promise<Announcement> => {
    try {
      setLoading(true);
      
      // Simular retardo de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const announcementIndex = announcements.findIndex(ann => ann.id === id);
      
      if (announcementIndex === -1) {
        throw new Error(`No se encontró un anuncio con ID: ${id}`);
      }
      
      const updatedAnnouncement: Announcement = {
        ...announcements[announcementIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      
      const updatedAnnouncements = [...announcements];
      updatedAnnouncements[announcementIndex] = updatedAnnouncement;
      
      setAnnouncements(updatedAnnouncements);
      
      return updatedAnnouncement;
    } catch (err) {
      console.error('Error al actualizar anuncio:', err);
      setError('Error al actualizar el anuncio. Por favor, intenta de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un anuncio
  const deleteAnnouncement = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Simular retardo de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnnouncements(prevAnnouncements => 
        prevAnnouncements.filter(ann => ann.id !== id)
      );
    } catch (err) {
      console.error('Error al eliminar anuncio:', err);
      setError('Error al eliminar el anuncio. Por favor, intenta de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar el estado activo de un anuncio
  const toggleActiveStatus = async (id: string): Promise<Announcement> => {
    try {
      const announcement = announcements.find(ann => ann.id === id);
      
      if (!announcement) {
        throw new Error(`No se encontró un anuncio con ID: ${id}`);
      }
      
      return await updateAnnouncement(id, { isActive: !announcement.isActive });
    } catch (err) {
      console.error('Error al cambiar estado del anuncio:', err);
      setError('Error al cambiar el estado del anuncio. Por favor, intenta de nuevo más tarde.');
      throw err;
    }
  };

  // Cambiar el estado destacado (pinned) de un anuncio
  const togglePinnedStatus = async (id: string): Promise<Announcement> => {
    try {
      const announcement = announcements.find(ann => ann.id === id);
      
      if (!announcement) {
        throw new Error(`No se encontró un anuncio con ID: ${id}`);
      }
      
      return await updateAnnouncement(id, { isPinned: !announcement.isPinned });
    } catch (err) {
      console.error('Error al destacar/quitar destacado del anuncio:', err);
      setError('Error al destacar/quitar destacado del anuncio. Por favor, intenta de nuevo más tarde.');
      throw err;
    }
  };

  // Incrementar el contador de vistas de un anuncio
  const incrementViewCount = async (id: string): Promise<void> => {
    try {
      const announcement = announcements.find(ann => ann.id === id);
      
      if (!announcement) {
        throw new Error(`No se encontró un anuncio con ID: ${id}`);
      }
      
      await updateAnnouncement(id, { 
        viewCount: (announcement.viewCount || 0) + 1 
      });
    } catch (err) {
      console.error('Error al incrementar contador de vistas:', err);
      // No mostrar error al usuario para esta operación
    }
  };

  // Obtener un anuncio por su ID
  const getAnnouncementById = (id: string): Announcement | undefined => {
    return announcements.find(ann => ann.id === id);
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        loading,
        error,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        toggleActiveStatus,
        togglePinnedStatus,
        incrementViewCount,
        getAnnouncementById,
        clearError
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAnnouncements = (): AnnouncementContextType => {
  const context = useContext(AnnouncementContext);
  
  if (context === undefined) {
    throw new Error('useAnnouncements debe ser usado dentro de un AnnouncementProvider');
  }
  
  return context;
}; 