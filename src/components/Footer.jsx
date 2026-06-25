import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { siteMeta } from '../data/content';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="site-footer"
    >
      <div>
        <span className="brand-mark">MK</span>
        <p>Designed &amp; Developed by Murali Krishna</p>
      </div>
      <span>© 2026 {siteMeta.name}</span>
      <a href="#hero" aria-label="Back to top"><ArrowUp size={17} /></a>
    </motion.footer>
  );
}
