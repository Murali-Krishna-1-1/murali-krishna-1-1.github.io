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
            eyebrow="03 / Selected work"
            title="Systems with real-world stakes."
            description="A selection of production work across logistics, nonprofit operations, data quality, and secure stakeholder experiences."
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
                initial={{ opacity: 0, scale: 0.97, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
                className={`project-case tone-${project.tone}`}
              >
                <div className="project-copy">
                  <div className="project-number">{project.index}</div>
                  <span className="project-eyebrow">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-impact"><Check size={15} />{project.impact}</div>
                  <div className="project-stack">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className="project-actions">
                    <a href={siteMeta.github} target="_blank" rel="noreferrer">
                      <Code2 size={16} /> GitHub <ArrowUpRight size={14} />
                    </a>
                    <a href={`mailto:${siteMeta.email}?subject=${encodeURIComponent(`Demo request: ${project.title}`)}`}>
                      Request demo <ArrowUpRight size={14} />
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
        <div><i /><i /><i /></div>
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
        <div className="mock-toolbar"><strong>Live fleet</strong><span>18 active</span></div>
        <div className="map-mock">
          <div className="map-route route-one" />
          <div className="map-route route-two" />
          <span className="map-pin pin-one"><MapPin size={15} /></span>
          <span className="map-pin pin-two"><MapPin size={15} /></span>
          <span className="map-pin pin-three"><MapPin size={15} /></span>
          <div className="map-card"><i /><span><strong>Tracker MK-204</strong>Updated just now</span></div>
        </div>
        <div className="mock-stats"><span><strong>99.8%</strong>Signal health</span><span><strong>12m</strong>Last update</span><span><strong>24</strong>Events today</span></div>
      </BrowserFrame>
    );
  }

  if (type === 'donor') {
    return (
      <BrowserFrame title="Donor operations">
        <div className="mock-toolbar"><strong>Giving overview</strong><span>This month</span></div>
        <div className="donor-chart">
          {[45, 72, 52, 88, 68, 96, 82, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
        </div>
        <div className="integration-row">
          <span>PP</span><b /><span>EV</span><b /><span>ID</span><b /><span>SF</span>
        </div>
        <div className="mock-stats"><span><CircleDollarSign /><strong>1,284</strong>Gifts synced</span><span><Users /><strong>98%</strong>Matched</span></div>
      </BrowserFrame>
    );
  }

  if (type === 'import') {
    return (
      <BrowserFrame title="Benevity import studio">
        <div className="import-drop"><FileCheck2 size={30} /><strong>benevity-june.csv</strong><span>1,248 rows validated</span></div>
        <div className="progress-row"><span>Matching donor records</span><strong>92%</strong><i><b /></i></div>
        <div className="validation-list"><span><Check />1,172 ready to upsert</span><span><Search />64 require review</span><span><ShieldCheck />12 duplicates protected</span></div>
      </BrowserFrame>
    );
  }

  if (type === 'portal') {
    return (
      <BrowserFrame title="Board member portal">
        <div className="portal-head"><span className="portal-avatar">MK</span><div><small>Welcome back</small><strong>Board workspace</strong></div></div>
        <div className="portal-grid">
          <div><FileCheck2 /><span><strong>Meeting pack</strong>Updated today</span></div>
          <div><ShieldCheck /><span><strong>Secure reports</strong>4 new files</span></div>
          <div><Users /><span><strong>Directory</strong>24 members</span></div>
          <div><CircleDollarSign /><span><strong>Giving summary</strong>FY 2026</span></div>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame title="Duplicate review">
      <div className="mock-toolbar"><strong>Potential matches</strong><span>Confidence</span></div>
      <div className="match-card">
        <span className="match-score">94%</span>
        <div><strong>Murali K.</strong><small>murali@example.com</small></div>
        <b>matches</b>
        <div><strong>M. Krishna</strong><small>murali@example.com</small></div>
      </div>
      <div className="match-card">
        <span className="match-score">87%</span>
        <div><strong>A. Rivera</strong><small>San Jose, CA</small></div>
        <b>review</b>
        <div><strong>Alex Rivera</strong><small>San Jose, CA</small></div>
      </div>
      <div className="review-actions"><button type="button">Keep separate</button><button type="button">Review match</button></div>
    </BrowserFrame>
  );
}
