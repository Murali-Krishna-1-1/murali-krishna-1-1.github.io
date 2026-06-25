import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LOG_LINES = [
  '⚡ [CLI] Initializing Salesforce DX workspace...',
  '🔑 [CLI] Authenticating securely with environment hub (dev-org-murali)...',
  '🛠️ [CLI] Compiling metadata: ApexClasses, Triggers, & LWC Bundles...',
  '📊 [CLI] Running 24 telemetry & integration unit test suites...',
  '✓ [CLI] All tests passed. Apex coverage: 92.4% | Warnings: 0',
  '🎉 [CLI] Sandbox deployment successful. Workspace ready.',
];

export default function LoadingScreen({ visible }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    
    // Clear logs initially
    setLogs([]);
    setProgress(0);

    // Print logs sequentially
    const logTimers = LOG_LINES.map((line, idx) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, line]);
      }, idx * 360);
    });

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 22); // 100 steps in ~2.2 seconds

    return () => {
      logTimers.forEach(clearTimeout);
      clearInterval(progressTimer);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="loader-screen flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          {/* Diagnostic Console Container */}
          <div className="w-full max-w-lg p-6 glass-card border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden font-mono text-xs select-none">
            {/* Console Header */}
            <div className="flex justify-between items-center border-b border-[var(--border)] pb-3 mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f7768e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e0af68]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#9ece6a]" />
              </div>
              <span className="text-[9px] text-[var(--muted)] font-mono uppercase tracking-wider">sfdx_deploy.log</span>
            </div>

            {/* Salesforce Cloud Graphic */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <svg className="w-12 h-12 text-[#38bdf8] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>

            {/* Logs Window */}
            <div className="bg-[#050608] border border-[var(--border)] rounded p-4 h-48 overflow-y-auto flex flex-col gap-1.5 text-[#22c55e]">
              {logs.map((log, idx) => {
                let colorClass = 'text-[#22c55e]';
                if (log.includes('passed') || log.includes('successful')) {
                  colorClass = 'text-[var(--green)]';
                } else if (log.startsWith('⚡') || log.startsWith('🔑') || log.startsWith('🛠️') || log.startsWith('📊')) {
                  colorClass = 'text-[var(--blue)]';
                }
                return (
                  <div key={idx} className={`${colorClass} font-mono leading-relaxed`}>
                    {log}
                  </div>
                );
              })}
              {logs.length < LOG_LINES.length && (
                <div className="flex items-center gap-1 text-[var(--blue)]">
                  <span>$</span>
                  <span className="animate-ping w-1.5 h-3 bg-[var(--blue)] inline-block" />
                </div>
              )}
            </div>

            {/* Custom Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between font-mono text-[9px] text-[var(--muted)] mb-1.5">
                <span>METADATA INGESTION PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--blue)] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

