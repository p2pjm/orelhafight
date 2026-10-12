/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, ShieldCheck, Heart, UserCheck, MessageCircleHeart, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';

const differentiators = [
  {
    id: 'acolhimento',
    title: 'Acolhimento Real',
    description: 'Aqui, ninguém é deixado de lado. Entendemos que cada pessoa tem seu ritmo e limitações. Você será acolhido com paciência e clareza por professores e colegas.',
    icon: Heart,
  },
  {
    id: 'metodologia',
    title: 'Metodologia Passo a Passo',
    description: 'Aulas estruturadas que dividem as posições complexas de guarda e passagem em frações compreensíveis. Facilidade didática incomparável.',
    icon: ShieldCheck,
  },
  {
    id: 'respeito',
    title: 'Ambiente de Luta Sério',
    description: 'Zero espaço para agressões verbais ou comportamentos egocêntricos. Preservamos a tranquilidade e a integridade de todos para que todos queiram regressar.',
    icon: UserCheck,
  },
  {
    id: 'tecnica',
    title: 'Evolução Técnica Consagrada',
    description: 'A linhagem histórica do Jiu-Jitsu de Leonardo Ramos traz um arsenal técnico eficaz comprovado tanto em tatames de lazer quanto nos maiores pódios de competição.',
    icon: Flame,
  },
  {
    id: 'comunidade',
    title: 'Comunidade Forte (Família)',
    description: 'Mais do que uma escola, somos uma irmandade sólida. Promovemos amizades que transpassam o tatame e estendem-se à vida coletiva fora do CT.',
    icon: UsersRound,
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento Próximo',
    description: 'Dando feedback contínuo em relação à postura, pegadas e movimentações. Orientação consultiva direta do próprio Professor Leonardo Orelha.',
    icon: MessageCircleHeart,
  },
];

export default function GymDifferentiators() {
  return (
    <section id="diferenciais" className="py-24 bg-bg-card relative border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-4 font-semibold">
              Por que nos escolher?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none uppercase" id="diff-heading">
              O Que Nos Torna<br />Diferenciados
            </h2>
          </div>
          <div>
            <p className="text-text-gray text-base sm:text-lg" id="diff-description">
              Esqueça o clima intimidador de academias antigas. O CT Orelha Fight foi estruturado para ser a melhor experiência da sua semana na Baixada Fluminense: sério técnica e moralmente, mas com atmosfera extremamente leve e encorajadora.
            </p>
          </div>
        </div>

        {/* Differentiators list grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="diff-grid">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-black border border-white/5 hover:border-brand-primary/20 transition-all group"
                id={`diff-item-${diff.id}`}
              >
                <div className="p-3 bg-brand-dark/20 text-brand-primary rounded-xl border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-black transition-colors duration-300 flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-brand-primary transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-text-gray text-xs sm:text-sm leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
