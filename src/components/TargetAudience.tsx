/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Users, Shield, HeartPulse, Sparkles, Smile, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const segments = [
  {
    id: 'kids',
    label: 'Crianças (Infantil)',
    title: 'Jiu-Jitsu Infantil',
    subtitle: 'Para pais que buscam disciplina, segurança e autoconfiança saudável para os filhos.',
    icon: Smile,
    ageRange: '4 a 12 anos',
    focus: [
      'Desenvolvimento motor e coordenação',
      'Defesa pessoal preventiva e anti-bullying',
      'Foco, obediência e respeito à família',
      'Atividades lúdicas integradoras de disciplina',
    ],
    description: 'Nossa metodologia infantil foca em ensinar Jiu-Jitsu de forma divertida, extremamente segura e respeitosa. Ajudamos a formar crianças disciplinadas e preparadas para os desafios da vida.',
  },
  {
    id: 'teens',
    label: 'Adolescentes',
    title: 'Jiu-Jitsu Juvenil',
    subtitle: 'O esporte perfeito para focar a energia, construir amizades de valor e erguer o foco mental.',
    icon: Sparkles,
    ageRange: '13 a 17 anos',
    focus: [
      'Gasto de energia de forma positiva',
      'Socialização em ambiente altamente saudável',
      'Construção de foco mental para estudos',
      'Autoimagem positiva e resiliência',
    ],
    description: 'Auxiliamos adolescentes a encontrar um rumo focado, gastar energia sob orientação e desenvolver o respeito mútuo. Formamos laços de irmandade duradouros em um ambiente livre de vícios.',
  },
  {
    id: 'beginners',
    label: 'Adultos Iniciantes',
    title: 'Jiu-Jitsu para Iniciantes',
    subtitle: 'Nenhum condicionamento prévio é necessário. Aprenda do absoluto zero.',
    icon: Shield,
    ageRange: 'Acima de 18 anos',
    focus: [
      'Metodologia passo a passo (sem sufoco)',
      'Aulas focadas em fundações técnicas',
      'Defesa pessoal básica para aumentar segurança',
      'Ambiente amigável de mútua ajuda',
    ],
    description: 'Sabemos que começar uma nova arte marcial pode assustar. Por isso, oferecemos uma recepção calorosa e metodologia adaptada. Você aprenderá cada detalhe de pegadas e posturas de maneira leve e supervisionada.',
  },
  {
    id: 'womens',
    label: 'Mulheres',
    title: 'Jiu-Jitsu Feminino',
    subtitle: 'Ambiente acolhedor, focado na defesa pessoal, saúde física e empoderamento mútuo.',
    icon: Sparkles,
    ageRange: 'Todas as idades',
    focus: [
      'Aulas dedicadas e ambiente acolhedor',
      'Técnicas eficientes de autodefesa e prevenção',
      'Melhora do condicionamento físico e tonificação',
      'Comunidade unida de apoio e empoderamento',
    ],
    description: 'Nossa turma de Jiu-Jitsu Feminino oferece um espaço exclusivo e amigável para mulheres de todas as idades aprenderem a arte suave, desenvolverem segurança pessoal e aumentarem o condicionamento sem receios. Fortaleça seu corpo e sua mente em um ambiente inspirador.',
  },
  {
    id: 'advanced',
    label: 'Praticantes Avançados / Atletas',
    title: 'Treinamento Avançado e Competição',
    subtitle: 'Refine seu jogo técnico, treine forte e faça parte de uma linhagem consagrada de luta.',
    icon: Trophy,
    ageRange: 'Todas as idades',
    focus: [
      'Refinamento técnico de guarda e passagens',
      'Treino regular de alta intensidade (sparring)',
      'Estratégias de competição e regras',
      'Intercâmbio técnico diferenciado (Carlson Gracie)',
    ],
    description: 'Se você já treina, procura treinos fortes e quer polir sua técnica, o CT Orelha Fight oferece o tatame ideal. Sob a liderança do Prof. Leonardo Orelha, você alcançará o próximo nível na sua jornada técnica.',
  },
  {
    id: 'families',
    label: 'Famílias e Pais',
    title: 'Ambiente Familiar e Seguro',
    subtitle: 'Um local acolhedor onde toda a família treina e se desenvolve com absoluta tranquilidade.',
    icon: Users,
    ageRange: 'Mães, pais e filhos',
    focus: [
      'Respeito aos limites e segurança absoluta',
      'Tranquilidade de ver os filhos treinando em local sério',
      'Valores morais tradicionais preservados',
      'Comunidade unida e protetora',
    ],
    description: 'Promovemos um ambiente em que pais e mães podem deixar seus filhos treinando sem receios ou participar dos treinos de adultos. Defendemos a família como nosso pilar primordial de sustentação de equipe.',
  },
  {
    id: 'health',
    label: 'Saúde e Pertencimento',
    title: 'Mais Saúde e Integração Social',
    subtitle: 'Melhoria de vida, perda de peso e controle emocional contínuo através da atividade.',
    icon: HeartPulse,
    ageRange: 'Livre',
    focus: [
      'Perca até 800kcal por treino',
      'Alívio imediato do estresse e ansiedade',
      'Pertencimento a uma comunidade inspiradora',
      'Aumento notável da flexibilidade e fôlego',
    ],
    description: 'Muitas pessoas nos procuram para emagrecer, fazer amigos e aliviar o peso mental do trabalho. No CT Orelha Fight, você encontra uma equipe que empurra você para cima e celebra cada evolução sua.',
  },
];

export default function TargetAudience() {
  const [activeTab, setActiveTab] = useState('kids');

  const selectedSegment = segments.find((s) => s.id === activeTab) || segments[0];
  const ActiveIcon = selectedSegment.icon;

  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: `Olá! Tenho interesse em saber mais sobre as aulas de Jiu-Jitsu para ${selectedSegment.title}.` },
      })
    );
  };

  return (
    <section id="para-quem" className="py-24 bg-black relative border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
            Para quem é o CT Orelha Fight?
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight uppercase" id="audience-heading">
            O Tatame Perfeito Para Todos Nós
          </h2>
          <p className="text-text-gray text-base sm:text-lg mt-4" id="audience-subheading">
            Do absoluto iniciante ao lutador experiente, da criança hiperativa ao adulto estressado do dia a dia: temos o método e o ambiente ideal para você crescer.
          </p>
        </div>

        {/* Tab triggers Container */}
        <div className="flex overflow-x-auto gap-3 mb-10 pb-3 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid lg:grid-cols-7 md:pb-0" id="audience-tabs">
          {segments.map((seg) => {
            const isSelected = seg.id === activeTab;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveTab(seg.id)}
                className={`py-3.5 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all text-center border cursor-pointer hover:border-brand-primary/30 flex-shrink-0 snap-align-start min-w-[130px] md:min-w-0 ${
                  isSelected
                    ? 'bg-brand-primary text-black border-brand-primary font-bold shadow-md'
                    : 'bg-bg-card text-text-gray border-white/5 hover:text-white'
                }`}
                id={`audience-tab-trigger-${seg.id}`}
              >
                {seg.label}
              </button>
            );
          })}
        </div>

        {/* Active Content Block with Entry Animations */}
        <div className="bg-bg-card rounded-3xl p-6 sm:p-10 border border-brand-primary/20 glow-green shadow-2xl" id="audience-content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Information Side (Left) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-lg bg-brand-dark/20 border border-brand-primary/30 text-brand-primary">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    {selectedSegment.ageRange && (
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#73E34D] bg-[#0E3B2F]/40 border border-[#73E34D]/20 px-2 py-0.5 rounded">
                        {selectedSegment.ageRange}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                      {selectedSegment.title}
                    </h3>
                  </div>
                </div>

                <p className="text-brand-primary text-xs sm:text-sm font-medium mb-3">
                  {selectedSegment.subtitle}
                </p>

                <p className="text-text-gray text-xs sm:text-sm leading-relaxed mb-6">
                  {selectedSegment.description}
                </p>

                {/* Main CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="px-6 py-3.5 bg-brand-primary text-black font-semibold rounded-xl hover:bg-brand-highlight hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                    id={`audience-cta-btn-${activeTab}`}
                  >
                    <Users className="h-4.5 w-4.5 fill-black text-black" />
                    Quero Conhecer Essa Turma
                  </button>

                  {activeTab === 'womens' && (
                    <a
                      href="#treino-feminino"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('treino-feminino');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="px-6 py-3.5 bg-transparent border border-brand-primary/40 hover:border-brand-primary text-brand-primary font-semibold rounded-xl hover:bg-brand-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                      id="audience-learn-more-womens-btn"
                    >
                      Saiba mais
                    </a>
                  )}
                </div>
              </div>

              {/* Focus List Checklist Side (Right) */}
              <div className="lg:col-span-5 bg-bg-card p-6 rounded-2xl border border-white/5">
                <h4 className="text-white text-sm font-bold tracking-widest uppercase font-mono mb-4 border-b border-white/5 pb-2">
                  Metas & Pilares do Treino:
                </h4>
                <ul className="space-y-3.5" id="audience-pillars-list">
                  {selectedSegment.focus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-dark/30 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-[10px] font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-text-offwhite text-xs sm:text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
