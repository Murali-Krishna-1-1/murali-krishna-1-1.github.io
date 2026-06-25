import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Activity, ShieldAlert, Cpu, Network, Layout, GitBranch, CheckCircle } from 'lucide-react';

const metricsList = [
  {
    label: 'Years Experience',
    value: 3,
    suffix: '+',
    status: 'ACTIVE',
    icon: Cpu,
    color: 'var(--blue)',
    desc: 'Production platforms engineered',
    sparkline: [20, 45, 28, 80, 99, 100],
  },
  {
    label: 'Projects Delivered',
    value: 5,
    suffix: '',
    status: 'DEPLOYED',
    icon: CheckCircle,
    color: 'var(--green)',
    desc: 'Enterprise solutions live',
    sparkline: [10, 30, 45, 60, 80, 100],
  },
  {
    label: 'Salesforce Components',
    value: 120,
    suffix: '+',
    status: 'OPTIMIZED',
    icon: Layout,
    color: 'var(--amber)',
    desc: 'Custom LWCs & Declarative assets',
    sparkline: [15, 40, 65, 80, 110, 120],
  },
  {
    label: 'Apex Classes',
    value: 45,
    suffix: '+',
    status: '88%+ COV',
    icon: Activity,
    color: 'var(--violet)',
    desc: 'Triggers, batches & mock test suits',
    sparkline: [10, 20, 28, 35, 42, 45],
  },
  {
    label: 'Active Flows',
    value: 20,
    suffix: '+',
    status: 'HEALTHY',
    icon: ShieldAlert,
    color: 'var(--rose)',
    desc: 'Process automation pipelines',
    sparkline: [5, 10, 12, 15, 18, 20],
  },
  {
    label: 'Experience Cloud Sites',
    value: 3,
    suffix: '',
    status: 'ONLINE',
    icon: Network,
    color: 'var(--cyan)',
    desc: 'Secure digital workspaces live',
    sparkline: [1, 1, 2, 2, 3, 3],
  },
  {
    label: 'REST Integrations',
    value: 6,
    suffix: '+',
    status: 'SYNCED',
    icon: GitBranch,
    color: 'var(--emerald)',
    desc: 'Secure API webhook endpoints',
    sparkline: [2, 3, 4, 5, 6, 6],
  },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) {
      setCount(end);
      return;
    }
    const duration = 1500; // 1.5s duration
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 15));

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function DashboardMetrics() {
  return (
    <section id="metrics" className="section section-metrics border-y border-[var(--border)]">
      <div className="section-shell">
        <div className="metrics-header flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="terminal-dot green animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">SYSTEM STATUS: ALL CORE METRICS DEPLOYED</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded">ENV: PRODUCTION_MONITOR</span>
        </div>

        <div className="metrics-monitor-grid">
          {metricsList.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className="metric-monitor-card glass-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Header info */}
                <div className="card-top">
                  <div className="icon-wrapper" style={{ '--accent': metric.color }}>
                    <Icon size={16} />
                  </div>
                  <span className="card-status font-mono text-[9px]" style={{ color: metric.color }}>
                    ● {metric.status}
                  </span>
                </div>

                {/* Big number value */}
                <div className="card-value font-mono">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>

                {/* Info and labels */}
                <div className="card-details">
                  <h3>{metric.label}</h3>
                  <p>{metric.desc}</p>
                </div>

                {/* Mini Sparkline Visualization */}
                <div className="card-sparkline" aria-hidden="true">
                  <svg viewBox="0 0 100 25" width="100%" height="25">
                    <defs>
                      <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={metric.color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={metric.color} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M ${metric.sparkline.map((val, idx) => `${idx * 20} ${25 - (val / 100) * 20}`).join(' L ')}`}
                      fill="none"
                      stroke={metric.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={`M 0 25 L ${metric.sparkline.map((val, idx) => `${idx * 20} ${25 - (val / 100) * 20}`).join(' L ')} L 100 25 Z`}
                      fill={`url(#grad-${index})`}
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
