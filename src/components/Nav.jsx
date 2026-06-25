import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteMeta, navLinks } from '../data/content';
import ThemeToggle from './ThemeToggle';

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  function handleLinkClick() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[8000] flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md transition-[border-color,background] duration-400 border-b ${
          scrolled ? 'border-border bg-bg/80' : 'border-transparent'
        }`}
      >
        <div className="font-mono text-[0.82rem] tracking-[0.12em] text-accent select-none">
          {siteMeta.logo}
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.78rem] font-normal tracking-[0.1em] uppercase text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${siteMeta.email}`}
            className="hidden sm:inline-block font-mono text-[0.72rem] tracking-[0.08em] px-4 py-2 border border-accent text-accent rounded-sm transition-colors duration-300 hover:bg-accent hover:text-bg"
          >
            Get in Touch
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <span
              className={`w-6 h-[2px] bg-text transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-text transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-text transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9] bg-bg/95 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              initial={false}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: isMobileMenuOpen ? i * 0.06 : 0, duration: 0.4 }}
              className="text-2xl font-medium tracking-tight text-text"
            >
              {link.label}
            </motion.a>
          ))}
          <a
            href={`mailto:${siteMeta.email}`}
            onClick={handleLinkClick}
            className="mt-4 font-mono text-sm tracking-[0.08em] px-5 py-3 border border-accent text-accent rounded-sm"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  );
}
