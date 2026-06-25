import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import LoadingScreen from './components/LoadingScreen';
import AmbientBackground from './components/AmbientBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <Cursor />
      <ProgressBar />
      <AmbientBackground />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
