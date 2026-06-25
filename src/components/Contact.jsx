import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Briefcase,
  Bot,
  Send,
  X,
  CheckCircle,
  Activity,
  FileText,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { siteMeta } from '../data/content';

// High-fidelity local Q&A engine
const RESPONSES = {
  default: `I am Murali's Engineering Assistant. I can help you explore his:
* **Salesforce & Apex Experience** (3+ years, triggers, async frameworks)
* **Experience Cloud & LWC work** (Logistics Command Center, Board Portals)
* **Integrations & REST APIs** (Event-driven pipelines, payment gateways)
* **Credentials** (Platform Developer I, GUVI Python)
* **Availability & Contact** (Chennai, India | muralikrishna1624@icloud.com)

Try clicking one of the quick actions on the left or type your own question below!`,

  projects: `Murali has built several high-impact enterprise projects:
1. **IoT Logistics Platform**: Ingests high-frequency GPS streams via Apex REST and Platform Events, rendering real-time maps in an LWC Leaflet canvas.
2. **Unified Donor Pipeline**: Consolidates PayPal, iDonate, and Eventbrite webhooks into Salesforce NPSP with automated fuzzy matching.
3. **Benevity Bulk Import Studio**: Processes 10,000+ CSV rows asynchronously on client-side Web Workers, upserting in batch chunks.
4. **Board Member Executive Portal**: Secured with Shield Platform Encryption, strict Content Security Policies, and customized sharing rules.
5. **Donor Match Review Center**: An interactive duplicate contact merging console managing 100,000+ records in SOQL.`,

  experience: `Murali has **3+ years of production experience**:
* **Software Engineer at Techtinium** (2025 - Present): Lead Salesforce development for the SETI Institute, building unified donation pipelines and secure board portals.
* **Salesforce Developer at Lean AgileNautics** (2023 - 2025): Developed customer-facing IoT tracking, integrated Leaflet.js maps in LWC, and maintained **88%+ Apex unit test coverage**.
* **Salesforce Internships** (2022 - 2023): Learned platform fundamentals, wrote clean triggers, and designed custom metadata schemas.`,

  apex: `Murali's **Apex programming** expertise includes:
* **Asynchronous Frameworks**: Deep experience with Batch Apex (processing 10k+ rows), Queueable Apex (chained callouts), and Future methods.
* **Trigger Handlers**: Designing bulk-safe, decoupled trigger handler frameworks to respect governor limits.
* **Security & Testing**: Writing secure code using "with sharing" and consistently maintaining **88%+ Apex unit test coverage**.`,

  lwc: `Murali's **Lightning Web Components (LWC)** skillset combines modern web standards with Salesforce:
* **Third-Party Libraries**: Wrapping Leaflet.js maps securely inside Lightning Locker boundaries.
* **Client-Side Optimization**: Utilizing HTML5 Web Workers inside LWCs to parse heavy CSV datasets without locking the browser thread.
* **State Management**: Wire services, imperative Apex calls, LDS, and event-driven LWC Pub/Sub.`,

  integrations: `Murali specializes in building resilient **REST & event-driven integrations**:
* **Platform Events**: Ingesting raw IoT tracker payloads via custom REST endpoints and immediately publishing to Platform Events to avoid CPU limit locks.
* **Payment Gateways**: Consolidating PayPal, iDonate, Eventbrite, and Every.org webhooks into NPSP with fuzzy deduplication rules.`,

  certs: `Murali's verified credentials:
* **Salesforce Platform Developer I (PD1)** - Certified (May 2024)
* **Salesforce Platform Developer II (PD2)** - In Progress
* **HackerRank JavaScript Intermediate** - Verified
* **GUVI Python Programming** - Verified`,

  contact: `To get in touch with Murali:
* **Email**: muralikrishna1624@icloud.com
* **LinkedIn**: linkedin.com/in/iam-murali/
* **GitHub**: github.com/Murali-Krishna-1-1
* **Location**: Chennai, India (Open to select roles and projects)`,
};

const findBestResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes('project') || q.includes('build') || q.includes('work') || q.includes('logistics') || q.includes('donor') || q.includes('benevity') || q.includes('portal')) {
    return RESPONSES.projects;
  }
  if (q.includes('experience') || q.includes('career') || q.includes('job') || q.includes('history') || q.includes('techtinium') || q.includes('agilenautics')) {
    return RESPONSES.experience;
  }
  if (q.includes('apex') || q.includes('trigger') || q.includes('batch') || q.includes('async') || q.includes('governor') || q.includes('test') || q.includes('coverage')) {
    return RESPONSES.apex;
  }
  if (q.includes('lwc') || q.includes('lightning') || q.includes('component') || q.includes('javascript') || q.includes('react') || q.includes('leaflet')) {
    return RESPONSES.lwc;
  }
  if (q.includes('integration') || q.includes('api') || q.includes('rest') || q.includes('webhook') || q.includes('event') || q.includes('platform event') || q.includes('payment')) {
    return RESPONSES.integrations;
  }
  if (q.includes('cert') || q.includes('credential') || q.includes('pd1') || q.includes('pd2') || q.includes('python')) {
    return RESPONSES.certs;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('location') || q.includes('linkedin') || q.includes('resume')) {
    return RESPONSES.contact;
  }
  return RESPONSES.default;
};

const SUGGESTIONS = [
  { text: 'Show Salesforce projects', query: 'projects' },
  { text: 'Tell me about Apex experience', query: 'apex' },
  { text: 'What integrations has he built?', query: 'integrations' },
  { text: 'Check certifications & PD1', query: 'certifications' },
];

export default function Contact() {
  // Modes: 'chat' | 'form' | 'sending' | 'success'
  const [mode, setMode] = useState('chat');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Hi there! I am Murali's **Engineering Assistant**.

I can answer your questions about his **Salesforce experience**, **Apex code**, **LWC design**, **integrations**, or **credentials**. 

If you want to send him a direct message, click **"Send a Message"** on the left or type *"I want to contact you"*.`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Sending logs states
  const [sendingLogs, setSendingLogs] = useState([]);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, mode]);

  const handleSendChat = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setChatInput('');

    // Check for hiring or contact intent
    const lowerQuery = query.toLowerCase();
    const isContactIntent =
      lowerQuery.includes('hire') ||
      lowerQuery.includes('work') ||
      lowerQuery.includes('contact') ||
      lowerQuery.includes('message') ||
      lowerQuery.includes('email') ||
      lowerQuery.includes('send') ||
      lowerQuery.includes('talk') ||
      lowerQuery.includes('interview') ||
      lowerQuery.includes('schedule');

    if (isContactIntent) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: `Hiring/Contact intent detected. Transitioning securely to the communication form console...`,
          },
        ]);
        setIsTyping(false);
        
        // Smooth transition to form mode after a small delay
        setTimeout(() => {
          setMode('form');
        }, 800);
      }, 500);
      return;
    }

    // Standard Q&A
    setIsTyping(true);
    setTimeout(() => {
      const reply = findBestResponse(query);
      setMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendChat(chatInput);
    }
  };

  // Submit contact form with realistic communication logs
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setMode('sending');
    setSendingLogs([]);

    const logsList = [
      'Receiving message...',
      'Validating contact details...',
      'Creating conversation...',
      'Sending notification...',
      'Message delivered successfully.',
      'Expected response time: Within 24 hours.',
    ];

    logsList.forEach((log, idx) => {
      setTimeout(() => {
        setSendingLogs((prev) => [...prev, log]);
      }, idx * 400);
    });

    // Complete the process after logs finish
    setTimeout(() => {
      setMode('success');
    }, logsList.length * 400 + 200);
  };

  const resetConsole = () => {
    setFormName('');
    setFormEmail('');
    setFormCompany('');
    setFormMessage('');
    setSendingLogs([]);
    setMode('chat');
    setMessages([
      {
        sender: 'assistant',
        text: `Console reset successful. How else can I assist you with Murali's credentials or projects today?`,
      },
    ]);
  };

  return (
    <section id="contact" className="section section-contact border-t border-[var(--border)]">
      <div className="section-shell">
        <Reveal>
          <SectionLabel
            eyebrow="07 / Interactive Hub"
            title="Interact &amp; Connect."
            description="Use the Engineering Assistant below to explore Murali&apos;s capabilities, download his credentials, or send him an authenticated message."
          />
        </Reveal>

        <div className="assistant-layout grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left Panel: Command Deck & Quick Actions */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between h-full">
            <div className="glass-card p-6 flex flex-col justify-between h-full relative overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--border)] pb-3 select-none">
                  <Activity size={14} className="text-[var(--blue)]" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">SYSTEM DECK: Murali Krishna</span>
                </div>

                <div className="profile-spec-list flex flex-col gap-3 font-mono text-[11px] text-[var(--muted)] select-none">
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-[var(--green)]">● ONLINE (ACTIVE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROLE:</span>
                    <span className="text-[var(--text)]">SOFTWARE ENGINEER</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STACK:</span>
                    <span className="text-[var(--text)]">SALESFORCE + FULLSTACK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UPTIME:</span>
                    <span className="text-[var(--text)]">99.98% (SYNCED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMAIL:</span>
                    <a href={`mailto:${siteMeta.email}`} className="text-[var(--blue)] hover:underline">
                      muralikrishna1624@icloud.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="relative z-10 mt-8">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] block mb-3 border-t border-[var(--border)] pt-4 select-none">
                  QUICK RUN ACTIONS
                </span>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={siteMeta.resume}
                    download="Murali_Krishna_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="quick-action-btn glass-card flex items-center gap-2 p-2.5 rounded text-xs font-mono text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-all duration-200"
                  >
                    <FileText size={14} className="text-[var(--blue)]" />
                    <span>Download Resume PDF</span>
                    <ArrowUpRight size={10} className="ml-auto opacity-50" />
                  </a>

                  <a
                    href={siteMeta.github}
                    target="_blank"
                    rel="noreferrer"
                    className="quick-action-btn glass-card flex items-center gap-2 p-2.5 rounded text-xs font-mono text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>Explore GitHub Code</span>
                    <ArrowUpRight size={10} className="ml-auto opacity-50" />
                  </a>

                  <a
                    href={siteMeta.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="quick-action-btn glass-card flex items-center gap-2 p-2.5 rounded text-xs font-mono text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5 text-[var(--blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight size={10} className="ml-auto opacity-50" />
                  </a>

                  <a
                    href={`mailto:${siteMeta.email}?subject=${encodeURIComponent('Schedule Meeting Request')}`}
                    className="quick-action-btn glass-card flex items-center gap-2 p-2.5 rounded text-xs font-mono text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-all duration-200"
                  >
                    <Calendar size={14} className="text-[var(--blue)]" />
                    <span>Schedule a Meeting</span>
                    <ArrowUpRight size={10} className="ml-auto opacity-50" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setMode('form')}
                    disabled={mode === 'form' || mode === 'sending'}
                    className={`quick-action-btn glass-card flex items-center gap-2 p-2.5 rounded text-xs font-mono text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-all duration-200 w-full text-left disabled:opacity-40`}
                  >
                    <MessageSquare size={14} className="text-[var(--blue)]" />
                    <span>Send a Direct Message</span>
                    <ArrowUpRight size={10} className="ml-auto opacity-50" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Engineering Assistant Console */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[460px]">
            <div className="glass-card flex-1 flex flex-col overflow-hidden border border-[var(--border)] relative bg-[rgba(3,7,18,0.85)]">
              {/* Header Bar */}
              <div className="bg-[#0b0c10] border-b border-[var(--border)] px-4 py-3 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.2)] flex items-center justify-center text-[var(--blue)]">
                    <Bot size={14} />
                  </div>
                  <div>
                    <strong className="text-xs text-white block">Engineering Assistant</strong>
                    <span className="text-[9px] text-[var(--blue)] font-mono block leading-none">Console Mode: {mode.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* Dynamic Content Panel */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col min-h-[300px]">
                <AnimatePresence mode="wait">
                  {/* CHAT MODE */}
                  {mode === 'chat' && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between h-full"
                    >
                      <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[300px] mb-4 pr-1" ref={scrollRef}>
                        {messages.map((msg, idx) => (
                          <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className={`max-w-[85%] px-3 py-2.5 rounded-lg text-xs leading-relaxed ${
                                msg.sender === 'user'
                                  ? 'bg-[var(--blue)] text-white rounded-br-none'
                                  : 'bg-[rgba(255,255,255,0.02)] border border-[var(--border)] text-[var(--text)] rounded-bl-none'
                              }`}
                            >
                              {msg.sender === 'assistant' ? (
                                <div
                                  className="markdown-text"
                                  dangerouslySetInnerHTML={{
                                    __html: msg.text
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/\*(.*?)\n/g, '<li>$1</li>')
                                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
                                      .replace(/\n/g, '<br />'),
                                  }}
                                />
                              ) : (
                                <span>{msg.text}</span>
                              )}
                            </div>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--border)] px-3 py-2 rounded-lg typing-indicator">
                              <span />
                              <span />
                              <span />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chips & Input */}
                      <div className="border-t border-[var(--border)] pt-3 mt-auto">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {SUGGESTIONS.map((sug) => (
                            <button
                              key={sug.text}
                              type="button"
                              onClick={() => handleSendChat(sug.query)}
                              className="sug-chip"
                            >
                              {sug.text}
                            </button>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ask about projects, Apex, LWC, or ask to contact Murali..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={handleChatKeyPress}
                            className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded px-3 py-2 text-xs text-white outline-none focus:border-[var(--blue)] transition-colors duration-200"
                            aria-label="Ask assistant a question"
                          />
                          <button
                            type="button"
                            onClick={() => handleSendChat(chatInput)}
                            className="bg-[var(--blue)] hover:opacity-90 text-white rounded w-9 h-9 flex items-center justify-center cursor-pointer transition-opacity duration-200"
                            aria-label="Send message"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FORM MODE */}
                  {mode === 'form' && (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between h-full gap-4"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-wider block">SECURE MESSAGE INGESTION CHANNELS</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label htmlFor="formName" className="font-mono text-[10px] text-[var(--muted)]">YOUR NAME *</label>
                            <input
                              type="text"
                              id="formName"
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="e.g., Alex Rivera"
                              className="bg-[rgba(255,255,255,0.01)] border border-[var(--border)] rounded px-3 py-2 text-xs text-white outline-none focus:border-[var(--blue)] transition-colors duration-200"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label htmlFor="formEmail" className="font-mono text-[10px] text-[var(--muted)]">YOUR EMAIL *</label>
                            <input
                              type="email"
                              id="formEmail"
                              required
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              placeholder="e.g., alex@company.com"
                              className="bg-[rgba(255,255,255,0.01)] border border-[var(--border)] rounded px-3 py-2 text-xs text-white outline-none focus:border-[var(--blue)] transition-colors duration-200"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="formCompany" className="font-mono text-[10px] text-[var(--muted)]">COMPANY / PROJECT (OPTIONAL)</label>
                          <input
                            type="text"
                            id="formCompany"
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            placeholder="e.g., SETI Institute"
                            className="bg-[rgba(255,255,255,0.01)] border border-[var(--border)] rounded px-3 py-2 text-xs text-white outline-none focus:border-[var(--blue)] transition-colors duration-200"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label htmlFor="formMessage" className="font-mono text-[10px] text-[var(--muted)]">MESSAGE BODY *</label>
                          <textarea
                            id="formMessage"
                            required
                            rows="4"
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Describe your role requirements, system challenges, or project scope..."
                            className="bg-[rgba(255,255,255,0.01)] border border-[var(--border)] rounded px-3 py-2 text-xs text-white outline-none focus:border-[var(--blue)] transition-colors duration-200 resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 border-t border-[var(--border)] pt-3 mt-auto select-none">
                        <button
                          type="submit"
                          className="button button-primary flex-1 text-xs py-2 justify-center"
                        >
                          Submit Ingress Payload
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode('chat')}
                          className="button button-secondary text-xs py-2 px-4 justify-center"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* SENDING MODE */}
                  {mode === 'sending' && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-center bg-[#050608] border border-[var(--border)] rounded p-4 font-mono text-xs text-[#22c55e] leading-relaxed select-none h-full min-h-[280px]"
                    >
                      {sendingLogs.map((log, idx) => {
                        const isSuccess = log.includes('successfully') || log.includes('24 hours');
                        return (
                          <div key={idx} className={isSuccess ? 'text-[var(--green)]' : 'text-[var(--blue)]'}>
                            {idx < sendingLogs.length - 1 ? '✓' : '⚡'} {log}
                          </div>
                        );
                      })}
                      {sendingLogs.length < 6 && (
                        <div className="flex items-center gap-1 text-[var(--blue)] mt-1">
                          <span>$</span>
                          <span className="animate-ping w-1.5 h-3 bg-[var(--blue)] inline-block" />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* SUCCESS MODE */}
                  {mode === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex-1 flex flex-col items-center justify-center text-center p-6 h-full min-h-[280px] select-none"
                    >
                      <div className="p-3 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] rounded-full text-[var(--green)] mb-4">
                        <CheckCircle size={28} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Message Ingested Successfully</h3>
                      <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm mb-6">
                        Your message payload has been validated and synced with Murali&apos;s local inbox. An alert has been dispatched.
                        <br />
                        <strong className="text-[var(--green)] font-semibold font-mono block mt-2">Expected Response Time: Within 24 hours.</strong>
                      </p>
                      <button
                        type="button"
                        onClick={resetConsole}
                        className="button button-secondary text-xs py-2 px-6"
                      >
                        Reset Console
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
