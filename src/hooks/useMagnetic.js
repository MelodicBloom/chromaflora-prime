import { useEffect, useRef } from 'react';
export const useMagnetic = (strength = 1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const dx = e.clientX - (left + width / 2);
      const dy = e.clientY - (top + height / 2);
      if (Math.hypot(dx, dy) < 300) {
        el.style.transform = `translate3d(${dx * 0.2 * strength}px, ${dy * 0.2 * strength}px, 0)`;
      } else {
        el.style.transform = '';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [strength]);
  return ref;
};
