import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets/images-src';
const OUT = 'src/assets/images';
const WIDTHS = [400, 800];

const formats = {
  avif: (img) => img.avif({ quality: 55 }),
  webp: (img) => img.webp({ quality: 75 }),
  jpg: (img) => img.jpeg({ quality: 78, mozjpeg: true }),
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    for (const [ext, encode] of Object.entries(formats)) {
      const out = path.join(OUT, `${name}-${width}.${ext}`);
      await encode(sharp(path.join(SRC, file)).resize({ width })).toFile(out);
    }
  }
  console.log(`✓ ${name}`);
}
console.log(`Готово: ${files.length} зображень × ${WIDTHS.length} розміри × 3 формати`);
