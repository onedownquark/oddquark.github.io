import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images';

async function optimizeImages() {
  const avatarIn = path.join(imagesDir, 'onedownquark-chatgpt.png');
  const avatarOut = path.join(imagesDir, 'avatar-optimized.webp');

  const bgIn = path.join(imagesDir, 'flux_background.jpeg');
  const bgOut = path.join(imagesDir, 'flux-bg-optimized.webp');

  console.log('Optimizing avatar...');
  await sharp(avatarIn)
    .resize(512, 512)
    .webp({ quality: 80 })
    .toFile(avatarOut);
  console.log(`Saved optimized avatar to ${avatarOut}`);

  console.log('Optimizing background...');
  await sharp(bgIn)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(bgOut);
  console.log(`Saved optimized background to ${bgOut}`);
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
