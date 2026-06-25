import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, ShieldCheck } from 'lucide-react';

const TAB_DATA = {
  deploy: {
    command: 'sf project deploy start --metadata ApexClass LightningComponentBundle',
    output: [
      '🕒 [17:40:56] Initializing Salesforce DX deploy context...',
      '📦 [17:40:56] Reading local project workspace: force-app/main/default',
      '🔍 [17:40:57] Analyzing metadata packages (24 source components detected)...',
      '🚀 [17:40:57] Transmitting metadata to sandbox instance: dev-org-murali...',
      '⚡ [17:40:58] Compiling LWC components (leafletMap, donorIngress)...',
      '🛠️ [17:40:58] Deploying Apex classes: GpsTelemetryTriggerHandler.cls...',
      '----------------------------------------------------------------------------------',
      '🐝 [17:40:59] Deployed Source Members:',
      'STATE     METADATA TYPE             API NAME                     FILE PATH',
      '========= ========================= ============================ ====================================================',
      'Created   ApexClass                 GpsTelemetryTriggerHandler   force-app/main/default/classes/GpsTelemetryTriggerHandler.cls',
      'Created   LightningComponentBundle  leafletMap                   force-app/main/default/lwc/leafletMap/leafletMap.js',
      'Created   LightningComponentBundle  donorIngress                 force-app/main/default/lwc/donorIngress/donorIngress.js',
      '----------------------------------------------------------------------------------',
      '🎉 [17:40:59] Metadata Deployment Succeeded. Org updated successfully.',
    ],
  },
  tests: {
    command: 'sf apex run test --class GpsTelemetryTriggerHandlerTest,DonorSyncTest --result-format human',
    output: [
      '🕒 [17:40:56] Initializing test runner context...',
      '🔌 [17:40:56] Connecting to target org: dev-org-murali...',
      '🚀 [17:40:57] Triggering Apex Unit Test Classes (2 classes, 24 methods)...',
      '----------------------------------------------------------------------------------',
      '✓ GpsTelemetryTriggerHandlerTest.testEventIngestionSuccess (240ms) - Passed',
      '✓ GpsTelemetryTriggerHandlerTest.testEventIngestionBulk (1120ms) - Passed',
      '✓ GpsTelemetryTriggerHandlerTest.testGovernorLimitMitigation (850ms) - Passed',
      '✓ DonorSyncTest.testPaypalIngressSuccess (340ms) - Passed',
      '✓ DonorSyncTest.testEventbriteIngressSuccess (290ms) - Passed',
      '✓ DonorSyncTest.testFuzzyMatchingDeduplication (740ms) - Passed',
      '✓ DonorSyncTest.testNpspHistoricalGiftsSync (950ms) - Passed',
      '----------------------------------------------------------------------------------',
      '📊 [17:40:59] Apex Unit Test Suite Executed.',
      'Outcome: Passed',
      'Tests Run: 24 | Passed: 24 | Failed: 0',
      'Overall Apex Class Code Coverage: 92.4% (Required: 75.0%)',
      '🎉 [17:40:59] Test Suite Passed. Zero regressions detected.',
    ],
  },
  logs: {
    command: 'sf apex debug log tail --size 50',
    output: [
      '🕒 [17:40:56] Streaming real-time Apex Debug Logs...',
      '----------------------------------------------------------------------------------',
      '58.0 APEX_CODE,DEBUG;APEX_PROFILING,INFO;DB,INFO',
      '17:40:56.002 (204124)|EXECUTION_STARTED',
      '17:40:56.004 (215234)|CODE_UNIT_STARTED|[EXTERNAL]|01q5g0000018fJt|GpsTelemetryTrigger on GPS_Ping__e trigger event AfterInsert',
      '17:40:56.012 (312015)|SYSTEM_METHOD_ENTRY|[32]|System.debug(String)',
      '17:40:56.012 (312140)|USER_DEBUG|[32]|DEBUG|GpsTelemetryTriggerHandler: Event Ingested. GPS Lat: 37.7749 Lng: -122.4194',
      '17:40:56.024 (415082)|SYSTEM_METHOD_EXIT|[32]|System.debug(String)',
      '17:40:56.025 (425890)|DML_BEGIN|[48]|Database.upsert(List<Shipment__c>, Shipment__c.Identifier__c, false)',
      '17:40:56.044 (642105)|DML_END|[48]',
      '17:40:56.046 (665214)|CUMULATIVE_LIMIT_USAGE',
      '17:40:56.046 (665214)|LIMIT_USAGE_FOR_NS|(default)|',
      '  Number of SOQL queries: 1 out of 100',
      '  Number of DML statements: 1 out of 150',
      '  Apex CPU time: 42ms out of 10000ms',
      '17:40:56.047 (685124)|CODE_UNIT_FINISHED|GpsTelemetryTrigger on GPS_Ping__e trigger event AfterInsert',
      '17:40:56.048 (689102)|EXECUTION_FINISHED',
      '----------------------------------------------------------------------------------',
      '🎉 [17:40:56] Log Stream Healthy. Governor limits: 0.42% consumed.',
    ],
  },
  git: {
    command: 'git status && git push origin main',
    output: [
      '🕒 [17:40:56] Querying Git tracking index...',
      'On branch main',
      'Your branch is up to date with \'origin/main\'.',
      '',
      'Changes to be committed:',
      '  (use "git restore --staged <file>..." to unstage)',
      '    modified:   force-app/main/default/classes/GpsTelemetryTriggerHandler.cls',
      '    modified:   force-app/main/default/lwc/leafletMap/leafletMap.js',
      '    modified:   force-app/main/default/lwc/leafletMap/leafletMap.html',
      '----------------------------------------------------------------------------------',
      '🚀 [17:40:57] Running pre-commit validation hooks...',
      '🔍 [17:40:57] Running PMD Apex Security Code Analyzer... Clean.',
      '🔍 [17:40:58] Running ESLint on LWC Javascript files... Clean.',
      '🔑 [17:40:58] Pushing commits to remote: github.com/Murali-Krishna-1-1/murali-krishna-1-1.github.io',
      'Enumerating objects: 7, done.',
      'Counting objects: 100% (7/7), done.',
      'Delta compression using up to 8 threads',
      'Compressing objects: 100% (4/4), done.',
      'Writing objects: 100% (4/4), 582 bytes, done.',
      'To github.com/Murali-Krishna-1-1/murali-krishna-1-1.github.io.git',
      '   da281cf..fe829c4  main -> main',
      '🎉 [17:40:59] Git push successful. Remote repository synced.',
    ],
  },
  build: {
    command: 'npm run build',
    output: [
      '🕒 [17:40:56] Initializing production bundler (Vite v8.0.2)...',
      '✨ [17:40:56] Compiling typescript index contexts...',
      '🔍 [17:40:57] Loading CSS plugins & post-processors...',
      '📦 [17:40:57] Bundling assets & optimizing code chunks...',
      '----------------------------------------------------------------------------------',
      'vite v8.0.2 building for production...',
      '✓ 482 modules transformed.',
      'dist/index.html                           4.39 kB │ gzip: 1.84 kB',
      'dist/assets/index-Bf9sk2c.css            41.27 kB │ gzip: 10.82 kB',
      'dist/assets/index-DtkcpPes.js           142.40 kB │ gzip: 42.12 kB',
      '----------------------------------------------------------------------------------',
      '✓ Built in 320ms.',
      '🎉 [17:40:58] Frontend compilation successful. Assets optimized.',
    ],
  },
};

export default function Terminal() {
  const [activeTab, setActiveTab] = useState('deploy');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const logTimerRef = useRef(null);

  // Load final outputs initially on mount or tab switch
  useEffect(() => {
    // Clear any active typing animation when tab changes
    if (logTimerRef.current) {
      clearInterval(logTimerRef.current);
    }
    setIsRunning(false);
    // Directly set complete logs on tab switch
    setConsoleLogs(TAB_DATA[activeTab].output);
  }, [activeTab]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);

    const fullLogs = TAB_DATA[activeTab].output;
    let idx = 0;

    logTimerRef.current = setInterval(() => {
      setConsoleLogs((prev) => [...prev, fullLogs[idx]]);
      idx += 1;
      if (idx >= fullLogs.length) {
        clearInterval(logTimerRef.current);
        setIsRunning(false);
      }
    }, 120); // Print a line every 120ms
  };

  const resetConsole = () => {
    if (logTimerRef.current) {
      clearInterval(logTimerRef.current);
    }
    setIsRunning(false);
    setConsoleLogs(TAB_DATA[activeTab].output);
  };

  return (
    <section id="terminal" className="section section-terminal">
      <div className="section-shell">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--blue)] flex items-center gap-1.5">
              <TerminalIcon size={14} /> Developer Diagnostic Console
            </span>
            <h2 className="text-xl font-bold text-[var(--text)] m-0">Validate System Diagnostics.</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[var(--muted)] border border-[var(--border)] px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck size={12} className="text-[var(--green)]" /> sandbox-sync: OK
            </span>
          </div>
        </div>

        {/* The Diagnostic Console UI */}
        <div className="glass-card overflow-hidden border border-[var(--border)] shadow-xl flex flex-col min-h-[420px]">
          {/* Top Bar with window controls & Tab Selector */}
          <div className="bg-[#0b0c10] border-b border-[var(--border)] px-4 py-2.5 flex justify-between items-center select-none">
            {/* Window control circles */}
            <div className="flex items-center gap-1.5 md:flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#f7768e]" />
              <span className="w-3 h-3 rounded-full bg-[#e0af68]" />
              <span className="w-3 h-3 rounded-full bg-[#9ece6a]" />
            </div>

            {/* Console Tabs */}
            <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto max-w-[80%] md:max-w-none px-2">
              {Object.keys(TAB_DATA).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded transition-colors duration-200 capitalize ${
                      isActive
                        ? 'bg-[var(--border)] text-[var(--text)] font-semibold border-b-2 border-b-[var(--blue)]'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Active Env label */}
            <span className="font-mono text-[9px] text-[var(--muted)] hidden md:inline">
              CLI_AGENT v1.0
            </span>
          </div>

          {/* Action Header / Command display */}
          <div className="bg-[#0f1118] border-b border-[var(--border)] px-4 py-3 flex justify-between items-center select-none font-mono text-xs text-[var(--muted)]">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-[var(--blue)] flex-shrink-0">$</span>
              <span className="text-[var(--text)] whitespace-nowrap overflow-x-auto max-w-[280px] md:max-w-none">{TAB_DATA[activeTab].command}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className="flex items-center gap-1 px-2.5 py-1 bg-[rgba(56,189,248,0.08)] hover:bg-[rgba(56,189,248,0.15)] border border-[rgba(56,189,248,0.2)] text-[var(--blue)] rounded text-[10px] font-semibold font-mono disabled:opacity-50"
              >
                <Play size={10} /> {isRunning ? 'Running...' : 'Execute'}
              </button>
              <button
                type="button"
                onClick={resetConsole}
                className="flex items-center gap-1 px-2.5 py-1 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] border border-[var(--border)] text-[var(--muted)] rounded text-[10px] font-semibold font-mono"
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>
          </div>

          {/* Console Output logs screen */}
          <div className="flex-1 bg-[#050608] p-4 font-mono text-[11px] leading-relaxed text-[#22c55e] overflow-y-auto select-text min-h-[300px] max-h-[400px]">
            {consoleLogs.map((log, index) => {
              let colorClass = 'text-[#22c55e]'; // Green default
              if (log.startsWith('✓') || log.includes('Success') || log.includes('Succeeded') || log.includes('Passed')) {
                colorClass = 'text-[var(--green)]';
              } else if (log.startsWith('🔴') || log.includes('Failed') || log.includes('EXPIRED')) {
                colorClass = 'text-[var(--rose)]';
              } else if (log.startsWith('🕒') || log.startsWith('📦') || log.startsWith('🔍') || log.startsWith('🚀') || log.startsWith('⚡') || log.startsWith('🛠️') || log.startsWith('🔌') || log.startsWith('📊')) {
                colorClass = 'text-[var(--blue)]';
              } else if (log.startsWith('STATE') || log.startsWith('=====') || log.startsWith('---')) {
                colorClass = 'text-gray-500';
              } else if (log.startsWith('Created') || log.startsWith('On branch') || log.includes('Your branch')) {
                colorClass = 'text-gray-400';
              } else if (log.includes('Number of') || log.includes('Apex CPU')) {
                colorClass = 'text-[var(--amber)]';
              }

              return (
                <div key={index} className={`${colorClass} whitespace-pre-wrap font-mono`}>
                  {log}
                </div>
              );
            })}

            {/* Blinking CLI cursor */}
            {!isRunning && (
              <div className="flex items-center gap-1 mt-1 text-[var(--blue)] select-none">
                <span>$</span>
                <span className="animate-pulse w-1.5 h-3 bg-[var(--blue)] inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
