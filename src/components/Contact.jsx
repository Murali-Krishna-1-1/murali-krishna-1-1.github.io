import Lottie from 'lottie-react';
import { ArrowUpRight, BriefcaseBusiness, Code2, Download, Mail, Send } from 'lucide-react';
import Reveal from './Reveal';
import { loaderAnimation } from '../data/loaderAnimation';
import { siteMeta } from '../data/content';

const links = [
  { label: 'Email', value: 'Start a conversation', href: `mailto:${siteMeta.email}`, icon: Mail },
  { label: 'LinkedIn', value: 'Connect professionally', href: siteMeta.linkedin, icon: BriefcaseBusiness, external: true },
  { label: 'GitHub', value: 'Explore the code', href: siteMeta.github, icon: Code2, external: true },
  { label: 'Resume', value: 'Download the PDF', href: siteMeta.resume, icon: Download, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section section-contact">
      <div className="section-shell">
        <div className="contact-panel">
          <Reveal className="contact-copy">
            <span className="section-eyebrow">06 / Contact</span>
            <h2>Have a difficult system to simplify?</h2>
            <p>
              I&apos;m open to Salesforce and full-stack roles where thoughtful engineering,
              ownership, and real user outcomes matter.
            </p>
            <a className="button button-primary" href={`mailto:${siteMeta.email}`}>
              Send me a message <Send size={16} />
            </a>
          </Reveal>

          <Reveal className="contact-links" delay={0.1}>
            {links.map(({ label, value, href, icon: Icon, external }) => (
              <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                <span className="contact-icon"><Icon size={19} /></span>
                <span><small>{label}</small><strong>{value}</strong></span>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </Reveal>

          <div className="contact-orbit" aria-hidden="true">
            <Lottie animationData={loaderAnimation} loop />
            <Send size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}
