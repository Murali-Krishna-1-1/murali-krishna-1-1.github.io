import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import LoadingScreen from './components/LoadingScreen';
import AmbientBackground from './components/AmbientBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import DashboardMetrics from './components/DashboardMetrics';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import TechNetwork from './components/TechNetwork';
import Projects from './components/Projects';
import SolutionWalkthrough from './components/SolutionWalkthrough';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Terminal from './components/Terminal';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DiagnosticsOverlay from './components/DiagnosticsOverlay';
import { useTheme } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // Recruiter Mode State
  const [recruiterMode, setRecruiterMode] = useState(() => {
    const saved = localStorage.getItem('recruiterMode');
    return saved === 'true';
  });

  useSmoothScroll();

  // Handle Recruiter Mode effects
  useEffect(() => {
    localStorage.setItem('recruiterMode', recruiterMode);
    if (recruiterMode) {
      document.documentElement.classList.add('recruiter-mode');
    } else {
      document.documentElement.classList.remove('recruiter-mode');
    }
  }, [recruiterMode]);

  // Loading Screen Timer - set to exactly 2.5s for realistic log sequences
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  // Konami Code Easter Egg listener
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let index = 0;

    const handleKeyDown = (e) => {
      const key = e.key;
      const expectedKey = konamiCode[index];

      if (key && key.toLowerCase() === expectedKey.toLowerCase()) {
        index += 1;
        if (index === konamiCode.length) {
          setDiagnosticsOpen(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Logo Clicks Easter Egg tracker
  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setDiagnosticsOpen(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <>
      <LoadingScreen visible={loading} />
      <Cursor />
      <ProgressBar />
      <AmbientBackground />
      
      <Nav
        theme={theme}
        onToggleTheme={toggleTheme}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => setRecruiterMode((prev) => !prev)}
        onLogoClick={handleLogoClick}
      />
      
      <main>
        <Hero />
        <DashboardMetrics />
        <Marquee />
        <About />
        <Skills />
        <TechNetwork />
        <Projects />
        <SolutionWalkthrough />
        <Experience />
        <Certifications />
        <Terminal />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
      
      <DiagnosticsOverlay
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
      />
    </>
  );
}
