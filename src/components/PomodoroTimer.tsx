import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@nextui-org/react';
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
        <Button
          isIconOnly
          variant="bordered"
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
          onClick={toggleTimer}
        >
          {isRunning ? <Pause size={20} className="text-white group-hover:text-black" /> : <Play size={20} className="text-white group-hover:text-black" />}
        </Button>
        {(mode === 'break' || mode === 'longBreak') && (
          <Button
            isIconOnly
            variant="bordered"
            className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
            onClick={skipBreak}
          >
            <SkipForward size={20} className="text-white group-hover:text-black" />
          </Button>
        )}
        {mode === 'work' && (
          <Button
            variant="bordered"
            className="h-12 px-4 opacity-80 rounded-full text-white hover:bg-white hover:text-black"
            onClick={skipWork}
            radius="full"
          >
            skip work
          </Button>
        )}
      </div>
    </div>
  );
}