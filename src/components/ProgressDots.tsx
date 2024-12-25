import React from 'react';

interface ProgressDotsProps {
  cycles: number;
}

export function ProgressDots({ cycles }: ProgressDotsProps) {
  const currentDot = cycles % 4;

  return (
    <div className="flex gap-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full border border-white/80 transition-colors duration-300
            ${index < currentDot ? 'bg-white' : ''} 
            ${index === currentDot ? 'animate-dot-pulse' : 'bg-transparent'}`}
        />
      ))}
    </div>
  );
}