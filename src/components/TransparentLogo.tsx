/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { IMAGES } from '../constants/images';

interface TransparentLogoProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

// Global in-memory cache to prevent redundant processing across renders and components
const processedCache = new Map<string, string>();

/**
 * Client-side flood-fill transparency algorithm:
 * Inspects all outer border pixels and converts connected light/white background
 * pixels to transparent (alpha = 0) with smooth edge anti-aliasing.
 */
function makeWhiteBackgroundTransparent(img: HTMLImageElement, threshold = 210): string | null {
  try {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return null;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0, w, h);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Check if image already has transparent borders
    let hasTransparentBorders = true;
    for (let x = 0; x < w; x += 4) {
      if (data[(0 * w + x) * 4 + 3] > 30 || data[((h - 1) * w + x) * 4 + 3] > 30) {
        hasTransparentBorders = false;
        break;
      }
    }
    if (hasTransparentBorders) {
      return null;
    }

    const visited = new Uint8Array(w * h);
    const queue: number[] = [];

    const isLight = (x: number, y: number) => {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      return r >= threshold && g >= threshold && b >= threshold;
    };

    // Push border pixels
    for (let x = 0; x < w; x++) {
      if (isLight(x, 0)) { queue.push(x, 0); visited[x] = 1; }
      if (isLight(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
    }
    for (let y = 0; y < h; y++) {
      if (isLight(0, y) && !visited[y * w]) { queue.push(0, y); visited[y * w] = 1; }
      if (isLight(w - 1, y) && !visited[y * w + (w - 1)]) { queue.push(w - 1, y); visited[y * w + (w - 1)] = 1; }
    }

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];

      const neighbors = [
        [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const npos = ny * w + nx;
          if (!visited[npos] && isLight(nx, ny)) {
            visited[npos] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }

    // Convert visited outer pixels to transparent
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const pos = y * w + x;
        const idx = pos * 4;
        if (visited[pos]) {
          data[idx + 3] = 0;
        } else {
          // Anti-alias edge boundary
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const isNeighborToTrans =
            (x > 0 && visited[pos - 1]) ||
            (x < w - 1 && visited[pos + 1]) ||
            (y > 0 && visited[pos - w]) ||
            (y < h - 1 && visited[pos + w]);

          if (isNeighborToTrans && r > 185 && g > 185 && b > 185) {
            const brightness = (r + g + b) / 3;
            const alpha = Math.max(0, Math.min(255, (255 - brightness) * 4));
            data[idx + 3] = Math.round(alpha);
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

export default function TransparentLogo({
  src = IMAGES.ctOrelhaFightLogoSm,
  alt = 'Logo CT Orelha Fight',
  className = 'h-14 w-14 object-contain',
  width = 56,
  height = 56,
  priority = false,
}: TransparentLogoProps) {
  const resolvedSrc = src.includes('ct_orelha_fight_logo')
    ? IMAGES.ctOrelhaFightLogoSm
    : src;

  const [processedSrc, setProcessedSrc] = useState<string>(() => {
    return processedCache.get(resolvedSrc) || resolvedSrc;
  });

  const imgRef = useRef<HTMLImageElement>(null);

  const processImage = (imgElement: HTMLImageElement) => {
    if (processedCache.has(resolvedSrc)) {
      setProcessedSrc(processedCache.get(resolvedSrc)!);
      return;
    }
    const transparentDataUrl = makeWhiteBackgroundTransparent(imgElement);
    if (transparentDataUrl) {
      processedCache.set(resolvedSrc, transparentDataUrl);
      setProcessedSrc(transparentDataUrl);
    }
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      processImage(imgRef.current);
    }
  }, [resolvedSrc]);

  return (
    <img
      ref={imgRef}
      src={processedSrc}
      srcSet={processedSrc === resolvedSrc ? `${IMAGES.ctOrelhaFightLogoSm} 160w, ${IMAGES.ctOrelhaFightLogo} 500w` : undefined}
      sizes="(max-width: 640px) 56px, 64px"
      alt={alt}
      width={width}
      height={height}
      className={`${className} bg-transparent`}
      loading="eager"
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onLoad={(e) => processImage(e.currentTarget)}
    />
  );
}
