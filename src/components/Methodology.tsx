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
    icon: Shield,
    badge: 'Pilar 01',
  },
  {
    id: 'respeito',
    title: 'Respeito',
    icon: Users,
    badge: 'Pilar 02',
  },
  {
    id: 'evolucao',
    title: 'Evolução',
    icon: Compass,
    badge: 'Pilar 03',
  },
];

export default function Methodology() {
  return (
    <section id="metodo" className="py-16 sm:py-20 bg-black relative border-b border-brand-primary/10">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-brand-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest block mb-2 font-semibold">
            O Método Orelha Fight
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none uppercase" id="methodology-heading">
            Três Pilares de Força
          </h2>
          <p className="text-text-gray text-sm sm:text-base mt-3" id="methodology-subtext">
            Nossa estrutura pedagógica de ensino sustenta-se sob três valores indeléveis que formam campeões de jiu-jitsu e pessoas de caráter.
          </p>
        </div>

        {/* Pillars Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="methodology-pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center text-center justify-center p-4 transition-all duration-300 cursor-default"
                id={`method-pillar-${pillar.id}`}
              >
                <div className="flex flex-col items-center w-full">
                  {/* Floating Icon without enclosing box */}
                  <div className="mb-3 text-brand-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-brand-primary drop-shadow-[0_0_15px_rgba(230,24,39,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_24px_rgba(230,24,39,0.8)]" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-brand-primary/70 font-semibold mb-1">
                    {pillar.badge}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
