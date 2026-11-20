import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name, encoding) => readFile(resolve(root, name), encoding);
const template = await read('fitness-source/shell.html', 'utf8');
const weights = [400, 500, 600, 700];
const fonts = [];
for (const weight of weights) {
  for (const subset of ['arabic', 'latin']) {
    const woff2 = await read(`design/fonts/${subset}-${weight}.woff2`);
    const range = subset === 'arabic' ? 'U+0600-06FF,U+0750-077F,U+0870-08FF,U+200C-200F,U+FB50-FDFF,U+FE70-FEFC' : 'U+0000-024F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2190-21FF,U+2200-22FF';
    fonts.push(`@font-face{font-family:'IBM Plex Sans Arabic';font-weight:${weight};font-style:normal;font-display:swap;unicode-range:${range};src:url(data:font/woff2;base64,${woff2.toString('base64')}) format('woff2')}`);
  }
}
const jpg = await read('design/training-hero.jpg');
const css = (await read('fitness-source/theme.css', 'utf8'))
  .replace('/*__EMBEDDED_FONTS__*/', () => fonts.join('\n'))
  .replace('/*__EMBEDDED_HERO__*/', () => `data:image/jpeg;base64,${jpg.toString('base64')}`);
const scripts = await Promise.all(['catalog','model','dashboard','food','training','progress','boot'].map(f=>read(`fitness-source/${f}.js`, 'utf8')));
const source = `(function(){\n'use strict';\n${scripts.join('\n\n')}\n})();`;
// Check assembled browser JavaScript before writing the distributable.
new Script(source, { filename: 'forma-browser.js' });
const license = (await read('design/fonts/OFL.txt','utf8')).replaceAll('-->', '—>');
const html = template.replace('/*__FITNESS_STYLES__*/', () => `\n${css}\n`).replace('/*__FITNESS_SCRIPT__*/', () => `\n${source.replace(/<\/script/gi,'<\\/script')}\n`).replace('<head>', () => `<head>\n<!-- IBM Plex Sans Arabic — SIL Open Font License\n${license}\n-->`);
const pages = process.argv.includes('--pages');
const staticHtml = html.replace('data-host="server"', 'data-host="static"').replace("connect-src 'self'", "connect-src 'none'");
const files = pages ? { 'index.html': staticHtml } : {
  'public/index.html': html,
  'public/downloads/index.html': staticHtml,
};
for (const [output, contents] of Object.entries(files)) {
  await mkdir(dirname(resolve(root, output)), { recursive: true });
  await writeFile(resolve(root, output), contents, 'utf8');
  console.log(`${output} · ${Math.round(Buffer.byteLength(contents)/1024)} KiB · self-contained`);
}
