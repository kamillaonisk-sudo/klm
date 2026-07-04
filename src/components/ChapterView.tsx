import { useState } from 'react';
import { alphabet, specialSounds, chapter1Words, chapter1Dialog } from '../data/chapters';
import { SpeakButton } from './SpeakButton';
import { speak } from '../utils/speech';
import type { AppState } from '../types';
import { addFlashcard, saveState } from '../utils/storage';

interface Props {
  chapterId: number;
  state: AppState;
  setState: (s: AppState) => void;
  onBack: () => void;
}

type Tab = 'alphabet' | 'sounds' | 'words' | 'dialog';

export function ChapterView({ chapterId, state, setState, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('alphabet');
  const [addedWords, setAddedWords] = useState<Set<string>>(
    new Set(state.flashcards.map((c) => c.fr))
  );

  if (chapterId !== 1) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🚧</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Глава в разработке
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Скоро добавим содержание для этой главы
        </p>
        <button onClick={onBack} className="btn-primary">← Назад</button>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'alphabet', label: 'Алфавит' },
    { key: 'sounds', label: 'Звуки' },
    { key: 'words', label: 'Слова' },
    { key: 'dialog', label: 'Диалог' },
  ];

  function handleAddToCards(fr: string, ru: string) {
    const next = addFlashcard(state, fr, ru);
    setState(next);
    saveState(next);
    setAddedWords(new Set([...addedWords, fr]));
  }

  return (
    <div>
      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 mb-4 hover:underline cursor-pointer">
        ← Все главы
      </button>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
        Chapitre 1 : Premiers pas
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Первые шаги — алфавит, звуки, знакомство</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer
              ${tab === t.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'alphabet' && (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Французский алфавит — 26 букв, как в английском, но звучат иначе.
            Нажимайте 🔊 чтобы услышать произношение.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {alphabet.map((a) => (
              <div
                key={a.letter}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800
                  border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 w-12 shrink-0">
                    {a.letter}
                  </span>
                  <div className="min-w-0">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{a.sound}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{a.example}</p>
                  </div>
                </div>
                <SpeakButton text={a.example.split(' — ')[0]} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'sounds' && (
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            Эти звуки не существуют в русском языке — их нужно тренировать отдельно.
            Слушайте и повторяйте за озвучкой.
          </p>
          {specialSounds.map((group) => (
            <div
              key={group.sound}
              className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">
                {group.sound}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{group.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.examples.map((ex) => (
                  <div
                    key={ex.fr}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">{ex.fr}</span>
                      <span className="text-gray-400 mx-2">—</span>
                      <span className="text-gray-500 dark:text-gray-400">{ex.ru}</span>
                    </div>
                    <SpeakButton text={ex.fr.split(' → ')[0]} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'words' && (
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            30 слов и фраз для знакомства. Нажмите «+ Карточка», чтобы добавить слово в колоду для повторения.
          </p>
          <div className="space-y-2">
            {chapter1Words.map((w) => (
              <div
                key={w.fr}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800
                  border border-gray-100 dark:border-gray-700 gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-800 dark:text-gray-100">{w.fr}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{w.ru}</div>
                  {w.phonetic && (
                    <div className="text-xs text-indigo-400 dark:text-indigo-500">[{w.phonetic}]</div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <SpeakButton text={w.fr} size="sm" />
                  <button
                    onClick={() => handleAddToCards(w.fr, w.ru)}
                    disabled={addedWords.has(w.fr)}
                    className={`text-xs px-2 py-1 rounded-lg transition-colors cursor-pointer
                      ${addedWords.has(w.fr)
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50'
                      }`}
                  >
                    {addedWords.has(w.fr) ? '✓' : '+ Карточка'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'dialog' && (
        <div>
          <div className="mb-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium mb-1">
              💡 Задание для практики с носителем
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Разыграйте этот диалог с вашим партнёром. Сначала прослушайте каждую фразу,
              потом попробуйте произнести сами. Партнёр пусть поправит произношение.
            </p>
          </div>

          <div className="space-y-3">
            {chapter1Dialog.map((line, i) => (
              <div
                key={i}
                className={`flex gap-3 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0
                    ${line.speaker === 'A' ? 'bg-indigo-500' : 'bg-emerald-500'}`}
                >
                  {line.speaker}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl
                    ${line.speaker === 'A'
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 rounded-tl-sm'
                      : 'bg-emerald-50 dark:bg-emerald-900/20 rounded-tr-sm'
                    }`}
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">{line.fr}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{line.ru}</p>
                  <div className="mt-2">
                    <SpeakButton text={line.fr} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              chapter1Dialog.forEach((line, i) => {
                setTimeout(() => speak(line.fr), i * 3000);
              });
            }}
            className="mt-6 btn-primary w-full"
          >
            ▶ Прослушать весь диалог
          </button>
        </div>
      )}
    </div>
  );
}
