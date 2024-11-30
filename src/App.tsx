import React from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { DistractionCounter } from './components/DistractionCounter';

function App() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-white/80 text-xl font-thin tracking-wider mb-12">should be studying</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[calc(100vh-8rem)]">
          <section className="flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 p-8">
            <PomodoroTimer />
          </section>
          <section className="flex items-center justify-center p-8">
            <DistractionCounter />
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;