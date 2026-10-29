import { motion } from 'framer-motion';
import { Flame, Clock, Target, Trophy } from 'lucide-react';

interface StatisticsProps {
  todaySessions: number;
  todayFocusMinutes: number;
  currentStreak: number;
  totalSessions: number;
}

export default function Statistics({ todaySessions, todayFocusMinutes, currentStreak, totalSessions }: StatisticsProps) {
  const stats = [
    {
      icon: Target,
      label: "Today's Sessions",
      value: todaySessions,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-500/10',
    },
    {
      icon: Clock,
      label: "Today's Focus",
      value: `${todayFocusMinutes}m`,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: currentStreak,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-500/10',
    },
    {
      icon: Trophy,
      label: 'Total Sessions',
      value: totalSessions,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
