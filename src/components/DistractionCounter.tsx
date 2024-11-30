import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { useKeyboardCounter } from '../hooks/useKeyboardCounter';

export function DistractionCounter() {
  const { count, increment, decrement, reset } = useKeyboardCounter();

  return (
    <div className="flex flex-col items-center space-y-6 text-white">
      <h2 className="text-2xl font-light text-gray-400">distraction counter</h2>
      <div className="text-6xl font-light">{count}</div>
      <div className="flex gap-4">
        <button
          onClick={decrement}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/80 hover:bg-white hover:text-black transition-colors"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={increment}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-white/80 hover:bg-white hover:text-black transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      <button
        onClick={reset}
        className="flex items-center justify-center px-6 py-2 rounded-full border border-white/80 hover:bg-white hover:text-black transition-colors gap-2"
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>
    </div>
  );
}