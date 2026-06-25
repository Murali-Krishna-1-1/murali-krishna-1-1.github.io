import { motion } from 'motion/react';
import { ArrowUpRight, BadgeCheck, Clock3 } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { certifications } from '../data/content';

export default function Certifications() {
  return (
    <section id="certifications" className="section section-certifications">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="05 / Credentials"
            title="Validated fundamentals. Continuous growth."
            description="Certifications that support the work, with Platform Developer II currently in progress."
          />
        </Reveal>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} delay={index * 0.06} direction="scale">
              <motion.article
                className={`cert-card ${cert.inProgress ? 'is-progress' : ''}`}
                whileHover={{ y: -6, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
                transition={{ duration: 0.25 }}
              >
                <div className="cert-shine" />
                <div className="cert-top">
                  <span className="cert-code">{cert.code}</span>
                  {cert.inProgress ? <Clock3 size={20} /> : <BadgeCheck size={20} />}
                </div>
                <span className="cert-issuer">{cert.issuer} / {cert.date}</span>
                <h3>{cert.name}</h3>
                {cert.verifyUrl ? (
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer">
                    Verify credential <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="cert-status"><i />Active preparation</span>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
