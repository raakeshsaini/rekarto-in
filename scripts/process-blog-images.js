import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "raw-images/blog";
const OUTPUT_DIR = "public/images/blog";

// OUTPUT RULES (THE ONLY ONES THAT MATTER)
const OUTPUT_WIDTH = 1200;
const MAX_OUTPUT_SIZE_KB = 200;
const WEBP_QUALITY = 80;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(INPUT_DIR);

let hasError = false;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const inputPath = path.join(INPUT_DIR, file);
  const outputName = path.basename(file, ext) + ".webp";
  const outputPath = path.join(OUTPUT_DIR, outputName);

  // Convert → WebP (this is the only thing that matters)
  await sharp(inputPath)
    .resize({ width: OUTPUT_WIDTH })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  const outputStat = fs.statSync(outputPath);
  const outputSizeKB = outputStat.size / 1024;

  // ❌ FAIL ONLY IF FINAL IMAGE IS TOO LARGE
  if (outputSizeKB > MAX_OUTPUT_SIZE_KB) {
    console.error(
      `❌ OUTPUT IMAGE TOO LARGE: ${outputName} (${Math.round(
        outputSizeKB
      )} KB). Max allowed is ${MAX_OUTPUT_SIZE_KB} KB`
    );
    hasError = true;
  } else {
    console.log(
      `✔ ${file} → ${outputName} (${Math.round(outputSizeKB)} KB)`
    );
  }
}

if (hasError) {
  console.error("\n❌ Image optimization failed. Build stopped.\n");
  process.exit(1);
}
