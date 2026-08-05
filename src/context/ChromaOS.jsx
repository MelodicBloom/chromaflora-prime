import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

const ChromaOSContext = createContext();

export const ChromaOSProvider = ({ children }) => {
  const [identity, setIdentity] = useState({
    hue: 280,
    glow: 0.6,
    isCorrupted: false,
    isAuthenticated: false,
    warpActive: false,
  });
  const [currentView, setCurrentView] = useState('home');
  const audioStarted = useRef(false);

  const navigateTo = (view) => {
    setIdentity((p) => ({ ...p, warpActive: true }));
    if (navigator.vibrate) navigator.vibrate(20);
    setTimeout(() => {
      setCurrentView(view);
      setIdentity((p) => ({ ...p, warpActive: false }));
    }, 800);
  };

  const emitRipple = (x, y, power = 1) => {
    window.dispatchEvent(
      new CustomEvent('nebula-ripple', { detail: { x, y, power } })
    );
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--main-hue', identity.hue);
    root.style.setProperty('--glow-opacity', identity.glow);

    const handleMove = (e) => {
      root.style.setProperty(
        '--mouse-x',
        `${(e.clientX / window.innerWidth) * 100}%`
      );
      root.style.setProperty(
        '--mouse-y',
        `${(e.clientY / window.innerHeight) * 100}%`
      );
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [identity]);

  return (
    <ChromaOSContext.Provider
      value={{ identity, setIdentity, currentView, navigateTo, emitRipple }}
    >
      <div
        onClick={() => {
          if (!audioStarted.current) {
            window.dispatchEvent(new CustomEvent('start-audio'));
            audioStarted.current = true;
          }
        }}
      >
        {children}
      </div>
    </ChromaOSContext.Provider>
  );
};
export const useChromaOS = () => useContext(ChromaOSContext);
