#!/usr/bin/env node
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "public/fotos";
const OUT = "public/fotos/opt";

const SIZES = [240, 480, 800];

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) =>
  /\.(png|jpe?g)$/i.test(f),
);

for (const file of files) {
  const { name } = parse(file);
  const src = join(SRC, file);
  for (const w of SIZES) {
    const out = join(OUT, `${name}-${w}.webp`);
    try {
      await stat(out);
      continue; // skip existing
    } catch {}
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
    console.log(`  → ${out}`);
  }
}

console.log("done");
