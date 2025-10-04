import { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import { Maximize2, Minimize2 } from 'lucide-react';

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <Button
      isIconOnly
      variant="bordered"
      className="fixed bottom-20 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
      onPress={toggleFullscreen}
    >
      {isFullscreen ? (
        <Minimize2 size={20} className="text-white group-hover:text-black" />
      ) : (
        <Maximize2 size={20} className="text-white group-hover:text-black" />
      )}
    </Button>
  );
}
