import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function Controls({ isRunning, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        title="Reset"
      >
        <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isRunning ? onPause : onStart}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30 transition-all"
        title={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white ml-1" />
        )}
      </motion.button>

      <div className="w-14 h-14" />
    </div>
  );
}
