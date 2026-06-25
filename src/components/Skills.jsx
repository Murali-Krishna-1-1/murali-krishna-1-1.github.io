import { motion } from 'motion/react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { skills } from '../data/content';

const lordicons = {
  cloud: 'https://cdn.lordicon.com/sdhfyvhz.json',
  layout: 'https://cdn.lordicon.com/wpyrskro.json',
  server: 'https://cdn.lordicon.com/qyqxdwqf.json',
  network: 'https://cdn.lordicon.com/fpipwcoe.json',
  database: 'https://cdn.lordicon.com/vufjamxh.json',
  git: 'https://cdn.lordicon.com/mrdiiocu.json',
  tools: 'https://cdn.lordicon.com/lvdlnyju.json',
};

export default function Skills() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" className="section section-skills">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="02 / Capabilities"
            title="Deep platform skill. Broad product range."
            description="Organized by architectural domain, using declarative power and custom code to build maintainable, secure solutions."
          />
        </Reveal>

        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {skills.map((skill) => {
            const iconUrl = lordicons[skill.icon] || lordicons.tools;
            return (
              <motion.article
                key={skill.category}
                onMouseMove={handleMouseMove}
                className={`skill-card tone-${skill.accent}`}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                <div className="skill-icon">
                  <lord-icon
                    src={iconUrl}
                    trigger="hover"
                    colors={`primary:var(--${skill.accent}),secondary:var(--violet)`}
                    style={{ width: '28px', height: '28px' }}
                  />
                </div>
                <span className="skill-category">{skill.category}</span>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags">
                  {skill.list.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
