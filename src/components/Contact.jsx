import { useEffect, useState } from 'react';
import LottieComponent from 'lottie-react';
import { ArrowUpRight, Send } from 'lucide-react';
import Reveal from './Reveal';
import { loaderAnimation } from '../data/loaderAnimation';
import { siteMeta } from '../data/content';

const Lottie = typeof LottieComponent === 'function' ? LottieComponent : (LottieComponent.default || LottieComponent);

const links = [
  {
    label: 'Email',
    value: 'Start a conversation',
    href: `mailto:${siteMeta.email}`,
    lordicon: 'https://cdn.lordicon.com/nzxtymzq.json',
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: siteMeta.linkedin,
    lordicon: 'https://cdn.lordicon.com/ljvtreqy.json',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'Explore the code',
    href: siteMeta.github,
    lordicon: 'https://cdn.lordicon.com/sbiheqdr.json',
    external: true,
  },
  {
    label: 'Resume',
    value: 'Download the PDF',
    href: siteMeta.resume,
    lordicon: 'https://cdn.lordicon.com/qvzdgmqd.json',
    external: true,
  },
];

export default function Contact() {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Fetch a premium paper-plane messaging Lottie animation
    fetch('https://lottie.host/e2b60abf-7984-48ff-9844-ba3d85d7bb5b/HhP4qWj6hZ.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contact Lottie');
        return res.json();
      })
      .then((data) => setLottieData(data))
      .catch((err) => {
        console.warn('Failed to load contact Lottie, using local fallback:', err);
        setLottieData(loaderAnimation);
      });
  }, []);

  return (
    <section id="contact" className="section section-contact">
      <div className="section-shell">
        <div className="contact-panel glass-card">
          <Reveal className="contact-copy">
            <span className="section-eyebrow">07 / Contact</span>
            <h2>Have a difficult system to simplify?</h2>
            <p>
              I am open to Salesforce and full-stack engineering roles where thoughtful systems architecture, ownership, and user outcomes matter.
            </p>
            <a className="button button-primary" href={`mailto:${siteMeta.email}`}>
              Send me a message <Send size={16} />
            </a>
          </Reveal>

          <Reveal className="contact-links" delay={0.1}>
            {links.map(({ label, value, href, lordicon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
              >
                <span className="contact-icon">
                  <lord-icon
                    src={lordicon}
                    trigger="hover"
                    colors="primary:var(--blue),secondary:var(--violet)"
                    style={{ width: '20px', height: '20px' }}
                  />
                </span>
                <span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </Reveal>

          {/* Premium Lottie Messaging Illustration */}
          <div className="contact-orbit" aria-hidden="true">
            {lottieData && (
              <Lottie
                animationData={lottieData}
                loop
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
