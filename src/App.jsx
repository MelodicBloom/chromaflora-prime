import React from 'react';
import { useChromaOS } from './context/ChromaOS';
import { useAetherAudio } from './hooks/useAetherAudio';
import { CanvasView } from './components/shared/CanvasView';
import { ElasticCursor } from './components/layout/ElasticCursor';
import { ArchiveView } from './views/Archive';
import { ShopView } from './views/Shop';
import { GeneratorView } from './views/Generator';
import { TerminalView } from './views/Terminal';
import { BookOpen, ShoppingCart, Settings, Terminal } from 'lucide-react';

export default function App() {
  const { identity, currentView, navigateTo } = useChromaOS();
  useAetherAudio();

  return (
    <div
      className={`min-h-screen ${identity.warpActive ? 'animate-warp' : ''} ${identity.isCorrupted ? 'is-corrupted' : ''}`}
    >
      <div className="grain-overlay" />
      <CanvasView />
      <ElasticCursor />
      <nav className="glass-card fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-4 rounded-full border-white/10 p-2">
        <button
          onClick={() => navigateTo('archive')}
          className={`rounded-full p-3 transition-all ${currentView === 'archive' ? 'bg-accent text-black' : 'text-white/50'}`}
        >
          <BookOpen size={20} />
        </button>
        <button
          onClick={() => navigateTo('shop')}
          className={`rounded-full p-3 transition-all ${currentView === 'shop' ? 'bg-accent text-black' : 'text-white/50'}`}
        >
          <ShoppingCart size={20} />
        </button>
        <button
          onClick={() => navigateTo('home')}
          className={`rounded-full p-3 transition-all ${currentView === 'home' ? 'bg-accent text-black' : 'text-white/50'}`}
        >
          <Settings size={20} />
        </button>
        <button
          onClick={() => navigateTo('terminal')}
          className={`rounded-full p-3 transition-all ${currentView === 'terminal' ? 'bg-accent text-black' : 'text-white/50'}`}
        >
          <Terminal size={20} />
        </button>
      </nav>
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-24">
        {currentView === 'archive' && (
          <div className="animate-bloom">
            <ArchiveView />
          </div>
        )}
        {currentView === 'shop' && (
          <div className="animate-bloom">
            <ShopView />
          </div>
        )}
        {currentView === 'home' && (
          <div className="animate-bloom">
            <GeneratorView />
          </div>
        )}
        {currentView === 'terminal' && (
          <div className="animate-bloom">
            <TerminalView />
          </div>
        )}
      </main>
    </div>
  );
}
