import { motion } from 'motion/react';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { siteMeta } from '../data/content';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="site-footer"
    >
      <div>
        <span className="brand-mark">MK</span>
        <div>
          <p>Designed &amp; Developed by Murali Krishna</p>
          <span className="text-xs text-[var(--muted)]">© 2026 {siteMeta.name}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a href={siteMeta.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a href={siteMeta.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a href={`mailto:${siteMeta.email}`} aria-label="Email">
          <Mail size={15} />
        </a>
        <a href={siteMeta.resume} target="_blank" rel="noreferrer" aria-label="Resume">
          <FileText size={15} />
        </a>
        <a href="#hero" aria-label="Back to top" className="ml-2">
          <ArrowUp size={15} />
        </a>
      </div>
    </motion.footer>
  );
}
