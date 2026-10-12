/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, CalendarClock, DoorOpen, Flame, HelpCircle, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Contato no WhatsApp',
    description: 'Clique em um de nossos botões. Nossa equipe atende você na hora de maneira super prestativa, esclarecendo suas dúvidas básicas.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Agendamento Flexível',
    description: 'Escolha o melhor dia e horário na nossa grade de treinos que se adapte à sua rotina pessoal de trabalho ou escola.',
    icon: CalendarClock,
  },
  {
    number: '03',
    title: 'Recepção Acolhedora',
    description: 'Ao chegar ao CT Orelha Fight, mostraremos as dependências e apresentaremos o Professor Leonardo Orelha.',
    icon: DoorOpen,
  },
  {
    number: '04',
    title: 'Sua Primeira Aula',
    description: 'Você entra no tatame e pratica movimentos fáceis sob acompanhamento e atenção direta de um instrutor sênior.',
    icon: Flame,
  },
  {
    number: '05',
    title: 'Orientação Inicial',
    description: 'Bate-papo rápido pós-treino para alinhar sobre kimonos, mensalidades sugeridas, turmas ideais e seus objetivos específicos.',
    icon: HelpCircle,
  },
  {
    number: '06',
    title: 'Integração à Equipe',
    description: 'Seja bem-vindo oficial à família CT Orelha Fight! Pronto para desfrutar da sua evolução técnica e foco diário.',
    icon: UsersRound,
  },
];

export default function FirstClassTutorial() {
  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Gostaria de agendar minha primeira aula experimental no CT Orelha Fight.' },
      })
    );
  };

  return (
    <section id="primeira-aula" className="py-24 bg-bg-card relative border-b border-brand-primary/10 overflow-hidden">
      
      {/* Absolute glow design assets */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
            Sem Medo ou Complicação
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight uppercase" id="trial-heading">
            Sua Primeira Aula Grátis
          </h2>
          <p className="text-text-gray text-base sm:text-lg mt-4" id="trial-subtext">
            Não precisa ter fôlego de atleta nem kimono próprio para começar. Criamos um processo acolhedor e simples para você dar o primeiro passo com segurança.
          </p>
        </div>

        {/* Steps Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" id="trial-steps-grid">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-black border border-white/5 relative flex flex-col justify-between hover:border-brand-primary/20 transition-all group"
                id={`trial-step-${step.number}`}
              >
                {/* Float indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs font-mono font-bold text-brand-primary bg-brand-dark/20 border border-brand-primary/15 px-2.5 py-1 rounded-md">
                    Passo {step.number}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 text-text-gray group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-colors duration-300">
                    <StepIcon className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-brand-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-gray text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call-to-action encouragement button */}
        <div className="text-center" id="trial-action-block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsApp}
            className="px-8 py-4 bg-brand-primary text-black font-bold rounded-xl hover:bg-brand-highlight shadow-lg flex items-center gap-2.5 mx-auto cursor-pointer"
            id="trial-primary-cta"
          >
            <MessageSquare className="h-5 w-5 fill-black text-black" />
            Agendar Minha Aula Experimental Grátis
          </motion.button>
          <span className="text-xs text-text-gray font-mono block mt-3">
            *Não precisa ter kimono para uso no dia do seu primeiro teste!
          </span>
        </div>

      </div>
    </section>
  );
}
