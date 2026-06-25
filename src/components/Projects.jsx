import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin, Heart, FileText, Copy, LayoutGrid } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { projects } from '../data/content';

const ICONS = {
  'map-pin': MapPin,
  heart: Heart,
  'file-text': FileText,
  copy: Copy,
  'layout-grid': LayoutGrid,
};

const CARD_WIDTH = 560;
const GAP = 24;

export default function Projects() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const maxIndex = projects.length - 1;

  function go(dir) {
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)));
  }

  return (
    <section id="projects" className="pt-32 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
        </Reveal>

        <Reveal className="relative mt-2 overflow-hidden" delay={0.05}>
          <motion.div
            ref={trackRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{
              left: -((CARD_WIDTH + GAP) * maxIndex),
              right: 0,
            }}
            dragElastic={0.08}
            animate={{ x: -((CARD_WIDTH + GAP) * index) }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
          >
            {projects.map((project) => {
              const Icon = ICONS[project.icon] || MapPin;
              return (
                <div
                  key={project.id}
                  style={{ width: `min(${CARD_WIDTH}px, 85vw)` }}
                  className="shrink-0"
                >
                  <ProjectCard project={project} Icon={Icon} />
                </div>
              );
            })}
          </motion.div>
        </Reveal>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-text"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === maxIndex}
            aria-label="Next project"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-text"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, Icon }) {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-surface transition-colors duration-300 hover:border-accent select-none">
      <div
        className="h-[220px] relative flex items-center justify-center overflow-hidden"
        style={{ background: project.bannerBg }}
      >
        <div className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.04em] text-border/35 absolute select-none">
          {project.bannerText}
        </div>
        <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.12em] uppercase px-3 py-1 border border-accent text-accent rounded-sm">
          {project.tag}
        </span>
        <Icon size={64} className="absolute text-border/70" />
      </div>
      <div className="p-7">
        <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted mb-2">
          {project.arch}
        </div>
        <div className="text-[1.35rem] font-bold mb-4 tracking-[-0.015em]">{project.title}</div>
        <ul className="text-[0.9rem] text-muted leading-[1.8] space-y-1">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="pl-5 relative">
              <span className="absolute left-0 text-accent">→</span>
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-5 px-4 py-3 bg-accent/[0.06] border-l-2 border-accent rounded-r-sm text-[0.85rem] text-text">
          <strong className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-accent block mb-1">
            Impact
          </strong>
          {project.impact}
        </div>
      </div>
    </div>
  );
}
