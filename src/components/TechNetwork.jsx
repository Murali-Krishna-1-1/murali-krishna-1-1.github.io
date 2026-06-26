import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Cloud, Cpu, Server, Play, Zap, Globe } from 'lucide-react';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';

const layers = [
  {
    id: 'users',
    title: 'Users',
    subtitle: 'Client Layer',
    icon: Users,
    color: '#38bdf8', // Light blue
    desc: 'Donors, partners, internal operators, and board trustees interacting with custom interfaces. All user sessions are governed by profile sharing and IP restriction rules.',
    tip: 'Governed by Profile Sharing & Session Security',
  },
  {
    id: 'experience-cloud',
    title: 'Experience Cloud',
    subtitle: 'Gateway Layer',
    icon: Globe,
    color: '#818cf8', // Indigo
    desc: 'A secure digital portal layer serving custom branded portals. Hardened against cross-site scripting (XSS) with strict Content Security Policies (CSP) and Shield Platform Encryption.',
    tip: 'Shield Platform Encryption & Custom Theme Layouts',
  },
  {
    id: 'lwc',
    title: 'Lightning Web Components',
    subtitle: 'UI Component Layer',
    icon: Cpu,
    color: '#34d399', // Emerald
    desc: 'Reactive client-side interfaces. Loads third-party charting or mapping libraries (Leaflet.js) in sandboxed environments, offloading CSV parsing to background Web Workers.',
    tip: 'Asynchronous UI Threads & Leaflet Map Canvases',
  },
  {
    id: 'apex-services',
    title: 'Apex Services',
    subtitle: 'Business Logic Layer',
    icon: Server,
    color: '#a78bfa', // Violet
    desc: 'Enterprise back-end programming. Running bulk-safe trigger handlers, Batch Apex for bulk record processing, and Queueable Apex for handling asynchronous external callouts.',
    tip: 'Governor Limit Defenses & 88%+ Unit Test Coverage',
  },
  {
    id: 'flows-events',
    title: 'Flows & Platform Events',
    subtitle: 'Event Broker Layer',
    icon: Zap,
    color: '#f43f5e', // Rose
    desc: 'Event-driven pub/sub architecture. Subscribes to high-frequency IoT payloads and immediately publishes to Platform Events, decoupling heavy processing to avoid database locks.',
    tip: 'Decoupled Asynchronous Transaction Pipelines',
  },
  {
    id: 'rest-apis',
    title: 'REST APIs',
    subtitle: 'Integration Bridge',
    icon: Play,
    color: '#fbbf24', // Amber
    desc: 'Exposes secure REST and SOAP endpoints. Ingests payment and donor JSON payloads from external processors with OAuth 2.0 validation and strict schema checks.',
    tip: 'OAuth 2.0 Authenticated Normalized Endpoints',
  },
  {
    id: 'external-systems',
    title: 'External Systems',
    subtitle: 'Infrastructure Layer',
    icon: Cloud,
    color: '#22d3ee', // Cyan
    desc: 'Payment processors (PayPal, Eventbrite), IoT trackers (Nimbelink), AWS databases, and web hooks pushing telemetry and donations into the Salesforce CRM.',
    tip: 'IoT Trackers, Payment Webhooks, & AWS Databases',
  },
];

export default function TechNetwork() {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  // Helper to determine if a line should be active
  const isLineActive = (index) => {
    if (!hoveredLayer) return false;
    const hoverIndex = layers.findIndex((l) => l.id === hoveredLayer);
    // Line connects index to index + 1
    return hoverIndex === index || hoverIndex === index + 1;
  };

  const activeData = layers.find((l) => l.id === hoveredLayer) || layers[2]; // Default to LWC

  return (
    <section id="tech-network" className="section section-tech-network">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="Enterprise Architecture"
            title="Salesforce Transactions, Visualised."
            description="Explore how data flows through a production Salesforce environment, from client interaction down to backend database systems."
          />
        </Reveal>

        <div className="architecture-grid mt-10">
          {/* Left Side: The Interactive SVG Stack */}
          <div className="architecture-diagram-panel glass-card relative flex items-center justify-center p-8 lg:p-10" data-cursor-label="Explore">
            {/* The Blueprint Grid Background inside this panel */}
            <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />

            <div className="architecture-stack flex flex-col items-center relative z-10 w-full max-w-[380px]">
              {layers.map((layer, idx) => {
                const IconComponent = layer.icon;
                const isHovered = hoveredLayer === layer.id;
                const isAnyHovered = hoveredLayer !== null;
                const opacityStyle = isAnyHovered && !isHovered ? 0.35 : 1.0;
                
                return (
                  <div key={layer.id} className="w-full flex flex-col items-center">
                    {/* Layer Card */}
                    <div
                      className={`arch-layer-node flex items-center gap-4 p-4 rounded-lg w-full border transition-all duration-300 cursor-pointer`}
                      style={{
                        borderColor: isHovered ? layer.color : 'var(--border)',
                        background: isHovered ? 'var(--card-hover-bg)' : 'rgba(255,255,255,0.01)',
                        boxShadow: isHovered ? `0 0 15px ${layer.color}1e` : 'none',
                        opacity: opacityStyle,
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      <div
                        className="arch-icon-wrapper p-2 rounded-md border"
                        style={{
                          color: layer.color,
                          borderColor: `${layer.color}44`,
                          background: `${layer.color}0a`,
                        }}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">{layer.subtitle}</span>
                        <h4 className="text-sm font-semibold text-[var(--text)] m-0">{layer.title}</h4>
                      </div>
                      <div className="font-mono text-[9px] text-[var(--muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                        0{idx + 1}
                      </div>
                    </div>

                    {/* Connecting SVG Arrow/Line (Only render if not the last item) */}
                    {idx < layers.length - 1 && (
                      <div className="h-10 w-full flex justify-center items-center relative">
                        <svg className="h-full w-[40px]" viewBox="0 0 40 40">
                          {/* Static background path */}
                          <line
                            x1="20"
                            y1="0"
                            x2="20"
                            y2="40"
                            stroke="var(--border)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />
                          {/* Animated flow path */}
                          <line
                            x1="20"
                            y1="0"
                            x2="20"
                            y2="40"
                            stroke={isLineActive(idx) ? layers[idx].color : 'transparent'}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            className="flowing-dashed-line"
                          />
                          {/* Down Arrow Head */}
                          <polygon
                            points="17,35 20,40 23,35"
                            fill={isLineActive(idx) ? layers[idx + 1].color : 'var(--border)'}
                            className="transition-colors duration-300"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: The Detail Console Card explaining the layer responsibility */}
          <div className="architecture-detail-panel flex flex-col justify-between">
            <div className="glass-card flex-1 p-8 lg:p-10 relative flex flex-col justify-between overflow-hidden">
              {/* Dynamic Accent Glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[40px] opacity-10 transition-all duration-500"
                style={{ background: activeData.color }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Layer Index */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 rounded border"
                        style={{
                          color: activeData.color,
                          borderColor: `${activeData.color}33`,
                          background: `${activeData.color}0c`,
                        }}
                      >
                        {activeData.subtitle}
                      </span>
                      <span className="font-mono text-xs text-[var(--muted)]">TIER 0{layers.findIndex(l => l.id === activeData.id) + 1} OF 07</span>
                    </div>

                    {/* Layer Title */}
                    <h3 className="text-xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                      {activeData.title}
                    </h3>

                    {/* Detailed description */}
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                      {activeData.desc}
                    </p>
                  </div>

                  {/* Production spec note */}
                  <div className="border-t border-[var(--border)] pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] block mb-2">Architectural Spec:</span>
                    <div
                      className="flex items-center gap-2 p-2.5 rounded border font-mono text-xs"
                      style={{
                        borderColor: `${activeData.color}22`,
                        background: `${activeData.color}05`,
                        color: activeData.color,
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeData.color }} />
                      <span>{activeData.tip}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Explanatory Help Box */}
            <div className="glass-card p-5 mt-4 flex items-center gap-3 border-l-4 border-l-[var(--blue)]">
              <span className="font-mono text-[10px] text-[var(--muted)] leading-relaxed">
                Hover over any layer to explore how each part contributes to the complete enterprise architecture.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
