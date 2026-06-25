import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, siteMeta } from '../data/content';
import ThemeToggle from './ThemeToggle';

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', ...navLinks.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-28% 0px -62%', threshold: [0.05, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#hero" className="brand-lockup" aria-label="Murali Krishna, home">
        <span className="brand-mark">MK</span>
        <span className="brand-name">Murali Krishna</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => {
          const id = link.href.slice(1);
          return (
            <a key={link.href} href={link.href} className={active === id ? 'active' : ''}>
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="nav-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <a className="nav-cta" href={`mailto:${siteMeta.email}`}>
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <span>0{index + 1}</span>{link.label}
              </motion.a>
            ))}
            <a className="mobile-contact" href={`mailto:${siteMeta.email}`} onClick={() => setOpen(false)}>
              Start a conversation <ArrowUpRight size={18} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
