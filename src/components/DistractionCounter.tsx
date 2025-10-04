import { Plus, Minus, RotateCcw } from 'lucide-react';
import { Button } from '@heroui/react';
import { useKeyboardCounter } from '../hooks/useKeyboardCounter';

export function DistractionCounter() {
  const { count, increment, decrement, reset } = useKeyboardCounter();

  return (
    <div className="flex flex-col items-center space-y-6 text-white">
      <h2 className="text-2xl font-light text-gray-400">distraction counter</h2>
      <div className="text-6xl font-light">{count}</div>
      <div className="flex gap-4">
        <Button
          isIconOnly
          variant="bordered"
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
          onPress={decrement}
          onKeyDown={(e) => e.key === ' ' && decrement()}
        >
          <Minus size={20} className="text-white group-hover:text-black" />
        </Button>
        <Button
          isIconOnly
          variant="bordered"
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
          onPress={increment}
          onKeyDown={(e) => e.key === ' ' && increment()}
        >
          <Plus size={20} className="text-white group-hover:text-black" />
        </Button>
      </div>
      <Button
        variant="bordered"
        className="h-12 px-6 opacity-80 rounded-full text-white hover:bg-white hover:text-black group"
        onPress={reset}
        onKeyDown={(e) => e.key === ' ' && reset()}
        startContent={<RotateCcw size={16} className="text-white group-hover:text-black" />}
      >
        <span className="pb-0.5">reset</span>
      </Button>
    </div>
  );
}
