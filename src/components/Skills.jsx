import { Cloud, Database, GitBranch, LayoutTemplate, Network, ServerCog } from 'lucide-react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { skills } from '../data/content';

const icons = {
  cloud: Cloud,
  layout: LayoutTemplate,
  server: ServerCog,
  network: Network,
  database: Database,
  git: GitBranch,
};

export default function Skills() {
  return (
    <section id="skills" className="section section-skills">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="02 / Capabilities"
            title="Deep platform skill. Broad product range."
            description="The tools change. The standard stays the same: thoughtful architecture and software that holds up in production."
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
            const Icon = icons[skill.icon];
            return (
              <motion.article
                key={skill.category}
                className={`skill-card tone-${skill.accent}`}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <div className="skill-icon"><Icon size={22} /></div>
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
