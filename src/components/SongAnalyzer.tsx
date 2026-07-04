import { useState } from 'react';
import { SpeakButton } from './SpeakButton';

interface Props {
  onBack: () => void;
}

const SAMPLE_SONG = `Je l'aime à mourir
Moi je n'étais rien
Et voilà qu'aujourd'hui
Je suis le gardien
Du sommeil de ses nuits
Je l'aime à mourir`;

const SAMPLE_TRANSLATION = `Я люблю её до смерти
Я был никем
И вот сегодня
Я — хранитель
Сна её ночей
Я люблю её до смерти`;

export function SongAnalyzer({ onBack }: Props) {
  const [frText, setFrText] = useState(SAMPLE_SONG);
  const [ruText, setRuText] = useState(SAMPLE_TRANSLATION);
  const [analyzed, setAnalyzed] = useState(false);

  const frLines = frText.split('\n').filter((l) => l.trim());
  const ruLines = ruText.split('\n').filter((l) => l.trim());

  const keyWords = new Set([
    'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles',
    'le', 'la', 'les', 'un', 'une', 'des',
    'suis', 'es', 'est', 'sommes', 'êtes', 'sont',
    'ai', 'as', 'a', 'avons', 'avez', 'ont',
    'ne', 'pas', 'plus', 'rien',
    'et', 'ou', 'mais', 'que', 'qui',
    'à', 'de', 'du', 'en', 'dans',
    'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses',
    'ce', 'cette', 'ces',
    'aime', 'être', 'avoir', 'faire',
  ]);

  function highlightLine(line: string) {
    return line.split(/(\s+|[',!?.]+)/).map((token, i) => {
      const clean = token.toLowerCase().replace(/[^a-zàâäéèêëïîôùûüÿçœæ]/g, '');
      const isKey = keyWords.has(clean);
      return (
        <span
          key={i}
          className={isKey ? 'bg-indigo-100 dark:bg-indigo-900/40 rounded px-0.5 text-indigo-700 dark:text-indigo-300 font-medium' : ''}
        >
          {token}
        </span>
      );
    });
  }

  return (
    <div>
      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 mb-4 hover:underline cursor-pointer">
        ← Назад
      </button>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Разбор песни</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Вставьте текст песни на французском и перевод — приложение разобьёт на строки с озвучкой
      </p>

      {!analyzed ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Текст на французском
            </label>
            <textarea
              value={frText}
              onChange={(e) => setFrText(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
                p-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Вставьте текст песни..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Перевод на русский (по строкам)
            </label>
            <textarea
              value={ruText}
              onChange={(e) => setRuText(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
                p-3 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Вставьте перевод..."
            />
          </div>
          <button onClick={() => setAnalyzed(true)} className="btn-primary w-full">
            Разобрать песню
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setAnalyzed(false)}
            className="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
          >
            ✏️ Изменить текст
          </button>

          <div className="mb-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-sm text-indigo-700 dark:text-indigo-300">
            <span className="bg-indigo-100 dark:bg-indigo-900/40 rounded px-1">Выделенные слова</span> — грамматические
            маркеры (местоимения, артикли, глаголы, предлоги)
          </div>

          <div className="space-y-3">
            {frLines.map((line, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
                      {highlightLine(line)}
                    </p>
                    {ruLines[i] && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {ruLines[i]}
                      </p>
                    )}
                  </div>
                  <SpeakButton text={line} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
