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
  priority = true,
}: TransparentLogoProps) {
  // Always resolves directly to the confirmed current logo from dev
  const activeLogo = src || IMAGES.ctOrelhaFightLogoSm;

  return (
    <img
      src={activeLogo}
      alt={alt}
      width={width}
      height={height}
      className={`${className} bg-transparent`}
      loading="eager"
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
