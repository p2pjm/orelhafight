/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import { IMAGES } from '../constants/images';

interface AnimatedLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function AnimatedLogo({
  className = 'h-14 w-14 object-contain filter drop-shadow-[0_0_8px_rgba(115,227,77,0.2)]',
  width = 56,
  height = 56,
}: AnimatedLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure silent autoplay compliance
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser policy defers autoplay
        });
      }
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        width={width}
        height={height}
        className={`${className} pointer-events-none select-none`}
        aria-label="Logo animada oficial CT Orelha Fight"
      >
        <source src="/assets/videos/logo_animation.webm" type="video/webm" />
        <source src="/assets/videos/logo_animation.mp4" type="video/mp4" />
        {/* Fallback image */}
        <img
          src={IMAGES.ctOrelhaFightLogoSm}
          alt="Logo CT Orelha Fight"
          width={width}
          height={height}
          className={className}
        />
      </video>
    </div>
  );
}
