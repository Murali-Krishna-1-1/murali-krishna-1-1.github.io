import { siteMeta } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-muted">
        © 2026 {siteMeta.name} · Salesforce Developer
      </div>
      <div className="flex gap-8">
        <a
          href={siteMeta.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-300"
        >
          GitHub
        </a>
        <a
          href={siteMeta.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-300"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${siteMeta.email}`}
          className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-300"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
