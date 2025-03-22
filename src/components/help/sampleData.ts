import { Resource } from '../admin/ResourceManager';

// Datos de ejemplo para recursos (simulan datos que vendrían de una API)
export const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Tutoriales',
    description: 'Colección de tutoriales para mejorar tus habilidades de programación',
    type: 'tutorial',
    url: '/tutorials',
    icon: 'SchoolIcon',
    category: 'learning',
    isPublished: true,
    createdAt: '2023-03-01T10:00:00Z',
    updatedAt: '2023-03-10T15:30:00Z'
  },
  {
    id: '2',
    title: 'Documentación',
    description: 'Documentación técnica de la plataforma',
    type: 'documentation',
    url: '/documentation',
    icon: 'CodeIcon',
    category: 'technical',
    isPublished: true,
    createdAt: '2023-03-02T09:15:00Z',
    updatedAt: '2023-03-12T11:45:00Z'
  },
  {
    id: '3',
    title: 'Normas de la Comunidad',
    description: 'Directrices para participar en nuestra comunidad',
    type: 'policy',
    url: '/community-guidelines',
    icon: 'PeopleIcon',
    category: 'community',
    isPublished: true,
    createdAt: '2023-03-03T14:20:00Z',
    updatedAt: '2023-03-15T16:10:00Z'
  },
  {
    id: '4',
    title: 'Preguntas Frecuentes',
    description: 'Respuestas a las preguntas más comunes',
    type: 'faq',
    url: '/faq',
    icon: 'QuestionAnswerIcon',
    category: 'support',
    isPublished: true,
    createdAt: '2023-03-04T11:30:00Z',
    updatedAt: '2023-03-16T10:20:00Z'
  },
  {
    id: '5',
    title: 'Política de Privacidad',
    description: 'Información sobre cómo manejamos tus datos',
    type: 'policy',
    url: '/privacy',
    icon: 'SecurityIcon',
    category: 'policy',
    isPublished: true,
    createdAt: '2023-03-05T13:45:00Z',
    updatedAt: '2023-03-17T09:30:00Z'
  },
  {
    id: '6',
    title: 'Guía de API',
    description: 'Documentación para integrar con la API de CodeCommunity',
    type: 'documentation',
    url: '/api-guide',
    icon: 'CodeIcon',
    category: 'technical',
    isPublished: true,
    createdAt: '2023-03-06T11:30:00Z',
    updatedAt: '2023-03-20T14:15:00Z'
  },
  {
    id: '7',
    title: 'Términos de Servicio',
    description: 'Términos y condiciones de uso de la plataforma',
    type: 'policy',
    url: '/terms',
    icon: 'DescriptionIcon',
    category: 'policy',
    isPublished: true,
    createdAt: '2023-03-07T16:20:00Z',
    updatedAt: '2023-03-21T09:40:00Z'
  },
  {
    id: '8',
    title: 'Centro de Soporte',
    description: 'Encuentra ayuda y soporte para cualquier problema',
    type: 'guide',
    url: '/support',
    icon: 'BuildIcon',
    category: 'support',
    isPublished: true,
    createdAt: '2023-03-08T10:15:00Z',
    updatedAt: '2023-03-22T11:30:00Z'
  }
]; 