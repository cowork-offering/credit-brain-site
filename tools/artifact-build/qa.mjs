import puppeteer from '/opt/connectry/projects/uk-companies-house/repo/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const errs=[], warns=[];
const browser=await puppeteer.launch({headless:'new',executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist','--enable-webgl']});
const page=await browser.newPage();
await page.setViewport({width:1440,height:900,deviceScaleFactor:1});
page.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); if(m.type()==='warning') warns.push(m.text()); });
page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
page.on('requestfailed',r=>errs.push('REQFAIL: '+r.url().slice(0,80)+' '+ (r.failure()?.errorText||'')));
await page.goto('file:///tmp/credit-brain-artifact.html',{waitUntil:'load',timeout:30000});
await new Promise(r=>setTimeout(r,3500));
const diag=await page.evaluate(()=>({
  THREE: typeof window.THREE,
  canvases: document.querySelectorAll('canvas').length,
  dataTheme: document.documentElement.getAttribute('data-theme'),
  dataView: document.documentElement.getAttribute('data-view'),
  h1: (document.getElementById('h1')||{}).textContent||null,
  fontLoaded: document.fonts && [...document.fonts].some(f=>f.family.includes('Inter')&&f.status==='loaded'),
  bodyH: document.body.scrollHeight,
  sections: document.querySelectorAll('section').length,
  advisorBtn: !!document.getElementById('advExplain'),
  brainWidget: typeof window.BrainWidget,
}));
await page.screenshot({path:'/tmp/qa-functional-top.png'});
// scroll to mid to trigger reveals
await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight*0.35));
await new Promise(r=>setTimeout(r,1500));
await page.screenshot({path:'/tmp/qa-functional-mid.png'});
await browser.close();
console.log('DIAG', JSON.stringify(diag,null,2));
console.log('\nCONSOLE ERRORS ('+errs.length+'):'); errs.slice(0,20).forEach(e=>console.log('  - '+e.slice(0,160)));
console.log('\nWARNINGS ('+warns.length+'):'); warns.slice(0,8).forEach(w=>console.log('  - '+w.slice(0,120)));
