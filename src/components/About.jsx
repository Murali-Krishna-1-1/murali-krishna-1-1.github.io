import { ArrowUpRight, BadgeCheck, Boxes, Cable, Users } from 'lucide-react';
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
            description="I care about the system behind the screen: the people using it, the data moving through it, and what happens after launch."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-story">
            <p className="about-lead">
              I&apos;m a Salesforce developer who turns tangled operational problems into
              <strong> calm, dependable products.</strong>
            </p>
            <p>
              My work spans CRM architecture, custom interfaces, APIs, IoT data, donor operations,
              and Experience Cloud. I have shipped systems used in live logistics and nonprofit
              environments where reliability is part of the user experience.
            </p>
            <p>
              I bring a full-stack mindset to Salesforce: understand the workflow, model the data,
              build the interface, test the edges, and own the outcome.
            </p>
            <a className="text-link" href="#experience">See how I work <ArrowUpRight size={16} /></a>
          </Reveal>

          <Reveal className="principles-grid" delay={0.08}>
            <div><BadgeCheck /><strong>Production minded</strong><span>Built for maintainability, security, and measurable value.</span></div>
            <div><Users /><strong>User centered</strong><span>Complex workflows made clear for the people doing the work.</span></div>
            <div><Cable /><strong>Integration fluent</strong><span>External systems connected through resilient API patterns.</span></div>
            <div><Boxes /><strong>Platform aware</strong><span>Declarative and coded solutions chosen with intent.</span></div>
          </Reveal>
        </div>

        <Reveal className="metrics-grid" delay={0.12}>
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
