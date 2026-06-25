import { motion } from 'motion/react';

const directions = {
  up: { y: 32, x: 0, scale: 1 },
  left: { y: 0, x: 42, scale: 1 },
  right: { y: 0, x: -42, scale: 1 },
  scale: { y: 18, x: 0, scale: 0.97 },
};

export default function Reveal({ children, className = '', delay = 0, as = 'div', direction = 'up' }) {
  const Component = motion[as] || motion.div;
  const from = directions[direction] || directions.up;
  return (
    <Component
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
