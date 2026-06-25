import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setPct(ratio * 100);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9000] h-0.5 bg-accent transition-[width] duration-100 ease-linear"
      style={{ width: `${pct}%` }}
    />
  );
}
