import { readFileSync, writeFileSync } from 'node:fs';

const SRC = new URL('../..', import.meta.url).pathname; // repo root
const rd = p => readFileSync(p);
const b64 = p => rd(p).toString('base64');

let html = readFileSync(`${SRC}/index.html`, 'utf8');
const before = html.length;
const log = [];
function must(cond, msg){ if(!cond){ console.error('FAIL:', msg); process.exit(1); } log.push('ok: '+msg); }

// ---------------------------------------------------------------- 1. head: drop external service links
const headKills = [
  /<!-- invitation-only gate:[^>]*-->\n<script src="gate\.js\?v=\d+"><\/script>\n/,   // the claude.ai artifact is shared deliberately; no gate
  /<!-- warm the voice-agent network path[^>]*-->\n/,
  /<link rel="preconnect" href="https:\/\/api\.elevenlabs\.io" crossorigin \/>\n/,
  /<link rel="preconnect" href="https:\/\/esm\.sh" crossorigin \/>\n/,
  /<link rel="modulepreload" href="https:\/\/esm\.sh\/@elevenlabs\/client@1\.11\.2" \/>\n/,
  /<!-- Inter \(heavy weights\)[\s\S]*?-->\n/,
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>\n/,
  /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin \/>\n/,
  /<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@700;800;900&display=swap" \/>\n/,
];
for(const re of headKills){ const n = html.length; html = html.replace(re, ''); must(html.length < n, 'removed head link '+re.source.slice(0,40)); }

// ---------------------------------------------------------------- 2. inline Inter @font-face (weights 700/800/900 — the ones the CSS uses)
const FONTS = '/opt/connectry/projects/airadar/assets/fonts';
const faces = [700,800,900].map(w =>
`@font-face{font-family:'Inter';font-style:normal;font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${b64(`${FONTS}/inter-${w}.woff2`)}) format('woff2');}`
).join('\n');
html = html.replace('<title>', `<style id="inter-inline">\n${faces}\n</style>\n<title>`);
must(html.includes('inter-inline'), 'injected inline Inter @font-face');

// ---------------------------------------------------------------- 3. Three.js: importmap -> inline UMD classic script (global THREE)
// inline verbatim — the file is `console.warn(...), IIFE(this,factory)` joined by a comma operator,
// so it must NOT be edited; run as a classic script `this`===window and it sets global THREE.
const three = readFileSync('/tmp/three.min.js','utf8');
const importmapRe = /<script type="importmap">\s*\{ "imports": \{ "three": "https:\/\/cdn\.jsdelivr\.net\/npm\/three@0\.160\.0\/build\/three\.module\.js" \} \}\s*<\/script>/;
must(importmapRe.test(html), 'found importmap block');
// function replacement: three.min.js contains `$` chars that String.replace would mis-interpret as $&/$'/$` patterns
const threeBlock = `<script>\n/* three@0.160.0 UMD (inlined for offline / CSP) -> global THREE */\n${three}\n</script>`;
html = html.replace(importmapRe, () => threeBlock);
// strip the two ESM import lines (THREE now global)
const impCount = (html.match(/^import \* as THREE from 'three';$/gm) || []).length;
must(impCount === 2, 'found 2 `import * as THREE` lines');
html = html.replace(/^import \* as THREE from 'three';\n?/gm, '');

// ---------------------------------------------------------------- 4. drop advisor: widget SDK include + the "Explain section" button script (keep sec-advisor-style for scroll-snap fidelity)
html = html.replace(/<!-- Custom Brain Advisor widget[^>]*-->\n<script type="module" src="\.\/brain-widget\.js\?v=14"><\/script>\n/, '');
must(!html.includes('brain-widget.js'), 'removed brain-widget.js include');
const advScriptRe = /<script id="sec-advisor-script">[\s\S]*?<\/script>\n/;
must(advScriptRe.test(html), 'found sec-advisor-script block');
html = html.replace(advScriptRe, '');
must(!html.includes('BrainWidget'), 'removed advisor button script (no BrainWidget refs)');

// ---------------------------------------------------------------- 5. inline the 4 local images as data URIs
const imgs = [
  [/url\(\.\/silk\.jpg\)/g, `url(data:image/jpeg;base64,${b64(`${SRC}/silk.jpg`)})`],
  [/src="\.\/accenture-logo\.png"/g, `src="data:image/png;base64,${b64(`${SRC}/accenture-logo.png`)}"`],
  [/src="founder-fabian\.jpg"/g, `src="data:image/jpeg;base64,${b64(`${SRC}/founder-fabian.jpg`)}"`],
  [/src="founder-noland\.jpg"/g, `src="data:image/jpeg;base64,${b64(`${SRC}/founder-noland.jpg`)}"`],
];
for(const [re,rep] of imgs){ const n=html.length; html=html.replace(re,rep); must(html.length>n, 'inlined image '+re.source.slice(0,28)); }

// ---------------------------------------------------------------- 6. strip document wrappers (Artifact tool provides its own <!doctype><head><body>)
const initScript = `<script>/* set the theming attrs the original set on <html>, for first paint before the page scripts run */(function(){var d=document.documentElement;d.setAttribute('data-theme','dark');var v=new URLSearchParams(location.search).get('view');d.setAttribute('data-view',v==='technical'?'technical':'functional');})();</script>\n`;
html = html
  .replace(/^<!DOCTYPE html>\n/i, '')
  .replace(/^<html[^>]*>\n/i, '')
  .replace(/<\/html>\s*$/i, '')
  .replace(/<head>\n/i, '')
  .replace(/<\/head>\n/i, '')
  .replace(/<body>\n/i, '')
  .replace(/<\/body>\n/i, '');
html = initScript + html;
must(!/^<!DOCTYPE/im.test(html) && !/^<html[ >]/im.test(html) && !/^<\/html>$/im.test(html), 'stripped doctype/html wrappers');
must(!/^<head>$/im.test(html) && !/^<body>$/im.test(html) && !/^<\/body>$/im.test(html), 'stripped head/body wrappers (comment mentions ignored)');

// ---------------------------------------------------------------- verify: no *loadable* external refs remain
// (bare URL strings inside three.js console.warn messages are inert; only loadable contexts matter for CSP)
const loadable = [...html.matchAll(/(?:(?:src|href)\s*=\s*["']|url\(\s*["']?|@import\s+["']|\bfrom\s*["']|\bimport\s*\(\s*["'])https?:\/\/(?!www\.w3\.org)/gi)].map(m=>m[0]);
must(loadable.length === 0, 'no loadable external refs remain (found: '+loadable.join(' | ')+')');
const locals = [...html.matchAll(/(?:src|href)="\.?\/?[a-z0-9_-]+\.(?:jpg|jpeg|png|svg|webp|gif|js|css|woff2?|pdf)"/gi)].map(m=>m[0]);
must(locals.length === 0, 'no local file refs remain (found: '+locals.join(', ')+')');

writeFileSync('/tmp/credit-brain-artifact.html', html);
console.log('\n'+log.join('\n'));
console.log(`\nDONE  ${before} -> ${html.length} bytes  (${(html.length/1024/1024).toFixed2 ? '' : (html.length/1048576).toFixed(2)} MB)  -> /tmp/credit-brain-artifact.html`);
