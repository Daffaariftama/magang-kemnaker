import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OnboardingTooltipProps {
  onClose: () => void;
  className?: string;
  targetRef?: React.RefObject<HTMLElement>;
}

const OnboardingTooltip = ({ onClose, className = '' }: OnboardingTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth entrance after page load
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`absolute z-50 flex flex-col items-center ${className}`}
        >
          {/* Tooltip Arrow */}
          <div className="w-4 h-4 bg-purple-600 rotate-45 mb-[-8px] z-10 rounded-sm"></div>

          {/* Tooltip Content */}
          <div className="bg-purple-600 text-white rounded-xl shadow-xl p-4 w-64 text-center relative z-20">
            <div className="absolute top-2 right-2 cursor-pointer opacity-70 hover:opacity-100" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="mb-3 mt-1">
              <span className="text-2xl">✨</span>
            </div>

            <h4 className="font-bold text-lg mb-1">Simpan & Bagikan</h4>
            <p className="text-sm text-purple-100 mb-4 leading-relaxed">
              Tekan tombol ini untuk menyimpan atau membagikan lowongan ke teman.
            </p>

            <button
              onClick={onClose}
              className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-lg text-sm font-bold transition-colors w-full shadow-sm"
            >
              Mengerti
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTooltip;
