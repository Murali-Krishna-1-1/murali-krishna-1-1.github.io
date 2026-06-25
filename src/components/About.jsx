import Reveal from './Reveal';
import Counter from './Counter';
import SectionLabel from './SectionLabel';
import { aboutStats } from '../data/content';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2.4rem,4.5vw,5rem)] font-bold leading-[1.0] tracking-[-0.02em]">
              Precision
              <br />
              <em className="italic font-extralight text-muted not-italic font-[200]">over</em>
              <br />
              Templates.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-5 mt-14">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="border border-border p-6 rounded-md transition-colors duration-300 hover:border-accent"
              >
                <div className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-accent leading-none tracking-[-0.03em]">
                  <Counter value={stat.num} />
                </div>
                <div className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-muted mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="text-[1.1rem] leading-[1.8] text-muted space-y-5">
          <AboutParagraphs />
        </Reveal>
      </div>
    </section>
  );
}

function AboutParagraphs() {
  return (
    <>
      <p>
        I am a <strong className="text-text font-medium">Salesforce Developer</strong> with hands-on
        production experience shipping CRM solutions that real organisations rely on daily. My work goes
        beyond the platform itself — connecting Salesforce to{' '}
        <strong className="text-text font-medium">IoT hardware</strong>, payment gateways, and donor
        platforms that most Salesforce work never touches.
      </p>
      <p>
        I don't build demo projects. The systems I have shipped include a{' '}
        <strong className="text-text font-medium">live asset-tracking platform</strong> wiring Nimbelink
        IoT trackers into Salesforce with Leaflet map rendering, a{' '}
        <strong className="text-text font-medium">multi-platform donor pipeline</strong> unifying PayPal,
        iDonate, Eventbrite, and Every.org, and a{' '}
        <strong className="text-text font-medium">secure Experience Cloud portal</strong> built for a
        nonprofit's Board of Trustees.
      </p>
      <p>
        Currently pursuing <strong className="text-text font-medium">PD2 certification</strong> and
        expanding into <strong className="text-text font-medium">Agentforce</strong> and AI-powered
        Salesforce solutions. My MCA from Jain University (2026) completes a foundation that bridges deep
        technical depth with business-driven thinking.
      </p>
    </>
  );
}

