/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, MessageSquare, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultText?: string;
}

export default function WhatsAppModal({ isOpen, onClose, defaultText }: WhatsAppModalProps) {
  const textParam = encodeURIComponent(
    defaultText || 'Olá! Gostaria de saber mais informações sobre as aulas de Jiu-Jitsu no CT Orelha Fight.'
  );

  const channels = [
    {
      name: 'Comercial / Suporte - Canal 1',
      number: '(21) 9644-28614',
      url: `https://wa.me/5521964428614?text=${textParam}`,
    },
    {
      name: 'Comercial / Atendimento - Canal 2',
      number: '(21) 9644-28613',
      url: `https://wa.me/5521964428613?text=${textParam}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md bg-bg-card border border-brand-primary/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Green glowing orb in modal background */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-primary/10 rounded-full blur-[40px] pointer-events-none" />

            {/* Header info */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-xl border border-brand-primary/20">
                  <MessageSquare className="h-6 w-6 fill-none" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-extrabold uppercase tracking-tight leading-none">
                    Fale Conosco
                  </h3>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary block mt-1.5 uppercase">
                    ATENDIMENTO WHATSAPP
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-text-gray hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-text-gray text-xs sm:text-sm leading-relaxed mb-6">
              Selecione um de nossos contatos autorizados para falar direto com nossa equipe no WhatsApp:
            </p>

            {/* Channels List */}
            <div className="space-y-4">
              {channels.map((channel, idx) => (
                <a
                  key={idx}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-brand-primary/30 rounded-2xl hover:bg-brand-primary/[0.02] transition-all group cursor-pointer"
                >
                  <div>
                    <span className="text-[11px] font-mono text-text-gray block leading-none mb-1 group-hover:text-brand-primary transition-colors">
                      {channel.name}
                    </span>
                    <span className="text-white font-extrabold sm:text-lg block tracking-wide">
                      {channel.number}
                    </span>
                  </div>
                  <div className="p-3 bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-black rounded-xl transition-all border border-brand-primary/15 group-hover:scale-105">
                    <MessageSquare className="h-5 w-5 fill-none" />
                  </div>
                </a>
              ))}
            </div>

            {/* Informational advice */}
            <div className="mt-6 p-3 bg-black/40 rounded-xl border border-white/5 flex gap-2 items-center text-[10px] sm:text-xs text-text-gray">
              <ShieldAlert className="h-4.5 w-4.5 text-brand-primary flex-shrink-0" />
              <span>Nossos canais atendem de Segunda a Sexta em horário comercial para tirar qualquer dúvida sobre turmas e planos.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
