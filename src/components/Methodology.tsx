/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Users, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const pillars = [
  {
    id: 'disciplina',
    title: 'Disciplina',
    description: 'A base de toda conquista sólida. Fazer o que precisa ser feito, com constância e compromisso, mesmo nos dias em que a motivação escasseia. Ela constrói hábitos indestrutíveis no tatame e no cotidiano.',
    icon: Shield,
    badge: 'Pilar 01',
  },
  {
    id: 'respeito',
    title: 'Respeito',
    description: 'A essência do Jiu-Jitsu tradicional. Respeitar o mestre, os parceiros de treino, o espaço coletivo e a própria história individual de cada praticante. É o que transforma lutadores em cidadãos e amigos.',
    icon: Users,
    badge: 'Pilar 02',
  },
  {
    id: 'evolucao',
    title: 'Evolução',
    description: 'O foco inabalável no progresso técnico e pessoal. No CT Orelha Fight, combatemos a ideia de perfeição imediata e valorizamos a melhoria diária de 1%. A evolução técnica gera autoconfiança de aço.',
    icon: Compass,
    badge: 'Pilar 03',
  },
];

export default function Methodology() {
  return (
    <section id="metodo" className="py-24 bg-bg-card relative border-b border-brand-primary/10">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest block mb-3 font-semibold">
            O Método Orelha Fight
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none uppercase" id="methodology-heading">
            Três Pilares de Força
          </h2>
          <p className="text-text-gray text-base mt-4" id="methodology-subtext">
            Nossa estrutura pedagógica de ensino sustenta-se sob três valores indeléveis que formam campeões de jiu-jitsu e pessoas de caráter.
          </p>
        </div>

        {/* Pillars Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="methodology-pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-black rounded-2xl p-8 border border-white/5 glow-green flex flex-col items-center text-center justify-between min-h-[380px]"
                id={`method-pillar-${pillar.id}`}
              >
                {/* Float pillar number top-right */}
                <div className="absolute top-6 right-6 font-mono text-xs font-bold text-brand-primary/50 bg-brand-dark/20 border border-brand-primary/10 px-2.5 py-1 rounded-md">
                  {pillar.badge}
                </div>

                <div className="flex flex-col items-center mt-4">
                  {/* Icon container */}
                  <div className="p-4 bg-brand-dark/25 text-brand-primary rounded-full border border-brand-primary/15 mb-6">
                    <Icon className="h-8 w-8 text-brand-primary" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-text-gray text-xs sm:text-sm leading-relaxed max-w-sm">
                    {pillar.description}
                  </p>
                </div>

                <div className="w-12 h-1 bg-brand-primary/30 rounded mt-6 group-hover:bg-brand-primary transition-colors" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
