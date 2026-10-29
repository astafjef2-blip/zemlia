import { motion } from 'framer-motion';
import { TimerMode } from '../hooks/useTimer';

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const modeColors: Record<TimerMode, { ring: string; text: string; bg: string }> = {
  focus: { ring: '#ef4444', text: 'text-red-500', bg: 'from-red-500/10 to-orange-500/10' },
  shortBreak: { ring: '#22c55e', text: 'text-green-500', bg: 'from-green-500/10 to-emerald-500/10' },
  longBreak: { ring: '#3b82f6', text: 'text-blue-500', bg: 'from-blue-500/10 to-indigo-500/10' },
};

export default function TimerDisplay({ timeLeft, progress, mode }: TimerDisplayProps) {
  const colors = modeColors[mode];
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.bg} blur-3xl opacity-50`} />
      <svg width="320" height="320" className="relative -rotate-90">
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke={colors.ring}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          key={timeLeft}
          initial={{ scale: 1 }}
          animate={{ scale: timeLeft <= 5 && timeLeft > 0 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-6xl font-bold tracking-wider ${colors.text} font-mono`}
        >
          {formatTime(timeLeft)}
        </motion.span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
          {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </span>
      </div>
    </div>
  );
}
