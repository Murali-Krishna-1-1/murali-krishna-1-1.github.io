import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Code2,
  FileCheck2,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { projectFilters, projects, siteMeta } from '../data/content';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const visibleProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.categories.includes(filter));

  return (
    <section id="projects" className="section section-projects">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="03 / Selected Work"
            title="Systems with real-world stakes."
            description="Case studies of production software designed for logistics, nonprofit donation pipelines, and secure stakeholder platforms."
          />
        </Reveal>

        <Reveal className="filter-bar" delay={0.06}>
          {projectFilters.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="projects-list">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className={`project-case tone-${project.tone}`}
              >
                <div className="project-copy">
                  <div className="project-number">{project.index}</div>
                  <span className="project-eyebrow">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  {/* Detailed Case Study Challenge & Solution */}
                  <div className="mb-4 flex flex-col gap-2 text-xs text-[var(--muted)] border-l-2 border-[var(--border-strong)] pl-4">
                    <span>
                      <strong className="text-[var(--text)] font-semibold">Challenge: </strong>
                      {project.challenge}
                    </span>
                    <span>
                      <strong className="text-[var(--text)] font-semibold">Solution: </strong>
                      {project.solution}
                    </span>
                  </div>

                  {/* Visual Ingestion Pipeline */}
                  <div className="project-architecture font-mono text-[10.5px] bg-[rgba(255,255,255,0.015)] border border-[var(--border)] p-3 rounded-md mb-4 w-full">
                    <span className="text-[var(--accent-color)] font-semibold block mb-1">Architecture Flow:</span>
                    {project.architecture}
                  </div>

                  <div className="project-impact">
                    <Check size={14} className="mr-1 flex-shrink-0" />
                    {project.impact}
                  </div>

                  <div className="project-stack">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>

                  <div className="project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Code2 size={15} /> GitHub Code <ArrowUpRight size={13} />
                    </a>
                    <a href={`mailto:${siteMeta.email}?subject=${encodeURIComponent(`Demo request: ${project.title}`)}`}>
                      Request demo <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <ProjectVisual type={project.visual} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <div className="empty-projects">
            No public case study in this category yet. The capability is part of my broader stack.
          </div>
        )}
      </div>
    </section>
  );
}

function BrowserFrame({ title, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>{title}</span>
        <i className="browser-secure" />
      </div>
      <div className="browser-body">{children}</div>
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === 'map') {
    return (
      <BrowserFrame title="Shipment command center">
        <div className="mock-toolbar">
          <strong>Live fleet</strong>
          <span>18 active</span>
        </div>
        <div className="map-mock">
          <div className="map-route route-one" />
          <div className="map-route route-two" />
          <span className="map-pin pin-one"><MapPin size={14} /></span>
          <span className="map-pin pin-two"><MapPin size={14} /></span>
          <span className="map-pin pin-three"><MapPin size={14} /></span>
          <div className="map-card">
            <i />
            <span>
              <strong>Tracker MK-204</strong>
              Updated just now
            </span>
          </div>
        </div>
        <div className="mock-stats">
          <span><strong>99.8%</strong>Signal health</span>
          <span><strong>12m</strong>Last update</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'donor') {
    return (
      <BrowserFrame title="Donor operations">
        <div className="mock-toolbar">
          <strong>Giving overview</strong>
          <span>This month</span>
        </div>
        <div className="donor-chart">
          {[45, 72, 52, 88, 68, 96, 82, 100].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="integration-row">
          <span>PP</span>
          <b />
          <span>EV</span>
          <b />
          <span>ID</span>
          <b />
          <span>SF</span>
        </div>
        <div className="mock-stats">
          <span><CircleDollarSign size={14} /><strong>1,284</strong>Gifts synced</span>
          <span><Users size={14} /><strong>98%</strong>Matched</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'import') {
    return (
      <BrowserFrame title="Benevity import studio">
        <div className="import-drop">
          <FileCheck2 size={24} />
          <strong>benevity-june.csv</strong>
          <span>1,248 rows validated</span>
        </div>
        <div className="progress-row">
          <div>
            <span>Matching records</span>
            <strong>92%</strong>
          </div>
          <i><b /></i>
        </div>
        <div className="validation-list">
          <span><Check size={12} />1,172 ready to upsert</span>
          <span><Search size={12} />64 require review</span>
          <span><ShieldCheck size={12} />12 duplicates protected</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'portal') {
    return (
      <BrowserFrame title="Board member portal">
        <div className="portal-head">
          <span className="portal-avatar">MK</span>
          <div>
            <small>Welcome back</small>
            <strong>Board workspace</strong>
          </div>
        </div>
        <div className="portal-grid">
          <div>
            <FileCheck2 size={14} />
            <span><strong>Meeting pack</strong>Updated today</span>
          </div>
          <div>
            <ShieldCheck size={14} />
            <span><strong>Secure reports</strong>4 new files</span>
          </div>
          <div>
            <Users size={14} />
            <span><strong>Directory</strong>24 members</span>
          </div>
          <div>
            <CircleDollarSign size={14} />
            <span><strong>Giving summary</strong>FY 2026</span>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame title="Duplicate review">
      <div className="mock-toolbar">
        <strong>Potential matches</strong>
        <span>Confidence</span>
      </div>
      <div className="match-card">
        <span className="match-score">94%</span>
        <div>
          <strong>Murali K.</strong>
          <small>murali@example.com</small>
        </div>
        <b>matches</b>
        <div>
          <strong>M. Krishna</strong>
          <small>murali@example.com</small>
        </div>
      </div>
      <div className="match-card">
        <span className="match-score">87%</span>
        <div>
          <strong>A. Rivera</strong>
          <small>San Jose, CA</small>
        </div>
        <b>review</b>
        <div>
          <strong>Alex Rivera</strong>
          <small>San Jose, CA</small>
        </div>
      </div>
      <div className="review-actions">
        <button type="button">Keep separate</button>
        <button type="button">Review match</button>
      </div>
    </BrowserFrame>
  );
}
