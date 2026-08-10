/* ============================================================================
   Brain Advisor — custom voice + chat widget (Credit Brain page)
   Vanilla, theme-aware. ElevenLabs official client SDK. Reversible.
   Launcher = Accenture-mark pill chip. Voice = hero-style DNA helix.
   ========================================================================== */
import { Conversation } from 'https://esm.sh/@elevenlabs/client@1.11.2';
const AGENT = 'agent_9801kv9gvk5qeh695hq96rrjr99x';

/* ----------------------------------------------------------------- styles */
const CSS = `
#bw-bubble{position:fixed;z-index:40;right:clamp(20px,4vw,40px);bottom:clamp(20px,4vw,40px);height:50px;
  border-radius:999px;border:1px solid color-mix(in srgb,var(--ink) 11%,transparent);cursor:pointer;display:inline-flex;align-items:center;gap:10px;padding:0 18px 0 15px;
  background:color-mix(in srgb,var(--panel) 80%,transparent);transform-origin:bottom right;
  backdrop-filter:blur(20px) saturate(150%);-webkit-backdrop-filter:blur(20px) saturate(150%);
  box-shadow:0 10px 28px -10px rgba(16,10,30,.42),inset 0 1px 0 color-mix(in srgb,#fff 12%,transparent);
  transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease,opacity .3s ease}
#bw-bubble:hover{transform:translateY(-2px);box-shadow:0 15px 36px -10px rgba(16,10,30,.5),inset 0 1px 0 color-mix(in srgb,#fff 16%,transparent)}
#bw-bubble .acc{width:17px;height:18px;flex:0 0 auto;display:block}
#bw-bubble .lbl{font:700 11px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;letter-spacing:.13em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
#bw-bubble.gone{opacity:0;transform:scale(.4);pointer-events:none}

#bw-panel{position:fixed;z-index:41;right:clamp(20px,4vw,40px);bottom:clamp(20px,4vw,40px);
  width:min(362px,92vw);max-height:min(76vh,564px);display:flex;flex-direction:column;overflow:hidden;color:var(--ink);
  background:color-mix(in srgb,var(--panel) 86%,transparent);
  backdrop-filter:blur(40px) saturate(160%);-webkit-backdrop-filter:blur(40px) saturate(160%);
  border:1px solid color-mix(in srgb,var(--ink) 9%,transparent);
  box-shadow:0 30px 80px -22px rgba(12,8,24,.5),0 3px 10px rgba(12,8,24,.16),inset 0 1px 0 color-mix(in srgb,#fff 10%,transparent);
  transform-origin:bottom right;border-radius:42px;opacity:0;transform:scale(.18);pointer-events:none;
  transition:opacity .34s ease,transform .52s cubic-bezier(.16,.86,.2,1),border-radius .52s cubic-bezier(.16,.86,.2,1)}
#bw-panel.open{opacity:1;transform:none;border-radius:24px;pointer-events:auto}

.bw-hd{display:flex;align-items:center;gap:11px;padding:15px 16px 13px;border-bottom:1px solid color-mix(in srgb,var(--ink) 7%,transparent)}
.bw-hd .ic{width:30px;height:30px;border-radius:50%;flex:0 0 auto;display:grid;place-items:center;background:color-mix(in srgb,var(--ink) 5%,transparent)}
.bw-hd .ic .acc{width:16px;height:17px;display:block}
.bw-ti{flex:1;min-width:0}.bw-ti b{display:block;font:700 12px/1.35 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:var(--ink);letter-spacing:.13em;text-transform:uppercase}
.bw-ti span{display:block;font:500 10.5px/1.3 -apple-system,sans-serif;color:var(--muted);letter-spacing:.01em}
.bw-x{flex:0 0 auto;width:28px;height:28px;border-radius:9px;border:0;background:transparent;color:var(--muted);cursor:pointer;display:grid;place-items:center;transition:.18s}
.bw-x:hover{background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink)}.bw-x svg{width:16px;height:16px}

.bw-seg{display:flex;gap:2px;margin:12px 16px 0;padding:3px;border-radius:999px;background:color-mix(in srgb,var(--ink) 5%,transparent)}
.bw-seg button{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;background:transparent;cursor:pointer;font:600 11.5px/1 -apple-system,sans-serif;color:var(--muted);padding:8px 10px;border-radius:999px;transition:.22s}
.bw-seg button svg{width:13px;height:13px}
.bw-seg button.on{background:color-mix(in srgb,var(--panel) 75%,transparent);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.bw-seg.hide{display:none}

.bw-stage{padding:20px 16px 13px;border-bottom:1px solid color-mix(in srgb,var(--ink) 6%,transparent);display:flex;flex-direction:column;align-items:center;gap:10px}
.bw-stage canvas{width:100%;height:142px;display:block}
.bw-vstate{font:600 10.5px/1 -apple-system,sans-serif;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;min-height:12px}
.bw-ttog{border:0;background:transparent;color:var(--muted);font:600 9.5px/1 -apple-system,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;padding:5px 11px;border-radius:999px;opacity:.65;transition:.18s}
.bw-ttog:hover{opacity:1;color:var(--ink);background:color-mix(in srgb,var(--ink) 5%,transparent)}

.bw-body{flex:1;min-height:0;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin}
.bw-body::-webkit-scrollbar{width:6px}.bw-body::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--ink) 11%,transparent);border-radius:4px}

.bw-choice{margin:auto 0;display:flex;flex-direction:column;gap:14px;padding:14px 2px;text-align:center}
.bw-choice h4{font:600 15.5px/1.35 -apple-system,sans-serif;color:var(--ink);margin:0;letter-spacing:-.015em}
.bw-choice p{font:500 12px/1.5 -apple-system,sans-serif;color:var(--muted);margin:0 0 2px}
.bw-opt{display:flex;gap:12px}
.bw-opt button{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 8px;border-radius:16px;cursor:pointer;
  border:1px solid color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink);font:600 12.5px/1 -apple-system,sans-serif;
  background:color-mix(in srgb,var(--ink) 3%,transparent);transition:transform .25s cubic-bezier(.2,.8,.2,1),border-color .25s,background .25s}
.bw-opt button:hover{border-color:color-mix(in srgb,var(--ink) 18%,transparent);background:color-mix(in srgb,var(--ink) 6%,transparent);transform:translateY(-2px)}
.bw-opt button svg{width:21px;height:21px;color:var(--muted)}
.bw-switch{font:500 11px/1 -apple-system,sans-serif;color:var(--muted);opacity:.8}
.bw-fresh{border:0;background:transparent;color:var(--muted);font:500 11px/1 -apple-system,sans-serif;cursor:pointer;text-decoration:underline;text-underline-offset:2px;opacity:.85}
.bw-fresh:hover{color:var(--ink)}

.bw-msg{max-width:84%;padding:10px 13px;border-radius:16px;font:450 13px/1.5 -apple-system,sans-serif;white-space:pre-wrap;word-break:break-word}
.bw-msg.ai{align-self:flex-start;background:color-mix(in srgb,var(--ink) 5%,transparent);color:var(--ink);border-bottom-left-radius:6px}
.bw-msg.user{align-self:flex-end;color:var(--ink);border-bottom-right-radius:6px;background:color-mix(in srgb,var(--v-core) 9%,color-mix(in srgb,var(--ink) 6%,transparent))}
.bw-typing{align-self:flex-start;display:inline-flex;gap:4px;padding:13px 14px}
.bw-typing i{width:6px;height:6px;border-radius:50%;background:var(--muted);opacity:.45;animation:bwdot 1.1s infinite}
.bw-typing i:nth-child(2){animation-delay:.18s}.bw-typing i:nth-child(3){animation-delay:.36s}
@keyframes bwdot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-4px);opacity:.8}}

.bw-ft{padding:12px 14px;border-top:1px solid color-mix(in srgb,var(--ink) 7%,transparent);display:flex;align-items:center;gap:9px}
.bw-ft.hide{display:none}
.bw-in{flex:1;min-width:0;border:1px solid color-mix(in srgb,var(--ink) 10%,transparent);background:color-mix(in srgb,var(--ink) 3%,transparent);
  color:var(--ink);font:450 13px/1.4 -apple-system,sans-serif;padding:10px 14px;border-radius:13px;outline:none;resize:none;max-height:84px;transition:border-color .2s}
.bw-in::placeholder{color:var(--muted)}.bw-in:focus{border-color:color-mix(in srgb,var(--ink) 24%,transparent)}
.bw-ic{flex:0 0 auto;width:38px;height:38px;border-radius:12px;border:0;cursor:pointer;display:grid;place-items:center;transition:.18s;background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--muted)}
.bw-ic:hover{color:var(--ink);background:color-mix(in srgb,var(--ink) 12%,transparent)}
.bw-ic.accent{background:color-mix(in srgb,var(--ink) 13%,transparent);color:var(--ink)}
.bw-ic.accent:hover{background:color-mix(in srgb,var(--ink) 20%,transparent)}
.bw-ic.danger:hover{background:color-mix(in srgb,#ff5c7a 70%,transparent);color:#fff}.bw-ic.on{color:var(--ink)}.bw-ic svg{width:17px;height:17px}
.bw-err{font:500 11.5px/1.4 -apple-system,sans-serif;color:#ff6b86;text-align:center;padding:0 16px 8px}
`;

const I={ mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  micOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9v2a3 3 0 0 0 5 2M15 9.3V5a3 3 0 0 0-6 0M5 11a7 7 0 0 0 11 5.3M12 18v3M3 3l18 18"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
  end:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.7 13.3a11 11 0 0 0 4 2.6l1.6-1.6a1.5 1.5 0 0 1 1.5-.4 9 9 0 0 0 2.4.5 1.5 1.5 0 0 1 1.3 1.5v2a1.5 1.5 0 0 1-1.6 1.5A18 18 0 0 1 3 5.6 1.5 1.5 0 0 1 4.5 4h2a1.5 1.5 0 0 1 1.5 1.3c.05.8.2 1.6.5 2.4a1.5 1.5 0 0 1-.4 1.5z"/><path d="M22 2 2 22" stroke-width="1.6"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' };
const ACC='<svg class="acc" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.4 3 L20 12 L5.4 21" stroke="#a100ff" stroke-width="5.2" stroke-linejoin="miter"/></svg>';

/* ----------------------------------------------------------------- dom */
const style=document.createElement('style'); style.id='bw-style'; style.textContent=CSS; document.head.appendChild(style);
const bubble=document.createElement('button'); bubble.id='bw-bubble'; bubble.setAttribute('aria-label','Ask the AI Brain Consultant');
bubble.innerHTML=ACC+'<span class="lbl">AI Brain Consultant</span>';
const panel=document.createElement('div'); panel.id='bw-panel';
panel.innerHTML=`<div class="bw-hd"><div class="ic">${ACC}</div>
  <div class="bw-ti"><b>AI Brain Consultant</b><span>Commercial Credit Brain</span></div><button class="bw-x" aria-label="Close">${I.x}</button></div>
  <div class="bw-seg hide"><button data-m="voice">${I.mic}<span>Talk</span></button><button data-m="chat">${I.chat}<span>Chat</span></button></div>
  <div class="bw-stage" style="display:none"><canvas></canvas><div class="bw-vstate"></div><button class="bw-ttog">Show transcript</button></div>
  <div class="bw-body"></div><div class="bw-err" style="display:none"></div>
  <div class="bw-ft hide"><button class="bw-ic" data-act="mic" title="Mute mic" style="display:none">${I.mic}</button>
  <textarea class="bw-in" rows="1" placeholder="Ask the advisor..."></textarea>
  <button class="bw-ic accent" data-act="send" title="Send">${I.send}</button>
  <button class="bw-ic danger" data-act="end" title="End" style="display:none">${I.end}</button></div>`;
document.body.appendChild(bubble); document.body.appendChild(panel);
const $=s=>panel.querySelector(s);
const body=$('.bw-body'),seg=$('.bw-seg'),ft=$('.bw-ft'),input=$('.bw-in'),errEl=$('.bw-err'),ttog=$('.bw-ttog');
const micBtn=$('[data-act=mic]'),sendBtn=$('[data-act=send]'),endBtn=$('[data-act=end]');

/* ----------------------------------------------------------------- particle glow (muted; DNA a touch richer) */
let drv=0; const SPEC_N=30; const spec=new Float32Array(SPEC_N);  // spec = per-band levels for the wave peaks
function isLight(){ return document.documentElement.getAttribute('data-theme')==='light'; }
const PAL={ violet:[156,96,222], lavlt:[210,202,232], deep:[118,86,158], rose:[206,118,160] };
const _g={};
function glow(rgb){ const k=rgb.join(); if(_g[k])return _g[k]; const s=48,c=document.createElement('canvas'); c.width=c.height=s; const x=c.getContext('2d');
  const g=x.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2); g.addColorStop(0,`rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`); g.addColorStop(.4,`rgba(${rgb[0]},${rgb[1]},${rgb[2]},.45)`); g.addColorStop(1,`rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
  x.fillStyle=g; x.fillRect(0,0,s,s); _g[k]=c; return c; }
function dot(ctx,cx,cy,r,rgb,a){ if(a<=0||r<=0)return; ctx.globalAlpha=a>1?1:a; ctx.drawImage(glow(rgb),cx-r,cy-r,r*2,r*2); }

/* ---- DNA helix (voice) — hero-style: twin particle backbones + base-pair rungs, depth + rotation, reactive ---- */
function startDNA(canvas){
  const ctx=canvas.getContext('2d'),d=Math.min(devicePixelRatio||1,2); let raf;
  const size=()=>{const w=canvas.clientWidth||320,hh=canvas.clientHeight||142;canvas.width=w*d;canvas.height=hh*d;ctx.setTransform(d,0,0,d,0,0);}; size(); addEventListener('resize',size);
  const STEPS=54, turns=2.4, NW=3;   // lighter: 3 woven wires per strand (less main-thread load)
  function tick(t){ const w=canvas.clientWidth||320,h=canvas.clientHeight||142,mid=h/2; ctx.clearRect(0,0,w,h);
    const lt=isLight(); ctx.globalCompositeOperation=lt?'source-over':'lighter';
    const e=drv, gbase=h*(0.085+e*0.05), braid=(0.8+e*1.8), scroll=t*0.0016+e*0.004, bright=(lt?0.92:0.6), psz=0.7+e*0.7;
    const cV=lt?[120,30,206]:[172,114,238], cL=lt?[150,82,202]:[208,198,238], cR=lt?[196,52,128]:[234,112,168];   // richer + visible on light
    function cable(x,cy,ph,phase,wph,col,lb){
      for(let k=0;k<NW;k++){ const wp=ph*3.0 + k*(Math.PI*2/NW) + wph;
        const wx=x+Math.cos(wp)*braid, wy=cy+Math.sin(wp)*braid, front=(Math.cos(wp)+1)/2;
        dot(ctx,wx,wy, psz*(0.5+front*0.85)*(0.85+lb*0.6), col, (bright+lb*(lt?0.7:1.2))*((lt?.10:.055)+phase*(lt?.24:.3))*(0.4+front*0.85)); }
    }
    for(let i=0;i<STEPS;i++){ const f=i/(STEPS-1), x=f*w, ph=f*turns*Math.PI*2+scroll;
      const sv=spec[Math.min(SPEC_N-1,(f*SPEC_N)|0)];                 // local spectral level → this point peaks on its own
      const la=gbase + h*0.215*sv;                                    // helix radius = gentle base + local spectral peak (wave)
      const yA=mid+Math.sin(ph)*la, yB=mid+Math.sin(ph+Math.PI)*la, fA=(Math.cos(ph)+1)/2, fB=(Math.cos(ph+Math.PI)+1)/2, sep=Math.abs(yA-yB);
      if(i%3===0&&sep>5){ for(let j=1;j<=2;j++){ const u=j/3, ry=yA+(yB-yA)*u; dot(ctx,x,ry, 0.8*psz, cR, (lt?.11:.055)+Math.min(fA,fB)*(lt?.10:.1)+sv*.35); } }
      cable(x,yA,ph,fA,0,   cV, sv);
      cable(x,yB,ph,fB,0.7, cL, sv);
    }
    ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over'; raf=requestAnimationFrame(tick); }
  raf=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(raf); }

/* ----------------------------------------------------------------- conversation (single persistent session + short-term memory) */
const stage=$('.bw-stage'), stageCv=stage.querySelector('canvas');
let convo=null, mode=null, sessionVoice=false, pendingFirst=null, reactRAF=null, lastUser='', typingEl=null, micMuted=false, dnaStop=null, transcriptOpen=false;
const MEM_KEY='bw-mem', MEM_TTL=40*60*1000;
function saveMem(){ try{ const ms=[...body.querySelectorAll('.bw-msg')].slice(-20).map(m=>({r:m.classList.contains('user')?'u':'a',t:m.textContent})); if(ms.length) localStorage.setItem(MEM_KEY,JSON.stringify({ts:Date.now(),msgs:ms})); }catch(_){} }
function loadMem(){ try{ const j=JSON.parse(localStorage.getItem(MEM_KEY)||'null'); if(j&&Date.now()-j.ts<MEM_TTL&&j.msgs&&j.msgs.length) return j; }catch(_){} return null; }
function clearMem(){ try{ localStorage.removeItem(MEM_KEY); }catch(_){} }
function memCtx(j){ return j.msgs.map(x=>(x.r==='u'?'User: ':'Advisor: ')+x.t).join('\n'); }
function showErr(m){ errEl.textContent=m||''; errEl.style.display=m?'':'none'; }
function scrollDown(){ body.scrollTop=body.scrollHeight; }
function addMsg(role,text,silent){ const dv=document.createElement('div'); dv.className='bw-msg '+(role==='user'?'user':'ai'); dv.textContent=text; body.appendChild(dv); scrollDown(); if(!silent) saveMem(); }
function setTyping(on){ if(on){ if(typingEl)return; typingEl=document.createElement('div'); typingEl.className='bw-typing'; typingEl.innerHTML='<i></i><i></i><i></i>'; body.appendChild(typingEl); scrollDown(); } else if(typingEl){ typingEl.remove(); typingEl=null; } }
function transcript(){ return [...body.querySelectorAll('.bw-msg')].slice(-12).map(m=>(m.classList.contains('user')?'User: ':'Advisor: ')+m.textContent).join('\n'); }
function vstate(s){ const e=stage.querySelector('.bw-vstate'); if(e)e.textContent=s||''; }
function applyBodyVis(){ body.style.display=(mode==='voice'&&!transcriptOpen)?'none':''; }
function showStage(on){ stage.style.display=on?'':'none';
  if(on){ transcriptOpen=false; ttog.textContent='Show transcript'; if(!dnaStop) requestAnimationFrame(()=>{ if(stage.style.display!=='none'&&!dnaStop) dnaStop=startDNA(stageCv); }); }
  else if(dnaStop){ dnaStop(); dnaStop=null; }
  applyBodyVis(); }
function segUI(){ seg.classList.remove('hide'); seg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.m===mode)); }
function footerUI(){ ft.classList.remove('hide'); const v=mode==='voice'; micBtn.style.display=v?'':'none'; endBtn.style.display=''; sendBtn.style.display=''; input.placeholder=v?'or type instead...':'Ask the advisor...'; }

function viewChoice(){ mode=null; sessionVoice=false; showStage(false); seg.classList.add('hide'); ft.classList.add('hide'); showErr(''); body.style.display=''; body.innerHTML=''; typingEl=null;
  const mem=loadMem(); const c=document.createElement('div'); c.className='bw-choice';
  c.innerHTML=`<h4>${mem?'Pick up where you left off':'How would you like to explore?'}</h4>
    <p>${mem?'It remembers your last few messages.':'Ask about the Commercial Credit Brain. Switch anytime.'}</p>
    <div class="bw-opt"><button data-pick="voice">${I.mic}Talk</button><button data-pick="chat">${I.chat}Chat</button></div>
    <div class="bw-switch">${mem?'<button class="bw-fresh" data-fresh>Start fresh instead</button>':'Voice or text, your call.'}</div>`;
  body.appendChild(c); c.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.pick==='voice',pendingFirst)));
  const fb=c.querySelector('[data-fresh]'); if(fb) fb.addEventListener('click',()=>{ clearMem(); viewChoice(); }); }

function baseOpts(voice){ return { agentId:AGENT, connectionType:'websocket', textOnly:!voice,
  onConnect:()=>{ if(mode==='voice') vstate('listening'); }, onDisconnect:()=>{ if(mode==='voice') vstate(''); },
  onError:(e)=>{ showErr('Connection issue. Try again.'); setTyping(false); console.warn('[brain-widget]',e); }, onStatusChange:()=>{},
  onModeChange:(m)=>{ const md=(m&&m.mode)||m; if(mode==='voice') vstate(md==='speaking'?'speaking':'listening'); },
  onMessage:(m)=>{ const src=(m&&m.source)||'ai', text=(m&&m.message)||''; if(!text)return;
    if(src==='user'){ if(text.trim()===lastUser.trim())return; addMsg('user',text); } else { setTyping(false); addMsg('ai',text); } } }; }

async function endIfAny(){ try{ if(convo) await convo.endSession(); }catch(_){} convo=null; if(reactRAF){cancelAnimationFrame(reactRAF);reactRAF=null;} drv=0; spec.fill(0); }
async function connect(voice,ov){ const tries=['websocket']; let le;   // websocket = reliable audio (webrtc broke audio + slowed startup in this setup)
  for(const tr of tries){ try{ const opts=baseOpts(voice); opts.connectionType=tr; if(ov)opts.overrides=ov; return await Conversation.startSession(opts); }catch(e){ le=e; console.warn('[brain-widget] connect '+tr,e); } } throw le; }
async function start(voice,firstMessage){ pendingFirst=null; showErr(''); body.innerHTML=''; typingEl=null;
  mode=voice?'voice':'chat'; sessionVoice=voice; segUI(); footerUI(); showStage(voice);
  const mem=loadMem(), cont=!!mem;
  if(cont) mem.msgs.forEach(x=>addMsg(x.r==='u'?'user':'ai', x.t, true));
  if(!voice && !cont) setTyping(true);
  const ov = firstMessage?{agent:{firstMessage}}:(cont?{agent:{firstMessage:''}}:undefined);
  try{ convo=await connect(voice,ov); if(voice) startReact();
    if(cont) setTimeout(()=>{ try{ convo&&convo.sendContextualUpdate&&convo.sendContextualUpdate('(Background context only. Do not reply to this and stay silent until the user speaks. Never greet or re-introduce yourself.) You are already mid-conversation with this user. Recent messages:\n'+memCtx(mem)); }catch(_){} },700); }
  catch(e){ setTyping(false); showErr(voice?'Mic/connection blocked. Check permissions.':'Could not connect. Try again.'); console.warn('[brain-widget] start',e); viewChoice(); } }
async function reconnectVoice(){ const ctx=transcript(); await endIfAny(); mode='voice'; sessionVoice=true; segUI(); footerUI(); showStage(true);
  try{ convo=await connect(true,{agent:{firstMessage:''}}); startReact();
    if(ctx) setTimeout(()=>{ try{ convo&&convo.sendContextualUpdate&&convo.sendContextualUpdate('(Background context only. Do not reply to this and stay silent until the user speaks. Never greet or re-introduce yourself.) You are already mid-conversation with this user. Recent messages:\n'+ctx); }catch(_){} },700); }
  catch(e){ showErr('Could not start voice. Check mic permission.'); console.warn(e); mode='chat'; sessionVoice=false; showStage(false); segUI(); footerUI(); } }
async function setMode(voice){ if(!convo){ start(voice,pendingFirst); return; } if(voice===(mode==='voice')) return;
  if(sessionVoice){ mode=voice?'voice':'chat'; try{ convo.setMicMuted&&convo.setMicMuted(!voice); }catch(_){} try{ convo.setVolume&&convo.setVolume({volume:voice?1:0}); }catch(_){} micMuted=!voice; micBtn.innerHTML=voice?I.mic:I.micOff; showStage(voice); segUI(); footerUI(); if(voice) vstate('listening'); }
  else if(voice){ await reconnectVoice(); } else { mode='chat'; showStage(false); segUI(); footerUI(); } }

/* reactivity — per-band spectrum → the helix peaks travel along it like a waveform, not one uniform pulse */
const hasE=a=>{ if(!a||!a.length)return false; for(let i=2;i<a.length;i+=6) if(a[i]>5)return true; return false; };
function startReact(){ if(reactRAF)cancelAnimationFrame(reactRAF);
  const loop=()=>{ let lvl=0;
    try{ const o=convo&&convo.getOutputByteFrequencyData&&convo.getOutputByteFrequencyData(), ip=convo&&convo.getInputByteFrequencyData&&convo.getInputByteFrequencyData();
      const src = hasE(o)?o:(hasE(ip)?ip:null);
      if(src){ const usable=Math.min(src.length,190);                        // voice energy sits in the low/mid bins
        for(let i=0;i<SPEC_N;i++){
          const lo=(Math.pow(i/SPEC_N,1.45)*usable)|0, hi=Math.max(lo+1,(Math.pow((i+1)/SPEC_N,1.45)*usable)|0);
          let m=0; for(let j=lo;j<hi&&j<src.length;j++) if(src[j]>m)m=src[j];
          const v=Math.min(1,(m/255)*1.35);                                  // this band's level 0..1
          spec[i]+=(v-spec[i])*(v>spec[i]?0.55:0.16);                        // fast attack per band, soft release → peaks ripple
          if(spec[i]>lvl)lvl=spec[i];
        }
      } else { const ov=convo&&convo.getOutputVolume?convo.getOutputVolume():0, iv=convo&&convo.getInputVolume?convo.getInputVolume():0; lvl=Math.max(ov,iv*0.9);
        for(let i=0;i<SPEC_N;i++){ const w=lvl*(0.45+0.55*Math.abs(Math.sin(i*0.9+lvl*6))); spec[i]+=(w-spec[i])*0.2; }   // fallback: shaped, not flat
      }
    }catch(_){}
    const tgt=Math.min(1,lvl*1.9); drv+=(tgt-drv)*(tgt>drv?0.8:0.12);        // overall energy → global brightness/size
    reactRAF=requestAnimationFrame(loop); }; loop(); }

/* ----------------------------------------------------------------- ui (close keeps the session → no re-intro on reopen) */
function openPanel(){ panel.classList.add('open'); bubble.classList.add('gone'); }
function closePanel(){ panel.classList.remove('open'); bubble.classList.remove('gone'); saveMem(); if(mode==='voice'&&convo){ try{ convo.setMicMuted(true); }catch(_){} } }
bubble.addEventListener('click',()=>{ openPanel(); if(!convo&&!mode){ viewChoice(); } else if(mode==='voice'&&convo&&!micMuted){ try{ convo.setMicMuted(false); }catch(_){} } });
$('.bw-x').addEventListener('click',closePanel);
seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.m==='voice')));
ttog.addEventListener('click',()=>{ transcriptOpen=!transcriptOpen; ttog.textContent=transcriptOpen?'Hide transcript':'Show transcript'; applyBodyVis(); if(transcriptOpen) scrollDown(); });
function doSend(){ const tx=input.value.trim(); if(!tx)return; input.value=''; input.style.height='auto'; lastUser=tx; addMsg('user',tx); if(mode!=='voice') setTyping(true);
  const trySend=n=>{ if(convo&&convo.sendUserMessage){ try{ convo.sendUserMessage(tx); }catch(_){} } else if(n<20) setTimeout(()=>trySend(n+1),200); }; trySend(0); }
sendBtn.addEventListener('click',doSend);
input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); doSend(); } });
input.addEventListener('input',()=>{ input.style.height='auto'; input.style.height=Math.min(84,input.scrollHeight)+'px'; });
micBtn.addEventListener('click',()=>{ micMuted=!micMuted; try{ convo&&convo.setMicMuted&&convo.setMicMuted(micMuted); }catch(_){} micBtn.innerHTML=micMuted?I.micOff:I.mic; micBtn.classList.toggle('on',!micMuted); });
endBtn.addEventListener('click',async()=>{ await endIfAny(); viewChoice(); });

/* ----------------------------------------------------------------- public api */
window.BrainWidget={
  open(){ openPanel(); if(!convo&&!mode) viewChoice(); },
  openSection(fm){ openPanel();
    if(convo&&mode){ const q='Take me through this section in depth.'; lastUser=q; addMsg('user',q); if(mode!=='voice') setTyping(true);
      try{ convo.sendContextualUpdate&&convo.sendContextualUpdate('Focus now on this section. '+fm); }catch(_){}
      const f=n=>{ if(convo&&convo.sendUserMessage){ try{ convo.sendUserMessage(q); }catch(_){} } else if(n<20) setTimeout(()=>f(n+1),200); }; f(0); }
    else { pendingFirst=fm; viewChoice(); } },
  talkSection(fm){ openPanel(); pendingFirst=fm; viewChoice(); }, close(){ closePanel(); } };
