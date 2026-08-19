/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfessorHighlight from './components/ProfessorHighlight';
import Manifesto from './components/Manifesto';
import Benefits from './components/Benefits';
import TargetAudience from './components/TargetAudience';
import GymDifferentiators from './components/GymDifferentiators';
import Methodology from './components/Methodology';
import FirstClassTutorial from './components/FirstClassTutorial';
import WomensTraining from './components/WomensTraining';
import HorizontalGallery from './components/HorizontalGallery';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Code-split below-the-fold dynamic features to minimize main bundle JS and optimize LCP
const AdminCarousel = lazy(() => import('./components/AdminCarousel'));
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

  // Zero-Reflow GPU-composited cursor tracking using transform and rAF
  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId: number | null = null;
    let targetX = -100;
    let targetY = -100;

    const updateCursorPosition = () => {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updateCursorPosition);
      }
    };

    const handleMouseDown = () => {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.classList.add('scale-90', 'bg-brand-primary/20');
      }
    };

    const handleMouseUp = () => {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.classList.remove('scale-90', 'bg-brand-primary/20');
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        if (cursorOuterRef.current) {
          cursorOuterRef.current.classList.add('w-12', 'h-12', 'bg-brand-primary/10', 'scale-110');
          cursorOuterRef.current.classList.remove('w-6', 'h-6');
        }
      } else {
        if (cursorOuterRef.current) {
          cursorOuterRef.current.classList.remove('w-12', 'h-12', 'bg-brand-primary/10', 'scale-110');
          cursorOuterRef.current.classList.add('w-6', 'h-6');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-text-offwhite overflow-x-hidden selection:bg-brand-primary selection:text-black">
      
      {/* Sutil e Fluido Cursor Premium via GPU Compositing (Zero Forced Reflow) */}
      <div
        ref={cursorOuterRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-brand-primary/40 w-6 h-6 bg-transparent transition-all duration-100 ease-out will-change-transform"
      />
      <div
        ref={cursorInnerRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 rounded-full w-1.5 h-1.5 bg-brand-primary will-change-transform"
      />

      {/* Primary Header Glass Navbar */}
      <Navbar />

      {/* Landing Page Content Stack */}
      <main id="main-content">
        
        {/* 1. Hero Principal */}
        <Hero />

        {/* 2. Bloco Especial de Autoridade do Professor */}
        <ProfessorHighlight />

        {/* 3. Manifesto Emocional */}
        <Manifesto />

        {/* 4. Benefícios do Jiu-Jitsu */}
        <Benefits />

        {/* 5. Segmentação (Para quem é o CT) */}
        <TargetAudience />

        {/* 6. Diferenciais do CT */}
        <GymDifferentiators />

        {/* 7. O Método (3 pilares de ensino) */}
        <Methodology />

        {/* 8. Como Funciona a Primeira Aula (Trial) */}
        <FirstClassTutorial />

        {/* 8b. Treino Feminino Especial */}
        <WomensTraining />

        {/* 9. Galeria Editorial Horizontal Scroll */}
        <HorizontalGallery />

        {/* 9b. Carrossel de Fotos do Administrador (Carregamento Otimizado Sob Demanda) */}
        <Suspense fallback={null}>
          <AdminCarousel />
        </Suspense>

        {/* 10. Prova Social e Resultados */}
        <SocialProof />

        {/* 11. Accordions FAQ */}
        <FAQ />

        {/* 12. CTA Final Estetizado */}
        <CTASection />

      </main>

      {/* 13. Rodapé com SEO Local */}
      <Footer />

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
