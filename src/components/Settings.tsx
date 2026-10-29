import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, X } from 'lucide-react';

interface SettingsProps {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  onFocusChange: (v: number) => void;
  onShortBreakChange: (v: number) => void;
  onLongBreakChange: (v: number) => void;
}

export default function Settings({
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  onFocusChange,
  onShortBreakChange,
  onLongBreakChange,
}: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [localFocus, setLocalFocus] = useState(focusDuration);
  const [localShort, setLocalShort] = useState(shortBreakDuration);
  const [localLong, setLocalLong] = useState(longBreakDuration);

  const handleSave = () => {
    onFocusChange(localFocus);
    onShortBreakChange(localShort);
    onLongBreakChange(localLong);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        title="Settings"
      >
        <SettingsIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Focus Duration (minutes)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={localFocus}
                    onChange={(e) => setLocalFocus(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                  <div className="text-center text-2xl font-bold text-red-500 mt-1">{localFocus} min</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Short Break (minutes)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={localShort}
                    onChange={(e) => setLocalShort(Number(e.target.value))}
                    className="w-full accent-green-500"
                  />
                  <div className="text-center text-2xl font-bold text-green-500 mt-1">{localShort} min</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Long Break (minutes)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={localLong}
                    onChange={(e) => setLocalLong(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="text-center text-2xl font-bold text-blue-500 mt-1">{localLong} min</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:from-red-600 hover:to-orange-600 transition-all"
              >
                Save Settings
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
