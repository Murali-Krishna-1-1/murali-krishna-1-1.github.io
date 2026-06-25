import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import LottieComponent from 'lottie-react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Cloud, Code2, Database, Sparkles } from 'lucide-react';
import { siteMeta } from '../data/content';
import { loaderAnimation } from '../data/loaderAnimation';
import profilePhoto from '../../assets/photo.jpg';

const Lottie = typeof LottieComponent === 'function' ? LottieComponent : (LottieComponent.default || LottieComponent);

const ROLES = [
  'Software Engineer',
  'Salesforce Platform Specialist',
  'Apex & LWC Developer',
  'Cloud & Integration Engineer',
  'Enterprise CRM Developer',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [runStatus, setRunStatus] = useState('idle');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(ROLES[0]);
      return;
    }

    let timer;
    const fullText = ROLES[roleIdx];

    const handleType = () => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(80);

        if (typedText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(40);

        if (typedText === '') {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
          timer = setTimeout(() => {}, 400);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIdx, typingSpeed, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 45;
      const y = (clientY - window.innerHeight / 2) / 45;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  const handleRunApex = () => {
    if (runStatus !== 'idle') return;
    setRunStatus('compiling');
    setTimeout(() => {
      setRunStatus('running');
      setTimeout(() => {
        setRunStatus('success');
        setTimeout(() => setRunStatus('idle'), 3000);
      }, 900);
    }, 700);
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-copy"
      >
        <motion.div variants={itemVariants} className="status-badge">
          <span className="status-dot green" />
          <span>Environment: Production Synced (v61.0)</span>
        </motion.div>

        <motion.div variants={itemVariants} className="availability">
          <i /> Available for select roles &amp; projects
        </motion.div>

        <motion.p variants={itemVariants} className="hero-kicker">
          Salesforce Platform &amp; Full Stack Architecture
        </motion.p>

        <motion.h1 variants={itemVariants}>
          I build systems
          <br />
          that make <span>complex work</span>
          <br />
          feel simple.
        </motion.h1>

        <motion.div variants={itemVariants} className="role-line">
          <span>Specializing in </span>
          <span className="role-window">
            {typedText}
            <span className="role-cursor">|</span>
          </span>
        </motion.div>

        <motion.p variants={itemVariants} className="hero-summary">
          Experienced Software Engineer delivering enterprise Salesforce integrations, custom web experiences, and robust automated data pipelines in NPSP.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowDown size={14} />
          </a>
          <a className="button button-secondary" href={siteMeta.resume} target="_blank" rel="noreferrer">
            View resume <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-proof">
          <div>
            <CheckCircle2 size={14} />
            <span><strong>PD1 Certified</strong></span>
          </div>
          <div>
            <CheckCircle2 size={14} />
            <span><strong>3+ Years</strong> Production Experience</span>
          </div>
          <div>
            <CheckCircle2 size={14} />
            <span><strong>88%+</strong> Apex Test Coverage</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="hero-visual"
      >
        <div className="profile-frame">
          <img src={profilePhoto} alt="Murali Krishna" fetchPriority="high" />
          <div className="profile-overlay" />
          <div className="profile-caption">
            <div>
              <span>Currently</span>
              <strong>Software Engineer</strong>
            </div>
            <div>
              <span>Building for</span>
              <strong>SETI Institute</strong>
            </div>
          </div>
        </div>

        <div className={`code-panel${runStatus !== 'idle' ? ' is-active' : ''}`}>
          <div className="window-bar">
            <div className="window-dots">
              <i /><i /><i />
            </div>
            <button
              type="button"
              className={`run-apex-btn run-apex-btn--${runStatus}`}
              onClick={handleRunApex}
              disabled={runStatus !== 'idle'}
            >
              {runStatus === 'idle' && '▶ Run Apex'}
              {runStatus === 'compiling' && '⚡ Compiling...'}
              {runStatus === 'running' && '⚙ Callout...'}
              {runStatus === 'success' && '✓ Synced (18ms)'}
            </button>
            <span>integration.apex</span>
          </div>
          <div className="code-lines" aria-hidden="true">
            <span className={runStatus === 'compiling' ? 'is-highlight' : ''}>
              <b>public class</b> DonorSync {'{'}
            </span>
            <span className={`indent${runStatus === 'compiling' ? ' is-highlight' : ''}`}>
              <em>@future</em>(callout=true)
            </span>
            <span className={`indent${runStatus === 'compiling' ? ' is-highlight' : ''}`}>
              <b>static void</b> connect() {'{'}
            </span>
            <span className={`indent-two${runStatus === 'running' ? ' is-active-line' : ''}`}>
              CRM.unify(data);
            </span>
            <span className="indent">{'}'}</span>
            <span>{'}'}</span>
          </div>
          <div className={`code-status code-status--${runStatus}`}>
            {runStatus === 'idle' && (
              <>
                <i /> Production healthy
              </>
            )}
            {runStatus === 'compiling' && (
              <>
                <i className="is-amber" /> Compiling metadata package...
              </>
            )}
            {runStatus === 'running' && (
              <>
                <i className="is-blue" /> Executing asynchronous callout...
              </>
            )}
            {runStatus === 'success' && (
              <>
                <i /> Transaction Unified (v61.0)
              </>
            )}
          </div>
        </div>

        <motion.div
          className="floating-chip chip-cloud"
          style={{
            x: reducedMotion ? 0 : mousePos.x * 0.4,
            y: reducedMotion ? 0 : mousePos.y * 0.4,
          }}
        >
          <Cloud size={12} /> Salesforce CRM
        </motion.div>

        <motion.div
          className="floating-chip chip-code"
          style={{
            x: reducedMotion ? 0 : mousePos.x * -0.5,
            y: reducedMotion ? 0 : mousePos.y * -0.5,
          }}
        >
          <Code2 size={12} /> LWC + Apex
        </motion.div>

        <motion.div
          className="floating-chip chip-data"
          style={{
            x: reducedMotion ? 0 : mousePos.x * 0.3,
            y: reducedMotion ? 0 : mousePos.y * -0.3,
          }}
        >
          <Database size={12} /> REST Integrations
        </motion.div>

        <div className="orbit-illustration" aria-hidden="true">
          <Lottie
            animationData={loaderAnimation}
            loop={!reducedMotion}
            style={{ width: '100%', height: '100%' }}
          />
          <Sparkles size={16} />
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>Scroll to explore</span>
        <ArrowDown size={12} />
      </a>
    </section>
  );
}
