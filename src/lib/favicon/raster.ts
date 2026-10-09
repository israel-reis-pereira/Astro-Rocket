/**
 * Favicon generation — the raster half.
 *
 * `sharp` is a native Node module. It cannot load in workerd, so nothing here
 * may be imported by a page or by a prerendered endpoint when building for
 * Cloudflare. These are called from the `favicon-assets` integration in
 * `astro.config.mjs`, which runs in `astro:build:done` — always in Node, on
 * every adapter.
 */
import pngToIco from 'png-to-ico';
import { buildFaviconSvg } from './svg.ts';
import { runSharpTask } from '../sharp-worker.ts';

/** Rasterise the favicon SVG to a square PNG buffer of the given pixel size. */
export async function renderFaviconPng(
  letter: string,
  bgColor: string,
  size: number,
  fgColor = '#ffffff'
): Promise<Buffer> {
  const svg = buildFaviconSvg(letter, bgColor, fgColor, size);
  return runSharpTask({ kind: 'favicon', svg });
}

/** Build a multi-size favicon.ico (16/32/48) from the outlined SVG. */
export async function renderFaviconIco(
  letter: string,
  bgColor: string,
  fgColor = '#ffffff'
): Promise<Buffer> {
  const pngs = await Promise.all(
    [16, 32, 48].map((s) => renderFaviconPng(letter, bgColor, s, fgColor))
  );
  return pngToIco(pngs);
}
