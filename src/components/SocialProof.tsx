/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Quote, Award, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 't-1',
    name: 'Mariana Silva',
    role: 'Mãe do Pedro (8 anos)',
    rating: 5,
    text: 'Procurei o CT Orelha Fight porque meu filho estava sofrendo bullying na escola. Em poucos meses, o comportamento dele mudou muito. Ele está focado, obedece mais em casa e aprendeu a se defender com total respeito. A equipe e o Professor Orelha tratam as crianças com muito amor e firmeza moral.',
  },
  {
    id: 't-2',
    name: 'Rodrigo Souza',
    role: 'Aluno Adulto Iniciante (34 anos)',
    rating: 5,
    text: 'Sempre tive receio de entrar para artes marciais por achar o ambiente pesado ou agressivo. No CT Orelha me surpreendi desde a primeira aula. O acolhimento é sensacional, a metodologia passo a passo facilita muito o aprendizado para quem nunca treinou na vida. Melhorou meu fôlego e tirou meu estresse.',
  },
  {
    id: 't-3',
    name: 'Felipe Neves',
    role: 'Praticante Faixa Azul (25 anos)',
    rating: 5,
    text: 'Os treinos no CT Orelha Fight são refinados e focados. Professor Leonardo Orelha não ensina apenas posições soltas, ele ensina sistemas inteiros de passagem e pressão baseados na linhagem Carlson Gracie. O tatame é limpo e a galera treina forte, sempre se ajudando e evoluindo unida.',
  },
];

const mockStats = [
  {
    label: 'Alunos Ativos',
    value: '+200',
    growth: 'Crescendo continuamente em Nova Iguaçu',
    icon: Award,
  },
  {
    label: 'Metodologia Segura',
    value: '100%',
    growth: 'Foco absoluto em integridade física',
    icon: Calendar,
  },
];

export default function SocialProof() {
  return (
    <section id="depoimentos" className="py-24 bg-black relative border-b border-brand-primary/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
            Opinião de Quem Treina
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight uppercase" id="proof-heading">
            Vidas Transformadas Pelo Tatame
          </h2>
          <p className="text-text-gray text-base mt-4" id="proof-subtext">
            Veja relatos honestos de pais de alunos e praticantes de diferentes idades que encontraram disciplina, saúde e uma nova família no CT Orelha Fight.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="proof-container">
          
          {/* Testimonials Sidebar (Left 7-columns) */}
          <div className="lg:col-span-8 space-y-6" id="proof-testimonials-list">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card p-6 sm:p-8 rounded-2xl border border-white/5 relative hover:border-brand-primary/15 transition-all group"
                id={`testimonial-item-${t.id}`}
              >
                {/* Float quotation decoration icon */}
                <div className="absolute top-6 right-6 text-brand-primary/10 group-hover:text-brand-primary/20 transition-all">
                  <Quote className="h-10 w-10 rotate-180" />
                </div>

                <div className="flex items-center gap-1 mb-4" id={`testimonial-rating-${t.id}`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-brand-primary fill-brand-primary" />
                  ))}
                </div>

                <p className="text-text-offwhite text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-bold text-sm sm:text-base leading-none">
                    {t.name}
                  </h4>
                  <span className="text-brand-primary/80 font-mono text-xs block mt-1">
                    {t.role} • Aluno CT Orelha Fight
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metrics Placeholders Box (Right 4-columns) */}
          <div className="lg:col-span-4 space-y-6" id="proof-metrics-block">
            <div className="bg-bg-card p-8 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between glow-green">
              <div>
                <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-4 font-bold">
                  Evolução do CT
                </span>
                <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight leading-tight mb-4">
                  Dados Estatísticos e Referências
                </h3>
                <p className="text-text-gray text-xs sm:text-sm leading-relaxed mb-6">
                  Números coletivos que reforçam nossa integridade local em Nova Iguaçu RJ.
                </p>
              </div>

              {/* Incremental Stats Cards */}
              <div className="space-y-6 pt-4 border-t border-white/5" id="stats-inner-container">
                {mockStats.map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                      <div className="p-3 bg-brand-dark/20 text-brand-primary rounded-xl border border-brand-primary/10">
                        <StatIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-3xl font-extrabold text-[#8EFF5C] block tracking-tight font-mono leading-none">
                          {stat.value}
                        </span>
                        <span className="text-white text-xs font-bold block mt-1 leading-none">{stat.label}</span>
                        <span className="text-text-gray text-[10px] block mt-1">{stat.growth}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Carlson Gracie Badge detail */}
            <div className="bg-brand-dark/25 border border-brand-primary/15 p-6 rounded-2xl text-center">
              <span className="text-brand-primary text-xs uppercase tracking-widest font-mono font-bold block mb-1">
                Linhagem Tradicional
              </span>
              <p className="text-text-offwhite text-sm font-semibold">
                Carlson Gracie Team Jiu-Jitsu RJ
              </p>
              <span className="text-text-gray text-[11px] leading-relaxed block mt-2">
                Nós herdamos os valores de técnica apurada, perseverança inabalável e simplicidade no tatame.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
