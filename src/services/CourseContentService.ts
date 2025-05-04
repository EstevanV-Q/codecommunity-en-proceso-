import axios from 'axios';
import { Chapter } from '../types/course';

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
    private baseUrl: string;
    private courseContentMap: Map<string, CourseContent>;

    private constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
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

    async getChapters(courseId: string): Promise<Chapter[]> {
        const response = await fetch(`${this.baseUrl}/courses/${courseId}/chapters`);
        if (!response.ok) {
            throw new Error('Failed to fetch chapters');
        }
        return response.json();
    }

    async updateChapters(courseId: string, chapters: Chapter[]): Promise<Chapter[]> {
        const response = await fetch(`${this.baseUrl}/courses/${courseId}/chapters`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chapters),
        });
        if (!response.ok) {
            throw new Error('Failed to update chapters');
        }
        return response.json();
    }

    async uploadVideo(courseId: string, chapterId: string, file: File, onProgress?: (progress: number) => void): Promise<string> {
        const formData = new FormData();
        formData.append('video', file);

        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const progress = (event.loaded / event.total) * 100;
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.videoUrl);
                } else {
                    reject(new Error('Failed to upload video'));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Failed to upload video'));
            });

            xhr.open('POST', `${this.baseUrl}/courses/${courseId}/chapters/${chapterId}/video`);
            xhr.send(formData);
        });
    }

    async deleteVideo(courseId: string, chapterId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/courses/${courseId}/chapters/${chapterId}/video`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete video');
        }
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