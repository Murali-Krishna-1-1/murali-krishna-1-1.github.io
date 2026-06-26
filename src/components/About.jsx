import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import Counter from './Counter';
import SectionLabel from './SectionLabel';
import { metrics } from '../data/content';

export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="About Me"
            title="Engineering with context."
            description="I bridge the gap between complex CRM backends and fluid frontend interfaces, ensuring data flows reliably and users work efficiently."
          />
        </Reveal>

        <div className="about-layout">
          <div className="about-story">
            <Reveal delay={0.04}>
              <p className="about-lead">
                I am a Software Engineer who turns complex operational bottlenecks into
                <strong> high-performance, predictable products.</strong>
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p>
                My passion lies in the Salesforce ecosystem because of its power to drive real-world impact. In my work with the 
                SETI Institute and other enterprise platforms, I have built integrations, batch utilities, and Lightning Web Components 
                that manage millions of dollars in donations and track critical shipping logistics.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p>
                I bring a full-stack engineering mindset to CRM development: I believe that code quality, 
                asynchronous design, event-driven integrations, and interface responsiveness are all part of the same user experience. 
                I write Apex that respects governor limits, design databases that query efficiently, and build user interfaces that feel alive.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <a className="text-link" href="#experience">
                See my professional history <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <div className="principles-grid">
            <Reveal delay={0.06} direction="right">
              <div className="principle-card">
                <div className="mb-4 flex h-[40px] items-center text-[var(--blue)]">
                  {/* Production Minded: Server Rack with Pulsing Core and Rotating Rings */}
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="8" rx="2" />
                    <rect x="2" y="13" width="20" height="8" rx="2" />
                    <line x1="6" y1="7" x2="6.01" y2="7" strokeWidth="3" className="stroke-[var(--green)] animate-pulse" />
                    <line x1="6" y1="17" x2="6.01" y2="17" strokeWidth="3" className="stroke-[var(--green)] animate-pulse" />
                    <circle cx="17" cy="7" r="2.5" className="animate-spin origin-center" style={{ animationDuration: '6s', strokeDasharray: '3 2' }} />
                    <circle cx="17" cy="17" r="2.5" className="animate-spin origin-center" style={{ animationDuration: '4s', strokeDasharray: '2 2' }} />
                  </svg>
                </div>
                <strong>Production Minded</strong>
                <span>Systems engineered for strict maintainability, security, and test coverage.</span>
              </div>
            </Reveal>

            <Reveal delay={0.12} direction="right">
              <div className="principle-card">
                <div className="mb-4 flex h-[40px] items-center text-[var(--green)]">
                  {/* User Centered: Browser Frame with Mouse Path and Pulsing Silhouette */}
                  <svg className="w-10 h-10 animate-bounce-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <path d="M7 15a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" className="animate-pulse" />
                    <path d="M12 18h-4" />
                    {/* Tiny Cursor path simulation in CSS */}
                    <polygon points="14,14 19,16 16.5,17 19,21 17.5,21.5 15,17.5 13,19" className="fill-[var(--green)] stroke-none animate-pulse" />
                  </svg>
                </div>
                <strong>User Centered</strong>
                <span>Simplifying complex enterprise workflows into intuitive user experiences.</span>
              </div>
            </Reveal>

            <Reveal delay={0.18} direction="right">
              <div className="principle-card">
                <div className="mb-4 flex h-[40px] items-center text-[var(--violet)]">
                  {/* Integration Fluent: Resilient flowing webhook data stream */}
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="4" cy="12" r="3" className="fill-[var(--blue-glow)]" />
                    <circle cx="20" cy="12" r="3" className="fill-[var(--violet-glow)]" />
                    <path d="M7 12h10" strokeDasharray="4 4" className="flowing-dashed-line stroke-[var(--blue)]" />
                    <path d="m14 9 3 3-3 3" />
                  </svg>
                </div>
                <strong>Integration Fluent</strong>
                <span>Connecting Salesforce to external platforms via resilient REST and event pipelines.</span>
              </div>
            </Reveal>

            <Reveal delay={0.24} direction="right">
              <div className="principle-card">
                <div className="mb-4 flex h-[40px] items-center text-[var(--amber)]">
                  {/* Platform Aware: Floating cloud with a central protective shield */}
                  <svg className="w-10 h-10 animate-float-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 0 0-8 6.5A4 4 0 0 0 4 16h13a5 5 0 0 0 2.5-9.3A10 10 0 0 0 12 2Z" />
                    <path d="M12 9v5" className="stroke-[var(--amber)]" />
                    <path d="M10 12h4" className="stroke-[var(--amber)]" />
                  </svg>
                </div>
                <strong>Platform Aware</strong>
                <span>Selecting code or declarative tools with intentional architectural foresight.</span>
              </div>
            </Reveal>
          </div>
        </div>


      </div>
    </section>
  );
}
