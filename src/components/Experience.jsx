import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Cpu, GitBranch, Terminal } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { experience } from '../data/content';

// Map jobs to specific Salesforce deployment pipeline stages
const pipelineStages = [
  {
    stage: 'Production Ownership',
    status: 'ACTIVE',
    icon: ShieldCheck,
    color: 'var(--green)',
  },
  {
    stage: 'CI/CD & Release Integration',
    status: 'SYNCED',
    icon: GitBranch,
    color: 'var(--blue)',
  },
  {
    stage: 'Development & Automation',
    status: 'COMPILED',
    icon: Cpu,
    color: 'var(--violet)',
  },
  {
    stage: 'Inception & Validation',
    status: 'VERIFIED',
    icon: Terminal,
    color: 'var(--muted)',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section section-experience border-t border-[var(--border)]">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="05 / Professional Timeline"
            title="A Record of Shipping."
            description="Combining chronological career growth with Salesforce deployment lifecycle milestones, engineered for enterprise reliability."
          />
        </Reveal>

        <div className="timeline">
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {experience.map((job, index) => {
            const stageInfo = pipelineStages[index] || pipelineStages[3];
            const StageIcon = stageInfo.icon;
            
            return (
              <Reveal
                key={`${job.company}-${job.date}`}
                direction={index % 2 === 0 ? 'right' : 'left'}
                delay={index * 0.05}
                className={`timeline-item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
              >
                {/* Timeline status indicator node */}
                <motion.span
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18, delay: index * 0.08 }}
                  style={{ borderColor: stageInfo.color }}
                />
                
                {/* Monitoring-dashboard card */}
                <article className="glass-card experience-monitor-card relative overflow-hidden">
                  {/* Subtle Top Status Bar */}
                  <div className="flex justify-between items-center border-b border-[var(--border)] pb-3 mb-4 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <StageIcon size={12} style={{ color: stageInfo.color }} />
                      <span className="font-semibold text-[var(--text)] uppercase tracking-wider">{stageInfo.stage}</span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 border rounded" style={{ color: stageInfo.color, borderColor: `${stageInfo.color}33`, background: `${stageInfo.color}06` }}>
                      ● {stageInfo.status}
                    </span>
                  </div>

                  <div className="job-meta flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-[var(--blue)] font-bold">{job.date}</span>
                    {job.current && <span className="current-role"><i />Current</span>}
                  </div>
                  
                  <h3 className="text-base font-bold text-[var(--text)] m-0 leading-tight">{job.role}</h3>
                  
                  <div className="job-company flex items-center gap-1.5 text-xs text-[var(--muted)] my-2">
                    <strong>{job.company}</strong>
                    <span>/ {job.location}</span>
                  </div>

                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{job.summary}</p>
                  
                  <div className="job-points flex flex-col gap-2 border-t border-[var(--border)] pt-3 mt-3">
                    {job.points.map((point) => (
                      <span key={point} className="flex items-start gap-2 text-[11px] text-[var(--muted)] leading-relaxed">
                        <CheckCircle2 size={13} className="text-[var(--blue)] mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
