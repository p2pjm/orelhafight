/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
    // Initial check on mount
    const current = window.scrollY || document.documentElement.scrollTop || 0;
    if (current > 80) {
      setIsVisible(true);
    }
  }, []);

  // Monitor scroll progression across both mobile touch drag and desktop
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // Show as soon as user begins scrolling (progress > 1.5% or > 80px)
    if (progress > 0.015 || scrollY.get() > 80) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  // Fallback direct scroll listener for mobile browsers where motion values might defer
  useEffect(() => {
    const handleRawScroll = () => {
      const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (top > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleRawScroll, { passive: true });
    window.addEventListener('touchmove', handleRawScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleRawScroll);
      window.removeEventListener('touchmove', handleRawScroll);
    };
  }, []);

  // Native smooth scroll to top with full cross-browser fallbacks
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 sm:right-8 z-[90] will-change-transform"
          style={{
            bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileTap={{ scale: 0.92 }}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
            className="relative group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-neutral-950/95 backdrop-blur-md border border-brand-primary/40 text-brand-primary hover:text-black hover:bg-brand-primary hover:border-brand-primary shadow-2xl shadow-black/90 hover:shadow-[0_0_20px_rgba(115,227,77,0.45)] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary select-none touch-manipulation"
          >
            {/* SVG Circular Progress Ring driven by Framer Motion scrollYProgress */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              {/* Background Track Ring */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-white/10"
              />
              {/* Dynamic Progress Indicator Ring */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-brand-primary group-hover:text-black transition-colors duration-200"
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            </svg>

            {/* Center Arrow Icon */}
            <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
