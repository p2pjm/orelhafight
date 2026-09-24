/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants/images';
import { MessageSquare, ArrowDown, Award, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de saber mais informações sobre as aulas de Jiu-Jitsu no CT Orelha Fight.' },
      })
    );
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-black flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background gradients and visual atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none" />
        {/* Fine grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(var(--color-brand-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-8 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Headline and Copy Block (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/40 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase tracking-widest mx-auto lg:mx-0 w-fit mb-6"
              id="hero-tag"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Escola de Luta em Nova Iguaçu
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-6xl xl:text-[72px] font-extrabold tracking-tight text-white leading-none mb-6 uppercase"
              id="hero-headline"
            >
              Disciplina<br />
              Respeito<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-highlight glow-text">
                Evolução
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-xl text-text-gray max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
              id="hero-subheadline"
            >
              Mais do que um centro de treinamento de Jiu-Jitsu em Nova Iguaçu, somos uma equipe verdadeiramente comprometida em formar pessoas fortes dentro e fora do tatame.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              id="hero-cta-container"
            >
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-black font-bold rounded-xl shadow-lg hover:bg-brand-highlight hover:shadow-brand-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer group text-lg"
                id="hero-cta-whatsapp"
              >
                <MessageSquare className="h-5 w-5 fill-black group-hover:scale-110 transition-transform" />
                Agendar Aula Experimental
              </button>

              <a
                href="#professor"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('professor');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/15 transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-lg"
                id="hero-cta-secondary"
              >
                Conhecer o CT
                <ArrowDown className="h-4 w-4 text-text-gray animate-bounce mt-0.5" />
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
              id="hero-badges"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-dark/20 border border-brand-primary/10">
                  <Award className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <span className="text-white font-bold block text-sm">Carlson Gracie</span>
                  <span className="text-text-gray text-xs block font-mono">Linhagem Tradicional</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-dark/20 border border-brand-primary/10">
                  <MapPin className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <span className="text-white font-bold block text-sm">Nova Iguaçu - RJ</span>
                  <span className="text-text-gray text-xs block font-mono">Fácil localizaçâo</span>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1 justify-center sm:justify-start">
                <div className="p-2 rounded-lg bg-brand-dark/20 border border-brand-primary/10">
                  <span className="text-brand-primary font-mono text-sm font-bold">100%</span>
                </div>
                <div className="text-left">
                  <span className="text-white font-bold block text-sm">Acolhedor</span>
                  <span className="text-text-gray text-xs block font-mono">Feito para Iniciantes</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Photo Showcase with recut layout and cinematic integration (Right) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden glow-green border border-brand-primary/20 bg-cover bg-center"
              id="hero-image-wrapper"
            >
              {/* Outer soft green background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
              
              {/* Green backdrop radial spotlight representing the request: 'recortado, com glow verde suave atrás' */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-primary/20 rounded-full blur-[80px] pointer-events-none z-0" />
              
              <img
                src={IMAGES.profOrelhaGiWebp}
                srcSet={`${IMAGES.profOrelhaGiSmWebp} 450w, ${IMAGES.profOrelhaGiWebp} 840w`}
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 420px"
                alt="Professor Leonardo Orelha em Kumite Gi"
                width={420}
                height={560}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top relative z-10 hover:scale-105 transition-transform duration-700 will-change-transform"
                id="hero-photo-img"
              />

              {/* Float badge inside the photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-brand-primary/20 z-20 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-brand-primary block leading-none font-bold">Liderança e Confiança</span>
                  <span className="text-base font-bold text-white block mt-1">Prof. Leonardo Orelha</span>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-brand-highlight animate-ping" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
