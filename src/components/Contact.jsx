import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { siteMeta } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 text-center">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <SectionLabel center>Let's Build Something</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-10">
            Ready
            <br />
            <em className="italic font-extralight text-muted not-italic font-[200]">to ship</em>
            <br />
            production.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[1.05rem] text-muted max-w-[500px] mx-auto mb-12 leading-[1.7]">
            I build Salesforce solutions that scale — from architecture to deployment.
            If you need expert Apex, LWC, or integration work, let's talk.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex gap-3 justify-center flex-wrap">
          <a
            href={`mailto:${siteMeta.email}`}
            className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3 border border-accent text-accent rounded-sm transition-colors duration-300 hover:bg-accent hover:text-bg"
          >
            {siteMeta.email}
          </a>
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3 border border-border text-muted rounded-sm transition-colors duration-300 hover:border-text hover:text-text"
          >
            GitHub ↗
          </a>
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-7 py-3 border border-border text-muted rounded-sm transition-colors duration-300 hover:border-text hover:text-text"
          >
            LinkedIn ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
