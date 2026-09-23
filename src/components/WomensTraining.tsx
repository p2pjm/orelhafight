/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants/images';
import { Shield, Sparkles, HeartPulse, Check, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function WomensTraining() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de saber mais informações sobre os horários e como funciona a turma de Jiu-Jitsu Feminino.' },
      })
    );
  };

  const benefits = [
    {
      title: 'Autodefesa Inteligente',
      description: 'Aprenda a usar a técnica, alavanca e peso do corpo para anular agressões de oponentes maiores e mais fortes.',
      icon: Shield,
    },
    {
      title: 'Condicionamento & Saúde',
      description: 'Uma aula dinâmica que queima calorias, melhora a flexibilidade, postura e tonifica os músculos sem monotonia.',
      icon: HeartPulse,
    },
    {
      title: 'Comunidade e Parceria',
      description: 'Treine em um ambiente de total cooperação, respeito mútuo e amizade onde as mulheres se apoiam para evoluir juntas.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="treino-feminino" className="py-24 bg-black relative border-b border-brand-primary/10 overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-brand-dark/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text and Benefits Column (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center" id="womens-text-col">
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
              Espaço Exclusivo & Acolhedor
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none uppercase mb-6" id="womens-heading">
              Treino Feminino
            </h2>
            <p className="text-text-gray text-sm sm:text-base leading-relaxed mb-8" id="womens-intro">
              No CT Orelha Fight, acreditamos que a força de uma equipe também reside na união e no empoderamento de nossas mulheres. Oferecemos um ambiente seguro, extremamente acolhedor e estimulante, livre de intimidação e focado na sua melhor evolução técnica e física.
            </p>

            {/* Structured benefits block */}
            <div className="space-y-6 mb-8" id="womens-benefits">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                    id={`womens-benefit-item-${idx}`}
                  >
                    <div className="p-2.5 rounded-lg bg-brand-dark/30 text-brand-primary border border-brand-primary/20 flex-shrink-0 mt-0.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-text-gray text-xs sm:text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick trust bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-xs sm:text-sm font-medium text-text-offwhite border-t border-white/5 pt-6" id="womens-trust-list">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-xs font-bold">✓</span>
                Professores credenciados e dedicados
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-xs font-bold">✓</span>
                Zero experiência prévia necessária
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-xs font-bold">✓</span>
                Tatames macios e de alta higiene
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-xs font-bold">✓</span>
                União e amizades fora do tatame
              </div>
            </div>

            {/* WhatsApp CTA Action */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={handleWhatsApp}
                className="px-8 py-4 bg-brand-primary text-black font-extrabold text-sm rounded-xl hover:bg-brand-highlight hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-brand-primary/10"
                id="womens-cta-btn"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Agendar Aula Experimental Feminina
              </button>
              <span className="text-xs text-text-gray font-mono text-center sm:text-left">
                *Primeiro treino 100% gratuito e acolhedor!
              </span>
            </div>
          </div>

          {/* Interactive Image Frame Column (Right) */}
          <div className="lg:col-span-6 flex justify-center" id="womens-image-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden border border-brand-primary/20 glow-green"
              id="womens-image-container"
            >
              {/* Image element */}
              <img
                src={IMAGES.treinoFeminino}
                srcSet={`${IMAGES.treinoFemininoSm} 450w, ${IMAGES.treinoFeminino} 1200w`}
                sizes="(max-width: 640px) 360px, 500px"
                alt="Treino Feminino no CT Orelha Fight"
                width={500}
                height={375}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                id="womens-photo"
              />

              {/* Gradient dark overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Caption over image */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#73E34D] bg-[#0E3B2F]/80 border border-[#73E34D]/30 px-2.5 py-1 rounded-full inline-block mb-2">
                  Registro Real
                </span>
                <p className="text-white text-base sm:text-lg font-extrabold tracking-tight">
                  Turma de Jiu-Jitsu Feminino CT Orelha Fight
                </p>
                <p className="text-text-gray text-xs mt-1">
                  Ambiente de respeito, integração e alto desenvolvimento.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
