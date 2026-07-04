import { useState, useMemo } from 'react';
import type { AppState, FlashCard } from '../types';
import { reviewCard, saveState } from '../utils/storage';
import { SpeakButton } from './SpeakButton';

interface Props {
  state: AppState;
  setState: (s: AppState) => void;
  onBack: () => void;
}

export function FlashCards({ state, setState, onBack }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dueCards = useMemo(
    () => state.flashcards.filter((c) => c.nextReview <= Date.now()),
    [state.flashcards]
  );

  const totalCards = state.flashcards.length;

  if (totalCards === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Колода пуста
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Добавьте слова из главы, нажимая «+ Карточка»
        </p>
        <button onClick={onBack} className="btn-primary">← К главам</button>
      </div>
    );
  }

  if (dueCards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Все повторено!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          В колоде {totalCards} карточек. Новые будут готовы к повторению позже.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          Ближайшее повторение:{' '}
          {new Date(
            Math.min(...state.flashcards.map((c) => c.nextReview))
          ).toLocaleDateString('ru-RU')}
        </p>
        <button onClick={onBack} className="btn-primary">← К главам</button>
      </div>
    );
  }

  const card = dueCards[currentIndex % dueCards.length];
  if (!card) return null;

  function handleRate(quality: number) {
    const next = reviewCard(state, card.id, quality);
    setState(next);
    saveState(next);
    setShowAnswer(false);
    setCurrentIndex((i) => i + 1);
  }

  return (
    <div>
      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 mb-4 hover:underline cursor-pointer">
        ← Назад
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Карточки</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {dueCards.length} к повторению / {totalCards} всего
        </span>
      </div>

      <div className="max-w-md mx-auto">
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100
            dark:border-gray-700 p-8 text-center min-h-[240px] flex flex-col items-center justify-center"
        >
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            {card.fr}
          </p>
          <SpeakButton text={card.fr} />

          {showAnswer && (
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 w-full">
              <p className="text-xl text-gray-600 dark:text-gray-300">{card.ru}</p>
            </div>
          )}
        </div>

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="mt-4 btn-primary w-full"
          >
            Показать ответ
          </button>
        ) : (
          <div className="mt-4 space-y-2">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              Насколько хорошо вспомнили?
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRate(1)}
                className="py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100
                  dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
              >
                😕 Забыл
              </button>
              <button
                onClick={() => handleRate(3)}
                className="py-3 rounded-xl bg-amber-50 text-amber-600 font-medium hover:bg-amber-100
                  dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-colors cursor-pointer"
              >
                🤔 Сложно
              </button>
              <button
                onClick={() => handleRate(5)}
                className="py-3 rounded-xl bg-green-50 text-green-600 font-medium hover:bg-green-100
                  dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors cursor-pointer"
              >
                😊 Легко
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
