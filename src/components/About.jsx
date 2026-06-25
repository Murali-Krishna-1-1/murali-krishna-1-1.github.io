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
            eyebrow="01 / About"
            title="Engineering with context."
            description="I bridge the gap between complex CRM backends and fluid frontend interfaces, ensuring data flows reliably and users work efficiently."
          />
        </Reveal>

        <div className="about-layout">
          <div className="about-story">
            <Reveal delay={0.04}>
              <p className="about-lead">
                I am a Salesforce developer who turns complex operational bottlenecks into
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
              <div>
                <div className="mb-4 flex h-[36px] items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/gsqxdxog.json"
                    trigger="hover"
                    colors="primary:var(--blue),secondary:var(--violet)"
                    style={{ width: '36px', height: '36px' }}
                  />
                </div>
                <strong>Production Minded</strong>
                <span>Systems engineered for strict maintainability, security, and test coverage.</span>
              </div>
            </Reveal>

            <Reveal delay={0.12} direction="right">
              <div>
                <div className="mb-4 flex h-[36px] items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/nocovwne.json"
                    trigger="hover"
                    colors="primary:var(--blue),secondary:var(--violet)"
                    style={{ width: '36px', height: '36px' }}
                  />
                </div>
                <strong>User Centered</strong>
                <span>Simplifying complex enterprise workflows into intuitive user experiences.</span>
              </div>
            </Reveal>

            <Reveal delay={0.18} direction="right">
              <div>
                <div className="mb-4 flex h-[36px] items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/psnhyobz.json"
                    trigger="hover"
                    colors="primary:var(--blue),secondary:var(--violet)"
                    style={{ width: '36px', height: '36px' }}
                  />
                </div>
                <strong>Integration Fluent</strong>
                <span>Connecting Salesforce to external platforms via resilient REST and event pipelines.</span>
              </div>
            </Reveal>

            <Reveal delay={0.24} direction="right">
              <div>
                <div className="mb-4 flex h-[36px] items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/rhvddzym.json"
                    trigger="hover"
                    colors="primary:var(--blue),secondary:var(--violet)"
                    style={{ width: '36px', height: '36px' }}
                  />
                </div>
                <strong>Platform Aware</strong>
                <span>Selecting code or declarative tools with intentional architectural foresight.</span>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="metrics-grid" delay={0.16}>
          {metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <strong><Counter value={metric.num} /></strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
