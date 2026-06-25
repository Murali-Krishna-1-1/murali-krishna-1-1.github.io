import { Code, Monitor, Link2, MapPin, Settings, Heart } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { skills } from '../data/content';

const ICONS = {
  code: Code,
  monitor: Monitor,
  link: Link2,
  'map-pin': MapPin,
  settings: Settings,
  heart: Heart,
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Technical Arsenal</SectionLabel>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border rounded-md overflow-hidden mt-2">
          {skills.map((skill, i) => {
            const Icon = ICONS[skill.icon] || Code;
            return (
              <Reveal
                key={skill.title}
                delay={(i % 3) * 0.05}
                className="relative bg-bg p-8 border border-border group overflow-hidden transition-colors duration-300 hover:bg-surface"
              >
                <span className="absolute top-0 left-0 h-0.5 w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                <div className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">
                  {skill.category}
                </div>
                <div className="text-[1.15rem] font-semibold mb-3">{skill.title}</div>
                <div className="text-[0.88rem] text-muted leading-[1.9] space-y-0.5">
                  {skill.list.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <Icon
                  size={28}
                  className="absolute bottom-6 right-6 text-border transition-colors duration-300 group-hover:text-accent"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
