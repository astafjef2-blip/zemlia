import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer, TimerMode } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import Settings from './components/Settings';
import Statistics from './components/Statistics';

interface SessionRecord {
  date: string;
  sessions: number;
  focusMinutes: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export default function App() {
  // Settings
  const [focusDuration, setFocusDuration] = useLocalStorage('pomodoro_focus', 25);
  const [shortBreakDuration, setShortBreakDuration] = useLocalStorage('pomodoro_shortBreak', 5);
  const [longBreakDuration, setLongBreakDuration] = useLocalStorage('pomodoro_longBreak', 15);

  // Statistics
  const [sessions, setSessions] = useLocalStorage<SessionRecord[]>('pomodoro_sessions', []);

  // Calculate today's stats
  const today = getToday();
  const todayData = sessions.find((s) => s.date === today);
  const todaySessions = todayData?.sessions || 0;
  const todayFocusMinutes = todayData?.focusMinutes || 0;

  // Calculate streak
  const calculateStreak = useCallback(() => {
    let streak = 0;
    const date = new Date();
    for (let i = 0; i < 365; i++) {
      const dateStr = date.toISOString().split('T')[0];
      const session = sessions.find((s) => s.date === dateStr);
      if (session && session.sessions > 0) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        if (i === 0) {
          // Today might not have sessions yet, check yesterday
          date.setDate(date.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return streak;
  }, [sessions]);

  const currentStreak = calculateStreak();
  const totalSessions = sessions.reduce((acc, s) => acc + s.sessions, 0);

  const handleTimerComplete = useCallback(
    (mode: TimerMode) => {
      if (mode === 'focus') {
        setSessions((prev) => {
          const todayStr = getToday();
          const existing = prev.find((s) => s.date === todayStr);
          if (existing) {
            return prev.map((s) =>
              s.date === todayStr
                ? { ...s, sessions: s.sessions + 1, focusMinutes: s.focusMinutes + focusDuration }
                : s
            );
          }
          return [...prev, { date: todayStr, sessions: 1, focusMinutes: focusDuration }];
        });
      }
    },
    [focusDuration, setSessions]
  );

  const { mode, timeLeft, isRunning, progress, start, pause, reset, switchMode } = useTimer({
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    onComplete: handleTimerComplete,
  });

  // Update document title
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const modeLabel = mode === 'focus' ? '🔴' : mode === 'shortBreak' ? '🟢' : '🔵';
    document.title = isRunning ? `${modeLabel} ${timeStr} - Pomodoro` : 'Pomodoro Focus Timer';
  }, [timeLeft, isRunning, mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 relative transition-colors">
      <Settings
        focusDuration={focusDuration}
        shortBreakDuration={shortBreakDuration}
        longBreakDuration={longBreakDuration}
        onFocusChange={setFocusDuration}
        onShortBreakChange={setShortBreakDuration}
        onLongBreakChange={setLongBreakDuration}
      />

      <div className="flex flex-col items-center w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">
          Pomodoro Timer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Stay focused, stay productive</p>

        <ModeSelector mode={mode} onSwitch={switchMode} />

        <TimerDisplay timeLeft={timeLeft} progress={progress} mode={mode} />

        <Controls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />

        <Statistics
          todaySessions={todaySessions}
          todayFocusMinutes={todayFocusMinutes}
          currentStreak={currentStreak}
          totalSessions={totalSessions}
        />
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-400 dark:text-gray-500">
        Built with focus & dedication 🎯
      </footer>
    </div>
  );
}
