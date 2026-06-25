import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className="section section-experience">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="04 / Experience"
            title="A record of shipping."
            description="Growing responsibility across platform development, integrations, product interfaces, and end-to-end delivery."
          />
        </Reveal>

        <div className="timeline">
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {experience.map((job, index) => (
            <Reveal
              key={`${job.company}-${job.date}`}
              direction={index % 2 === 0 ? 'right' : 'left'}
              delay={index * 0.05}
              className={`timeline-item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
            >
              <motion.span
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 18, delay: index * 0.08 }}
              />
              <article>
                <div className="job-meta">
                  <span>{job.date}</span>
                  {job.current && <span className="current-role"><i />Current</span>}
                </div>
                <h3>{job.role}</h3>
                <div className="job-company">{job.company}<span>{job.location}</span></div>
                <p>{job.summary}</p>
                <div className="job-points">
                  {job.points.map((point) => <span key={point}><CheckCircle2 size={15} />{point}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
