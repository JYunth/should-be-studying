import { Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/timeUtils';
import { ProgressDots } from './ProgressDots';
import { TimerSettings } from '../types/timer';

export function PomodoroTimer() {
  // Get initial settings from localStorage
  const getInitialSettings = (): TimerSettings => {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      workMinutes: "50",
      breakMinutes: "10",
      longBreakMinutes: "30",
      workSound: "focus2mc",
      breakSound: "break1mc"
    };
  };

  const settings = getInitialSettings();
  
  const {
    timeLeft,
    isRunning,
    mode,
    cycles,
    setTimeLeft,
    setIsRunning,
    setMode,
    getDuration
  } = useTimer(parseInt(settings.workMinutes) * 60, settings);

  // Listen for settings changes in localStorage
  useEffect(() => {
    const handleSettingsChange = () => {
      const newSettings = getInitialSettings();
      // Only reset if timer is not running
      if (!isRunning) {
        setTimeLeft(parseInt(newSettings.workMinutes) * 60);
      }
    };

    window.addEventListener('storage', handleSettingsChange);
    window.addEventListener('settingsUpdated', handleSettingsChange);
    
    return () => {
      window.removeEventListener('storage', handleSettingsChange);
      window.removeEventListener('settingsUpdated', handleSettingsChange);
    };
  }, [isRunning, setTimeLeft]);

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
      <ProgressDots cycles={cycles} mode={mode} />
      <div className="text-6xl font-light">{formatTime(timeLeft)}</div>
      <div className="text-sm uppercase tracking-wide text-gray-400">{mode.replace(/([A-Z])/g, ' $1').trim()}</div>
      <div className="flex gap-4">
        <Button
          isIconOnly
          variant="bordered"
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
          onPress={toggleTimer}
        >
          {isRunning ? 
            <Pause size={20} className="text-white group-hover:text-black" /> : 
            <Play size={20} className="text-white group-hover:text-black pl-0.5" />
          }
        </Button>
        {(mode === 'break' || mode === 'longBreak') && (
          <Button
            isIconOnly
            variant="bordered"
            className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
            onPress={skipBreak}
          >
            <SkipForward size={20} className="text-white group-hover:text-black" />
          </Button>
        )}
        {mode === 'work' && (
          <Button
            variant="bordered"
            className="h-12 px-4 opacity-80 rounded-full text-white hover:bg-white hover:text-black"
            onPress={skipWork}
            radius="full"
          >
            skip work
          </Button>
        )}
      </div>
    </div>
  );
}