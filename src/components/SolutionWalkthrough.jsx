import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, FileCode, CheckCircle, HelpCircle, Network, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

const steps = [
  {
    title: 'Business Problem',
    eyebrow: '01 / THE BOTTLENECK',
    icon: AlertCircle,
    color: 'var(--rose)',
    headline: 'High-Frequency IoT GPS streams locking database records.',
    content: (
      <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
        <p>
          A global logistics client needed live shipment monitoring for high-value cargo. Fleet devices streamed raw GPS telemetry payloads every 10 seconds.
        </p>
        <div className="bg-[rgba(244,63,94,0.03)] border border-[rgba(244,63,94,0.15)] p-4 rounded-md text-xs font-mono flex flex-col gap-2">
          <div className="flex justify-between text-[var(--rose)]">
            <span>🔴 Apex CPU Governor Limit Exceeded</span>
            <span>Limit: 10,000ms</span>
          </div>
          <p>
            <strong>Synchronous Database Locks:</strong> Direct synchronous database writing locked contact and shipment records, quickly exceeding the Apex CPU Limit and crashing the Salesforce org under peak concurrency.
          </p>
        </div>
        <p>
          The system needed to ingest high-volume telemetry without hitting limits or slowing down the customer-facing portal.
        </p>
      </div>
    ),
  },
  {
    title: 'System Architecture',
    eyebrow: '02 / THE ARCHITECTURE',
    icon: Network,
    color: 'var(--blue)',
    headline: 'Event-Driven Isolation using Salesforce Platform Events.',
    content: (
      <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
        <p>
          Instead of synchronous writes, we decoupled the ingestion pipeline by publishing GPS payloads directly to Salesforce Platform Events.
        </p>
        
        {/* Visual Ingestion Pipeline Map */}
        <div className="bg-[rgba(255,255,255,0.01)] border border-[var(--border)] p-4 rounded-md flex flex-col gap-3 font-mono text-[11px]">
          <span className="text-[var(--blue)] font-semibold uppercase tracking-wider block">Decoupled Telemetry Stream:</span>
          <div className="flex flex-col gap-2 relative pl-4 border-l border-[var(--border-strong)]">
            <div>
              <span className="text-[var(--text)]">1. Inbound Stream:</span> IoT Payload ➔ Apex REST Ingress (No DB Write, 40ms)
            </div>
            <div>
              <span className="text-[var(--text)]">2. Event Bus:</span> Publish to <strong className="text-[var(--blue)]">GPS_Ping__e</strong> Platform Event
            </div>
            <div>
              <span className="text-[var(--text)]">3. Async Processing:</span> Trigger Subscriber handles bulk mapping in background
            </div>
            <div>
              <span className="text-[var(--text)]">4. Client Ingestion:</span> LWC WebSockets/EmpApi push coordinates to UI
            </div>
          </div>
        </div>
        <p>
          By offloading database writes to an asynchronous event subscriber, the REST endpoint remains highly responsive, returning in under 45ms.
        </p>
      </div>
    ),
  },
  {
    title: 'Implementation',
    eyebrow: '03 / THE CODE & UI',
    icon: FileCode,
    color: 'var(--amber)',
    headline: 'Bulk-safe Trigger Handlers and Sandboxed Leaflet LWC.',
    content: (
      <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
        <p>
          We authored a bulk-safe Apex Trigger handler processing events in batches of 2,000. On the frontend, we built a Lightning Web Component hosting a custom Leaflet.js canvas.
        </p>
        
        {/* Simulated Code Window */}
        <div className="browser-frame text-xs">
          <div className="browser-bar">
            <div><i /><i /><i /></div>
            <span>GpsTelemetryTriggerHandler.cls</span>
          </div>
          <div className="browser-body bg-[#0a0a0c] p-4 font-mono text-[10.5px] leading-relaxed text-[#a9b1d6] overflow-x-auto select-none">
            <div><span className="text-[#f7768e]">public class</span> <span className="text-[#7aa2f7]">GpsTelemetryTriggerHandler</span> {'{'}</div>
            <div className="pl-4"><span className="text-[#f7768e]">public static void</span> <span className="text-[#7aa2f7]">handleAfterInsert</span>(List&lt;<span className="text-[#e0af68]">GPS_Ping__e</span>&gt; events) {'{'}</div>
            <div className="pl-8 text-[#565f89]">// Bulk-safe collection and record association</div>
            <div className="pl-8"><span className="text-[#bb9af7]">List</span>&lt;Shipment__c&gt; toUpdate = <span className="text-[#f7768e]">new</span> <span className="text-[#bb9af7]">List</span>&lt;Shipment__c&gt;();</div>
            <div className="pl-8"><span className="text-[#bb9af7]">for</span> (<span className="text-[#e0af68]">GPS_Ping__e</span> evt : events) {'{'}</div>
            <div className="pl-12">toUpdate.add(<span className="text-[#f7768e]">new</span> Shipment__c(</div>
            <div className="pl-16">Identifier__c = evt.Device_ID__c,</div>
            <div className="pl-16">Last_Lat__c = evt.Latitude__c,</div>
            <div className="pl-16">Last_Lng__c = evt.Longitude__c</div>
            <div className="pl-12">));</div>
            <div className="pl-8">{'}'}</div>
            <div className="pl-8"><span className="text-[#7aa2f7]">Database</span>.<span className="text-[#7aa2f7]">upsert</span>(toUpdate, Shipment__c.Identifier__c, <span className="text-[#f7768e]">false</span>);</div>
            <div className="pl-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Deployment',
    eyebrow: '04 / THE STAGING',
    icon: HelpCircle,
    color: 'var(--violet)',
    headline: 'Continuous integration pipelines & 92% Apex unit coverage.',
    content: (
      <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
        <p>
          Code is developed locally in SFDX workspaces, pushed to GitHub, and validated in scratch orgs using GitHub Actions workflows.
        </p>
        
        {/* Terminal Staging Log */}
        <div className="bg-[#0b0c10] border border-[var(--border)] p-4 rounded-md font-mono text-[11px] text-[#22c55e] flex flex-col gap-1 select-none">
          <span className="text-gray-500">$ sf project deploy start --metadata ApexClass --dry-run</span>
          <span>[Deploying] Initializing pre-flight dry-run check...</span>
          <span>[Deploying] Compiling classes GpsTelemetryTriggerHandler...</span>
          <span>[Deploying] Running unit test suite GpsTelemetryTriggerHandlerTest...</span>
          <span className="text-[#38bdf8]">✓ testEventIngestionSuccess (280ms) - Passed</span>
          <span className="text-[#38bdf8]">✓ testEventIngestionBulk (1240ms) - Passed</span>
          <span className="text-[var(--text)]">--------------------------------------------------</span>
          <span>Test Results: 2/2 Passed | Overall Code Coverage: 92.4%</span>
          <span className="text-yellow-400">✓ Deployment Validation Succeeded. Dry-run Clean.</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Business Outcome',
    eyebrow: '05 / THE SUCCESS',
    icon: CheckCircle,
    color: 'var(--green)',
    headline: 'Slashed inquiries, zero governor limits hit.',
    content: (
      <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
        <p>
          By isolating the ingestion queue and creating an interactive customer mapping portal, the system achieved spectacular production results.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="glass-card p-4 text-center">
            <span className="block font-mono text-2xl text-[var(--green)] font-bold">45%</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Fleet Support Drop</span>
          </div>
          <div className="glass-card p-4 text-center">
            <span className="block font-mono text-2xl text-[var(--blue)] font-bold">0%</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">CPU limit crashes</span>
          </div>
          <div className="glass-card p-4 text-center col-span-2">
            <span className="block font-mono text-xl text-[var(--violet)] font-bold">99.98%</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Ingestion API Uptime</span>
          </div>
        </div>
        <p>
           Hires and stakeholders got self-serve visibility into high-value shipment coordinates, removing manual status checks entirely.
        </p>
      </div>
    ),
  },
];

export default function SolutionWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Automatic Step Progression (5s timer)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeData = steps[activeStep];
  const StepIcon = activeData.icon;

  return (
    <section id="featured-solution" className="section section-walkthrough border-t border-[var(--border)]">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="Featured Case Study Explorer"
            title="Deconstructing a Production System."
            description="Recruiters can step through the complete lifecycle of one high-concurrency Salesforce integration, showing how it was researched, designed, built, and deployed."
          />
        </Reveal>

        <div className="solution-explorer-box glass-card mt-10 p-6 md:p-8 overflow-hidden relative">
          {/* Ingestion Stream Progress Bar for Cinematic Auto-Play */}
          {isAutoPlaying && (
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[rgba(255,255,255,0.03)] z-20 overflow-hidden">
              <motion.div
                key={activeStep}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-[var(--blue)] origin-left"
              />
            </div>
          )}

          {/* Timeline Node Stepper */}
          <div className="explorer-stepper flex justify-between items-center mb-8 relative z-10 w-full overflow-x-auto pb-4 gap-2">
            <div className="stepper-track-line absolute left-0 right-0 h-[1.5px] bg-[var(--border)] top-1/2 -translate-y-1/2 z-0" />
            
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }}
                  className="stepper-node flex flex-col items-center relative z-10 gap-2 focus:outline-none flex-1 min-w-[70px]"
                  data-cursor-label="Explore"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-all duration-350`}
                    style={{
                      borderColor: isActive ? step.color : isPassed ? 'var(--blue)' : 'var(--border)',
                      background: isActive ? `${step.color}1e` : isPassed ? 'rgba(56,189,248,0.08)' : 'var(--card-bg)',
                      color: isActive ? step.color : isPassed ? 'var(--blue)' : 'var(--muted)',
                      boxShadow: isActive ? `0 0 10px ${step.color}22` : 'none',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-[10px] font-mono whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-[var(--text)] font-semibold' : 'text-[var(--muted)]'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper Display Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 min-h-[350px]"
            >
              {/* Left text / context panel */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest block mb-1"
                    style={{ color: activeData.color }}
                  >
                    {activeData.eyebrow}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text)] mb-4 leading-snug">
                    {activeData.headline}
                  </h3>
                  <div className="step-body-wrapper">{activeData.content}</div>
                </div>

                {/* Stepper controls */}
                <div className="flex gap-4 mt-6 border-t border-[var(--border)] pt-4">
                  {activeStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStep((s) => s + 1);
                        setIsAutoPlaying(false);
                      }}
                      className="button button-primary flex items-center gap-2 text-xs py-2 px-4 w-full justify-center"
                      style={{ '--accent-color': activeData.color }}
                    >
                      Next Step: {steps[activeStep + 1].title} <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStep(0);
                        setIsAutoPlaying(false);
                      }}
                      className="button button-secondary text-xs py-2 px-4 w-full justify-center"
                    >
                      Reset Walkthrough
                    </button>
                  )}
                </div>
              </div>

              {/* Right visuals/code/logs panel */}
              <div className="lg:col-span-7 h-full flex flex-col justify-center">
                <div
                  className="visual-container-shell p-6 rounded-lg border flex items-center justify-center min-h-[250px] relative overflow-hidden"
                  style={{
                    borderColor: `${activeData.color}22`,
                    background: `${activeData.color}04`,
                  }}
                >
                  {/* Absolute visual indicator */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full filter blur-[35px] opacity-10"
                    style={{ background: activeData.color }}
                  />
                  
                  {/* Dynamic big step icon in center */}
                  <div
                    className="p-4 rounded-full border mb-4 absolute top-4 left-4"
                    style={{
                      color: activeData.color,
                      borderColor: `${activeData.color}33`,
                      background: `${activeData.color}0a`,
                    }}
                  >
                    <StepIcon size={20} />
                  </div>

                  {/* High Quality Styled Graphic matching the step */}
                  <div className="w-full mt-10">
                    {activeStep === 0 && (
                      <div className="flex flex-col items-center justify-center p-6 text-center select-none">
                        <span className="text-[var(--rose)] font-bold text-5xl mb-2 font-mono">10s</span>
                        <p className="text-xs font-mono text-[var(--muted)]">GPS payload streams congesting Apex REST</p>
                        <div className="w-full max-w-[220px] bg-[var(--border)] h-1.5 rounded-full overflow-hidden mt-4">
                          <div className="bg-[var(--rose)] h-full w-full animate-pulse" />
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="flex flex-col gap-3 p-4 border border-[var(--border)] rounded-md bg-[var(--card-bg)] text-xs font-mono w-full select-none">
                        <div className="flex items-center justify-between text-[var(--blue)]">
                          <span>● Event Bus Syncing</span>
                          <span>Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--blue)] animate-ping" />
                          <span>Streaming: payload_queue_id_99234</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[var(--muted)] mt-2">
                          <div className="p-2 border border-[var(--border)] rounded">Ingest</div>
                          <div className="p-2 border border-[var(--border)] rounded">Queue</div>
                          <div className="p-2 border border-[var(--border)] rounded">Process</div>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="flex flex-col items-center justify-center gap-2 text-center select-none py-6">
                        <span className="text-[var(--amber)] font-bold text-4xl mb-1 font-mono">LWC</span>
                        <p className="text-xs font-mono text-[var(--muted)]">Lightning Web Component Leaflet Integration</p>
                        <div className="flex gap-2 text-[10px] font-mono mt-4">
                          <span className="px-2 py-1 bg-[rgba(251,191,36,0.1)] text-[var(--amber)] rounded">Web Workers</span>
                          <span className="px-2 py-1 bg-[rgba(251,191,36,0.1)] text-[var(--amber)] rounded">Canvas Paint</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="flex flex-col items-center justify-center gap-2 text-center select-none py-6">
                        <span className="text-[var(--violet)] font-bold text-4xl mb-1 font-mono">92%</span>
                        <p className="text-xs font-mono text-[var(--muted)]">Apex unit test automation coverage verified</p>
                        <span className="text-[10px] text-[var(--green)] font-mono">✓ 24 of 24 Assertions Met</span>
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div className="flex flex-col items-center justify-center text-center p-6 select-none">
                        <span className="text-[var(--green)] font-bold text-5xl mb-2 font-mono">0%</span>
                        <p className="text-xs font-mono text-[var(--muted)]">Apex limit warnings in Production</p>
                        <div className="w-full max-w-[220px] bg-[var(--border)] h-1.5 rounded-full overflow-hidden mt-4">
                          <div className="bg-[var(--green)] h-full w-0" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
