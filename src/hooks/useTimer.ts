import { useState, useEffect, useRef } from 'react';
import { TimerMode, TimerSettings } from '../types/timer';

export const useTimer = (initialDuration: number, settings: TimerSettings) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [cycles, setCycles] = useState(0);
  
  const workSoundRef = useRef(new Audio(`/sounds/${settings.workSound}.mp3`));
  const breakSoundRef = useRef(new Audio(`/sounds/${settings.breakSound}.mp3`));

  // Update sound references when settings change
  useEffect(() => {
    workSoundRef.current = new Audio(`/sounds/${settings.workSound}.mp3`);
    breakSoundRef.current = new Audio(`/sounds/${settings.breakSound}.mp3`);
  }, [settings.workSound, settings.breakSound]);

  const getDuration = (mode: TimerMode): number => {
    switch (mode) {
      case 'work': 
        return Math.max(1, parseInt(settings.workMinutes) || 50) * 60;
      case 'break': 
        return Math.max(1, parseInt(settings.breakMinutes) || 10) * 60;
      case 'longBreak': 
        return Math.max(1, parseInt(settings.longBreakMinutes) || 30) * 60;
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