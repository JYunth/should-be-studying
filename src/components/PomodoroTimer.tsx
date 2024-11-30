import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/timeUtils';
import { ProgressDots } from './ProgressDots';

export function PomodoroTimer() {
  const {
    timeLeft,
    isRunning,
    mode,
    cycles,
    setTimeLeft,
    setIsRunning,
    setMode,
    getDuration
  } = useTimer(50 * 60);

  const toggleTimer = () => setIsRunning(!isRunning);

  const skipBreak = () => {
    setMode('work');
    setTimeLeft(getDuration('work'));
    setIsRunning(false);
  };

  const skipWork = () => {
    setTimeLeft(5);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center space-y-6 text-white">
      <h2 className="text-2xl font-light text-gray-400">pomodoro timer</h2>
      <ProgressDots cycles={cycles} />
      <div className="text-6xl font-light">{formatTime(timeLeft)}</div>
      <div className="text-sm uppercase tracking-wide text-gray-400">{mode.replace(/([A-Z])/g, ' $1').trim()}</div> 
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white hover:bg-white hover:text-black transition-colors"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        {(mode === 'break' || mode === 'longBreak') && (
          <button
            onClick={skipBreak}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white hover:bg-white hover:text-black transition-colors"
          >
            <SkipForward size={20} />
          </button>
        )}
        {mode === 'work' && (
          <button
            onClick={skipWork}
            className="flex items-center justify-center px-4 py-2 rounded-full border border-white/60 text-white/60 hover:bg-white hover:text-black transition-colors text-sm"
          >
            skip work
          </button>
        )}
      </div>
    </div>
  );
}