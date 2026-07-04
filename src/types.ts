export interface Word {
  fr: string;
  ru: string;
  phonetic?: string;
  example?: string;
  exampleRu?: string;
}

export interface DialogLine {
  speaker: string;
  fr: string;
  ru: string;
}

export interface Chapter {
  id: number;
  title: string;
  titleRu: string;
  description: string;
  available: boolean;
}

export interface FlashCard {
  id: string;
  fr: string;
  ru: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: number;
}

export interface StudySession {
  date: string;
  minutes: number;
}

export interface AppState {
  completedChapters: number[];
  flashcards: FlashCard[];
  sessions: StudySession[];
  currentChapter: number;
}

export type Page = 'home' | 'chapter' | 'flashcards' | 'songs' | 'progress';
