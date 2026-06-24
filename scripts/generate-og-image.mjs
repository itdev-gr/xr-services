import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const outputPath = join(publicDir, 'og-default.png');

const WIDTH = 1200;
const HEIGHT = 630;

const hero = await sharp(join(publicDir, 'herosection.png'))
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'right' })
  .modulate({ brightness: 0.72 })
  .toBuffer();

const overlay = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0a1228" stop-opacity="0.92"/>
        <stop offset="55%" stop-color="#0f1c3f" stop-opacity="0.78"/>
        <stop offset="100%" stop-color="#0f1c3f" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
    <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="#c8102e"/>
  </svg>`,
);

const logo = await sharp(join(publicDir, 'XRS-MAIN-8.webp'))
  .resize(420, null, { withoutEnlargement: true })
  .png()
  .toBuffer();

const logoMeta = await sharp(logo).metadata();
const logoLeft = 72;
const logoTop = Math.round((HEIGHT - logoMeta.height) / 2) - 24;

const titleSvg = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <text x="72" y="${logoTop + logoMeta.height + 56}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">Λογιστικές &amp; Φοροτεχνικές Υπηρεσίες</text>
    <text x="72" y="${logoTop + logoMeta.height + 98}" fill="#ffffff" font-size="24" opacity="0.88">xr-services.gr</text>
  </svg>`,
);

await sharp(hero)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: logoTop, left: logoLeft },
    { input: titleSvg, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`Generated ${outputPath} (${WIDTH}x${HEIGHT})`);
