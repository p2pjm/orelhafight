/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function CTASection() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de garantir minha aula experimental e conhecer o CT Orelha Fight.' },
      })
    );
  };

  return (
    <section id="cta-final" className="py-28 bg-black relative overflow-hidden border-b border-brand-primary/10">
      {/* Background spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-6 font-bold"
          id="cta-final-badge"
        >
          <ShieldCheck className="h-4 w-4 text-brand-primary" />
          A Hora É Agora • Nova Iguaçu RJ
        </motion.div>

        {/* Strong emotional display heading - Atualizado para acionar controle de versão */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-6 uppercase"
          id="cta-final-heading"
        >
          Mude Sua História<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-highlight glow-text">
            Dê O Primeiro Passo
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-gray text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          id="cta-final-description"
        >
          Não adie sua saúde, sua autodefesa ou a disciplina que você precisa no dia a dia. Venha fazer parte de uma equipe respeitada e tradicional de Jiu-Jitsu. Esperamos por você no tatame.
        </motion.p>

        {/* Big high contrast green trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          id="cta-buttons-wrapper"
        >
          <button
            onClick={handleWhatsApp}
            className="w-full py-4.5 px-8 bg-brand-primary text-black font-extrabold rounded-xl hover:bg-brand-highlight hover:scale-[1.03] shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-lg"
            id="cta-final-primary-trigger"
          >
            <MessageSquare className="h-5.5 w-5.5 fill-black text-black" />
            Quero Treinar no CT Orelha Fight
          </button>
        </motion.div>

        {/* Guarantee subtitle list */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-text-gray text-xs font-mono" id="cta-guarantees">
          <span className="flex items-center gap-2">✔ Aula de Teste Gratuita</span>
          <span className="flex items-center gap-2">✔ Kimono de Apoio Incluso</span>
          <span className="flex items-center gap-2">✔ Ambiente para Qualquer Idade</span>
        </div>

      </div>
    </section>
  );
}
