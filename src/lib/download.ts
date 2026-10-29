import { BRAND, PRIMARY_COLOR, createLogoFilename, fontStack, type LogoVariation } from "./logos";

const BASE = 200; // font size in px for export geometry

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

async function ensureFont(l: LogoVariation) {
  await document.fonts.load(`${l.fontWeight} ${BASE}px '${l.fontFamily}'`, BRAND);
  await document.fonts.ready;
}

function measure(l: LogoVariation) {
  const c = document.createElement("canvas").getContext("2d")!;
  c.font = `${l.fontWeight} ${BASE}px ${fontStack(l)}`;
  const spacing = l.letterSpacing * BASE;
  const m = c.measureText(BRAND);
  const width = m.width + spacing * (BRAND.length - 1);
  const ascent = m.actualBoundingBoxAscent;
  const descent = m.actualBoundingBoxDescent;
  const pad = BASE * 0.12;
  const left = Math.max(0, m.actualBoundingBoxLeft);
  return { width, ascent, descent, pad, spacing, left };
}

export async function downloadLogoSvg(l: LogoVariation) {
  await ensureFont(l);
  const { width, ascent, descent, pad, spacing, left } = measure(l);
  const w = Math.ceil(width + left + pad * 2);
  const h = Math.ceil(ascent + descent + pad * 2);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <text x="${(pad + left).toFixed(2)}" y="${(pad + ascent).toFixed(2)}" fill="${PRIMARY_COLOR}" font-family="${fontStack(l).replace(/'/g, "&apos;")}" font-size="${BASE}" font-weight="${l.fontWeight}" letter-spacing="${spacing.toFixed(2)}">${BRAND}</text>
</svg>`;
  triggerDownload(new Blob([svg], { type: "image/svg+xml" }), createLogoFilename(l, "svg"));
}

export async function renderLogoToCanvas(l: LogoVariation, targetWidth = 2048) {
  await ensureFont(l);
  const { width, ascent, descent, pad, spacing, left } = measure(l);
  const w = width + left + pad * 2;
  const h = ascent + descent + pad * 2;
  const scale = targetWidth / w;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.font = `${l.fontWeight} ${BASE}px ${fontStack(l)}`;
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.textBaseline = "alphabetic";
  let x = pad + left;
  for (const ch of BRAND) {
    ctx.fillText(ch, x, pad + ascent);
    x += ctx.measureText(ch).width + spacing;
  }
  return canvas;
}

export async function downloadLogoPng(l: LogoVariation) {
  const canvas = await renderLogoToCanvas(l);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) throw new Error("PNG rendering failed");
  triggerDownload(blob, createLogoFilename(l, "png"));
}
