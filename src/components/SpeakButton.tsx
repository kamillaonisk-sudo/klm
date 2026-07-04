import { speak } from '../utils/speech';
import { useState } from 'react';

interface Props {
  text: string;
  size?: 'sm' | 'md';
}

export function SpeakButton({ text, size = 'md' }: Props) {
  const [slow, setSlow] = useState(false);

  const sizeClasses = size === 'sm' ? 'text-sm px-2 py-1' : 'px-3 py-1.5';

  return (
    <span className="inline-flex items-center gap-1">
      <button
        onClick={() => speak(text, slow)}
        className={`${sizeClasses} rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600
          transition-colors cursor-pointer active:scale-95 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300`}
        title="Прослушать"
      >
        🔊
      </button>
      <button
        onClick={() => { setSlow(!slow); speak(text, !slow); }}
        className={`${sizeClasses} rounded-lg text-xs transition-colors cursor-pointer active:scale-95
          ${slow
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        title={slow ? 'Обычная скорость' : 'Медленно'}
      >
        🐢
      </button>
    </span>
  );
}
