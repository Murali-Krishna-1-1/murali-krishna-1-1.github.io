import { motion } from 'motion/react';
import {
  Cloud,
  Layout,
  Server,
  Network,
  Database,
  GitBranch,
  Terminal,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { skills } from '../data/content';

const iconMap = {
  cloud: Cloud,
  layout: Layout,
  server: Server,
  network: Network,
  database: Database,
  git: GitBranch,
  tools: Terminal,
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
            eyebrow="Capabilities"
            title="Deep platform skill. Broad product range."
            description="Organized by architectural domain, using declarative power and custom code to build maintainable, secure solutions."
          />
        </Reveal>

        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8% 0px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Terminal;
            const accentVar = `var(--${skill.accent})`;
            const glowVar = `var(--${skill.accent}-glow)`;

            return (
              <motion.article
                key={skill.category}
                onMouseMove={handleMouseMove}
                className={`skill-card tone-${skill.accent}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                {/* Rotating Technology Orbit / Concentric Ring Visualization */}
                <div className="skill-orbit-container">
                  <div
                    className="skill-orbit-ring"
                    style={{ borderColor: accentVar }}
                  />
                  <div
                    className="skill-orbit-ring-outer"
                    style={{ borderColor: glowVar }}
                  >
                    <span
                      className="skill-orbit-node"
                      style={{
                        backgroundColor: accentVar,
                        boxShadow: `0 0 8px ${accentVar}`,
                      }}
                    />
                  </div>
                  <div
                    className="skill-orbit-glow"
                    style={{ backgroundColor: accentVar }}
                  />
                  <div
                    className="skill-orbit-core"
                    style={{
                      color: accentVar,
                      borderColor: `${accentVar}22`,
                    }}
                  >
                    <IconComponent size={18} />
                  </div>
                </div>

                <span className="skill-category">{skill.category}</span>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags">
                  {skill.list.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
