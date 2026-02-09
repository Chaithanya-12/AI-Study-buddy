
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Summary {
  title: string;
  mainPoints: string[];
  simplifiedExplanation: string;
  flashcards: { question: string; answer: string }[];
}

export interface Reminder {
  id: string;
  topic: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  SUMMARIZER = 'SUMMARIZER',
  REMINDERS = 'REMINDERS'
}
