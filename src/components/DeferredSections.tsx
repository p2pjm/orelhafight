/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import ProfessorHighlight from './ProfessorHighlight';
import Manifesto from './Manifesto';
import Benefits from './Benefits';
import TargetAudience from './TargetAudience';
import GymDifferentiators from './GymDifferentiators';
import Methodology from './Methodology';
import FirstClassTutorial from './FirstClassTutorial';
import WomensTraining from './WomensTraining';
import HorizontalGallery from './HorizontalGallery';
import SocialProof from './SocialProof';
import FAQ from './FAQ';
import CTASection from './CTASection';
import Footer from './Footer';
import SectionReveal from './SectionReveal';

const AdminCarousel = lazy(() => import('./AdminCarousel'));

export default function DeferredSections() {
  return (
    <>
      {/* 2. Bloco Especial de Autoridade do Professor */}
      <SectionReveal>
        <ProfessorHighlight />
      </SectionReveal>

      {/* 3. Manifesto Emocional */}
      <SectionReveal>
        <Manifesto />
      </SectionReveal>

      {/* 4. Benefícios do Jiu-Jitsu */}
      <SectionReveal>
        <Benefits />
      </SectionReveal>

      {/* 5. Segmentação (Para quem é o CT) */}
      <SectionReveal>
        <TargetAudience />
      </SectionReveal>

      {/* 6. Diferenciais do CT */}
      <SectionReveal>
        <GymDifferentiators />
      </SectionReveal>

      {/* 7. O Método (3 pilares de ensino) */}
      <SectionReveal>
        <Methodology />
      </SectionReveal>

      {/* 8. Como Funciona a Primeira Aula (Trial) */}
      <SectionReveal>
        <FirstClassTutorial />
      </SectionReveal>

      {/* 8b. Treino Feminino Especial */}
      <SectionReveal>
        <WomensTraining />
      </SectionReveal>

      {/* 9. Galeria Editorial Horizontal Scroll */}
      <SectionReveal>
        <HorizontalGallery />
      </SectionReveal>

      {/* 9b. Carrossel de Fotos do Administrador (Carregamento Otimizado Sob Demanda) */}
      <SectionReveal>
        <Suspense fallback={null}>
          <AdminCarousel />
        </Suspense>
      </SectionReveal>

      {/* 10. Prova Social e Resultados */}
      <SectionReveal>
        <SocialProof />
      </SectionReveal>

      {/* 11. Accordions FAQ */}
      <SectionReveal>
        <FAQ />
      </SectionReveal>

      {/* 12. CTA Final Estetizado */}
      <SectionReveal>
        <CTASection />
      </SectionReveal>

      {/* 13. Rodapé com SEO Local */}
      <SectionReveal>
        <Footer />
      </SectionReveal>
    </>
  );
}
