import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import LottieComponent from 'lottie-react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Cloud, Code2, Database, Sparkles } from 'lucide-react';
import { heroRoles, siteMeta } from '../data/content';
import { loaderAnimation } from '../data/loaderAnimation';
import profilePhoto from '../../assets/photo.jpg';

const Lottie = typeof LottieComponent === 'function' ? LottieComponent : (LottieComponent.default || LottieComponent);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [role, setRole] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => setRole((value) => (value + 1) % heroRoles.length), 3000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 30;
      const y = (clientY - window.innerHeight / 2) / 30;
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
          <span>Specializing in</span>
          <span className="role-window">
            <motion.strong
              key={heroRoles[role]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {heroRoles[role]}.
            </motion.strong>
          </span>
        </motion.div>

        <motion.p variants={itemVariants} className="hero-summary">
          Experienced Software Engineer delivering enterprise Salesforce integrations, custom web experiences, and robust automated data pipelines in NPSP.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowDown size={16} />
          </a>
          <a className="button button-secondary" href={siteMeta.resume} target="_blank" rel="noreferrer">
            View resume <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-proof">
          <div><CheckCircle2 size={16} /><span><strong>PD1 Certified</strong></span></div>
          <div><CheckCircle2 size={16} /><span><strong>3+ Years</strong> Production Experience</span></div>
          <div><CheckCircle2 size={16} /><span><strong>88%+</strong> Apex Test Coverage</span></div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="code-panel">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span>integration.apex</span>
          </div>
          <div className="code-lines" aria-hidden="true">
            <span><b>public class</b> DonorSync {'{'}</span>
            <span className="indent"><em>@future</em>(callout=true)</span>
            <span className="indent"><b>static void</b> connect() {'{'}</span>
            <span className="indent-two">CRM.unify(data);</span>
            <span className="indent">{'}'}</span>
            <span>{'}'}</span>
          </div>
          <div className="code-status"><i /> Production healthy</div>
        </div>

        {/* Parallax Floating Badges */}
        <motion.div
          className="floating-chip chip-cloud"
          style={{
            x: reducedMotion ? 0 : mousePos.x * 0.5,
            y: reducedMotion ? 0 : mousePos.y * 0.5,
          }}
        >
          <Cloud size={14} /> Salesforce CRM
        </motion.div>

        <motion.div
          className="floating-chip chip-code"
          style={{
            x: reducedMotion ? 0 : mousePos.x * -0.6,
            y: reducedMotion ? 0 : mousePos.y * -0.6,
          }}
        >
          <Code2 size={14} /> LWC + Apex
        </motion.div>

        <motion.div
          className="floating-chip chip-data"
          style={{
            x: reducedMotion ? 0 : mousePos.x * 0.4,
            y: reducedMotion ? 0 : mousePos.y * -0.4,
          }}
        >
          <Database size={14} /> REST Integrations
        </motion.div>

        {/* Premium Lottie Developer Workspace Illustration */}
        <div className="orbit-illustration" aria-hidden="true">
          <Lottie
            animationData={loaderAnimation}
            loop={!reducedMotion}
            style={{ width: '100%', height: '100%' }}
          />
          <Sparkles size={18} />
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>Scroll to explore</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
