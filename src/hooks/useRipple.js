import { useCallback } from 'react';
export const useRipple = () => {
  return useCallback((x, y, power = 1) => {
    window.dispatchEvent(
      new CustomEvent('nebula-ripple', { detail: { x, y, power } })
    );
  }, []);
};
