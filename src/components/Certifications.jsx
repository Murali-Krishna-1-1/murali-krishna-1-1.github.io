import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { certifications } from '../data/content';

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Certifications</SectionLabel>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {certifications.map((cert, i) => (
            <Reveal
              key={cert.name}
              delay={i * 0.05}
              className={`border rounded-md p-6 bg-surface transition-[border-color,transform] duration-300 hover:border-accent hover:-translate-y-1 ${
                cert.inProgress ? 'border-accent/25 bg-accent/[0.03]' : 'border-border'
              }`}
            >
              <div
                className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase mb-2 ${
                  cert.inProgress ? 'text-accent' : 'text-muted'
                }`}
              >
                {cert.issuer}
              </div>
              <div className="text-[1rem] font-semibold mb-4 leading-[1.35]">{cert.name}</div>
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-accent border-b border-transparent hover:border-accent transition-colors duration-300"
                >
                  {cert.verifyLabel}
                </a>
              ) : (
                <span className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-muted">
                  {cert.verifyLabel}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
