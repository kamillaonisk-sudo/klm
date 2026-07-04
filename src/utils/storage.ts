import type { AppState, FlashCard, StudySession } from '../types';

const STORAGE_KEY = 'francais-a1-progress';

const defaultState: AppState = {
  completedChapters: [],
  flashcards: [],
  sessions: [],
  currentChapter: 1,
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addFlashcard(state: AppState, fr: string, ru: string): AppState {
  const exists = state.flashcards.some((c) => c.fr === fr);
  if (exists) return state;
  const card: FlashCard = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fr,
    ru,
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: Date.now(),
  };
  return { ...state, flashcards: [...state.flashcards, card] };
}

export function reviewCard(state: AppState, cardId: string, quality: number): AppState {
  return {
    ...state,
    flashcards: state.flashcards.map((card) => {
      if (card.id !== cardId) return card;
      return sm2(card, quality);
    }),
  };
}

function sm2(card: FlashCard, quality: number): FlashCard {
  let { interval, repetition, easeFactor } = card;

  if (quality < 3) {
    repetition = 0;
    interval = 1;
  } else {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetition++;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

  return { ...card, interval, repetition, easeFactor, nextReview };
}

export function logSession(state: AppState, minutes: number): AppState {
  const today = new Date().toISOString().slice(0, 10);
  const existing = state.sessions.find((s) => s.date === today);
  const sessions = existing
    ? state.sessions.map((s) => (s.date === today ? { ...s, minutes: s.minutes + minutes } : s))
    : [...state.sessions, { date: today, minutes }];
  return { ...state, sessions };
}

export function getWeekMinutes(sessions: StudySession[]): number {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return sessions
    .filter((s) => new Date(s.date).getTime() >= weekAgo)
    .reduce((sum, s) => sum + s.minutes, 0);
}
