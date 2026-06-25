import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

export default function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(value.replace(/[\d.]+/, '0'));

  const match = value.match(/[\d.]+/);
  const target = match ? parseFloat(match[0]) : null;
  const suffix = match ? value.replace(match[0], '') : value;
  const isFloat = match && match[0].includes('.');

  useEffect(() => {
    if (!inView || target === null) {
      if (target === null) setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay((isFloat ? v.toFixed(1) : Math.round(v)) + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, isFloat, value]);

  return <span ref={ref}>{display}</span>;
}
