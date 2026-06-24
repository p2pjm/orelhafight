/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants/images';
import { MessageSquare, ShieldAlert, Award, Star, HandMetal } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfessorHighlight() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá Professor Orelha! Gostaria de tirar algumas dúvidas sobre os treinos e agendar uma visita ao CT.' },
      })
    );
  };

  return (
    <section id="professor" className="py-24 bg-black relative overflow-hidden border-t border-brand-primary/10">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Champion Photo Showcase (Left on desktop) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[400px]">
              {/* Outer soft green background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              
              {/* Behind-image green spotlight as instructed */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-primary/15 rounded-full blur-[80px] pointer-events-none z-0" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden border border-brand-primary/30 shadow-2xl bg-card-bg z-10"
                id="professor-image-frame"
              >
                <img
                  src={IMAGES.profChampion}
                  alt="Professor Leonardo Orelha Jiu Jitsu Champion"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                  id="professor-avatar-img"
                />
              </motion.div>

              {/* Floated achievement card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 p-4 rounded-xl bg-bg-card/95 border border-brand-primary/20 backdrop-blur-md shadow-xl z-20 hidden sm:flex items-center gap-3.5 max-w-[280px]"
                id="prof-achievement-card"
              >
                <span className="p-2.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-white text-sm font-extrabold block">Campeão Competidor</span>
                  <span className="text-text-gray text-xs block mt-0.5">Liderança técnica provada em combate.</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Copy and Authority Building (Right on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
              Rosto e Liderança do CT
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6" id="prof-title">
              Professor Leonardo Orelha
            </h2>
            <p className="text-base sm:text-lg text-text-gray leading-relaxed mb-6" id="prof-bio-1">
              À frente do tatame, o <strong className="text-white font-semibold">Professor Leonardo Orelha</strong> ministra aulas a mais de 15 anos, conduzindo os treinos combinando liderança técnica impecável e proximidade humana. Representante da respeitada linhagem <strong className="text-white font-semibold">Carlson Gracie Team</strong>, ele traz a tradição e eficácia do Jiu-Jitsu de elite para Nova Iguaçu.
            </p>
            <p className="text-base sm:text-lg text-text-gray leading-relaxed mb-8" id="prof-bio-2">
              Seu método é focado tanto na evolução do lutador experiente quanto no acolhimento do aluno iniciante. No CT Orelha Fight, cada detalhe técnico é ensinado de forma clara, garantindo segurança, disciplina e confiança para todos.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6" id="prof-differentiator-metrics">
              <div className="flex gap-3">
                <ShieldAlert className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-base">Defesa Pessoal Prática</h4>
                  <p className="text-text-gray text-xs leading-relaxed mt-1">
                    Aprenda a se defender em situações reais com inteligência técnica.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-base">Faixa Preta de Respeito</h4>
                  <p className="text-text-gray text-xs leading-relaxed mt-1">
                    Anos de tatame dedicados a formar cidadãos disciplinados e campeões.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Signature and WhatsApp Contact CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6" id="prof-interaction-block">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#73E34D]/80 block font-bold uppercase">
                  Escola de Luta
                </span>
                <span className="text-xl font-bold font-serif italic text-white/90 tracking-wide block mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                  Leonardo Orelha
                </span>
                <span className="text-xs text-text-gray block font-mono">Fundador e Professor Responsável</span>
              </div>

              <button
                onClick={handleWhatsApp}
                className="px-6 py-3.5 bg-brand-primary text-black font-bold rounded-xl hover:bg-brand-highlight hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                id="prof-chat-cta"
              >
                <MessageSquare className="h-4.5 w-4.5 fill-black text-black" />
                Falar Diretamente com Professor
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
