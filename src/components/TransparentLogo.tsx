/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface TransparentLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentLogo({ src, alt, className }: TransparentLogoProps) {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

  useEffect(() => {
    let active = true;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Sample background color from the four corners of the image
      const cornerIdxs = [
        0, // top-left
        (width - 1) * 4, // top-right
        (height - 1) * width * 4, // bottom-left
        ((height - 1) * width + (width - 1)) * 4 // bottom-right
      ];

      let sumR = 0, sumG = 0, sumB = 0, count = 0;
      for (const cIdx of cornerIdxs) {
        if (cIdx < data.length && data[cIdx + 3] > 0) { // only count non-transparent corners
          sumR += data[cIdx];
          sumG += data[cIdx + 1];
          sumB += data[cIdx + 2];
          count++;
        }
      }

      const bgR = count > 0 ? sumR / count : 255;
      const bgG = count > 0 ? sumG / count : 255;
      const bgB = count > 0 ? sumB / count : 255;

      // Define what constitutes a background pixel
      const isBackgroundPixel = (r: number, g: number, b: number, a: number): boolean => {
        if (a === 0) return true; // Already transparent

        // Compute Euclidean distance in RGB space to the sampled background color
        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        
        // Highly precise threshold: only remove pixels extremely close to the sampled off-white background
        // to prevent any leaking into the green shield or black elements or white text.
        return dist < 35;
      };

      // Active matrix for BFS tracking
      const visited = new Uint8Array(width * height);
      const queue: [number, number][] = [];

      // Initialize flood-fill seeds from all boundaries (top, bottom, left, right edges)
      // to ensure any background pocket touching the boundary is cleared
      for (let x = 0; x < width; x++) {
        // Top row
        const idxTop = x * 4;
        if (isBackgroundPixel(data[idxTop], data[idxTop + 1], data[idxTop + 2], data[idxTop + 3])) {
          queue.push([x, 0]);
          visited[x] = 1;
        }
        // Bottom row
        const idxBot = ((height - 1) * width + x) * 4;
        if (isBackgroundPixel(data[idxBot], data[idxBot + 1], data[idxBot + 2], data[idxBot + 3])) {
          queue.push([x, height - 1]);
          visited[(height - 1) * width + x] = 1;
        }
      }

      for (let y = 1; y < height - 1; y++) {
        // Left column
        const idxLeft = y * width * 4;
        if (isBackgroundPixel(data[idxLeft], data[idxLeft + 1], data[idxLeft + 2], data[idxLeft + 3])) {
          queue.push([0, y]);
          visited[y * width] = 1;
        }
        // Right column
        const idxRight = (y * width + (width - 1)) * 4;
        if (isBackgroundPixel(data[idxRight], data[idxRight + 1], data[idxRight + 2], data[idxRight + 3])) {
          queue.push([width - 1, y]);
          visited[y * width + (width - 1)] = 1;
        }
      }

      // Perform the flood fill (BFS)
      let head = 0;
      while (head < queue.length) {
        const [x, y] = queue[head++];
        const idx = (y * width + x) * 4;

        // Clear the background pixel
        data[idx] = 0;     // Red
        data[idx + 1] = 0; // Green
        data[idx + 2] = 0; // Blue
        data[idx + 3] = 0; // Alpha (fully transparent)

        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1]
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = ny * width + nx;
            if (visited[nIdx] === 0) {
              const nIdx4 = nIdx * 4;
              const nr = data[nIdx4];
              const ng = data[nIdx4 + 1];
              const nb = data[nIdx4 + 2];
              const na = data[nIdx4 + 3];

              if (isBackgroundPixel(nr, ng, nb, na)) {
                visited[nIdx] = 1;
                queue.push([nx, ny]);
              }
            }
          }
        }
      }

      // Render the transparent image back to canvas
      ctx.putImageData(imgData, 0, 0);
      if (active) {
        setProcessedSrc(canvas.toDataURL('image/png'));
      }
    };

    img.src = src;

    return () => {
      active = false;
    };
  }, [src]);

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
