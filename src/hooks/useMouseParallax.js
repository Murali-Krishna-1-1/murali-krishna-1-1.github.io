import { useEffect, useRef, useState } from 'react';

/**
 * Tracks mouse position across the window and returns a normalized
 * offset (-1 to 1 on each axis) for driving ambient parallax.
 * Disabled below 1024px width, mirroring the spec's desktop-only scrubbing.
 */
export function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      if (window.innerWidth < 1024) return;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        setOffset({ x: nx, y: ny });
      });
    }
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return offset;
}
