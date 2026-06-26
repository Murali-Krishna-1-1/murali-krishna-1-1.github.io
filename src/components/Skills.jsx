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
                <div className="skill-orbit-container relative flex items-center justify-center w-14 h-14 mb-5 select-none">
                  {/* Inner Dashed Ring */}
                  <div
                    className="absolute inset-0 rounded-full border border-dashed animate-spin opacity-30"
                    style={{
                      borderColor: accentVar,
                      animationDuration: '12s',
                    }}
                  />
                  {/* Outer Solid Ring with Orbiting Node */}
                  <div
                    className="absolute inset-[-4px] rounded-full border animate-spin"
                    style={{
                      borderColor: glowVar,
                      animationDuration: '18s',
                      animationDirection: 'reverse',
                    }}
                  >
                    <span
                      className="absolute top-0 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"
                      style={{
                        backgroundColor: accentVar,
                        boxShadow: `0 0 8px ${accentVar}`,
                      }}
                    />
                  </div>
                  {/* Glowing Core Background */}
                  <div
                    className="absolute w-8 h-8 rounded-full blur-[8px] opacity-20"
                    style={{
                      backgroundColor: accentVar,
                    }}
                  />
                  {/* Icon Core */}
                  <div
                    className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg border bg-[var(--card-bg)]"
                    style={{
                      color: accentVar,
                      borderColor: `${accentVar}22`,
                    }}
                  >
                    <IconComponent size={18} />
                  </div>
                </div>

                <span className="skill-category font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">{skill.category}</span>
                <h3 className="text-base font-bold text-[var(--text)] mt-1 mb-2">{skill.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{skill.description}</p>
                <div className="skill-tags flex flex-wrap gap-1.5 mt-auto">
                  {skill.list.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 border border-[var(--border)] rounded text-[10px] font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)] transition-colors duration-200"
                    >
                      {item}
                    </span>
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
