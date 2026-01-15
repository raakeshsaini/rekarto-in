import fs from "fs";
import path from "path";

/**
 * CI-safe blog image processor
 * - Skips if no raw images exist
 * - Never crashes build
 */

const RAW_DIR = "raw-images/blog";
const OUT_DIR = "public/images/blog";

if (!fs.existsSync(RAW_DIR)) {
  console.log("[images] No raw blog images found. Skipping image processing.");
  process.exit(0);
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const files = fs.readdirSync(RAW_DIR);

files.forEach((file) => {
  const src = path.join(RAW_DIR, file);
  const dest = path.join(OUT_DIR, file);

  if (!fs.statSync(src).isFile()) return;

  // TEMP: simple copy (conversion can be re-added later)
  fs.copyFileSync(src, dest);
});

console.log(`[images] Processed ${files.length} blog images.`);
