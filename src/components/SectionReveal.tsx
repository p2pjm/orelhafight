/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reusable SectionReveal component providing smooth fade-in and vertical slide-up (35px)
 * entrance animation powered by Framer Motion as the user scrolls down the page.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className = '',
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
