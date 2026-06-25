import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
        </Reveal>
        <div className="mt-2">
          {experience.map((job, i) => (
            <Reveal
              key={job.company + job.date}
              delay={i * 0.04}
              className={`grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 border-b border-border ${
                i === 0 ? 'border-t' : ''
              }`}
            >
              <div className="font-mono text-[0.7rem] tracking-[0.12em] text-muted pt-1">
                {job.date}
                {job.current && (
                  <div className="flex items-center gap-2 text-accent mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                    Current
                  </div>
                )}
              </div>
              <div>
                <div className="text-[1.4rem] font-bold tracking-[-0.015em]">{job.role}</div>
                <div className="text-[0.9rem] text-muted mt-1">{job.company}</div>
                <ul className="mt-5 text-[0.9rem] text-muted leading-[1.85] space-y-1">
                  {job.points.map((point) => (
                    <li key={point} className="pl-5 relative">
                      <span className="absolute left-0 text-accent">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
