/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    id: 'exp',
    question: 'Preciso ter alguma experiência prévia para começar?',
    answer: 'De forma alguma! Mais de 70% dos alunos que entram no CT Orelha Fight começam do absoluto zero. Nossa metodologia para iniciantes é estruturada passo a passo para ensinar as posições mais básicas de postura, pegada e quedas sem que você se sinta sobrecarregado ou cansado demais.',
  },
  {
    id: 'crianca',
    question: 'O CT atende crianças? A partir de qual idade?',
    answer: 'Sim! Atendemos o público infantil a partir dos 4 anos. Nossas aulas para crianças são lúdicas, altamente seguras, focadas em disciplina, evolução motora, respeito aos pais e defesa pessoal antibullying prática sem agressões.',
  },
  {
    id: 'kimono',
    question: 'Preciso comprar um kimono antes de fazer a primeira aula?',
    answer: 'Não! Para a sua primeira aula experimental. Recomendamos que venha com uma roupa esportiva leve (como camisa dry-fit e bermuda térmica ou calça de moletom) para usar por baixo.',
  },
  {
    id: 'agendar',
    question: 'Como faço para agendar minha aula experimental gratuita?',
    answer: 'É extremamente simples. Basta clicar em qualquer botão de WhatsApp nesta página para falar com nossa equipe comercial. Nós agendaremos o melhor horário de acordo com a sua rotina semanal de trabalho e estudos.',
  },
  {
    id: 'horarios',
    question: 'Quais são os horários de treino disponíveis no CT?',
    answer: 'Possuímos horários flexíveis: manhãs (Treinamento Funcional com Instrutor Geovane) e turnos da noite (tanto para crianças, adolescentes quanto para turmas de adultos). Ao entrar em contato via WhatsApp, enviaremos a grade completa de horários atualizada.',
  },
  {
    id: 'contato',
    question: 'Como entro em contato com o CT Orelha Fight?',
    answer: 'Nosso canal direto oficial é o WhatsApp (disponível nos CTAs desta página). Você também pode acompanhar nosso dia a dia, postagens de treinos, graduações e novidades diretamente no nosso perfil do Instagram.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleWhatsApp = () => {
    window.dispatchEvent(
      new CustomEvent('open-whatsapp-modal', {
        detail: { text: 'Olá! Estava lendo o FAQ e gostaria de esclarecer outras dúvidas.' },
      })
    );
  };

  return (
    <section id="faq" className="py-24 bg-bg-card relative border-b border-brand-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Banner with heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight uppercase" id="faq-heading">
            Perguntas Comuns
          </h2>
          <p className="text-text-gray text-base mt-3" id="faq-subtext">
            Compilamos as principais dúvidas que novos alunos possuem antes de pisar no tatame pela primeira vez. Clique para conferir as respostas.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4 mb-12" id="faq-accordion-group">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-black border border-white/5 rounded-2xl hover:border-brand-primary/20 transition-all overflow-hidden"
                id={`faq-item-wrapper-${faq.id}`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-trigger-${faq.id}`}
                >
                  <span className="text-white text-sm sm:text-base font-bold tracking-tight pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-text-gray group-hover:text-brand-primary transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-primary' : ''
                  }`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      id={`faq-answer-pane-${faq.id}`}
                    >
                      <div className="px-6 pb-6 pt-1 text-text-gray text-xs sm:text-sm leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Secondary prompt CTA to contact */}
        <div className="p-6 rounded-2xl bg-brand-dark/15 border border-brand-primary/15 flex flex-col sm:flex-row items-center justify-between gap-6" id="faq-footer-block">
          <div className="flex items-center gap-4 text-center sm:text-left self-start sm:self-auto">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/15 hidden sm:block">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Tem alguma outra pergunta?</h4>
              <p className="text-text-gray text-xs block mt-0.5">Nossa equipe responderá você no WhatsApp agora mesmo.</p>
            </div>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-6 py-3 bg-brand-primary text-black font-semibold rounded-xl hover:bg-brand-highlight transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            id="faq-whatsapp-touch-cta"
          >
            <MessageSquare className="h-4.5 w-4.5 fill-black text-black" />
            Tirar Dúvida no Whats
          </button>
        </div>

      </div>
    </section>
  );
}
