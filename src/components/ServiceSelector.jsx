import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { services, siteMeta } from '../data/content';

export default function ServiceSelector() {
  const [selected, setSelected] = useState([]);

  function toggle(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const selectedLabels = services
    .filter((s) => selected.includes(s.id))
    .map((s) => s.label);

  const mailtoHref = `mailto:${siteMeta.email}?subject=${encodeURIComponent(
    'Project inquiry'
  )}&body=${encodeURIComponent(
    `Hi Murali,\n\nI'd like to talk about: ${selectedLabels.join(', ')}.\n\n`
  )}`;

  return (
    <div className="max-w-2xl" data-cursor-expand>
      <h2 className="text-2xl font-medium tracking-tight mb-2">
        What can I help with?
      </h2>
      <p className="text-muted opacity-85 mb-7 text-sm">
        Select what you're looking for — I'll draft an email to get us started.
      </p>

      <div className="flex flex-wrap gap-3">
        {services.map((service) => {
          const active = selected.includes(service.id);
          return (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => toggle(service.id)}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                active
                  ? 'bg-accent text-bg shadow-md'
                  : 'bg-surface text-text border border-border hover:border-accent/50'
              }`}
            >
              {active && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center"
                >
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}
              {service.label}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="italic text-xs text-muted mt-5"
          >
            Tap a card above to see what that work usually involves.
          </motion.p>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="mt-5 overflow-hidden"
          >
            <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-sm text-text">
                Ready to inquire about:{' '}
                <strong className="font-semibold">{selectedLabels.join(', ')}</strong>
              </span>
              <a
                href={mailtoHref}
                className="flex items-center gap-1.5 text-accent uppercase text-xs font-mono tracking-[0.08em] shrink-0"
              >
                Let's Go <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
