import { motion } from 'motion/react';

/**
 * Replaces the old GSAP ScrollTrigger `.reveal` class with Framer Motion's
 * whileInView. Animates once, matching the old `toggleActions: 'play none none none'`.
 */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
