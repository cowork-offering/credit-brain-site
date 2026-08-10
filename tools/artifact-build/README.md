# credit-brain-site -> claude.ai published Artifact (exact port)

Turns index.html (repo root) into a fully self-contained, CSP-safe artifact.
Advisor / ElevenLabs / AI piece REMOVED per Noland (2026-07-09).

## Rebuild
    node build-artifact.mjs      # -> /tmp/credit-brain-artifact.html (~1.3MB, self-contained)
    (cd /opt/connectry/projects/uk-companies-house/repo && node qa.mjs)   # headless render QA
Then publish with the Artifact tool (file_path=/tmp/credit-brain-artifact.html, favicon 🧠).

## What the build does
1. drops external head links (elevenlabs, esm.sh, google fonts)
2. inlines Inter 700/800/900 as @font-face data URIs (from airadar/assets/fonts)
3. importmap -> inline three@0.160.0 UMD (global THREE); strips the 2 `import * as THREE` lines
4. removes brain-widget.js + the sec-advisor-script "Explain section" button (keeps sec-advisor-style scroll-snap)
5. base64-inlines silk.jpg / accenture-logo.png / founder-*.jpg
6. strips <!doctype>/<html>/<head>/<body> wrappers (Artifact tool supplies its own) + prepends init script for data-theme/data-view

## GOTCHAS (cost real debug time)
- three.min.js UMD is `console.warn(...), IIFE(this,factory)` joined by a COMMA operator. Do NOT regex-strip the warn — inline verbatim.
- String.replace(re, bigString) mis-interprets `$` in the replacement (three.min.js is full of them). Use a FUNCTION replacement: replace(re, () => block).
- headless WebGL needs: --enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader --ignore-gpu-blocklist
