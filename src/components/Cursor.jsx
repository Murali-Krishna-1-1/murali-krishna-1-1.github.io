import { useCustomCursor } from '../hooks/useCustomCursor';

export default function Cursor() {
  const cursorRef = useCustomCursor();
  
  return (
    <div ref={cursorRef} className="custom-cursor-container" aria-hidden="true">
      <div className="custom-cursor-ring" />
      <div className="custom-cursor-dot" />
      <div className="custom-cursor-label" />
    </div>
  );
}
