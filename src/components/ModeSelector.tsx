import { motion } from 'framer-motion';
import { TimerMode } from '../hooks/useTimer';

interface ModeSelectorProps {
  mode: TimerMode;
  onSwitch: (mode: TimerMode) => void;
}

const modes: { key: TimerMode; label: string }[] = [
  { key: 'focus', label: 'Focus' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
];

const modeStyles: Record<TimerMode, string> = {
  focus: 'bg-red-500 text-white shadow-red-500/30',
  shortBreak: 'bg-green-500 text-white shadow-green-500/30',
  longBreak: 'bg-blue-500 text-white shadow-blue-500/30',
};

export default function ModeSelector({ mode, onSwitch }: ModeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {modes.map(({ key, label }) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSwitch(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            mode === key
              ? `${modeStyles[key]} shadow-lg`
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
