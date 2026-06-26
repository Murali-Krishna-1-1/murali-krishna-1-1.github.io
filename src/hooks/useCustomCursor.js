import { useEffect, useRef } from 'react';

const EXPAND_SELECTOR = 'a, button, [data-cursor-expand], .arch-layer-node, .stepper-node, .metric-monitor-card';
const MAGNETIC_SELECTOR = '.button, .nav-cta, .run-apex-btn, [data-magnetic]';

export function useCustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const container = cursorRef.current;
    if (!container) return;

    const labelEl = container.querySelector('.custom-cursor-label');

    // Track mouse position
    function handleMove(e) {
      container.style.left = e.clientX + 'px';
      container.style.top = e.clientY + 'px';
    }

    // Handle hover states (expanded sizes and labels)
    function handleOver(e) {
      const target = e.target;
      if (!target) return;

      // 1. Check for cursor expansion
      if (target.closest(EXPAND_SELECTOR)) {
        container.classList.add('expanded');
      }

      // 2. Check for cursor labels (e.g. data-cursor-label="View")
      const labelTarget = target.closest('[data-cursor-label]');
      if (labelTarget && labelEl) {
        const text = labelTarget.getAttribute('data-cursor-label');
        labelEl.textContent = text;
        container.classList.add('has-label');
      }

      // 3. Check for magnetic button attachment
      const magneticEl = target.closest(MAGNETIC_SELECTOR);
      if (magneticEl) {
        magneticEl.addEventListener('mousemove', handleMagneticMove);
        magneticEl.addEventListener('mouseleave', handleMagneticOut);
      }
    }

    function handleOut(e) {
      const target = e.target;
      if (!target) return;

      if (target.closest(EXPAND_SELECTOR)) {
        container.classList.remove('expanded');
      }

      const labelTarget = target.closest('[data-cursor-label]');
      if (labelTarget && labelEl) {
        labelEl.textContent = '';
        container.classList.remove('has-label');
      }
    }

    // Magnetic physics logic: pull button slightly toward cursor position
    function handleMagneticMove(e) {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      // Calculate delta from button center to mouse position
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      // Translate the button by 25% of the distance for a soft magnetic snap
      target.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      target.style.transition = 'none'; // Disable transition during tracking for responsiveness
    }

    function handleMagneticOut(e) {
      const target = e.currentTarget;
      target.style.transform = '';
      target.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'; // Smooth spring back
      target.removeEventListener('mousemove', handleMagneticMove);
      target.removeEventListener('mouseleave', handleMagneticOut);
    }

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return cursorRef;
}
