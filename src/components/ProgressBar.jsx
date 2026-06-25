import { motion, useScroll, useSpring } from 'motion/react';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.2 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
