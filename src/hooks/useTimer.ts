import { useState, useEffect } from 'react';
import { TimerMode } from '../types/timer';

export const useTimer = (initialDuration: number) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [cycles, setCycles] = useState(0);

  const getDuration = (mode: TimerMode): number => {
    switch (mode) {
      case 'work': return 50 * 60;
      case 'break': return 10 * 60;
      case 'longBreak': return 30 * 60;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'work') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(getDuration('longBreak'));
        } else {
          setMode('break');
          setTimeLeft(getDuration('break'));
        }
      } else {
        if (mode === 'longBreak') {
          setCycles(0); // Reset cycles after long break
        }
        setMode('work');
        setTimeLeft(getDuration('work'));
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, cycles]);

  return {
    timeLeft,
    isRunning,
    mode,
    cycles,
    setTimeLeft,
    setIsRunning,
    setMode,
    getDuration
  };
};