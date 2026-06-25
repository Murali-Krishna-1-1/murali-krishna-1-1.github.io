import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const Icon = theme === 'light' ? Sun : Moon;
  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label="Toggle color theme">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={17} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
