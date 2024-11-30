import { useState, useEffect, useCallback } from 'react';

export const useKeyboardCounter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(0, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && document.activeElement?.tagName !== 'BUTTON') {
        event.preventDefault();
        increment();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [increment]);

  return { count, increment, decrement, reset };
};