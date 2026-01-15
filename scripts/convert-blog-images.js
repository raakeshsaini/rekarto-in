import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "raw-images/blog";
const outputDir = "public/images/blog";

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const inputPath = path.join(inputDir, file);
  const outputName = path.basename(file, ext) + ".webp";
  const outputPath = path.join(outputDir, outputName);

  await sharp(inputPath)
    .resize({ width: 1200 })
    .webp({ quality: 82 })
    .toFile(outputPath);

  console.log(`✔ Converted ${file} → ${outputName}`);
}
