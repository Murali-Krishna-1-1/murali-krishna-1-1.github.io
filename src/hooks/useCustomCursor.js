import { useEffect, useRef } from 'react';

const EXPAND_SELECTOR = 'a, button, [data-cursor-expand]';

export function useCustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    function handleMove(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }

    // Event delegation via the 'over'/'out' bubbling events means newly
    // mounted elements (mobile menu, modals, etc.) are covered automatically.
    function handleOver(e) {
      if (e.target.closest(EXPAND_SELECTOR)) cursor.classList.add('expanded');
    }
    function handleOut(e) {
      if (e.target.closest(EXPAND_SELECTOR)) cursor.classList.remove('expanded');
    }

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return cursorRef;
}
