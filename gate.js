/* ============================================================
   CREDIT BRAIN GATE — invitation-only overlay for the case-study site.
   Loaded synchronously in <head> on every page (root and dev/). If the visitor
   holds no valid unlock, the page is hidden from first paint (no flash) and a
   frosted two-pane overlay covers the viewport. The right access phrase parts
   the glass and the page plays. Client-side only: this is a courtesy lock for
   an invited audience, not a security boundary (GitHub Pages serves static
   files; the phrase itself is never in this repo, only its salted SHA-256).

   Access is remembered on this device for 30 days. Append ?lock to any URL to
   re-lock, or call ccbGate.lock() from the console. Other scripts can wait on
   ccbGate.whenOpen(fn) or the 'gate:unlocked' event.

   Same mechanism as cowork-offering/roadshow gate.js (2026-09-06).
   ============================================================ */
(function () {
  var KEY = 'ccb.gate.v1';
  var SALT = 'credit-brain-2026:';
  var HASH = 'fec8f8419479cf3ad021d916b29a53c094cc4a51c1b1e8806efff65f4e527693';
  var TTL = 30 * 24 * 3600 * 1000;
  var root = document.documentElement;
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* assets resolve relative to gate.js itself, so dev/ pages find the root logo + silk */
  var BASE = (function () {
    try { var s = document.currentScript && document.currentScript.src; return s ? s.slice(0, s.lastIndexOf('/') + 1) : ''; } catch (e) { return ''; }
  })();

  function lock() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.href = location.pathname;
  }
  function unlocked() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      return !!(v && v.h === HASH && v.t > Date.now());
    } catch (e) { return false; }
  }
  try { if (/[?&]lock(=|&|$)/.test(location.search)) { localStorage.removeItem(KEY); } } catch (e) {}

  var waiters = [];
  var api = {
    locked: !unlocked(),
    lock: lock,
    whenOpen: function (fn) { if (api.locked) { waiters.push(fn); } else { fn(); } }
  };
  window.ccbGate = api;
  if (!api.locked) { return; }

  /* ---- critical CSS: hide the page from first paint, no flash ---- */
  root.classList.add('gate-locked');
  var crit = document.createElement('style');
  crit.textContent =
    'html.gate-locked{overflow:hidden!important;background:#06050a}' +
    'html.gate-locked body>*:not(#ccb-gate){visibility:hidden!important}';
  document.head.appendChild(crit);

  /* ---- SHA-256 (WebCrypto with a tiny pure-JS fallback for file:// previews) ---- */
  function sha256js(str) {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    var b = unescape(encodeURIComponent(str)), l = b.length, w = [], i;
    for (i = 0; i < l; i++) { w[i >> 2] |= b.charCodeAt(i) << (24 - (i % 4) * 8); }
    w[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
    w[((l + 8 >> 6) << 4) + 15] = l * 8;
    var W = new Array(64), r = function (x, n) { return (x >>> n) | (x << (32 - n)); };
    for (var j = 0; j < w.length; j += 16) {
      var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7], t;
      for (t = 0; t < 64; t++) {
        W[t] = t < 16 ? (w[j + t] | 0) : ((r(W[t-2],17) ^ r(W[t-2],19) ^ (W[t-2] >>> 10)) + W[t-7] + (r(W[t-15],7) ^ r(W[t-15],18) ^ (W[t-15] >>> 3)) + W[t-16]) | 0;
        var T1 = (h + (r(e,6) ^ r(e,11) ^ r(e,25)) + ((e & f) ^ (~e & g)) + K[t] + W[t]) | 0;
        var T2 = ((r(a,2) ^ r(a,13) ^ r(a,22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0;
        h = g; g = f; f = e; e = (d + T1) | 0; d = c; c = bb; bb = a; a = (T1 + T2) | 0;
      }
      H[0]=(H[0]+a)|0; H[1]=(H[1]+bb)|0; H[2]=(H[2]+c)|0; H[3]=(H[3]+d)|0; H[4]=(H[4]+e)|0; H[5]=(H[5]+f)|0; H[6]=(H[6]+g)|0; H[7]=(H[7]+h)|0;
    }
    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }
  function digest(str) {
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
      });
    }
    return Promise.resolve(sha256js(str));
  }

  /* ---- overlay styles (site register: near-black violet ground, silk, Accenture violet) ---- */
  var css =
  '#ccb-gate{position:fixed;inset:0;z-index:2147483000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;color:#ece6f6;' +
    '-webkit-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;overflow:hidden;' +
    '--g-silk:cubic-bezier(.16,1,.3,1);--g-violet:#a100ff;--g-lav:#c29bf5;--g-pink:#ff50a0}' +
  '#ccb-gate *{box-sizing:border-box;margin:0}' +
  /* the two panes. One silk image spans both; each pane shows its half. */
  '#ccb-gate .g-pane{position:absolute;top:0;bottom:0;width:50.5%;background:#06050a;overflow:hidden;will-change:transform;' +
    'transition:transform 1.5s var(--g-silk)}' +
  '#ccb-gate .g-pane.l{left:0}#ccb-gate .g-pane.r{right:0}' +
  '#ccb-gate .g-pane::before{content:"";position:absolute;top:-6%;bottom:-6%;width:212%;background:url("' + BASE + 'silk.jpg") 50% 100%/cover no-repeat;' +
    'opacity:.30;transform:scale(1);animation:gDrift 26s ease-in-out infinite alternate}' +
  '#ccb-gate .g-pane.l::before{left:-6%}#ccb-gate .g-pane.r::before{right:-6%}' +
  '#ccb-gate .g-pane::after{content:"";position:absolute;inset:0;background:' +
    'radial-gradient(120% 90% at 50% 110%,rgba(6,5,10,0) 0%,rgba(6,5,10,.55) 60%,#06050a 100%),' +
    'linear-gradient(180deg,rgba(6,5,10,.85),rgba(6,5,10,.35) 40%,rgba(6,5,10,.35) 60%,rgba(6,5,10,.9))}' +
  '@keyframes gDrift{from{transform:scale(1) translateY(0)}to{transform:scale(1.06) translateY(-1.5%)}}' +
  /* the seam where the two panes meet */
  '#ccb-gate .g-seam{position:absolute;top:0;bottom:0;left:50%;width:1px;transform:translateX(-.5px);' +
    'background:linear-gradient(180deg,transparent 0,rgba(194,155,245,.6) 10%,rgba(194,155,245,.6) 18%,transparent 27%,transparent 73%,rgba(194,155,245,.6) 82%,rgba(194,155,245,.6) 90%,transparent 100%);opacity:.75;' +
    'transition:opacity .5s ease}' +
  /* violet bloom behind the lockup */
  '#ccb-gate .g-glow{position:absolute;inset:0;pointer-events:none;' +
    'background:radial-gradient(52vmax 36vmax at 50% 58%,rgba(161,0,255,.20),rgba(161,0,255,0) 62%);' +
    'transition:opacity .7s ease}' +
  /* the card */
  '#ccb-gate .g-card{position:relative;width:min(560px,calc(100vw - 48px));padding:0 8px;text-align:left;' +
    'opacity:0;transform:translateY(14px);transition:opacity 1.1s var(--g-silk) .15s,transform 1.1s var(--g-silk) .15s}' +
  '#ccb-gate.in .g-card{opacity:1;transform:none}' +
  '#ccb-gate .g-brand{display:flex;align-items:flex-end;gap:14px;margin-bottom:clamp(36px,7vh,64px)}' +
  '#ccb-gate .g-brand img{height:28px;width:auto;display:block;filter:brightness(0) invert(1)}' +
  '#ccb-gate .g-brand .g-div{color:#b3abc4;opacity:.45;font-size:18px;line-height:1;transform:translateY(3px)}' +
  '#ccb-gate .g-brand .g-wm{font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#b3abc4;white-space:nowrap;transform:translateY(2px)}' +
  '#ccb-gate .g-eyebrow{font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--g-lav);margin-bottom:18px}' +
  '#ccb-gate h1{font-size:clamp(40px,6.2vw,76px);font-weight:300;line-height:1.04;letter-spacing:-.025em;color:#ece6f6;margin-bottom:18px}' +
  '#ccb-gate h1 em{font-style:normal;color:var(--g-violet)}' +
  '#ccb-gate .g-lead{font-size:16px;line-height:1.5;color:rgba(236,230,246,.62);max-width:40ch;margin-bottom:clamp(28px,5vh,44px)}' +
  /* the field: one hairline, one caret, one arrow */
  '#ccb-gate form{max-width:420px}' +
  '#ccb-gate .g-field{position:relative;display:flex;align-items:center;gap:8px;padding-bottom:12px}' +
  '#ccb-gate .g-field::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:rgba(255,255,255,.22);transition:background .3s ease}' +
  '#ccb-gate .g-field::before{content:"";position:absolute;left:0;bottom:0;height:1px;width:100%;background:var(--g-violet);z-index:1;' +
    'transform:scaleX(0);transform-origin:left;transition:transform .7s var(--g-silk);box-shadow:0 0 14px rgba(161,0,255,.55)}' +
  '#ccb-gate .g-field:focus-within::before{transform:scaleX(1)}' +
  '#ccb-gate .g-field.err::after{background:var(--g-pink)}#ccb-gate .g-field.err::before{background:var(--g-pink);box-shadow:0 0 14px rgba(255,80,160,.5)}' +
  '#ccb-gate .g-field.ok::before{background:#fff;box-shadow:0 0 18px rgba(255,255,255,.7)}' +
  '#ccb-gate input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#fff;font:inherit;font-size:20px;font-weight:300;letter-spacing:.02em;padding:10px 0;caret-color:var(--g-violet)}' +
  '#ccb-gate input::placeholder{color:rgba(236,230,246,.34);font-weight:300;letter-spacing:0}' +
  '#ccb-gate input[type=password]{letter-spacing:.22em}' +
  '#ccb-gate input:-webkit-autofill{-webkit-text-fill-color:#fff;-webkit-box-shadow:0 0 0 1000px #06050a inset;transition:background-color 9999s}' +
  '#ccb-gate button{appearance:none;border:0;background:transparent;color:inherit;cursor:pointer;font:inherit;padding:0}' +
  '#ccb-gate .g-eye{width:36px;height:36px;display:grid;place-items:center;color:rgba(236,230,246,.5);border-radius:50%;transition:color .25s ease,background .25s ease}' +
  '#ccb-gate .g-eye:hover,#ccb-gate .g-eye:focus-visible{color:#fff;background:rgba(255,255,255,.06);outline:0}' +
  '#ccb-gate .g-eye svg{width:18px;height:18px;display:block}#ccb-gate .g-eye .off{display:none}#ccb-gate .g-eye.show .on{display:none}#ccb-gate .g-eye.show .off{display:block}' +
  '#ccb-gate .g-go{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.28);display:grid;place-items:center;flex:none;color:#fff;' +
    'transition:background .35s ease,border-color .35s ease,transform .35s var(--g-silk),box-shadow .35s ease}' +
  '#ccb-gate .g-go svg{width:18px;height:18px;display:block;transition:transform .35s var(--g-silk)}' +
  '#ccb-gate .g-go:hover,#ccb-gate .g-go:focus-visible{background:var(--g-violet);border-color:var(--g-violet);box-shadow:0 0 28px rgba(161,0,255,.45);outline:0}' +
  '#ccb-gate .g-go:hover svg{transform:translateX(3px)}' +
  '#ccb-gate .g-go.busy{pointer-events:none;border-color:var(--g-violet)}' +
  '#ccb-gate .g-err{min-height:22px;margin-top:12px;font-size:13px;color:var(--g-pink);opacity:0;transform:translateY(-4px);transition:opacity .35s ease,transform .35s ease}' +
  '#ccb-gate .g-err.show{opacity:1;transform:none}' +
  '#ccb-gate .g-foot{margin-top:clamp(36px,8vh,72px);font-size:12px;letter-spacing:.04em;color:rgba(236,230,246,.38);display:flex;gap:14px;align-items:center}' +
  '#ccb-gate .g-foot i{width:4px;height:4px;border-radius:50%;background:var(--g-violet);display:inline-block;flex:none}' +
  /* wrong phrase: the card recoils */
  '@keyframes gShake{0%,100%{transform:translateX(0)}18%{transform:translateX(-7px)}36%{transform:translateX(6px)}54%{transform:translateX(-4px)}72%{transform:translateX(3px)}}' +
  '#ccb-gate.in .g-card.shake{animation:gShake .5s cubic-bezier(.36,.07,.19,.97) both}' +
  /* right phrase: the glass parts, the card dissolves, the page is already underneath */
  '#ccb-gate.open{pointer-events:none}' +
  '#ccb-gate.open .g-pane.l{transform:translateX(-102%)}#ccb-gate.open .g-pane.r{transform:translateX(102%)}' +
  '#ccb-gate.open .g-seam,#ccb-gate.open .g-glow{opacity:0}' +
  '#ccb-gate.open .g-card{opacity:0;transform:translateY(-10px) scale(.985);transition:opacity .5s ease,transform .8s var(--g-silk)}' +
  '@media(max-width:560px){#ccb-gate .g-brand img{height:22px}#ccb-gate .g-brand .g-wm{font-size:11.5px}#ccb-gate .g-card{padding:0 4px}#ccb-gate input{font-size:18px}}' +
  '@media(prefers-reduced-motion:reduce){#ccb-gate .g-pane::before{animation:none}#ccb-gate .g-pane,#ccb-gate .g-card,#ccb-gate .g-field::before{transition-duration:.2s}#ccb-gate.in .g-card.shake{animation:none}}';

  var EYE_ON = '<svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF = '<svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.3A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a17.5 17.5 0 0 1-3.1 4"/><path d="M6.6 6.6C3.7 8.6 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

  function mount() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var g = document.createElement('div');
    g.id = 'ccb-gate'; g.setAttribute('role', 'dialog'); g.setAttribute('aria-modal', 'true'); g.setAttribute('aria-labelledby', 'ccb-gate-title');
    g.innerHTML =
      '<div class="g-pane l" aria-hidden="true"></div><div class="g-pane r" aria-hidden="true"></div>' +
      '<div class="g-glow" aria-hidden="true"></div><div class="g-seam" aria-hidden="true"></div>' +
      '<div class="g-card">' +
        '<div class="g-brand"><img src="' + BASE + 'accenture-logo.png" alt="Accenture" /><span class="g-div" aria-hidden="true">|</span><span class="g-wm">Commercial Credit Brain</span></div>' +
        '<p class="g-eyebrow">Case study · Confidential preview · By invitation</p>' +
        '<h1 id="ccb-gate-title">Before you<br>step in<em>.</em></h1>' +
        '<p class="g-lead">This page is private. Enter the access phrase you were given and the glass parts.</p>' +
        '<form novalidate autocomplete="off">' +
          '<label for="ccb-gate-pw" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Access phrase</label>' +
          '<div class="g-field">' +
            '<input id="ccb-gate-pw" type="password" placeholder="Access phrase" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" />' +
            '<button type="button" class="g-eye" aria-label="Show phrase" aria-pressed="false">' + EYE_ON + EYE_OFF + '</button>' +
            '<button type="submit" class="g-go" aria-label="Enter">' + ARROW + '</button>' +
          '</div>' +
          '<p class="g-err" role="status" aria-live="polite"></p>' +
        '</form>' +
        '<p class="g-foot"><i></i><span>Confidential preview · not for distribution</span></p>' +
      '</div>';
    document.body.appendChild(g);

    var form = g.querySelector('form'), input = g.querySelector('input'), field = g.querySelector('.g-field'),
        eye = g.querySelector('.g-eye'), go = g.querySelector('.g-go'), err = g.querySelector('.g-err'), card = g.querySelector('.g-card');

    requestAnimationFrame(function () { requestAnimationFrame(function () {
      g.classList.add('in');
      setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) {} }, RM ? 50 : 500);
    }); });

    eye.addEventListener('click', function () {
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eye.classList.toggle('show', show);
      eye.setAttribute('aria-pressed', String(show));
      eye.setAttribute('aria-label', show ? 'Hide phrase' : 'Show phrase');
      input.focus({ preventScroll: true });
    });
    input.addEventListener('input', function () { field.classList.remove('err'); err.classList.remove('show'); });

    var busy = false, strikes = 0;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (busy) { return; }
      var v = input.value.trim();
      if (!v) { input.focus(); return; }
      busy = true; go.classList.add('busy');
      digest(SALT + v.toLowerCase()).then(function (h) {
        busy = false; go.classList.remove('busy');
        if (h === HASH) { open(); return; }
        strikes++;
        field.classList.add('err');
        err.textContent = strikes < 3 ? 'That phrase is not on the list.' : 'Still not it. Ask your host for the phrase.';
        err.classList.add('show');
        card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        input.select();
      });
    });

    function open() {
      try { localStorage.setItem(KEY, JSON.stringify({ h: HASH, t: Date.now() + TTL })); } catch (e) {}
      field.classList.add('ok'); input.blur();
      setTimeout(function () {
        api.locked = false;
        root.classList.remove('gate-locked');   /* the page is underneath as the glass parts */
        g.classList.add('open');
        window.dispatchEvent(new CustomEvent('gate:unlocked'));
        var w = waiters.splice(0); for (var i = 0; i < w.length; i++) { try { w[i](); } catch (e) {} }
        setTimeout(function () { g.remove(); crit.remove(); st.remove(); }, RM ? 300 : 1700);
      }, RM ? 60 : 420);
    }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', mount); } else { mount(); }
})();
