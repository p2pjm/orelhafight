/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES } from '../constants/images';

interface TransparentLogoProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function TransparentLogo({
  src = IMAGES.ctOrelhaFightLogoSm,
  alt = 'Logo CT Orelha Fight',
  className = 'h-14 w-14 object-contain',
  width = 56,
  height = 56,
  priority = false,
}: TransparentLogoProps) {
  // Use pre-optimized transparent WebP logo by default for optimal performance and zero runtime CPU overhead
  const resolvedSrc = src.includes('ct_orelha_fight_logo')
    ? IMAGES.ctOrelhaFightLogoSm
    : src;

  return (
    <img
      src={resolvedSrc}
      srcSet={`${IMAGES.ctOrelhaFightLogoSm} 160w, ${IMAGES.ctOrelhaFightLogo} 800w`}
      sizes="(max-width: 640px) 56px, 64px"
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
    />
  );
}
