import { useCustomCursor } from '../hooks/useCustomCursor';

export default function Cursor() {
  const cursorRef = useCustomCursor();
  return <div ref={cursorRef} className="cursor-follower" aria-hidden="true" />;
}
