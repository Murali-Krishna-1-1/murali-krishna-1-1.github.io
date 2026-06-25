import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Database, Activity, X } from 'lucide-react';

export default function DiagnosticsOverlay({ isOpen, onClose }) {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    if (!isOpen) return;
    setLogs([]);
    
    const messages = [
      '⚡ [SYS] Initializing Antigravity diagnostic hook...',
      '🔌 [SYS] Resolving workspace: Murali-Krishna-1-1/murali-krishna-1-1.github.io',
      '🔍 [SYS] Audit: React version 19.0.0 resolved.',
      '🔍 [SYS] Audit: Vite compiler optimized bundler active.',
      '🟢 [SYS] Connect: Salesforce developer hub connection authenticated.',
      '📦 [SYS] Cache: Local telemetry events buffer parsed successfully.',
      '🚀 [SYS] Run: Executing background sanity check suite...',
      '✓ testIngestionThroughput (12ms) - OK',
      '✓ testLeafletLwcBoundaries (45ms) - OK',
      '✓ testShieldEncryptionHandshake (80ms) - OK',
      '✓ testFuzzyMatchContactDeduplication (120ms) - OK',
      '------------------------------------------------------------',
      '🖥️ [SYS] System Health Diagnostics:',
      'Host Node: c:\\VS Code\\murali-krishna-1-1.github.io',
      'CPU Allocations: threadpool_pool_4 active',
      'Sandbox Org Hook: dev-org-murali (v58.0)',
      'Git Head Commit: fe829c4 [origin/main]',
      'Local Status: Active & Production Ready',
      '------------------------------------------------------------',
      '🎉 [SYS] Diagnostics Complete. Workspace fully optimized.',
    ];

    let idx = 0;
    const timer = setInterval(() => {
      setLogs((prev) => [...prev, messages[idx]]);
      idx += 1;
      if (idx >= messages.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="diagnostics-overlay-wrapper" role="dialog" aria-modal="true">
      <motion.div
        className="diagnostics-console-box glass-card border border-[var(--border)] max-w-2xl w-full p-6 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card-hover-bg)] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
          aria-label="Close Diagnostics"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4 select-none">
          <div className="w-8 h-8 rounded-md border border-[#38bdf8]/30 bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text)] m-0">Developer Diagnostics Console</h3>
            <span className="font-mono text-[9px] text-[#38bdf8] uppercase tracking-wider block">Security Hook Activated</span>
          </div>
        </div>

        {/* Console Readout */}
        <div className="bg-[#050608] border border-[var(--border)] rounded-md p-4 font-mono text-xs text-[#22c55e] leading-relaxed overflow-y-auto max-h-[320px] min-h-[260px] select-text">
          {logs.map((log, index) => {
            let color = 'text-[#22c55e]';
            if (log.includes('[SYS]') || log.startsWith('✓')) {
              color = 'text-[var(--blue)]';
            } else if (log.includes('Diagnostics Complete') || log.includes('Succeeded')) {
              color = 'text-[var(--green)]';
            } else if (log.startsWith('STATE') || log.startsWith('---')) {
              color = 'text-gray-500';
            } else if (log.includes('Host Node') || log.includes('CPU') || log.includes('Sandbox') || log.includes('Git') || log.includes('Local')) {
              color = 'text-gray-400';
            }
            return (
              <div key={index} className={`${color} font-mono`}>
                {log}
              </div>
            );
          })}
          <div className="flex items-center gap-1 mt-1 text-[var(--blue)] select-none">
            <span>$</span>
            <span className="animate-pulse w-1.5 h-3 bg-[var(--blue)] inline-block" />
          </div>
        </div>

        {/* Footer specifications info */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-center border-t border-[var(--border)] pt-4 font-mono text-[10px] text-[var(--muted)] select-none">
          <div className="flex flex-col items-center p-2 border border-[var(--border)] rounded bg-[rgba(255,255,255,0.005)]">
            <Cpu size={12} className="mb-1 text-[var(--blue)]" />
            <span>React 19.0</span>
          </div>
          <div className="flex flex-col items-center p-2 border border-[var(--border)] rounded bg-[rgba(255,255,255,0.005)]">
            <Database size={12} className="mb-1 text-[var(--violet)]" />
            <span>Apex API v58.0</span>
          </div>
          <div className="flex flex-col items-center p-2 border border-[var(--border)] rounded bg-[rgba(255,255,255,0.005)]">
            <ShieldCheck size={12} className="mb-1 text-[var(--green)]" />
            <span>SSL Encrypted</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
