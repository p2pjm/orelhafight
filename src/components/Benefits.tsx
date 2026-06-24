/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, ShieldAlert, Heart, Brain, Users } from 'lucide-react';
import { motion } from 'motion/react';

const benefitsList = [
  {
    id: 'disciplina',
    title: 'Disciplina',
    description: 'Construa rotinas fortes e mentalidade focado. O Jiu-Jitsu ensina regularidade e consistência que refletem no trabalho, estudos e vida pessoal.',
    icon: Shield,
  },
  {
    id: 'autoconfiança',
    title: 'Autoconfiança',
    description: 'Aprenda a superar desafios físicos e mentais toda semana. Olhe nos olhos das adversidades com a postura de quem sabe do que é capaz.',
    icon: Sparkles,
  },
  {
    id: 'defesa-pessoal',
    title: 'Defesa Pessoal',
    description: 'Aprenda técnicas de controle e submissão baseadas em alavancas. Sinta-se seguro e preparado contra agressões físicas em qualquer situação real.',
    icon: ShieldAlert,
  },
  {
    id: 'condicionamento',
    title: 'Condicionamento Físico',
    description: 'Queime calorias, aumente sua resistência cardiovascular e ganhe tônus muscular de forma dinâmica e natural, fugindo do tédio da musculação tradicional.',
    icon: Heart,
  },
  {
    id: 'controle-emocional',
    title: 'Controle Emocional',
    description: 'Mantenha-se calmo sob pressão. O combate induz a tomada de decisões rápidas em momentos de estresse extremo, ensinando resiliência e controle mental.',
    icon: Brain,
  },
  {
    id: 'respeito',
    title: 'Respeito',
    description: 'A base do nosso tatame. Respeito ao mestre, aos parceiros de treino mais novos e mais antigos. Compreensão e integridade para evoluir coletivamente.',
    icon: Users,
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-black relative border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
            Benefícios Reais do Jiu-Jitsu
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight" id="benefits-heading">
            Mais do que técnica. Um estilo de vida transformador.
          </h2>
          <p className="text-text-gray text-base sm:text-lg mt-4" id="benefits-subheading">
            Praticar a arte suave no CT Orelha Fight desenvolve os pilares físicos, intelectuais e de caráter mais importantes para sua vida.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="benefits-grid">
          {benefitsList.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6, borderColor: 'rgba(115, 227, 77, 0.4)' }}
                className="p-6 rounded-2xl bg-bg-card border border-brand-primary/10 hover:shadow-[0_8px_30px_rgb(115,227,77,0.05)] transition-all duration-300 group"
                id={`benefit-card-${benefit.id}`}
              >
                <div className="p-3 w-fit rounded-lg bg-brand-dark/30 border border-brand-primary/25 text-brand-primary mb-5 group-hover:bg-brand-primary group-hover:text-black transition-colors duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-brand-primary transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-text-gray text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
