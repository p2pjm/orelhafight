/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, MouseEvent } from 'react';
import { IMAGES } from '../constants/images';
import { ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const initialSlides = [
  {
    id: 'ct-interior',
    image: IMAGES.ctGymInterior,
    imageSm: IMAGES.ctGymInteriorSm,
    tag: 'FOTO DO NOSSO CT',
    title: 'Estrutura Moderna de Treino',
    description: 'Amplo espaço de tatame de alta densidade em Nova Iguaçu, a 10 minutos da Av. Brasil, higienizado diariamente para sua máxima segurança e conforto operacional.',
  },
  {
    id: 'infantil-aula',
    image: IMAGES.kidsJiuJitsuClass,
    imageSm: IMAGES.kidsJiuJitsuClassSm,
    tag: 'FUTURO',
    title: 'Treinos Infantis Dedicados',
    description: 'Didática adaptada com brincadeiras construtivas e reforços cognitivos de disciplina, obediência e anti-bullying para os pequenos.',
  },
  {
    id: 'momentos-equipe',
    image: IMAGES.jiuJitsuTeamUnity,
    imageSm: IMAGES.jiuJitsuTeamUnitySm,
    tag: 'INTEGRAÇÃO',
    title: 'Amizade e Respeito',
    description: 'Celebrações de graduações, treinos de fim de ano e união familiar. Mais do que treinar Jiu-Jitsu, nós cuidamos uns dos outros.',
  },
  {
    id: 'treino-feminino-galeria',
    image: IMAGES.treinoFeminino,
    imageSm: IMAGES.treinoFemininoSm,
    tag: 'FEMININO',
    title: 'Treino Feminino Exclusivo',
    description: 'Turmas estruturadas com foco em técnicas refinadas, autoconfiança, defesa pessoal e condicionamento no tatame.',
  },
];

export default function HorizontalGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Mouse drag-to-scroll handlers with zero forced layout
  const handleMouseDown = (e: MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDownRef.current = true;
    setIsDraggingState(true);
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseLeaveAndUp = () => {
    isDownRef.current = false;
    setIsDraggingState(false);
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDownRef.current || !scrollContainerRef.current) return;
    e.preventDefault();

    const currentX = e.pageX;
    const walk = (currentX - startXRef.current) * 1.5;

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (scrollContainerRef.current && isDownRef.current) {
          scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
        }
        rafIdRef.current = null;
      });
    }
  };

  // Button desktop navigators using compositor scrollBy (zero forced reflow)
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 420;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="galeria" className="py-24 bg-bg-card relative overflow-hidden border-b border-brand-primary/10">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-radial-gradient from-brand-primary via-black to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Heading Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-primary font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
              Ambiente e Irmandade
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none uppercase" id="gallery-heading">
              Nosso Tatame em Foco
            </h2>
          </div>
          
          {/* Slider controls for desktop */}
          <div className="flex items-center gap-3" id="gallery-controls">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-black border border-white/5 text-text-gray hover:text-brand-primary hover:border-brand-primary/30 transition-all cursor-pointer"
              aria-label="Scroll left"
              id="gallery-scroll-left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-black border border-white/5 text-text-gray hover:text-brand-primary hover:border-brand-primary/30 transition-all cursor-pointer"
              aria-label="Scroll right"
              id="gallery-scroll-right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Track Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeaveAndUp}
          onMouseLeave={handleMouseLeaveAndUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto py-4 px-2 no-scrollbar scroll-smooth active:cursor-grabbing ${
            isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          id="gallery-scroller"
        >
          {initialSlides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-[300px] sm:w-[400px] rounded-2xl overflow-hidden bg-black border border-white/5 hover:border-brand-primary/15 transition-all group flex flex-col select-none"
              id={`gallery-slide-${slide.id}`}
            >
              {/* Image Frame */}
              <div className="w-full aspect-[16/10] overflow-hidden relative">
                <img
                  src={slide.image}
                  srcSet={slide.imageSm ? `${slide.imageSm} 400w, ${slide.image} 800w` : undefined}
                  sizes="(max-width: 640px) 300px, 400px"
                  alt={slide.title}
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  id={`gallery-img-${slide.id}`}
                />
                
                {/* Visual badge top-left */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-brand-primary/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#8EFF5C] uppercase font-bold flex items-center gap-1.5 z-10">
                  <Sparkles className="h-3 w-3" />
                  {slide.tag}
                </div>
              </div>

              {/* Sub-copy Info Panel */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-brand-primary transition-colors">
                    {slide.title}
                  </h3>
                  <p className="text-text-gray text-xs sm:text-sm leading-relaxed mb-4">
                    {slide.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-primary/60 group-hover:text-brand-primary transition-colors font-semibold uppercase tracking-wider">
                  <Eye className="h-3.5 w-3.5" />
                  CT Orelha Fight Nova Iguaçu
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip indicator */}
        <div className="mt-6 flex justify-center text-text-gray font-mono text-[11px] gap-2 items-center" id="gallery-drag-tip">
          <span className="h-1.5 w-8 rounded bg-brand-primary/25 animate-pulse" />
          Arraste com o mouse ou passe o dedo para rolar a galeria
          <span className="h-1.5 w-8 rounded bg-brand-primary/25 animate-pulse" />
        </div>

      </div>
    </section>
  );
}
