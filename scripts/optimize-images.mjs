import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const rel = filePath.slice(publicDir.length + 1);
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  const meta = await sharp(filePath).metadata();
  const isHero = rel === 'herosection.png';
  const isService = rel.startsWith('services/');
  const maxWidth = isHero ? 1400 : isService ? 800 : 1200;

  let pipeline = sharp(filePath).rotate();
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality: isHero ? 82 : 78, effort: 4 }).toFile(webpPath);
  const webpSize = (await stat(webpPath)).size;

  if (isHero) {
    const mobilePath = filePath.replace(/\.png$/i, '-mobile.webp');
    await sharp(filePath)
      .rotate()
      .resize(828, null, { withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(mobilePath);
    const mobileSize = (await stat(mobilePath)).size;
    console.log(`  ${rel} → mobile.webp (${(mobileSize / 1024).toFixed(0)}KB)`);
  }

  const origSize = (await stat(filePath)).size;
  console.log(`  ${rel} → .webp (${(webpSize / 1024).toFixed(0)}KB, was ${(origSize / 1024).toFixed(0)}KB)`);
}

const images = await walk(publicDir);
console.log(`Optimizing ${images.length} images…`);
for (const file of images) {
  await optimizeImage(file);
}
console.log('Done.');
