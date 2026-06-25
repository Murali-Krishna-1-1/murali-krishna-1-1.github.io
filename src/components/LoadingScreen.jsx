import { AnimatePresence, motion } from 'motion/react';
import Lottie from 'lottie-react';
import { loaderAnimation } from '../data/loaderAnimation';

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-4%' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="loader-screen"
        >
          <div className="loader-mark">
            <Lottie animationData={loaderAnimation} loop aria-hidden="true" />
            <span>MK</span>
          </div>
          <div className="loader-copy">
            <span>Preparing the experience</span>
            <div className="loader-track"><i /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
