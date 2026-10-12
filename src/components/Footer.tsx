/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, Instagram, MapPin, Clock, ArrowUp, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../constants/images';
import TransparentLogo from './TransparentLogo';

export default function Footer() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de saber onde fica o CT Orelha Fight e saber os planos de assinatura.' },
      })
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-root" className="bg-bg-card text-text-gray pt-20 pb-8 border-t border-brand-primary/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16" id="footer-upper">
          
          {/* Column 1: Brand & Bio (4 lg-cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <TransparentLogo
                  src={IMAGES.ctOrelhaFightLogo}
                  alt="Logo CT Orelha Fight"
                  className="h-14 w-14 object-contain filter drop-shadow-[0_0_8px_rgba(115,227,77,0.15)]"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                  CT ORELHA FIGHT
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#73E34D] font-bold block mt-1 uppercase">
                  Escola de Luta
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              Centro de Treinamento de Elite dedicado ao ensino tradicional do Jiu-Jitsu, focado no desenvolvimento de disciplina, autodefesa e valores humanos em Nova Iguaçu - RJ.
            </p>

            {/* Quick social links */}
            <div className="flex items-center space-x-3" id="footer-socials">
              <a
                href="https://www.instagram.com/ctorelha/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-white hover:text-brand-primary hover:bg-brand-primary/10 transition-colors cursor-pointer border border-white/5"
                aria-label="Follow us on Instagram"
                id="footer-social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button
                onClick={handleWhatsApp}
                className="p-2.5 rounded-lg bg-white/5 text-white hover:text-brand-primary hover:bg-brand-primary/10 transition-colors cursor-pointer border border-white/5"
                aria-label="Contact us on WhatsApp"
                id="footer-social-whatsapp-btn"
              >
                <MessageSquare className="h-5 w-5 fill-none" />
              </button>
            </div>
          </div>

          {/* Column 2: Specific Location & Address Info (4 lg-cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest font-mono border-b border-white/5 pb-2">
              Nossa Localização
            </h4>
            
            <div className="space-y-4" id="footer-location-details">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <MapPin className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Nova Iguaçu - RJ</span>
                  <span className="block text-xs text-text-gray mt-1 leading-relaxed">
                    Rua Dr. José Mizrah, 143<br />
                    Jardim Guandu, Nova Iguaçu, RJ
                  </span>
                </div>
              </div>

              {/* Button with localization on Google Maps */}
              <div className="pt-1">
                <a
                  href="https://share.google/G6atiI2WxCC8KRUx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-brand-primary hover:bg-brand-highlight hover:scale-[1.02] transition-all rounded-xl cursor-pointer"
                  id="footer-google-maps-link"
                >
                  <MapPin className="h-4.5 w-4.5 fill-current text-white text-black" />
                  Ver Localização no Google
                </a>
              </div>
              
              <div className="p-3 bg-brand-dark/25 rounded-xl border border-brand-primary/10 text-xs text-text-offwhite mt-2">
                📍 <strong>Localização Privilegiada:</strong> De fácil acesso, com facilidades de estacionamento e excelente vigilância para total conforto.
              </div>
            </div>
          </div>

          {/* Column 3: Schedules & Contacts (4 lg-cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest font-mono border-b border-white/5 pb-2">
              Horários & Contatos
            </h4>

            <div className="space-y-4 text-xs sm:text-sm" id="footer-schedule-details">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Aulas Seg a Sex</span>
                  <span className="block text-xs text-text-gray mt-1 leading-relaxed columns-max">
                    Manhã, Tarde e Noite<br />
                    Consulte nossa grade de horários via WhatsApp.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Números WhatsApp</span>
                  <span className="block text-xs text-text-gray mt-1 leading-normal space-y-1">
                    <button
                      onClick={() => handleWhatsApp()}
                      className="block text-brand-primary hover:text-brand-highlight hover:underline text-left cursor-pointer"
                    >
                      (21) 9644-28614
                    </button>
                    <button
                      onClick={() => handleWhatsApp()}
                      className="block text-brand-primary hover:text-brand-highlight hover:underline text-left cursor-pointer"
                    >
                      (21) 9644-28613
                    </button>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Aulas Gratuitas de Teste</span>
                  <span className="block text-xs text-text-gray mt-1">
                    Sob agendamento prévio com nossa equipe acima.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Local SEO Footer keywords helper tag */}
        <div className="text-center text-[10px] sm:text-xs text-text-gray/50 max-w-4xl mx-auto mb-10 border-t border-white/5 pt-8" id="footer-seo-links">
          <p className="leading-relaxed">
            CT Orelha Fight - Escola de Luta Orelha Fight. Carlson Gracie Team Jiu-Jitsu. Especialistas em: Jiu-Jitsu Nova Iguaçu | Jiu Jitsu Nova Iguaçu | Jiu-Jitsu em Nova Iguaçu | CT de Jiu-Jitsu em Nova Iguaçu | Escola de Luta em Nova Iguaçu | Aula de Jiu-Jitsu em Nova Iguaçu | Treinamento de Jiu-Jitsu RJ. Todos os direitos reservados.
          </p>
        </div>

        {/* Landing Page CTA Section */}
        <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 text-center max-w-3xl mx-auto mb-10 transition-all hover:border-brand-primary/20" id="footer-developer-cta">
          <p className="text-white text-sm sm:text-base font-semibold mb-2">
            Quer uma página profissional igual a esta para o seu negócio?
          </p>
          <p className="text-xs sm:text-sm text-text-gray mb-3">
            Desenvolva seu site de alta performance para destacar suas aulas, seu CT ou sua empresa na internet.
          </p>
          <a
            href="mailto:jm.uxinfo@gmail.com?subject=Interesse%20em%20Landing%20Page%20Profissional"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-[#73E34D] text-xs sm:text-sm font-mono tracking-wider font-bold transition-all group"
            id="footer-developer-email-link"
          >
            Entre em contato pelo e-mail: <span className="underline select-all">jm.uxinfo@gmail.com</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Lower row: Copyright and Return to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-[11px] font-mono tracking-wider text-text-gray/80" id="footer-lower">
          <div>
            © {new Date().getFullYear()} CT Orelha Fight. Desenvolvido com Estudo Premium.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-brand-primary transition-colors cursor-pointer group"
            id="footer-back-to-top"
          >
            Voltar ao topo
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
