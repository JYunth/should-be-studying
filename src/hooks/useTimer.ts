import { useState, useEffect, useRef } from 'react';
import { TimerMode } from '../types/timer';

export const useTimer = (initialDuration: number) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [cycles, setCycles] = useState(0);
  
  // Add sound references
  const workSoundRef = useRef(new Audio('/sounds/focus2mc.mp3'));
  const breakSoundRef = useRef(new Audio('/sounds/break1mc.mp3'));

  const getDuration = (mode: TimerMode): number => {
    switch (mode) {
      case 'work': return 50 * 60;
      case 'break': return 10 * 60;
      case 'longBreak': return 30 * 60;
    }
  };

  // Helper function to play sounds
  const playSound = (newMode: TimerMode) => {
    if (newMode === 'work') {
      workSoundRef.current.play().catch(err => console.error('Error playing sound:', err));
    } else {
      breakSoundRef.current.play().catch(err => console.error('Error playing sound:', err));
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
          playSound('longBreak');  // Play break sound
        } else {
          setMode('break');
          setTimeLeft(getDuration('break'));
          playSound('break');  // Play break sound
        }
      } else {
        if (mode === 'longBreak') {
          setCycles(0);
        }
        setMode('work');
        setTimeLeft(getDuration('work'));
        playSound('work');  // Play work sound
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