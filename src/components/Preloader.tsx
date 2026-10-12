/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import logoAnimationMp4 from '../assets/videos/logo_animation.mp4';
import logoAnimationWebm from '../assets/videos/logo_animation.webm';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Iniciando CT Orelha Fight...');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt auto-playback as soon as mounted
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser autoplay policies restrict, animation still proceeds smoothly
        });
      }
    }

    const startTime = performance.now();
    const duration = 3200; // 3.2 seconds matches the shield reveal perfectly

    let animationFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(rawProgress);

      if (rawProgress < 30) {
        setStatusMessage('Iniciando CT Orelha Fight...');
      } else if (rawProgress < 65) {
        setStatusMessage('Carregando o tatame...');
      } else if (rawProgress < 92) {
        setStatusMessage('Preparando sua experiência...');
      } else {
        setStatusMessage('Pronto para o treino!');
      }

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Hold 100% for 300ms before smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 600); // 600ms fade transition
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      id="preloader-overlay"
      aria-live="polite"
      role="status"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full px-6 text-center">
        {/* Animated Shield Video */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center relative filter drop-shadow-[0_0_25px_rgba(115,227,77,0.35)]">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-contain pointer-events-none"
              aria-label="Animação do escudo CT Orelha Fight"
            >
              <source src={logoAnimationWebm} type="video/webm" />
              <source src={logoAnimationMp4} type="video/mp4" />
              <source src="/assets/videos/logo_animation.webm" type="video/webm" />
              <source src="/assets/videos/logo_animation.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-extrabold text-xl sm:text-2xl tracking-wider text-white mb-1">
          CT ORELHA FIGHT
        </h1>
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-primary font-bold mb-6">
          Escola de Luta • Carlson Gracie Team
        </p>

        {/* Progress bar container */}
        <div className="w-full max-w-[260px] sm:max-w-[300px] space-y-2.5">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#73E34D]/80 to-[#73E34D] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(115,227,77,0.9)]"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>

          {/* Status and percentage counter */}
          <div className="flex items-center justify-between text-[11px] font-mono text-text-gray px-1">
            <span className="text-text-gray/80">{statusMessage}</span>
            <span className="text-brand-primary font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Skip button for immediate entry */}
        <button
          onClick={handleSkip}
          type="button"
          className="mt-8 text-[11px] font-mono text-text-gray/60 hover:text-white px-3 py-1 rounded-md transition-colors cursor-pointer border border-transparent hover:border-white/10"
        >
          Pular introdução →
        </button>
      </div>
    </div>
  );
}
