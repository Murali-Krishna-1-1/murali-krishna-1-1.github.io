import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
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

// Technical flow definitions for each project architecture
const projectFlows = {
  tracking: [
    { label: 'IoT Device Payloads', desc: '10s telemetry pings' },
    { label: 'Apex REST Ingress', desc: '40ms execution gate' },
    { label: 'Platform Events Bus', desc: 'Decoupled event queue' },
    { label: 'Async Queueable Apex', desc: 'Governor limit safeguard' },
    { label: 'LWC Leaflet Canvas', desc: 'Non-blocking map UI' }
  ],
  'donor-suite': [
    { label: 'Payment APIs Ingress', desc: 'PayPal / Eventbrite webhooks' },
    { label: 'Ingress Handlers', desc: 'Custom Metadata Type mapping' },
    { label: 'Salesforce Duplicate Rules', desc: 'Fuzzy contact matching' },
    { label: 'NPSP Gifts Integration', desc: 'Consolidated donation ledger' }
  ],
  'csv-tool': [
    { label: 'CSV Upload Block', desc: '10k+ rows operator upload' },
    { label: 'HTML5 Web Workers', desc: 'Client-side async parsing' },
    { label: 'Batch Apex Processing', desc: 'Chunk-safe DB inserts' },
    { label: 'Relational Upsert', desc: 'Donor & Donation sync' }
  ],
  portal: [
    { label: 'Experience Cloud', desc: 'Secure digital entryway' },
    { label: 'Shield Platform Encryption', desc: 'Document level encryption' },
    { label: 'Restricted Sharing Rules', desc: 'Strict "with sharing" models' },
    { label: 'LWC Custom Theme', desc: 'Encapsulated secure portals' }
  ],
  dedupe: [
    { label: 'Indexed DB Fields', desc: 'Fuzzy criteria query index' },
    { label: 'SOQL Search Engine', desc: 'Real-time, limit-safe scanner' },
    { label: 'Interactive Compare LWC', desc: 'Side-by-side conflict modal' },
    { label: 'Apex Merge Controller', desc: 'Relational giving record protection' }
  ]
};

import { ArrowLeft, ArrowRight } from 'lucide-react';

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.99,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);

  const visibleProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.categories.includes(filter));

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setActiveIndex(0);
    setDirection(0);
    setExpandedProject(null);
  };

  const handlePrev = () => {
    if (visibleProjects.length <= 1) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length);
    setExpandedProject(null);
  };

  const handleNext = () => {
    if (visibleProjects.length <= 1) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % visibleProjects.length);
    setExpandedProject(null);
  };

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const activeProject = visibleProjects[activeIndex];
  const isExpanded = activeProject ? expandedProject === activeProject.id : false;
  const flowNodes = activeProject ? (projectFlows[activeProject.id] || []) : [];

  return (
    <section id="projects" className="section section-projects">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="Selected Case Studies"
            title="Systems with Real-World Stakes."
            description="Explore full-lifecycle software engineered for logistics tracking, donation pipeline automation, and secure corporate platforms."
          />
        </Reveal>

        {/* Filter Bar */}
        <Reveal className="filter-bar" delay={0.06}>
          {projectFilters.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => handleFilterChange(item)}
              className={filter === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </Reveal>

        {/* Horizontal Slide Presentation Frame */}
        <div className="projects-carousel-container relative mt-10">
          {activeProject ? (
            <div className="carousel-slide-viewport overflow-hidden relative min-h-[480px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  custom={direction}
                  key={activeProject.id}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`project-case tone-${activeProject.tone} glass-card w-full`}
                  data-cursor-label="View"
                >
                  <div className="project-main-layout">
                    {/* Visual mockup of browser */}
                    <ProjectVisual type={activeProject.visual} />

                    {/* Copy details */}
                    <div className="project-copy flex flex-col justify-between">
                      <div>
                        <div className="project-number font-mono">{activeProject.index}</div>
                        <span className="project-eyebrow font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">{activeProject.eyebrow}</span>
                        <h3 className="text-lg font-bold text-[var(--text)] mt-1 mb-3">{activeProject.title}</h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{activeProject.description}</p>
                        
                        {/* Short Impact Banner */}
                        <div className="project-impact font-mono text-xs text-[var(--green)] flex items-center gap-1.5 mb-4">
                          <Check size={14} className="flex-shrink-0" />
                          <span><strong>Impact:</strong> {activeProject.impact}</span>
                        </div>

                        {/* Technical specifications expansion button */}
                        <button
                          type="button"
                          className="expand-details-btn flex items-center gap-1.5 font-mono text-xs text-[var(--blue)] hover:text-[var(--text)] transition-colors duration-200 mb-6"
                          onClick={() => toggleExpand(activeProject.id)}
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Technical Architecture</span> <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              <span>Expand Technical Architecture</span> <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      </div>

                      <div>
                        {/* Stack details */}
                        <div className="project-stack flex flex-wrap gap-2 mb-6">
                          {activeProject.stack.map((item) => (
                            <span key={item} className="px-2 py-0.5 border border-[var(--border)] rounded text-[10px] font-mono text-[var(--muted)]">
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Core Actions */}
                        <div className="project-actions flex gap-4 mt-auto border-t border-[var(--border)] pt-4">
                          <a href={activeProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200">
                            <Code2 size={14} /> GitHub Code <ArrowUpRight size={12} />
                          </a>
                          <a href={`mailto:${siteMeta.email}?subject=${encodeURIComponent(`Demo request: ${activeProject.title}`)}`} className="flex items-center gap-1 text-xs font-mono text-[var(--blue)] hover:text-[var(--text)] transition-colors duration-200">
                            Request Live Demo <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Engineering Case Study & SVG Flow */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="project-expanded-spec border-t border-[var(--border)] mt-6 pt-6 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                          {/* Left: Problems, Challenges & Implementation Details */}
                          <div className="lg:col-span-7 flex flex-col gap-4 text-xs text-[var(--muted)] leading-relaxed select-text">
                            <div>
                              <strong className="text-[var(--text)] block text-xs uppercase font-mono tracking-wider mb-1">Business Problem:</strong>
                              <p className="pl-3 border-l border-[var(--border-strong)]">{activeProject.challenge}</p>
                            </div>
                            <div>
                              <strong className="text-[var(--text)] block text-xs uppercase font-mono tracking-wider mb-1">Implementation & Solution:</strong>
                              <p className="pl-3 border-l border-[var(--border-strong)]">{activeProject.solution}</p>
                            </div>
                            <div>
                              <strong className="text-[var(--text)] block text-xs uppercase font-mono tracking-wider mb-1">Governor Limits & Technical Challenges:</strong>
                              <p className="pl-3 border-l border-[var(--border-strong)]">
                                Solved using bulk-safe collections, custom trigger execution context frameworks, and isolating high-frequency transactions via asynchronous Apex processes.
                              </p>
                            </div>
                          </div>

                          {/* Right: Technical Flow SVG Architecture Diagram */}
                          <div className="lg:col-span-5 glass-card p-4 rounded border border-[var(--border)] relative bg-[rgba(255,255,255,0.005)] select-none">
                            <span className="font-mono text-[10px] text-[var(--blue)] uppercase tracking-wider block mb-3">DATA FLOW ARCHITECTURE</span>
                            <div className="flex flex-col gap-3 font-mono text-[10.5px]">
                              {flowNodes.map((node, idx) => (
                                <div key={node.label} className="w-full">
                                  {/* Node block */}
                                  <div className="flex flex-col p-2.5 rounded border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--blue)] transition-colors duration-200">
                                    <span className="font-semibold text-[var(--text)]">{node.label}</span>
                                    <span className="text-[9px] text-[var(--muted)]">{node.desc}</span>
                                  </div>
                                  
                                  {/* Animated down connection line */}
                                  {idx < flowNodes.length - 1 && (
                                    <div className="h-4 flex justify-center items-center relative">
                                      <svg className="h-full w-[20px]" viewBox="0 0 20 16">
                                        <line
                                          x1="10"
                                          y1="0"
                                          x2="10"
                                          y2="16"
                                          stroke="var(--blue)"
                                          strokeWidth="1.5"
                                          strokeDasharray="3 3"
                                          className="flowing-dashed-line"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              </AnimatePresence>
            </div>
          ) : (
            <div className="empty-projects font-mono text-xs text-[var(--muted)] text-center py-12">
              No public case study in this category yet. The capability is part of my broader stack.
            </div>
          )}

          {/* Carousel Controls */}
          {visibleProjects.length > 1 && (
            <div className="carousel-controls flex items-center justify-between mt-8 select-none">
              <button
                type="button"
                className="carousel-nav-btn prev-btn flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] hover:border-[var(--blue)] text-[var(--muted)] hover:text-[var(--text)] transition-all duration-300"
                onClick={handlePrev}
                data-cursor-label="Back"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="carousel-indicators flex gap-3">
                {visibleProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    className={`indicator-node flex flex-col items-center gap-1 font-mono text-[9px] focus:outline-none ${
                      activeIndex === idx ? 'is-active text-[var(--blue)] font-bold' : 'text-[var(--muted)]'
                    }`}
                    onClick={() => {
                      setDirection(idx > activeIndex ? 1 : -1);
                      setActiveIndex(idx);
                      setExpandedProject(null);
                    }}
                  >
                    <span>0{idx + 1}</span>
                    <span className="indicator-line w-6 h-[2px] bg-[var(--border)] rounded-full transition-colors duration-300" style={{ backgroundColor: activeIndex === idx ? 'var(--blue)' : 'var(--border)' }} />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="carousel-nav-btn next-btn flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] hover:border-[var(--blue)] text-[var(--muted)] hover:text-[var(--text)] transition-all duration-300"
                onClick={handleNext}
                data-cursor-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BrowserFrame({ title, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar select-none">
        <div className="flex gap-1">
          <i className="w-2 h-2 rounded-full bg-red-500/85" />
          <i className="w-2 h-2 rounded-full bg-yellow-500/85" />
          <i className="w-2 h-2 rounded-full bg-green-500/85" />
        </div>
        <span className="font-mono text-[9px] text-[var(--muted)]">{title}</span>
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
        <div className="mock-toolbar select-none flex justify-between px-3 py-1.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.005)] font-mono text-[9px] text-[var(--muted)]">
          <strong>Live fleet</strong>
          <span>18 active</span>
        </div>
        <div className="map-mock relative min-h-[130px] bg-[#0c0d12] overflow-hidden select-none">
          <div className="map-route route-one absolute top-10 left-5 w-32 h-16 border-t-2 border-dashed border-[var(--blue)] rounded-full filter blur-[0.5px]" />
          <div className="map-route route-two absolute top-6 left-12 w-20 h-16 border-b-2 border-dashed border-[var(--violet)] rounded-full filter blur-[0.5px]" />
          <span className="map-pin pin-one absolute top-10 left-4 text-[var(--blue)]"><MapPin size={12} className="animate-bounce" /></span>
          <span className="map-pin pin-two absolute top-16 left-32 text-[var(--violet)]"><MapPin size={12} className="animate-bounce" /></span>
          <span className="map-pin pin-three absolute top-4 left-20 text-[var(--green)]"><MapPin size={12} className="animate-bounce" /></span>
          <div className="map-card absolute bottom-2 left-2 bg-[var(--card-bg)] border border-[var(--border)] p-1.5 rounded text-[9px] flex gap-1.5 items-center font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            <span>
              <strong>Tracker MK-204</strong>
              <small className="block text-[8px] text-[var(--muted)]">Updated just now</small>
            </span>
          </div>
        </div>
        <div className="mock-stats select-none flex justify-between px-3 py-1.5 border-t border-[var(--border)] font-mono text-[9px] text-[var(--muted)]">
          <span><strong>99.8%</strong>Signal health</span>
          <span><strong>12m</strong>Last update</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'donor') {
    return (
      <BrowserFrame title="Donor operations">
        <div className="mock-toolbar select-none flex justify-between px-3 py-1.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.005)] font-mono text-[9px] text-[var(--muted)]">
          <strong>Giving overview</strong>
          <span>This month</span>
        </div>
        <div className="donor-chart flex items-end justify-between h-[130px] p-4 bg-[#0c0d12] select-none gap-1">
          {[45, 72, 52, 88, 68, 96, 82, 100].map((height, index) => (
            <i key={index} style={{ height: `${height}%`, background: 'linear-gradient(to top, var(--green) 30%, var(--violet) 100%)' }} className="w-full rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-200" />
          ))}
        </div>
        <div className="integration-row select-none flex justify-around p-1 border-y border-[var(--border)] font-mono text-[8px] text-[var(--muted)] bg-[var(--card-bg)]">
          <span>PayPal</span>
          <span>Eventbrite</span>
          <span>iDonate</span>
          <span>Every.org</span>
        </div>
        <div className="mock-stats select-none flex justify-between px-3 py-1.5 border-t border-[var(--border)] font-mono text-[9px] text-[var(--muted)]">
          <span><CircleDollarSign size={11} className="inline mr-0.5" /><strong>1,284</strong>Gifts synced</span>
          <span><Users size={11} className="inline mr-0.5" /><strong>98%</strong>Matched</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'import') {
    return (
      <BrowserFrame title="Benevity import studio">
        <div className="import-drop select-none h-[130px] bg-[#0c0d12] flex flex-col items-center justify-center text-center p-4 font-mono text-xs">
          <FileCheck2 size={22} className="text-[var(--amber)] mb-1" />
          <strong className="text-[var(--text)] text-[10px]">benevity-june.csv</strong>
          <span className="text-[8px] text-[var(--muted)] mt-0.5">1,248 rows validated</span>
          
          <div className="w-full max-w-[140px] bg-[var(--border)] h-1 rounded-full overflow-hidden mt-3">
            <div className="bg-[var(--amber)] h-full w-[92%]" />
          </div>
        </div>
        <div className="progress-row select-none flex justify-between px-3 py-1 bg-[var(--card-bg)] border-y border-[var(--border)] font-mono text-[9px] text-[var(--muted)]">
          <span>Matching records</span>
          <strong>92%</strong>
        </div>
        <div className="validation-list select-none flex flex-col gap-0.5 p-2 font-mono text-[8.5px] text-[var(--muted)]">
          <span><Check size={10} className="inline text-[var(--green)] mr-1" />1,172 ready to upsert</span>
          <span><Search size={10} className="inline text-[var(--blue)] mr-1" />64 require review</span>
          <span><ShieldCheck size={10} className="inline text-[var(--rose)] mr-1" />12 duplicates protected</span>
        </div>
      </BrowserFrame>
    );
  }

  if (type === 'portal') {
    return (
      <BrowserFrame title="Board member portal">
        <div className="portal-head select-none flex items-center justify-between p-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.005)] font-mono text-[9px] text-[var(--muted)]">
          <span className="portal-avatar w-4 h-4 rounded-full bg-[var(--violet)] text-white flex items-center justify-center text-[7px] font-bold">MK</span>
          <div>
            <strong className="text-white block leading-none">Board workspace</strong>
          </div>
        </div>
        <div className="portal-grid grid grid-cols-2 gap-2 p-3 bg-[#0c0d12] select-none h-[130px]">
          <div className="p-2 border border-[var(--border)] rounded flex flex-col justify-between hover:border-[var(--violet)] transition-colors duration-200 bg-[rgba(255,255,255,0.005)]">
            <FileCheck2 size={12} className="text-[var(--violet)]" />
            <span className="font-mono text-[8px] text-white">Meeting pack</span>
          </div>
          <div className="p-2 border border-[var(--border)] rounded flex flex-col justify-between hover:border-[var(--violet)] transition-colors duration-200 bg-[rgba(255,255,255,0.005)]">
            <ShieldCheck size={12} className="text-[var(--green)]" />
            <span className="font-mono text-[8px] text-white">Secure reports</span>
          </div>
          <div className="p-2 border border-[var(--border)] rounded flex flex-col justify-between hover:border-[var(--violet)] transition-colors duration-200 bg-[rgba(255,255,255,0.005)]">
            <Users size={12} className="text-[var(--blue)]" />
            <span className="font-mono text-[8px] text-white">Directory</span>
          </div>
          <div className="p-2 border border-[var(--border)] rounded flex flex-col justify-between hover:border-[var(--violet)] transition-colors duration-200 bg-[rgba(255,255,255,0.005)]">
            <CircleDollarSign size={12} className="text-[var(--amber)]" />
            <span className="font-mono text-[8px] text-white">Giving</span>
          </div>
        </div>
        <div className="mock-stats select-none flex justify-between px-3 py-1.5 border-t border-[var(--border)] font-mono text-[9px] text-[var(--muted)]">
          <span>Shield Encrypted</span>
          <span>Active CSP</span>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame title="Duplicate review">
      <div className="mock-toolbar select-none flex justify-between px-3 py-1.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.005)] font-mono text-[9px] text-[var(--muted)]">
        <strong>Potential matches</strong>
        <span>Confidence</span>
      </div>
      <div className="match-list p-2 bg-[#0c0d12] select-none h-[130px] flex flex-col gap-1.5 overflow-y-auto font-mono text-[8px]">
        <div className="p-1.5 border border-[var(--border)] rounded flex items-center justify-between bg-[var(--card-bg)]">
          <span className="text-[var(--green)] font-bold">94%</span>
          <span>Murali K. ➔ M. Krishna</span>
        </div>
        <div className="p-1.5 border border-[var(--border)] rounded flex items-center justify-between bg-[var(--card-bg)]">
          <span className="text-[var(--amber)] font-bold">87%</span>
          <span>A. Rivera ➔ Alex Rivera</span>
        </div>
      </div>
      <div className="review-actions select-none flex justify-around p-2 border-t border-[var(--border)] font-mono text-[9px]">
        <button type="button" className="text-[var(--muted)] hover:text-white transition-colors duration-250">Keep separate</button>
        <button type="button" className="text-[var(--blue)] hover:text-white transition-colors duration-250">Review match</button>
      </div>
    </BrowserFrame>
  );
}
