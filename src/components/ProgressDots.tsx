import React from 'react';

interface ProgressDotsProps {
  cycles: number;
}

export function ProgressDots({ cycles }: ProgressDotsProps) {
  return (
    <div className="flex gap-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full border border-white/80 
            ${index < (cycles % 4) ? 'bg-white' : 'bg-transparent'}`}
        />
      ))}
    </div>
  );
}