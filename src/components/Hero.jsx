import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Lottie from 'lottie-react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Cloud, Code2, Database, Sparkles } from 'lucide-react';
import { heroRoles, siteMeta } from '../data/content';
import { loaderAnimation } from '../data/loaderAnimation';
import profilePhoto from '../../assets/photo.jpg';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const [role, setRole] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => setRole((value) => (value + 1) % heroRoles.length), 2800);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-copy">
        <motion.div custom={0.1} variants={reveal} initial="hidden" animate="visible" className="availability">
          <span><i /> Available for select opportunities</span>
          <span>Chennai, India</span>
        </motion.div>

        <motion.p custom={0.18} variants={reveal} initial="hidden" animate="visible" className="hero-kicker">
          Salesforce Developer + Full Stack Engineer
        </motion.p>

        <motion.h1 custom={0.26} variants={reveal} initial="hidden" animate="visible">
          I build systems
          <br />
          that make <span>complex work</span>
          <br />
          feel simple.
        </motion.h1>

        <motion.div custom={0.36} variants={reveal} initial="hidden" animate="visible" className="role-line">
          <span>Focused on</span>
          <span className="role-window">
            <motion.strong
              key={heroRoles[role]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {heroRoles[role]}.
            </motion.strong>
          </span>
        </motion.div>

        <motion.p custom={0.44} variants={reveal} initial="hidden" animate="visible" className="hero-summary">
          I design and ship production Salesforce products across IoT, nonprofit operations,
          secure portals, and external integrations.
        </motion.p>

        <motion.div custom={0.52} variants={reveal} initial="hidden" animate="visible" className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowDown size={16} />
          </a>
          <a className="button button-secondary" href={siteMeta.resume} target="_blank" rel="noreferrer">
            View resume <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.div custom={0.62} variants={reveal} initial="hidden" animate="visible" className="hero-proof">
          <div><CheckCircle2 size={16} /><span><strong>PD1 certified</strong>Salesforce developer</span></div>
          <div><CheckCircle2 size={16} /><span><strong>3+ years</strong>Production experience</span></div>
          <div><CheckCircle2 size={16} /><span><strong>85%+</strong>Apex test coverage</span></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, x: 28 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
          <div className="window-bar"><i /><i /><i /><span>integration.apex</span></div>
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

        <div className="orbit-illustration" aria-hidden="true">
          <Lottie animationData={loaderAnimation} loop={!reducedMotion} />
          <Sparkles size={18} />
        </div>

        <motion.div className="floating-chip chip-cloud" animate={reducedMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <Cloud size={16} /> Salesforce
        </motion.div>
        <motion.div className="floating-chip chip-code" animate={reducedMotion ? {} : { y: [0, 8, 0] }} transition={{ duration: 4.8, repeat: Infinity }}>
          <Code2 size={16} /> LWC + Apex
        </motion.div>
        <motion.div className="floating-chip chip-data" animate={reducedMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 5.2, repeat: Infinity }}>
          <Database size={16} /> Integrations
        </motion.div>
      </motion.div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span>Scroll to explore</span><ArrowDown size={15} />
      </a>
    </section>
  );
}
