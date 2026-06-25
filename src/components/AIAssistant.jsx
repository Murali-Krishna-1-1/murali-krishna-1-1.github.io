import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { siteMeta } from '../data/content';

// High-fidelity local knowledge database and keyword matching
const RESPONSES = {
  default: `I'm Murali's AI Assistant. I can tell you about his:
* **Salesforce & Apex Experience** (3+ years, trigger frameworks, batch jobs)
* **Experience Cloud & LWC work** (Logistics Command Center, Board Portals)
* **Integrations & REST APIs** (Event-driven donation pipelines, IoT ingestion)
* **Certifications** (Platform Developer I, GUVI Python)
* **Contact & Resume** (Direct email and LinkedIn links)

Try clicking one of the quick questions below or type your own!`,
  
  projects: `Murali has built several high-impact enterprise projects:
1. **IoT Logistics Platform (Live Asset Tracking)**: Ingests GPS streams via Apex REST and Platform Events, rendering real-time maps in an LWC Leaflet canvas.
2. **Unified Donor Pipeline (NPSP)**: Consolidates transactions from PayPal, iDonate, and Eventbrite using fuzzy matching duplicate rules.
3. **Benevity Bulk Import Studio**: Processes 10,000+ CSV rows asynchronously on client-side Web Workers, upserting in batch chunks.
4. **Board Member Executive Portal**: Secured with Shield Platform Encryption, strict Content Security Policies, and customized sharing rules.
5. **Donor Match Review Center**: An interactive duplicate contact merging console managing 100,000+ records in SOQL.

Which project would you like to hear more about?`,

  experience: `Murali has **3+ years of production experience** across these key roles:
* **Software Engineer at Techtinium** (2025 - Present): Leading Salesforce development for the SETI Institute, building unified donation pipelines, secure board portals, and custom LWC imports.
* **Salesforce Developer at Lean AgileNautics** (2023 - 2025): Developed customer-facing IoT tracking, integrated Leaflet.js maps in LWC, and maintained a robust **88%+ Apex unit test coverage**.
* **Salesforce Internships** (2022 - 2023): Learned CRM fundamentals, wrote clean triggers, custom metadata types, and relational data modeling.`,

  apex: `Murali has extensive experience writing enterprise-grade **Apex**:
* **Async Apex**: Deep expertise in Batch Apex (chunking 10k+ records), Queueable Apex (chained jobs for callouts), and Future methods.
* **Trigger Frameworks**: Designing bulk-safe, decoupled trigger handlers that respect governor limits.
* **REST/SOAP Integrations**: Custom Apex webhooks and integration controllers handling dynamic JSON schemas.
* **Test Coverage**: Consistently maintaining **88%+ Apex unit test coverage** with robust mock classes.`,

  lwc: `Murali's **Lightning Web Components (LWC)** skillset combines modern frontend architecture with Salesforce platform capabilities:
* **Advanced Integrations**: Loading and wrapping third-party libraries (like Leaflet.js maps) safely within Lightning Locker / Locker Service.
* **Performance**: Utilizing HTML5 Web Workers in LWC to parse heavy CSV datasets asynchronously without locking the browser UI.
* **State & Data**: Wire service, imperatively calling Apex, LDS, and event-driven communication (LWC Pub/Sub, LMS).`,

  experience_cloud: `Murali has designed and deployed highly secure, premium digital experiences:
* **Board Executive Portal**: Customized Experience Cloud theme using custom LWCs, secured with **Shield Platform Encryption** and strict Content Security Policies.
* **Logistics Command Center**: Interactive, customer-facing tracker utilizing custom maps and real-time shipment updates.
* **Security**: Enforcing tight document-level visibility using Apex controllers with strict "with sharing" rules.`,

  integrations: `Murali specializes in building resilient integrations between Salesforce and external services:
* **Event-Driven Architecture**: Designing high-frequency webhooks that ingest GPS streams and publish immediately to **Platform Events** to avoid Apex governor limits.
* **Payment Ingress**: Consolidating PayPal, iDonate, Eventbrite, and Every.org webhooks into Salesforce NPSP with automated fuzzy deduplication.
* **Protocols & Auth**: Restful APIs, SOAP APIs, OAuth 2.0 secure handshakes, and webhook listeners.`,

  certs: `Murali holds the following professional credentials:
* **Salesforce Platform Developer I (PD1)** - Certified (May 2024)
* **Salesforce Platform Developer II (PD2)** - In Progress
* **HackerRank JavaScript Intermediate** - Verified
* **GUVI Python Programming** - Verified
You can verify his PD1 credentials directly via the Trailhead verification link in the Credentials section of this portfolio!`,

  contact: `You can reach Murali Krishna directly through:
* **Email**: [muralikrishna1624@icloud.com](mailto:muralikrishna1624@icloud.com)
* **LinkedIn**: [linkedin.com/in/iam-murali](https://www.linkedin.com/in/iam-murali/)
* **GitHub**: [github.com/Murali-Krishna-1-1](https://github.com/Murali-Krishna-1-1)
* **Resume**: You can download his official [Resume PDF](${siteMeta.resume}) directly from the navigation bar.

He is currently based in **Chennai, India** and open to select roles and projects!`,
};

// Simple rule-based NLP parser
const findBestResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes('project') || q.includes('portfolio') || q.includes('build') || q.includes('work') || q.includes('logistics') || q.includes('donor') || q.includes('benevity') || q.includes('portal')) {
    return RESPONSES.projects;
  }
  if (q.includes('experience') || q.includes('work') || q.includes('career') || q.includes('job') || q.includes('history') || q.includes('techtinium') || q.includes('agilenautics')) {
    return RESPONSES.experience;
  }
  if (q.includes('apex') || q.includes('trigger') || q.includes('batch') || q.includes('async') || q.includes('governor') || q.includes('code') || q.includes('coverage')) {
    return RESPONSES.apex;
  }
  if (q.includes('lwc') || q.includes('lightning') || q.includes('component') || q.includes('javascript') || q.includes('react') || q.includes('frontend') || q.includes('leaflet')) {
    return RESPONSES.lwc;
  }
  if (q.includes('experience cloud') || q.includes('portal') || q.includes('board') || q.includes('shield') || q.includes('security') || q.includes('sharing')) {
    return RESPONSES.experience_cloud;
  }
  if (q.includes('integration') || q.includes('api') || q.includes('rest') || q.includes('webhook') || q.includes('event') || q.includes('platform event') || q.includes('json') || q.includes('payment')) {
    return RESPONSES.integrations;
  }
  if (q.includes('cert') || q.includes('credential') || q.includes('pd1') || q.includes('pd2') || q.includes('licence') || q.includes('python')) {
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

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hi there! I am Murali's engineering assistant. 

Ask me anything about his **Salesforce expertise**, **Apex code**, **LWC solutions**, **integrations**, or **work history**. I will answer using only verified facts from his engineering workspace!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const userQuery = textToSend.trim();
    if (!userQuery) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay for credibility
    setTimeout(() => {
      const responseText = findBestResponse(userQuery);
      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.button
        className="ai-bubble"
        onClick={() => setIsOpen(true)}
        aria-label="Open Ask Murali AI Assistant"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={20} />
        <span>Ask AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-drawer glass-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ai-header">
              <div className="ai-title">
                <div className="ai-avatar">
                  <Bot size={16} />
                </div>
                <div>
                  <strong>Ask Murali AI</strong>
                  <span className="text-[10px] text-[var(--blue)] font-mono block">● Online (Local Engine)</span>
                </div>
              </div>
              <button
                type="button"
                className="ai-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
              >
                <X size={16} />
              </button>
            </div>

            <div className="ai-messages" ref={scrollRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`ai-message-row is-${msg.sender}`}>
                  <div className="ai-bubble-content">
                    {msg.sender === 'ai' ? (
                      // Parse basic markdown links and bold texts
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
                <div className="ai-message-row is-ai">
                  <div className="ai-bubble-content typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            <div className="ai-suggestions">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug.text}
                  type="button"
                  onClick={() => handleSend(sug.query)}
                  className="sug-chip"
                >
                  {sug.text}
                </button>
              ))}
            </div>

            <div className="ai-input-bar">
              <input
                type="text"
                placeholder="Ask about Apex, LWC, Projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                aria-label="Ask assistant a question"
              />
              <button
                type="button"
                onClick={() => handleSend(input)}
                className="ai-send-btn"
                aria-label="Send query"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
