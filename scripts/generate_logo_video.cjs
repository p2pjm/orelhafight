/**
 * Generates an ultra-optimized animated video (WebM with alpha + MP4 fallback)
 * of the CT Orelha Fight logo, replicating the video animation:
 * 1. Initial dark state
 * 2. Neon power-up / electric ignition
 * 3. Diagonal metallic specular shine sweep
 * 4. Ambient breathing neon pulse
 * 5. Smooth seamless loop
 *
 * Encoded without audio (-an) and optimized for microscopic file size (<100KB).
 */

const fs = require('fs');
const path = require('path');
const child = require('child_process');

const SRC_IMG = path.resolve(__dirname, '../src/assets/images/ct_orelha_fight_logo_transparent.png');
const OUT_DIR = path.resolve(__dirname, '../public/assets/videos');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log('Extracting raw RGBA from source PNG...');
// Resize source to 256x256 directly using ffmpeg
const W = 256;
const H = 256;
const rawBase = child.execSync(`ffmpeg -i "${SRC_IMG}" -vf "scale=${W}:${H}:flags=lanczos" -v quiet -f rawvideo -pix_fmt rgba -`);

console.log(`Source prepared: ${W}x${H}, ${rawBase.length} bytes`);

const FPS = 30;
const DURATION = 4.0;
const TOTAL_FRAMES = Math.round(FPS * DURATION); // 120 frames

// We will stream raw frames into ffmpeg processes via stdin
// Process 1: WebM with VP9 and alpha channel (yuva420p)
// Process 2: MP4 with x264 (yuv420p, black background composite for universal compatibility)

const webmOutPath = path.join(OUT_DIR, 'logo_animation.webm');
const mp4OutPath = path.join(OUT_DIR, 'logo_animation.mp4');

// Setup WebM ffmpeg process
const ffmpegWebm = child.spawn('ffmpeg', [
  '-y',
  '-f', 'rawvideo',
  '-pix_fmt', 'rgba',
  '-s', `${W}x${H}`,
  '-r', `${FPS}`,
  '-i', 'pipe:0',
  '-an', // No audio
  '-c:v', 'libvpx-vp9',
  '-pix_fmt', 'yuva420p',
  '-crf', '32',
  '-b:v', '0',
  '-auto-alt-ref', '0',
  '-loop', '0',
  webmOutPath
]);

ffmpegWebm.stderr.on('data', (d) => {
  // Suppress unless error
});

// Setup MP4 ffmpeg process (composite over transparent/dark background)
const ffmpegMp4 = child.spawn('ffmpeg', [
  '-y',
  '-f', 'rawvideo',
  '-pix_fmt', 'rgba',
  '-s', `${W}x${H}`,
  '-r', `${FPS}`,
  '-i', 'pipe:0',
  '-an', // No audio
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-crf', '26',
  '-preset', 'slow',
  '-movflags', '+faststart',
  mp4OutPath
]);

ffmpegMp4.stderr.on('data', (d) => {
  // Suppress unless error
});

console.log(`Generating ${TOTAL_FRAMES} frames...`);

const frameBuffer = Buffer.alloc(W * H * 4);

for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
  const t = frame / FPS; // 0.0 to 4.0

  // Animation timeline parameters
  let power = 0.2; // base brightness
  let shineIntensity = 0;
  let shinePos = -1;

  if (t < 0.5) {
    // Phase 1: Dim dark outline
    power = 0.22;
  } else if (t < 1.1) {
    // Phase 2: Electric power ignition!
    const progress = (t - 0.5) / 0.6; // 0 to 1
    // Ease-in with flash peak at 0.8
    if (progress < 0.6) {
      const p = progress / 0.6;
      power = 0.22 + Math.pow(p, 2) * 1.15; // surge to 1.37
    } else {
      const p = (progress - 0.6) / 0.4;
      power = 1.37 - p * 0.37; // settle to 1.0
    }
  } else if (t < 2.5) {
    // Phase 3: Diagonal Specular Shine sweep
    power = 1.0;
    const progress = (t - 1.1) / 1.4; // 0 to 1
    shinePos = progress * 1.5 - 0.25; // sweeps from -0.25 to 1.25
  } else if (t < 3.5) {
    // Phase 4: Ambient neon pulse / breathing
    const progress = (t - 2.5) / 1.0;
    power = 1.0 + 0.12 * Math.sin(progress * Math.PI * 2);
  } else {
    // Phase 5: Smooth loop return
    const progress = (t - 3.5) / 0.5;
    power = 1.0 - progress * (1.0 - 0.22);
  }

  // Render pixels for this frame
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const srcA = rawBase[idx + 3];

      if (srcA === 0) {
        frameBuffer[idx] = 0;
        frameBuffer[idx + 1] = 0;
        frameBuffer[idx + 2] = 0;
        frameBuffer[idx + 3] = 0;
        continue;
      }

      let r = rawBase[idx];
      let g = rawBase[idx + 1];
      let b = rawBase[idx + 2];
      let a = srcA;

      // Determine pixel type
      const isGreen = g > 80 && g > r * 1.15 && g > b * 1.15;
      const isWhiteText = r > 160 && g > 160 && b > 160;

      // Apply power factor
      if (isGreen) {
        // Boost green saturation during glow
        r = Math.min(255, Math.round(r * power * 0.7));
        g = Math.min(255, Math.round(g * power * 1.05));
        b = Math.min(255, Math.round(b * power * 0.7));
      } else if (isWhiteText) {
        const textPower = Math.max(0.4, power);
        r = Math.min(255, Math.round(r * textPower));
        g = Math.min(255, Math.round(g * textPower));
        b = Math.min(255, Math.round(b * textPower));
      } else {
        // Black belt and dark details
        const darkPower = Math.max(0.3, Math.min(1.0, power));
        r = Math.min(255, Math.round(r * darkPower));
        g = Math.min(255, Math.round(g * darkPower));
        b = Math.min(255, Math.round(b * darkPower));
      }

      // Specular shine beam (diagonal sweep)
      if (shinePos >= -0.2) {
        const diagCoord = (x / W + y / H) * 0.5; // 0 at top-left, 1 at bottom-right
        const dist = Math.abs(diagCoord - shinePos);
        if (dist < 0.14) {
          const shineFactor = Math.pow(1 - dist / 0.14, 2);
          const addWhite = Math.round(shineFactor * 190);
          r = Math.min(255, r + addWhite);
          g = Math.min(255, g + addWhite);
          b = Math.min(255, b + addWhite);
        }
      }

      frameBuffer[idx] = r;
      frameBuffer[idx + 1] = g;
      frameBuffer[idx + 2] = b;
      frameBuffer[idx + 3] = a;
    }
  }

  ffmpegWebm.stdin.write(frameBuffer);
  ffmpegMp4.stdin.write(frameBuffer);
}

ffmpegWebm.stdin.end();
ffmpegMp4.stdin.end();

Promise.all([
  new Promise((res) => ffmpegWebm.on('close', res)),
  new Promise((res) => ffmpegMp4.on('close', res)),
]).then(() => {
  const statWebm = fs.statSync(webmOutPath);
  const statMp4 = fs.statSync(mp4OutPath);
  console.log('Video generation complete!');
  console.log(`WebM size: ${(statWebm.size / 1024).toFixed(1)} KB (${webmOutPath})`);
  console.log(`MP4 size:  ${(statMp4.size / 1024).toFixed(1)} KB (${mp4OutPath})`);
});
