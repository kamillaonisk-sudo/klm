import { useState } from 'react';
import type { AppState } from '../types';
import { logSession, saveState, getWeekMinutes } from '../utils/storage';

interface Props {
  state: AppState;
  setState: (s: AppState) => void;
  onBack: () => void;
}

export function ProgressTracker({ state, setState, onBack }: Props) {
  const [minutes, setMinutes] = useState('');
  const weekMinutes = getWeekMinutes(state.sessions);
  const goalMinutes = 180;
  const progress = Math.min(100, Math.round((weekMinutes / goalMinutes) * 100));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const session = state.sessions.find((s) => s.date === dateStr);
    return {
      day: d.toLocaleDateString('ru-RU', { weekday: 'short' }),
      date: dateStr,
      minutes: session?.minutes ?? 0,
    };
  });

  const maxDayMinutes = Math.max(60, ...last7Days.map((d) => d.minutes));

  function handleLog() {
    const m = parseInt(minutes);
    if (!m || m <= 0) return;
    const next = logSession(state, m);
    setState(next);
    saveState(next);
    setMinutes('');
  }

  const cardsTotal = state.flashcards.length;
  const cardsDue = state.flashcards.filter((c) => c.nextReview <= Date.now()).length;
  const cardsLearned = state.flashcards.filter((c) => c.repetition >= 3).length;

  return (
    <div>
      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 mb-4 hover:underline cursor-pointer">
        ← Назад
      </button>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Прогресс</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{weekMinutes}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">минут за неделю</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{cardsLearned}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">слов выучено</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{cardsDue}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">карточек к повторению</p>
        </div>
      </div>

      <div className="mb-8 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">Цель: 3 часа в неделю</span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {weekMinutes} из {goalMinutes} минут
        </p>
      </div>

      <div className="mb-8 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Последние 7 дней</h3>
        <div className="flex items-end gap-2 h-32">
          {last7Days.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{d.minutes > 0 ? `${d.minutes}м` : ''}</span>
              <div
                className="w-full rounded-t-lg bg-indigo-200 dark:bg-indigo-800 transition-all duration-300"
                style={{
                  height: `${Math.max(4, (d.minutes / maxDayMinutes) * 100)}%`,
                  backgroundColor: d.minutes > 0 ? undefined : 'var(--tw-colors-gray-100, #f3f4f6)',
                }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Записать занятие</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Минуты"
            min="1"
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
              px-4 py-2 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
          <button onClick={handleLog} className="btn-primary">
            Записать
          </button>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Статистика карточек</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{cardsTotal}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">всего</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{cardsLearned}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">выучено</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{cardsDue}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">к повторению</p>
          </div>
        </div>
      </div>
    </div>
  );
}
