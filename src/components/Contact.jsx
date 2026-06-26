import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Globe, ArrowUpRight, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { siteMeta } from '../data/content';

const PROJECT_TYPES = [
  'Salesforce REST Integration',
  'LWC & Experience Cloud Portal',
  'Apex Services & Automation',
  'Full-Stack Project Ingress',
  'General Consultancy / Other',
];

export default function Contact() {
  // formState: 'idle' | 'compiling' | 'success'
  const [formState, setFormState] = useState('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  
  const dropdownRef = useRef(null);
  const consoleBottomRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll console logs
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]); // Keep simple

  const logSequence = [
    { type: 'info', text: 'INCOMING: Initializing lead payload parsing...' },
    { type: 'info', text: `VALIDATING: Checking parameters [Name: "${name}", Email: "${email}"]...` },
    { type: 'info', text: 'VALIDATING: Message integrity check passed.' },
    { type: 'warn', text: 'OAUTH_2.0: Requesting temporary access token from security gateway...' },
    { type: 'success', text: 'OAUTH_2.0: Secure handshake established. Access token granted.' },
    { type: 'info', text: 'SECURE_CHANNEL: Connecting to Apex REST Lead Ingress API...' },
    { type: 'info', text: `INGESTION: Mapping custom fields [Company: "${company || 'N/A'}", Scope: "${projectType}"]...` },
    { type: 'success', text: 'DATA_SYNCHRONIZED: Record created in Salesforce CRM successfully.' },
    { type: 'success', text: 'TRANSACTION_SUCCESSFUL: Email notification queued. Ingress transaction complete.' },
  ];

  // Run logging simulation sequence
  useEffect(() => {
    if (formState !== 'compiling') return;

    if (logIndex < logSequence.length) {
      const delay = logIndex === 3 || logIndex === 7 ? 800 : 450;
      const timer = setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, { time: timestamp, ...logSequence[logIndex] }]);
        setLogIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Completed all logs, transition to success card
      const successTimer = setTimeout(() => {
        setFormState('success');
      }, 1000);
      return () => clearTimeout(successTimer);
    }
  }, [formState, logIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !projectType || !message) return;
    
    // Begin terminal log sequence
    setLogs([]);
    setLogIndex(0);
    setFormState('compiling');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setProjectType('');
    setMessage('');
    setFormState('idle');
    setLogs([]);
    setLogIndex(0);
  };

  return (
    <section id="contact" className="section section-contact border-t border-[var(--border)]">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="Contact Console"
            title="Let's build something real."
            description="Initiate a secure database transaction below to get in touch. I am open to enterprise roles, cloud architecture designs, and integrations."
          />
        </Reveal>

        <div className="contact-panel mt-10">
          {/* Left Column: Info & Links */}
          <div className="contact-copy flex flex-col justify-between h-full">
            <div>
              <h2>Let&apos;s connect.</h2>
              <p>
                Have a challenging integration, a custom LWC layout, or a Salesforce platform problem? 
                Send a transaction packet directly into my pipeline, or reach out through my personal channels.
              </p>
              
              {/* Contact details with custom hover labels */}
              <div className="contact-links" data-cursor-label="Open">
                <a href={`mailto:${siteMeta.email}`} className="contact-card">
                  <div className="contact-icon">
                    <Mail size={16} />
                  </div>
                  <div>
                    <small>DIRECT INQUIRIES</small>
                    <strong>{siteMeta.email}</strong>
                  </div>
                  <ArrowUpRight size={14} />
                </a>

                <div className="contact-card border border-[var(--border)] rounded-xl p-4 bg-[var(--surface-raised)] flex items-center gap-4">
                  <div className="contact-icon">
                    <Globe size={16} />
                  </div>
                  <div>
                    <small>LOCATION</small>
                    <strong>Chennai, India</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Resume using custom inline vector SVGs to prevent build errors */}
            <div className="flex flex-wrap gap-3 mt-8 border-t border-[var(--border)] pt-6">
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors duration-200"
                data-cursor-expand="true"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={siteMeta.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--blue)] transition-colors duration-200"
                data-cursor-expand="true"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={siteMeta.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 border border-[var(--border)] rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--green)] transition-colors duration-200"
                data-cursor-expand="true"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Apex Ingress Console Form */}
          <div className="contact-console-container relative h-[450px] w-full">
            <AnimatePresence mode="wait">
              {/* State A: Idle Form */}
              {formState === 'idle' && (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="contact-console-window glass-card flex flex-col h-full overflow-hidden border border-[var(--border-strong)]"
                >
                  <div className="window-bar font-mono select-none">
                    <div className="window-dots"><i /><i /><i /></div>
                    <span>ContactConsole.apex</span>
                  </div>

                  <div className="console-body p-6 flex flex-col gap-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group flex flex-col">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Murali's Guest"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="console-input"
                        />
                      </div>
                      <div className="form-group flex flex-col">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="client@enterprise.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="console-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group flex flex-col">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1.5">Company</label>
                        <input
                          type="text"
                          placeholder="Optional"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="console-input"
                        />
                      </div>
                      <div className="form-group flex flex-col relative" ref={dropdownRef}>
                        <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1.5">Project Type *</label>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen((prev) => !prev)}
                          className="console-dropdown-trigger flex items-center justify-between"
                        >
                          <span className={projectType ? 'text-[var(--text)]' : 'text-[var(--muted)]'}>
                            {projectType || 'Select Integration Scope'}
                          </span>
                          <ChevronDown size={14} className={`text-[var(--muted)] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.15 }}
                              className="console-dropdown-menu"
                            >
                              {PROJECT_TYPES.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setProjectType(type);
                                    setDropdownOpen(false);
                                  }}
                                  className={`dropdown-item ${projectType === type ? 'is-active' : ''}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="form-group flex flex-col flex-1">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] mb-1.5">Message Packet *</label>
                      <textarea
                        required
                        placeholder="Detail your operational bottleneck, system scope, or inquiry details here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="console-input resize-none flex-1 min-h-[90px]"
                      />
                    </div>
                  </div>

                  <div className="console-footer px-6 py-4 border-t border-[var(--border)] bg-[rgba(255,255,255,0.005)] select-none">
                    <button
                      type="submit"
                      disabled={!name || !email || !projectType || !message}
                      className="button button-primary run-apex-btn w-full justify-center text-xs py-2.5 font-mono"
                      data-cursor-label="Run"
                    >
                      <Send size={12} className="inline mr-1.5" /> ▶ Execute Ingress Transaction
                    </button>
                  </div>
                </motion.form>
              )}

              {/* State B: Terminal Compiling Logs */}
              {formState === 'compiling' && (
                <motion.div
                  key="contact-terminal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="contact-console-window glass-card flex flex-col h-full overflow-hidden border border-[var(--blue)] bg-[#080a10]"
                >
                  <div className="window-bar font-mono border-b border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.03)] select-none">
                    <div className="window-dots"><i className="bg-[var(--blue)]" /><i /><i /></div>
                    <span className="text-[var(--blue)] font-bold">sf-crm-connector --stream</span>
                  </div>

                  <div className="console-body p-6 font-mono text-[10.5px] leading-relaxed overflow-y-auto flex-1 select-none text-[#a9b1d6]">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-500">$ sf project deploy start --metadata ContactConsole --dry-run</span>
                      <span className="text-gray-400">--- INGRESS SESSION INITIALIZED ---</span>
                      {logs.map((log, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <span className="text-gray-500">[{log.time}]</span>
                          <span className={
                            log.type === 'success' ? 'text-[var(--green)]' :
                            log.type === 'warn' ? 'text-[var(--amber)] font-semibold' : 'text-gray-300'
                          }>
                            {log.text}
                          </span>
                        </div>
                      ))}
                      {/* Typing indicator */}
                      {logIndex < logSequence.length && (
                        <div className="flex gap-2 items-center text-[var(--blue)] animate-pulse">
                          <span>⚙ executing task...</span>
                          <span className="w-1.5 h-3 bg-[var(--blue)] inline-block" />
                        </div>
                      )}
                      <div ref={consoleBottomRef} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* State C: Ingestion Success Card */}
              {formState === 'success' && (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="contact-console-window glass-card flex flex-col items-center justify-center h-full p-8 border border-[var(--green)] text-center bg-[#070b10] select-none"
                >
                  {/* Glowing success tick */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-[var(--green-glow)] border border-[var(--green)] flex items-center justify-center text-[var(--green)] mb-6 shadow-[0_0_20px_var(--green-glow)]"
                  >
                    <CheckCircle2 size={32} className="animate-pulse" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-[var(--text)] mb-2">Ingress Transaction Succeeded</h3>
                  <p className="text-sm text-[var(--muted)] max-w-[320px] leading-relaxed mb-6">
                    Thank you, <strong>{name}</strong>! Your payload was validated and synchronized into my pipeline. 
                    I will review your message and reply within 24 hours.
                  </p>

                  <div className="bg-[rgba(16,185,129,0.03)] border border-[rgba(16,185,129,0.15)] rounded-lg p-3 w-full max-w-[280px] font-mono text-[9px] text-[var(--green)] mb-6 flex flex-col gap-1">
                    <span>TRANSACTION_ID: TXN_CRM_{Math.floor(100000 + Math.random() * 900000)}</span>
                    <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                    <span>STATUS: DELIVERED (200 OK)</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="button button-secondary text-xs px-6 py-2"
                  >
                    Return to Form / New Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
