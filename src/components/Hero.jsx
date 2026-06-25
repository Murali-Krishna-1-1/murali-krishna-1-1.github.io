import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { typewriterWords, heroMeta, siteMeta } from '../data/content';
import { useEffect, useState } from 'react';
import ServiceSelector from './ServiceSelector';

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const parallax = useMouseParallax();

  const { displayed, done } = useTypewriter('Expert\nSalesforce', 45, 400);

  useEffect(() => {
    const id = setInterval(() => {
      setSwapping(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % typewriterWords.length);
        setSwapping(false);
      }, 220);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const lines = displayed.split('\n');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-12 pb-16 pt-32"
    >
      {/* Ambient dot-grid background, driven by mouse parallax instead of video scrub */}
      <div
        className="absolute inset-0 -z-10 opacity-45 transition-transform duration-300 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          transform: `translate(${parallax.x * -14}px, ${parallax.y * -14}px)`,
          maskImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%, black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%, black 0%, transparent 80%)',
        }}
      />
      <div
        className="absolute -z-10 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl transition-transform duration-500 ease-out"
        style={{
          right: '8%',
          top: '30%',
          transform: `translate(${parallax.x * 30}px, ${parallax.y * 30}px)`,
        }}
      />

      <div className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted mb-8 flex items-center gap-4">
        <span className="inline-block w-8 h-px bg-muted" />
        {siteMeta.title} · {siteMeta.location}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display font-bold tracking-[-0.025em] leading-[0.92] text-[clamp(3rem,8.5vw,9rem)] mb-4 select-none whitespace-pre-wrap">
          {lines[0]}
          {lines.length === 1 && !done && (
            <span className="inline-block w-[2px] h-[0.9em] bg-text align-middle ml-1 animate-blink" />
          )}
          {lines.length > 1 && (
            <>
              <br />
              <em className="italic font-extralight text-muted not-italic font-[200]">
                {lines[1]}
              </em>
              {!done && (
                <span className="inline-block w-[2px] h-[0.9em] bg-text align-middle ml-1 animate-blink" />
              )}
            </>
          )}
        </h1>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-display font-bold tracking-[-0.025em] leading-[0.92] text-[clamp(3rem,8.5vw,9rem)]">
            Solutions in&nbsp;
          </span>
          <span
            className={`font-display font-bold tracking-[-0.025em] leading-[0.92] text-[clamp(3rem,8.5vw,9rem)] text-accent inline-block min-w-[2ch] transition-[opacity,transform] duration-300 ${
              swapping ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {typewriterWords[wordIndex]}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 pt-8 border-t border-border flex flex-col lg:flex-row gap-10 lg:gap-24"
      >
        <p className="max-w-[420px] text-[1.05rem] leading-[1.7] text-muted">
          Building <strong className="text-text font-medium">CRM solutions that connect to the real world</strong> —
          IoT device tracking, donor platforms, payment gateways, and event systems, all wired into Salesforce.
        </p>

        <div className="flex flex-col gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted">
          <span>Status</span>
          <span className="flex items-center gap-2 text-[0.78rem] text-text normal-case font-bold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            {heroMeta.status}
          </span>
          <span className="mt-3">Certifications</span>
          <span className="text-[0.78rem] text-text normal-case font-bold">{heroMeta.certifications}</span>
        </div>

        <div className="flex flex-col gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted">
          <span>Domain</span>
          <span className="text-[0.78rem] text-text normal-case font-bold">{heroMeta.domain}</span>
          <span className="mt-3">Integrations</span>
          <span className="text-[0.78rem] text-text normal-case font-bold">{heroMeta.integrations}</span>
        </div>
      </motion.div>

      <div className="mt-16">
        <ServiceSelector />
      </div>
    </section>
  );
}
