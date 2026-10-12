/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../constants/images';
import TransparentLogo from './TransparentLogo';

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'O Professor', href: '#professor' },
  { name: 'Para Quem', href: '#para-quem' },
  { name: 'Diferenciais', href: '#diferenciais' },
  { name: 'Primeira Aula', href: '#primeira-aula' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de saber mais informações sobre as aulas de Jiu-Jitsu no CT Orelha Fight.' },
      })
    );
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    
    if (targetId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Immediate attempt for desktop
    scrollToTarget();

    // Staggered attempts to ensure scrolling is never interrupted by the mobile menu collapsing
    requestAnimationFrame(() => {
      setTimeout(scrollToTarget, 80);
      setTimeout(scrollToTarget, 280);
    });
  };

  return (
    <nav
      id="navbar-root"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-brand-primary/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center space-x-3 cursor-pointer group"
            id="navbar-brand-logo"
          >
            <div className="flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <TransparentLogo
                src={IMAGES.ctOrelhaFightLogoSm}
                alt="Logo CT Orelha Fight"
                className="h-14 w-14 object-contain filter drop-shadow-[0_0_8px_rgba(115,227,77,0.15)]"
              />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white block leading-none">
                CT ORELHA FIGHT
              </span>
              <span className="text-[10px] font-mono tracking-widest text-brand-primary font-bold uppercase block mt-1">
                Nova Iguaçu - RJ
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-gray hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                id={`nav-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Nav CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={handleWhatsApp}
              className="px-5 py-2.5 bg-brand-primary text-black font-semibold rounded-lg hover:bg-brand-highlight transition-all hover:scale-[1.02] flex items-center gap-2 text-sm cursor-pointer"
              id="navbar-cta"
            >
              <MessageSquare className="h-4 w-4 fill-black text-black" />
              Aula Experimental
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-offwhite hover:text-brand-primary p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-brand-primary/10"
            id="mobile-nav-panel"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-text-gray hover:text-brand-primary px-3 py-3 rounded-lg text-base font-medium transition-colors border-b border-white/5 cursor-pointer"
                  id={`mobile-nav-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleWhatsApp();
                  }}
                  className="w-full py-3.5 bg-brand-primary text-black font-semibold rounded-lg hover:bg-brand-highlight transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  id="mobile-navbar-cta"
                >
                  <MessageSquare className="h-5 w-5 fill-black text-black" />
                  Garantir Aula Grátis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
