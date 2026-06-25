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
  'Enterprise CRM Developer'
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
  const reducedMotion = useReducedMotion();

  // Custom high-fidelity typewriter loop
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
        setTypingSpeed(80); // Typing speed

        if (typedText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // 2s pause
          return;
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(40); // Deleting speed

        if (typedText === '') {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
          timer = setTimeout(() => {}, 400); // Small delay before typing next
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

  return (
    <section id="hero" className="hero-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-copy"
      >
        {/* Animated Production Status Badge */}
        <motion.div variants={itemVariants} className="status-badge mb-4">
          <span className="status-dot green animate-pulse" />
          <span>● Environment: Production Synced (v61.0)</span>
        </motion.div>

        <motion.div variants={itemVariants} className="availability">
          <i /> Available for select roles &amp; projects
        </motion.div>

        <motion.p variants={itemVariants} className="hero-kicker font-mono text-[11px] uppercase tracking-widest text-[var(--blue)]">
          Salesforce Platform &amp; Full Stack Architecture
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-2">
          I build systems
          <br />
          that make <span>complex work</span>
          <br />
          feel simple.
        </motion.h1>

        <motion.div variants={itemVariants} className="role-line font-mono text-sm my-4">
          <span>Specializing in </span>
          <span className="role-window font-bold text-[var(--blue)]">
            {typedText}
            <span className="animate-pulse font-bold">|</span>
          </span>
        </motion.div>

        <motion.p variants={itemVariants} className="hero-summary text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-lg">
          Experienced Software Engineer delivering enterprise Salesforce integrations, custom web experiences, and robust automated data pipelines in NPSP.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions flex gap-4 mt-6">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowDown size={14} />
          </a>
          <a className="button button-secondary" href={siteMeta.resume} target="_blank" rel="noreferrer">
            View resume <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-proof flex flex-wrap gap-4 mt-8 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <CheckCircle2 size={14} className="text-[var(--blue)]" />
            <span><strong>PD1 Certified</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <CheckCircle2 size={14} className="text-[var(--blue)]" />
            <span><strong>3+ Years</strong> Production Experience</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <CheckCircle2 size={14} className="text-[var(--blue)]" />
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
        <div className="profile-frame relative rounded-lg overflow-hidden">
          <img src={profilePhoto} alt="Murali Krishna" fetchPriority="high" className="w-full object-cover" />
          <div className="profile-overlay absolute inset-0" />
          <div className="profile-caption absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gradient-to-t from-black/80 to-transparent">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase">Currently</span>
              <strong className="text-xs text-white">Software Engineer</strong>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-gray-400 uppercase">Building for</span>
              <strong className="text-xs text-white">SETI Institute</strong>
            </div>
          </div>
        </div>

        <div className="code-panel glass-card font-mono text-[11px] p-4 rounded-lg mt-4">
          <div className="window-bar flex justify-between items-center border-b border-[var(--border)] pb-2 mb-3">
            <div className="flex gap-1">
              <i className="w-2 h-2 rounded-full bg-red-500" />
              <i className="w-2 h-2 rounded-full bg-yellow-500" />
              <i className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span className="text-[9px] text-[var(--muted)]">integration.apex</span>
          </div>
          <div className="code-lines flex flex-col gap-1 text-[var(--muted)] select-none" aria-hidden="true">
            <span><b className="text-[var(--blue)]">public class</b> DonorSync {'{'}</span>
            <span className="pl-4"><em className="text-[var(--violet)]">@future</em>(callout=true)</span>
            <span className="pl-4"><b className="text-[var(--blue)]">static void</b> connect() {'{'}</span>
            <span className="pl-8 text-white">CRM.unify(data);</span>
            <span className="pl-4">{'}'}</span>
            <span>{'}'}</span>
          </div>
          <div className="code-status border-t border-[var(--border)] pt-2 mt-3 flex items-center gap-1.5 text-[10px] text-[var(--green)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" /> Production healthy
          </div>
        </div>

        {/* Parallax Floating Badges */}
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

        {/* Premium Lottie Developer Workspace Illustration */}
        <div className="orbit-illustration" aria-hidden="true">
          <Lottie
            animationData={loaderAnimation}
            loop={!reducedMotion}
            style={{ width: '100%', height: '100%' }}
          />
          <Sparkles size={16} className="text-[#fbbf24] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>Scroll to explore</span>
        <ArrowDown size={12} />
      </a>
    </section>
  );
}
