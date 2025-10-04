import { PomodoroTimer } from './components/PomodoroTimer';
import { DistractionCounter } from './components/DistractionCounter';
import { HeroUIProvider } from '@heroui/react';
import { SettingsDrawer, SettingsButton } from './components/Settings';
import { FullscreenButton } from './components/FullscreenButton';
import { useState } from 'react';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <HeroUIProvider>
      <main className="h-screen bg-black overflow-hidden">
        <div className="h-full container mx-auto px-4 py-4 flex flex-col">
          <h1 className="text-center text-white/80 text-xl font-thin tracking-wider mb-4">
            should be studying.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 my-auto">
            <section className="flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 p-8">
              <PomodoroTimer />
            </section>
            <section className="flex items-center justify-center p-8">
              <DistractionCounter />
            </section>
          </div>
        </div>
        <FullscreenButton />
        <SettingsButton onPress={() => setIsSettingsOpen(true)} />
        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </main>
    </HeroUIProvider>
  );
}

export default App;
