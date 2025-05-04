export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  contactEmail: string;
  createdAt: string;
  createdBy: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  workMode: 'remote' | 'hybrid' | 'on-site';
} 