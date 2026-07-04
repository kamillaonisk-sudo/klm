import { useState, useEffect } from 'react';
import type { Page, AppState } from './types';
import { chapters } from './data/chapters';
import { loadState, getWeekMinutes } from './utils/storage';
import { initVoices } from './utils/speech';
import { ChapterView } from './components/ChapterView';
import { FlashCards } from './components/FlashCards';
import { SongAnalyzer } from './components/SongAnalyzer';
import { ProgressTracker } from './components/ProgressTracker';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [state, setState] = useState<AppState>(loadState);
  const [selectedChapter, setSelectedChapter] = useState(1);

  useEffect(() => {
    initVoices();
  }, []);

  const dueCards = state.flashcards.filter((c) => c.nextReview <= Date.now()).length;
  const weekMinutes = getWeekMinutes(state.sessions);

  function openChapter(id: number) {
    setSelectedChapter(id);
    setPage('chapter');
  }

  const nav: { key: Page; label: string; icon: string }[] = [
    { key: 'home', label: 'Главы', icon: '📚' },
    { key: 'flashcards', label: 'Карточки', icon: '🃏' },
    { key: 'songs', label: 'Песни', icon: '🎵' },
    { key: 'progress', label: 'Прогресс', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setPage('home')} className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl">🇫🇷</span>
            <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Français A1</span>
          </button>
          <div className="flex items-center gap-3 text-sm">
            {dueCards > 0 && (
              <button
                onClick={() => setPage('flashcards')}
                className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400
                  px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
              >
                {dueCards} к повторению
              </button>
            )}
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              {weekMinutes}/180 мин
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {page === 'home' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Учим французский
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              От нуля до A1 за 8 недель — 3 часа в неделю
            </p>

            <div className="space-y-3">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => ch.available && openChapter(ch.id)}
                  disabled={!ch.available}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer
                    ${ch.available
                      ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-60 cursor-not-allowed'
                    }
                    ${state.completedChapters.includes(ch.id) ? 'border-l-4 border-l-green-400' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{ch.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ch.description}</p>
                    </div>
                    <span className="text-2xl ml-3">
                      {state.completedChapters.includes(ch.id)
                        ? '✅'
                        : ch.available
                          ? '→'
                          : '🔒'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {page === 'chapter' && (
          <ChapterView
            chapterId={selectedChapter}
            state={state}
            setState={setState}
            onBack={() => setPage('home')}
          />
        )}

        {page === 'flashcards' && (
          <FlashCards
            state={state}
            setState={setState}
            onBack={() => setPage('home')}
          />
        )}

        {page === 'songs' && (
          <SongAnalyzer onBack={() => setPage('home')} />
        )}

        {page === 'progress' && (
          <ProgressTracker
            state={state}
            setState={setState}
            onBack={() => setPage('home')}
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 z-30">
        <div className="max-w-2xl mx-auto flex">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs transition-colors cursor-pointer
                ${page === item.key || (item.key === 'home' && page === 'chapter')
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
