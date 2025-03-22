// Función para generar IDs únicos
const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

interface VideoChapter {
    id: string;
    title: string;
    duration: string;
    videoUrl?: string;
    isLocked: boolean;
}

interface LiveSession {
    courseId: string;
    sessionUrl: string;
    embedUrl: string;
    startDate: Date;
    isActive: boolean;
}

interface CourseContent {
    courseId: string;
    isPublic: boolean;
    type: 'video' | 'live';
    chapters?: VideoChapter[];
    liveSession?: LiveSession;
}

class CourseContentService {
    private static instance: CourseContentService;
    private apiUrl: string;
    private courseContentMap: Map<string, CourseContent>;

    private constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
        this.courseContentMap = new Map();
    }

    public static getInstance(): CourseContentService {
        if (!CourseContentService.instance) {
            CourseContentService.instance = new CourseContentService();
        }
        return CourseContentService.instance;
    }

    async createCourse(courseId: string, type: 'video' | 'live'): Promise<void> {
        const courseContent: CourseContent = {
            courseId,
            isPublic: false,
            type,
            chapters: type === 'video' ? this.createDefaultChapters() : undefined,
            liveSession: type === 'live' ? this.createLiveSession(courseId) : undefined
        };

        this.courseContentMap.set(courseId, courseContent);
    }

    private createDefaultChapters(): VideoChapter[] {
        return [
            { id: generateId(), title: 'Introducción al curso', duration: '15:00', isLocked: false },
            { id: generateId(), title: 'Configuración del entorno', duration: '25:30', isLocked: false },
            { id: generateId(), title: 'Fundamentos básicos', duration: '45:00', isLocked: true },
            { id: generateId(), title: 'Ejercicios prácticos', duration: '60:00', isLocked: true },
            { id: generateId(), title: 'Proyecto final', duration: '90:00', isLocked: true }
        ];
    }

    private createLiveSession(courseId: string): LiveSession {
        const sessionId = generateId();
        return {
            courseId,
            sessionUrl: `https://live.codecommunity.com/session/${sessionId}`,
            embedUrl: `https://live.codecommunity.com/embed/${sessionId}`,
            startDate: new Date(),
            isActive: false
        };
    }

    async setPublicStatus(courseId: string, isPublic: boolean): Promise<void> {
        const courseContent = this.courseContentMap.get(courseId);
        if (courseContent) {
            courseContent.isPublic = isPublic;
            this.courseContentMap.set(courseId, courseContent);
        }
    }

    async uploadVideo(courseId: string, chapterId: string, file: File): Promise<string> {
        const courseContent = this.courseContentMap.get(courseId);
        if (!courseContent || courseContent.type !== 'video' || !courseContent.chapters) {
            throw new Error('Curso no encontrado o no es de tipo video');
        }

        // Aquí iría la lógica real para subir el video a un servicio de almacenamiento
        const mockVideoUrl = `https://storage.example.com/videos/${courseId}/${chapterId}/${file.name}`;
        
        const chapterIndex = courseContent.chapters.findIndex(c => c.id === chapterId);
        if (chapterIndex !== -1) {
            courseContent.chapters[chapterIndex].videoUrl = mockVideoUrl;
            this.courseContentMap.set(courseId, courseContent);
        }

        return mockVideoUrl;
    }

    async getChapters(courseId: string): Promise<VideoChapter[]> {
        const courseContent = this.courseContentMap.get(courseId);
        if (!courseContent || courseContent.type !== 'video' || !courseContent.chapters) {
            throw new Error('Curso no encontrado o no es de tipo video');
        }
        return courseContent.chapters;
    }

    getLiveSessionInfo(courseId: string): LiveSession | null {
        const courseContent = this.courseContentMap.get(courseId);
        if (!courseContent || courseContent.type !== 'live' || !courseContent.liveSession) {
            return null;
        }
        return courseContent.liveSession;
    }

    isPublic(courseId: string): boolean {
        return this.courseContentMap.get(courseId)?.isPublic || false;
    }

    getCourseType(courseId: string): 'video' | 'live' | null {
        return this.courseContentMap.get(courseId)?.type || null;
    }
}

export default CourseContentService.getInstance(); 