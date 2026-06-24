/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
import AdminCarousel from './components/AdminCarousel';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [clickState, setClickState] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [whatsappText, setWhatsappText] = useState<string | undefined>(undefined);

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

  // Custom premium cursor trail tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClickState(true);
    const handleMouseUp = () => setClickState(false);

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
        setHoverState(true);
      } else {
        setHoverState(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-text-offwhite overflow-x-hidden selection:bg-brand-primary selection:text-black">
      
      {/* 
        Sutil e Opcional Cursor Fluido Premium 
        Translates smoothly relative to client pointer position, hides on mobile touch targets.
      */}
      <div
        className={`hidden lg:block fixed pointer-events-none z-50 rounded-full border border-brand-primary/40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out ${
          hoverState ? 'w-12 h-12 bg-brand-primary/10 scale-110' : 'w-6 h-6 bg-transparent'
        } ${clickState ? 'scale-90 bg-brand-primary/20' : ''}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
      <div
        className="hidden lg:block fixed pointer-events-none z-50 rounded-full w-1.5 h-1.5 bg-brand-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
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

        {/* 9b. Carrossel de Fotos do Administrador */}
        <AdminCarousel />

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
      <WhatsAppModal
        isOpen={isWhatsappOpen}
        onClose={() => setIsWhatsappOpen(false)}
        defaultText={whatsappText}
      />
    </div>
  );
}
