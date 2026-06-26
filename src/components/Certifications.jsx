import { motion } from 'motion/react';
import { ArrowUpRight, BadgeCheck, Clock3 } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { certifications } from '../data/content';

export default function Certifications() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 8;
    const rotateY = (x - xc) / 8;
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section id="certifications" className="section section-certifications">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="05 / Credentials"
            title="Validated fundamentals. Continuous growth."
            description="Professional credentials and verifications, with Platform Developer II currently in active preparation."
          />
        </Reveal>

        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} delay={index * 0.06} direction="scale">
              <motion.article
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`cert-card ${cert.inProgress ? 'is-progress' : ''}`}
                style={{
                  transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="cert-shine" />
                <div className="cert-top">
                  <span className="cert-code">{cert.code}</span>
                  {cert.inProgress ? (
                    <Clock3 size={20} className="text-[var(--muted)] cert-icon-spin" />
                  ) : (
                    <BadgeCheck size={22} className="text-[var(--blue)] cert-icon-check" />
                  )}
                </div>
                <span className="cert-issuer">{cert.issuer} / {cert.date}</span>
                <h3 className="text-balance">{cert.name}</h3>
                
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1 mt-auto text-xs font-semibold text-[var(--blue)]"
                  >
                    Verify credential 
                    <ArrowUpRight 
                      size={14} 
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    />
                  </a>
                ) : (
                  <span className="cert-status mt-auto flex items-center gap-1.5 text-xs">
                    <i /> Active Preparation
                  </span>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
