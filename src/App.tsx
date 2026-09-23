/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Below-the-fold content is code-split to dramatically reduce unused initial JavaScript and unblock LCP
const DeferredSections = lazy(() => import('./components/DeferredSections'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const WhatsAppModal = lazy(() => import('./components/WhatsAppModal'));

export default function App() {
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [whatsappText, setWhatsappText] = useState<string | undefined>(undefined);
  
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenWhatsAppEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ text?: string }>;
      if (customEvent.detail && customEvent.detail.text) {
        setWhatsappText(customEvent.detail.text);
      } else {
        setWhatsappText(undefined);
      }
      setIsWhatsappOpen(true);
    };

    window.addEventListener('open-whatsapp-modal', handleOpenWhatsAppEvent);
    return () => {
      window.removeEventListener('open-whatsapp-modal', handleOpenWhatsAppEvent);
    };
  }, []);

  // Performance-optimized custom cursor with GPU transform compositing (zero reflow)
  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      outerX += (mouseX - outerX) * 0.2;
      outerY += (mouseY - outerY) * 0.2;
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    const onEnter = () => {
      cursorOuterRef.current?.classList.add('scale-150', 'border-brand-primary', 'bg-brand-primary/10');
    };
    const onLeave = () => {
      cursorOuterRef.current?.classList.remove('scale-150', 'border-brand-primary', 'bg-brand-primary/10');
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-text-offwhite overflow-x-clip selection:bg-brand-primary selection:text-black">
      
      {/* Sutil e Fluido Cursor Premium via GPU Compositing (Zero Forced Reflow) */}
      <div
        ref={cursorOuterRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-brand-primary/40 w-6 h-6 bg-transparent transition-all duration-100 ease-out will-change-transform"
      />
      <div
        ref={cursorInnerRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-brand-primary w-1.5 h-1.5 will-change-transform"
      />

      {/* Primary Header Glass Navbar (Critical Above-the-Fold) */}
      <Navbar />

      {/* Landing Page Content Stack */}
      <main id="main-content">
        {/* 1. Critical LCP Hero Principal */}
        <Hero />

        {/* Below-the-fold sections loaded non-render-blocking */}
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <DeferredSections />
        </Suspense>
      </main>

      {/* Floating Back to Top Button (Loaded on-demand) */}
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>

      {/* WhatsApp contact channel selector modal */}
      {isWhatsappOpen && (
        <Suspense fallback={null}>
          <WhatsAppModal
            isOpen={isWhatsappOpen}
            onClose={() => setIsWhatsappOpen(false)}
            defaultText={whatsappText}
          />
        </Suspense>
      )}
    </div>
  );
}
