/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-24 bg-black relative overflow-hidden border-b border-brand-primary/10">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-radial-gradient from-brand-primary to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center p-2 rounded-full bg-brand-primary/10 text-brand-primary mb-6 border border-brand-primary/20"
          id="manifesto-badge"
        >
          <Flame className="h-6 w-6 animate-pulse" />
        </motion.div>

        {/* Short & Powerful Title based on key sentence */}
        <motion.p
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-xs font-mono tracking-widest text-brand-primary uppercase mb-4 font-bold"
          id="manifesto-topic"
        >
          Nosso Posicionamento
        </motion.p>
        
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase max-w-2xl mx-auto mb-8"
          id="manifesto-heading"
        >
          “MAIS DO QUE TREINAR JIU-JITSU, VOCÊ ENTRA PARA UMA EQUIPE QUE FORMA PESSOAS.”
        </motion.h3>

        {/* Editorial style blockquote content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-black/60 rounded-2xl p-6 sm:p-10 border border-brand-primary/15 glow-green"
          id="manifesto-card"
        >
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-brand-primary/25">
            <Quote className="h-10 w-10 rotate-180" />
          </div>

          <p className="text-text-offwhite/95 text-base sm:text-xl font-medium leading-relaxed italic text-center relative z-10">
            "No CT Orelha Fight, o Jiu-Jitsu vai muito além do tatame. Cada treino é uma ferramenta para transformar vidas, fortalecendo a mente, gerando autoconfiança inabalável e unindo nossa equipe sob uma amizade verdadeira."
          </p>

          <p className="text-brand-primary font-mono text-xs sm:text-sm tracking-widest uppercase mt-6 relative z-10 font-bold">
            Escola de Luta Orelha Fight • Carlson Gracie Team
          </p>
        </motion.div>
      </div>
    </section>
  );
}
