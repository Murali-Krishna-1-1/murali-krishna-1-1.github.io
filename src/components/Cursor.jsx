import { useCustomCursor } from '../hooks/useCustomCursor';

export default function Cursor() {
  const cursorRef = useCustomCursor();
  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-accent pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-difference [&.expanded]:w-14 [&.expanded]:h-14"
    />
  );
}
