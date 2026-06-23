// Generates app/icon.png, app/apple-icon.png and app/favicon.ico from public/logo-src.png
// Run: node scripts/make-favicons.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "public", "logo-src.png");
const APP = path.join(root, "app");

// Pad the (slightly non-square) logo onto a transparent square, then resize.
async function squarePng(size, opts = {}) {
  return sharp(SRC)
    .resize(size, size, {
      fit: "contain",
      background: opts.bg ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function main() {
  // Main favicon (Next emits <link rel="icon"> for all routes) + iOS icon.
  await writeFile(path.join(APP, "icon.png"), await squarePng(512));
  // Apple touch icon — use an opaque black bg (iOS ignores transparency).
  await writeFile(
    path.join(APP, "apple-icon.png"),
    await squarePng(180, { bg: { r: 0, g: 0, b: 0, alpha: 1 } })
  );

  // Build a multi-size .ico embedding PNG images (browsers support PNG-in-ICO).
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => squarePng(s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4); // image count

  const entries = [];
  let offset = 6 + 16 * sizes.length;
  pngs.forEach((png, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0); // width (0 => 256)
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8); // size of image data
    e.writeUInt32LE(offset, 12); // offset
    offset += png.length;
    entries.push(e);
  });

  const ico = Buffer.concat([header, ...entries, ...pngs]);
  await writeFile(path.join(APP, "favicon.ico"), ico);

  console.log("Generated app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (16/32/48)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
