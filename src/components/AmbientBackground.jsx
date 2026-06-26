import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  const auroraY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const auroraY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const auroraY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0.55]);

  return (
    <div className="ambient-background" aria-hidden="true">
      <motion.div
        className="ambient-stars"
        style={{
          y: reducedMotion ? 0 : starsY,
          opacity: reducedMotion ? 1 : starsOpacity,
        }}
      />

      <motion.div
        className="ambient-aurora ambient-aurora-one"
        style={{ y: reducedMotion ? 0 : auroraY1 }}
      />
      <motion.div
        className="ambient-aurora ambient-aurora-two"
        style={{ y: reducedMotion ? 0 : auroraY2 }}
      />
      <motion.div
        className="ambient-aurora ambient-aurora-three"
        style={{ y: reducedMotion ? 0 : auroraY3 }}
      />

      <div className="ambient-noise" />
      <div className="ambient-grid" />
    </div>
  );
}
