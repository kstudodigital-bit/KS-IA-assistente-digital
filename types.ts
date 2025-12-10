export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  timestamp: Date;
}

export interface Article {
  id: string;
  title: string;
  category: 'Ads' | 'SEO' | 'Branding' | 'Estratégia';
  readTime: string;
  imageUrl: string;
  excerpt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export type Tab = 'home' | 'chat' | 'learn' | 'profile';