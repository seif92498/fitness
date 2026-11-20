const ICONS={
 mark:'<path d="M13.2 2.7 5 14h6.1l-1 7.3L19 10.1h-6.4z"/>',
 home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-7h6v7"/>',
 utensils:'<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v18m12 0V3c-2.6 0-4 3.9-4 7v3h4"/>',
 dumbbell:'<path d="M6 8V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3m12-8V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3M6 9h12v6H6z"/>',
 clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9zm0 7h6m-6 5h6"/>',
 chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16M8 16l4-5 4 2 5-6"/><path d="M17 7h4v4"/>',
 user:'<circle cx="12" cy="8" r="3.5"/><path d="M4.5 21v-2.2a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4V21"/>',
 userplus:'<circle cx="9" cy="7.5" r="3.5"/><path d="M2.5 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2M19 8v6m-3-3h6"/>',
 share:'<path d="M12 15V2m-4 4 4-4 4 4M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
 moon:'<path d="M20.9 13.1A8.8 8.8 0 0 1 10.9 3a9 9 0 1 0 10 10.1Z"/><path d="M18 3v4m-2-2h4"/>',
 monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10m-8 13a2 2 0 0 0 4 0"/>',
 chevron:'<path d="m9 6 6 6-6 6"/>',
 left:'<path d="m14 6-6 6 6 6"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 arrow:'<path d="M20 12H4m7-7-7 7 7 7"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-13 5h2m4 0h2"/>',
 flame:'<path d="M12 22c-4.5 0-7.5-2.9-7.5-7 0-3.1 1.8-5 3.2-6.1.1 2 1.1 2.9 2 3.3 1-2.4 2.6-5.5 1.9-9.2 4.1 2.7 7.9 6.8 7.9 12 0 4.1-3 7-7.5 7z"/><path d="M12 22c-1.7 0-3-1.4-3-3 .1-1.7 1.4-3.1 3-4.5 1.8 1.4 3 2.8 3 4.5 0 1.6-1.3 3-3 3z"/>',
 drop:'<path d="M19 14a7 7 0 0 1-14 0c0-4 3.6-7.9 7-12 3.4 4.1 7 8 7 12z"/><path d="M8 14a4 4 0 0 0 4 4"/>',
 shoe:'<path d="M20.5 18h-16A2.5 2.5 0 0 1 2 15.5v-5l4 1 2-4 3 2 2 3 5 1.4 3 .6a2.5 2.5 0 0 1 1.5 2.3c0 .7-.5 1.2-2 1.2z"/><path d="M6 15h15M10 11l-1 1m4 0-1 1"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8z"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 circle:'<circle cx="12" cy="12" r="3"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 scale:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 10a5 5 0 0 1 10 0m-5 0 2-2"/>',
 camera:'<path d="M4 6h4l1.4-2h5.2L16 6h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="3.5"/>',
 lightbulb:'<path d="M9 18h6m-5 4h4M8 14a6 6 0 1 1 8 0c-.8.7-1 1.4-1 2h-6c0-.6-.2-1.3-1-2z"/>',
 pill:'<rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="m9 9 6 6"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 shield:'<path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10z"/><path d="m8.5 12 2.3 2.3 4.7-5"/>',
 link:'<path d="m10 13 4-4m-6 6-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m5 2 1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0"/>',
 x:'<path d="m6 6 12 12M18 6 6 18"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
 copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
 upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
 trash:'<path d="M3 6h18M9 6V3h6v3m3 0-1 15H7L6 6m4 4v7m4-7v7"/>',
 search:'<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
 edit:'<path d="m14 6 4 4M4 20l4-1 12-12a2.8 2.8 0 0 0-4-4L4 15l-1 5zM12 20h9"/>',
 timer:'<circle cx="12" cy="14" r="8"/><path d="M12 10v4l2 2M9 2h6m-3 0v4m5 2 2-2"/>',
 swap:'<path d="M4 8h16m-4-4 4 4-4 4m4 4H4m4-4-4 4 4 4"/>',
 bag:'<path d="M4 8h16l1 13H3zM8 9V6a4 4 0 0 1 8 0v3"/>',
 cup:'<path d="M4 5h13l-2 15H6zm13 2h2a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-2"/>',
 bottle:'<path d="M9 3h6v4l3 4v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8l3-4zm-3 10h12"/>',
 trophy:'<path d="M7 4h10v6a5 5 0 0 1-10 0zm0 2H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4m-5 3v5m-4 0h8"/>',
 sparkles:'<path d="M12 2c.8 5.4 2.6 7.2 8 8-5.4.8-7.2 2.6-8 8-.8-5.4-2.6-7.2-8-8 5.4-.8 7.2-2.6 8-8zm7 13v6m-3-3h6M5 3v4M3 5h4"/>',
 book:'<path d="M4 5a3 3 0 0 1 3-3h12v20H7a3 3 0 0 1-3-3zm0 14a3 3 0 0 1 3-3h12m-10-9h6m-6 4h6"/>',
 users:'<circle cx="9" cy="7.5" r="3.5"/><path d="M2 21v-2.5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4V21m1-17a3.5 3.5 0 0 1 0 7m5 10v-2.5a4 4 0 0 0-3-4"/>',
 play:'<path d="m8 5 12 7-12 7z"/>',pause:'<path d="M9 5v14m6-14v14"/>',
 mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v4m-3 0h6"/>'
};
const $=(s,el=document)=>el.querySelector(s);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let bindingIndex=0;
const bindings=new Map();
function bind(v){const k=String(++bindingIndex);bindings.set(k,String(v??''));return `data-bind="${k}"`;}
function userText(v){return `<span ${bind(v)}></span>`;}
function mount(el,markup){el.innerHTML=markup;el.querySelectorAll('[data-bind]').forEach(x=>{x.textContent=bindings.get(x.dataset.bind)||'';bindings.delete(x.dataset.bind);x.removeAttribute('data-bind');});}
const icon=(name,size='')=>`<svg class="icon ${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]||''}</svg>`;
const tile=(name,tone='')=>`<span class="tile ${tone}">${icon(name)}</span>`;
function btn(label,action,ic='',variant='quiet',attrs=''){return `<button type="button" class="btn btn-${variant}" data-act="${action}" ${attrs}>${ic?icon(ic,'sm'):''}${esc(label)}</button>`;}
function submit(label,ic='check'){return `<button type="submit" class="btn btn-primary">${icon(ic,'sm')}${esc(label)}</button>`;}
function iconBtn(label,action,ic,attrs=''){return `<button type="button" class="btn icon-btn" data-act="${action}" aria-label="${esc(label)}" title="${esc(label)}" ${attrs}>${icon(ic)}</button>`;}
const datum=(k,v)=>`data-${k}="${esc(v)}"`;
const opt=(value,label,current)=>`<option value="${esc(value)}" ${String(value)===String(current)?'selected':''} ${bind(label)}></option>`;
const opts=(list,current)=>list.map(([v,l])=>opt(v,l,current)).join('');
const field=(label,control,extra='',hint='')=>`<label class="field ${extra}"><span>${esc(label)}</span>${control}${hint?`<span class="hint">${esc(hint)}</span>`:''}</label>`;
const num=(name,value,min,max,step=1,required=false,placeholder='')=>`<input type="number" inputmode="${step===1?'numeric':'decimal'}" name="${esc(name)}" value="${esc(value??'')}" min="${min}" max="${max}" step="${step}" ${required?'required':''} placeholder="${esc(placeholder)}">`;
const pill=(label,act,val,pressed,ic='',style='')=>`<button type="button" class="pill ${style}" data-act="${act}" ${datum('value',val)} aria-pressed="${Boolean(pressed)}">${ic?icon(ic,'sm'):''}${esc(label)}</button>`;
const chip=(label,tone='',ic='')=>`<span class="chip ${tone}">${ic?icon(ic):''}${esc(label)}</span>`;
const subtil=(title,ic,tone='')=>`<h2 class="card-title">${ic?tile(ic,tone):''}${title}</h2>`;
function panel(title,ic,tone,body,side='',klass=''){return `<section class="card ${klass}"><div class="card-head">${subtil(title,ic,tone)}${side}</div>${body}</section>`;}
const empty=(title,body,ic='info')=>`<div class="empty">${tile(ic)}<strong>${esc(title)}</strong>${esc(body)}</div>`;
const meter=(pc,label,mode='',paint='')=>`<div class="track ${mode}" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${rounded(clamp(pc,0,100))}"><span style="--percent:${clamp(pc,0,100)}%;${paint?`--bar:var(--${paint})`:''}"></span></div>`;
const cell=(label,value)=>`<div class="stat-cell"><span>${esc(label)}</span><strong>${value}</strong></div>`;
const row=(label,value)=>`<div><span>${esc(label)}</span><strong>${value}</strong></div>`;
const more=(label,ic,body)=>`<details class="section-details"><summary><span class="flex">${icon(ic,'sm')}${esc(label)}</span><span class="chevron">${icon('down','sm')}</span></summary><div>${body}</div></details>`;
function heading(eyebrow,title,sub,actions='',eyIcon='bolt',isDate=false){return `<header class="page-heading"><div><div class="eyebrow ${isDate?'date':''}">${icon(eyIcon,'sm')}${esc(eyebrow)}</div><h1>${title}</h1><p>${esc(sub)}</p></div>${actions?`<div class="heading-actions">${actions}</div>`:''}</header>`;}
function onboardStrip(){return state.profile?'':`<section class="onboard-strip"><div class="flex">${tile('userplus','accent')}<div><h2>خلّيه على مقاسك</h2><p>ضيف بياناتك عشان تحسب أهدافك وتبدأ تسجّل.</p></div></div>${btn('ابدأ دلوقتي','onboard','arrow','primary')}</section>`;}
function brand(){return `<button type="button" class="brand" data-act="nav" data-value="today" aria-label="فورمة، الصفحة الرئيسية"><span class="brand-mark">${icon('mark')}</span><span><span class="brand-name">فورمة</span><span class="brand-caption">متابع صحتك ولياقتك</span></span></button>`;}
function navButtons(){return TABS.map(([k,ar,ic])=>`<button type="button" class="nav-btn" data-act="nav" data-value="${k}" ${ui.tab===k?'aria-current="page"':''}>${icon(ic)}<span>${ar}</span></button>`).join('');}
function renderChrome(){
 const active=TABS.find(x=>x[0]===ui.tab)||TABS[0];
 mount($('#sidebar'),`${brand()}<p class="sidebar-kicker">القائمة الرئيسية</p><nav aria-label="أقسام فورمة" class="side-nav">${navButtons()}</nav><div class="side-bottom"><div class="side-share">${tile('users','accent')}<strong>مع أصحابك أحلى</strong><p>شارك فورمة وخلي كل واحد يتابع هدفه.</p><button type="button" class="btn-link" data-act="share">شارك التطبيق ${icon('arrow','sm')}</button></div><button type="button" class="side-account" data-act="${state.profile?'nav':'onboard'}" data-value="profile"><span class="avatar">${state.profile?userText(Array.from(state.profile.name)[0]):icon('user','sm')}</span><span><strong>${state.profile?userText(state.profile.name):'بروفايلك'}</strong><small class="muted">${state.profile?'الإعدادات والبيانات':'ظبّطه في دقيقة'}</small></span>${icon('left','sm')}</button></div>`);
 mount($('#topbar'),`${brand()}<div class="breadcrumbs">${icon('grid')}<span>مساحتي</span><span class="crumb-arrow">${icon('left','sm')}</span><strong>${active[1]}</strong></div><div class="top-actions"><button type="button" class="btn btn-quiet top-share" data-act="share" title="شارك التطبيق" aria-label="شارك التطبيق">${icon('share','sm')}<span>شارك التطبيق</span></button>${iconBtn('اختار مظهر التطبيق','theme-dialog',state.settings.theme==='dark'?'moon':'sun')}<button type="button" class="btn icon-btn" data-act="reminders" title="التذكيرات" aria-label="التذكيرات">${icon('bell')}<span class="bell-dot" aria-hidden="true"></span></button></div>`);
 mount($('#bottom-nav'),navButtons());
 document.title=`${active[1]} · ${appLanguage()==='en'?'Forma':'فورمة'}`;
}
function render(){
 document.documentElement.dataset.theme=state.settings.theme;
 document.documentElement.dataset.lang=appLanguage();
 $('meta[name=theme-color]').content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
 renderChrome();
 const views={today:renderToday,food:renderFood,workout:renderWorkout,plan:renderPlan,progress:renderProgress,profile:renderProfile};
 const warning=storageWarning?`<p class="note amber">${icon('info')}${esc(storageWarning)}</p>`:'';
 mount($('#view'),warning+(views[ui.tab]||renderToday)());
 if(ui.tab==='food'){foodPreview();favoritePreview();}
 if(ui.tab==='workout'){updateTimers();}
}
function go(tab,hash=true){
 if(!TABS.some(x=>x[0]===tab))return;
 ui.tab=tab;if(hash&&location.hash!==`#${tab}`){try{history.pushState(null,'',`#${tab}`);}catch{location.hash=tab;}}
 render();window.scrollTo(0,0);$('#view').focus({preventScroll:true});
}
let toastTimer;
function toast(s,error=false){const el=$('#toast');el.className=`toast show ${error?'error':''}`;mount(el,icon(error?'info':'check')+userText(s));clearTimeout(toastTimer);toastTimer=setTimeout(()=>{el.className='toast';},3300);}
function openDialog(title,content,mode=''){
 const d=$('#dialog');ui.modal=mode;mount(d,`<div class="dialog-head"><h2 id="dialog-title">${esc(title)}</h2>${iconBtn('اقفل','close','x')}</div>${content}`);
 if(!d.open){if(d.showModal)d.showModal();else d.setAttribute('open','');}else d.scrollTop=0;
}
function closeDialog(){const d=$('#dialog');if(d.open){if(d.close)d.close();else d.removeAttribute('open');}ui.modal='';}
function saved(message='اتحفظ',close=false){const ok=persist();if(close)closeDialog();render();toast(ok?message:storageWarning,!ok);}
function gate(){if(state.profile)return true;profileDialog();return false;}
async function clipboard(value,selectField=null){
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);toast('اتنسخ');return true;}}catch{}
 const el=selectField||document.createElement('textarea');if(!selectField){el.value=value;el.style.cssText='position:fixed;top:0;left:-9999px';($('#dialog').open?$('#dialog'):document.body).append(el);}
 el.focus();el.select();let ok=false;try{ok=document.execCommand('copy');}catch{}if(!selectField)el.remove();toast(ok?'اتنسخ':'النسخ مش تلقائي هنا. ظلّل النص وانسخه.',!ok);return ok;
}
function download(name,content,type='application/json'){
 const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
const appURL=()=>{const u=new URL(location.href);u.hash='';u.search='';return u.href;};
const supportedServer=()=>document.documentElement.dataset.host==='server'&&/^https?:$/.test(location.protocol)&&!/(^|\.)github\.io$/.test(location.hostname);
function shareDialog(){
 const web=/^https?:$/.test(location.protocol);const href=appURL();const hosted=supportedServer();
 const htmlLink=hosted?'/downloads/index.html':href;
 const publish=hosted?`<div class="publish-share"><div>${tile('upload','accent')}</div><div><strong>انشر فورمة على حسابك</strong><p class="fine">محتاج ملف <bdi>index.html</bdi> بس عشان يبقى ليك لينك ثابت.</p><button class="btn-link" type="button" data-act="pages-help">إزاي أرفعه على GitHub؟ ${icon('arrow','sm')}</button></div></div><div><a class="btn btn-quiet btn-sm" href="/downloads/forma-github-pages.zip" download>${icon('download','sm')}حزمة الكود للتعديل</a></div>`:'';
 openDialog('شارك فورمة مع صحابك',`<div class="stack"><p class="muted">اللّينك بيفتح التطبيق بس. اسمك ووزنك وسجلّك مش هيتبعتوا، وكل واحد يبدأ ببياناته هو.</p>${web?`${field('لينك التطبيق',`<input id="share-url" type="url" dir="ltr" readonly value="${esc(href)}">`)}<div class="form-actions">${btn('انسخ اللينك','copy-link','copy','primary')}${navigator.share?btn('ابعت من الموبايل','native-share','share'):''}<a class="btn btn-quiet" href="${esc(htmlLink)}" download="index.html">${icon('download','sm')}نزّل ملف HTML</a></div>${publish}`:`<p class="note">إنت فاتح الملف على جهازك. ابعت ملف <bdi>index.html</bdi> نفسه، أو ارفعه على استضافة ثابتة الأول عشان يبقى ليك لينك.</p>`}</div>`,'share');
}
function publishHelpDialog(){
 if(!supportedServer()){shareDialog();return;}
 const steps=[
  ['نزّل ملف الموقع',`اختار <code>index.html</code> من <bdi>Downloads</bdi> أو تطبيق «الملفات». لو اسمه اتغيّر وقت التنزيل، سمّيه بالظبط <code>index.html</code>.`, `<a class="btn btn-primary btn-sm" href="/downloads/index.html" download="index.html">${icon('download','sm')}نزّل index.html</a>`],
  ['اعمل مستودع لو لسه معندكش',`سمّيه <code>forma</code>، اختار <bdi>Public</bdi>، وفعّل <bdi>Add README</bdi> قبل ما تضغط <bdi>Create repository</bdi>.`, `<a class="btn btn-quiet btn-sm" href="https://github.com/new" target="_blank" rel="noopener noreferrer">${icon('arrow','sm')}افتح GitHub</a>`],
  ['ارفع الملف في الصفحة الرئيسية للمستودع',`من تبويب <bdi>Code</bdi> اختار <bdi dir="ltr">Add file → Upload files</bdi>، وبعدها <bdi>choose your files</bdi>. اختار <code>index.html</code> واضغط <bdi>Commit changes</bdi>.`],
  ['حوّله للينك يتشارك',`افتح <bdi dir="ltr">Settings → Pages</bdi>، واختار <bdi>Deploy from a branch</bdi>، ثم <bdi dir="ltr">main / (root)</bdi> واضغط <bdi>Save</bdi>. بعد النشر ارجع لنفس الصفحة وانسخ لينك الموقع.`]
 ];
 openDialog('إزاي أرفع فورمة على GitHub؟',`<div class="stack publish-dialog"><p class="fine">مش محتاج ترفع الـ ZIP أو تفتح الكود. ملف HTML واحد كفاية.</p><ol class="publish-steps">${steps.map(([title,detail,action],i)=>`<li class="publish-step"><span class="step-index" aria-hidden="true">${i+1}</span><div><h3>${esc(title)}</h3><p class="fine">${detail}</p>${action||''}</div></li>`).join('')}</ol><p class="note">${icon('info')} على الموبايل، لو زر <bdi>Add file</bdi> مش ظاهر، اطلب «موقع سطح المكتب» من قائمة Chrome أو Safari.</p><div class="form-actions">${btn('ارجع للمشاركة','share','share','quiet')}</div></div>`,'pages-help');
 const title=$('#dialog-title');title.tabIndex=-1;title.focus({preventScroll:true});
}
function themeControls(){return `<div class="theme-row">${[['auto','تلقائي','monitor'],['light','فاتح','sun'],['dark','داكن','moon']].map(([v,l,ic])=>pill(l,'theme',v,state.settings.theme===v,ic)).join('')}</div>`;}
function profileForm(){const p=state.profile||{};return `<form data-form="profile" class="stack"><p class="fine">المعادلات دي للبالغين. بياناتك بتفضل على الجهاز ده.</p><div class="form-grid">${field('اسمك',`<input name="name" autocomplete="given-name" maxlength="40" value="${esc(p.name)}" placeholder="مثال: عمر" required>`)}${field('السن',num('age',p.age,18,100,1,true,'25'))}${field('النوع للمعادلة',`<select name="sex" required>${opts([['','اختار'],['male','ذكر'],['female','أنثى']],p.sex||'')}</select>`)}${field('الطول (سم)',num('height',p.height,120,230,.1,true,'175'))}${field('الوزن (كجم)',num('weight',p.weight,35,300,.01,true,'75'))}${field('حركتك عادةً',`<select name="activity">${opts(ACTIVITY,p.activity||'1.55')}</select>`)}${field('هدفك',`<select name="goal">${opts(GOALS,p.goal||'bulk')}</select>`)}${field('أيام التمرين في الأسبوع',`<select name="trainDays">${opts([1,2,3,4,5,6].map(x=>[x,`${x} أيام`]),p.trainDays||5)}</select>`)}${field('وزن عايز توصله (كجم، اختياري)',num('goalWeight',p.goalWeight,35,300,.01,false,'مثال: 80'),'full')}${field('أكل مبتحبّوش أو عندك حساسية منه',`<input name="avoid" maxlength="170" value="${esc(p.avoid)}" placeholder="مثال: لبن، مكسرات">`,'full','افصل الأصناف بفاصلة. دايمًا راجع المكونات بنفسك لو عندك حساسية.')}</div><div class="form-actions">${submit(state.profile?'احفظ التعديلات':'يلا نبدأ','check')}${btn('إلغاء','close')}</div></form>`;}
function profileDialog(){openDialog(state.profile?'عدّل بياناتك':'ظبّط بروفايلك',profileForm(),'profile');}
function macroGrid(have,need){return `<div class="macros">${[['p','بروتين','protein'],['c','كارب','carb'],['f','دهون','fat']].map(([key,label,color])=>`<div class="macro"><div class="macro-label"><span class="dot" style="color:var(--${color})"></span>${label}</div><div class="macro-val"><strong>${nf(have[key],0)}</strong><bdi>/ ${nfmt(need[key],0)}</bdi> جم</div>${meter(percent(have[key],need[key]),label,'',color)}</div>`).join('')}</div>`;}
function barChart(values,labels,{target=null,unit='',color='accent',scale=0}={}){
 const topValue=Math.max(scale||1,target||0,...values.map(v=>v||0));
 const power=10**Math.floor(Math.log10(topValue/3));
 const step=power*([1,2,2.5,3,4,5,7.5,10].find(c=>c*power>=topValue/3)||10),max=3*step;
 const xs=values.map((_,i)=>450-i*(408/Math.max(values.length-1,1)));const y0=107, top=12;
 const ty=v=>y0-clamp(v/max,0,1)*(y0-top);
 let grid='';for(const ticks of [3,2,1,0]){const y=ty(ticks*step);grid+=`<path class="${ticks?'chart-grid':'chart-axis'}" d="M20 ${y}H478"/><text class="axis-number" x="521" y="${y+4}" text-anchor="end">${nfmt(ticks*step,step<1?2:step<10?1:0)}</text>`;}
 if(target!==null)grid+=`<path class="chart-target" d="M20 ${ty(target)}H483"><title>الهدف: ${nfmt(target,1)} ${esc(unit)}</title></path>`;
 return `<svg class="chart-svg" viewBox="0 0 525 133" role="img" aria-label="رسم بياني ${esc(unit)}" style="--paint:var(--${color})">${grid}${values.map((v,i)=>{const x=xs[i];const y=ty(v||0);const bh=Math.max(v==null?0:2,y0-y);return `<rect class="chart-bar ${i===values.length-1?'current':''}" x="${x-13}" y="${y0-bh}" width="26" height="${bh}" rx="4"><title>${esc(labels[i])}: ${v==null?'مش متسجّل':`${nfmt(v,1)} ${esc(unit)}`}</title></rect><text x="${x}" y="126" text-anchor="middle">${esc(labels[i])}</text>`;}).join('')}</svg>`;
}
function sparkline(values,tone){const vs=values.map(v=>v||0);const lo=Math.min(...vs),hi=Math.max(...vs);const coords=vs.map((v,i)=>[3+i*13,30-(v-lo)*24/(hi-lo||1)]);const last=coords.at(-1);return `<svg class="spark" viewBox="0 0 88 34" aria-hidden="true"><path d="${coords.map(([x,y],i)=>`${i?'L':'M'}${x} ${y}`).join(' ')} L${last[0]} 34 H3Z" fill="var(--${tone}-soft)"/><path d="${coords.map(([x,y],i)=>`${i?'L':'M'}${x} ${y}`).join(' ')}" fill="none" stroke="var(--${tone})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${last[0]}" cy="${last[1]}" r="2.5" fill="var(--${tone})"/></svg>`;}
const chartTypes={kcal:['السعرات','سُعرة','accent'],water:['الماية','لتر','blue'],sleep:['النوم','ساعة','violet']};
function dashboardChart(dates,t,demo){
 const mode=ui.chart;const [label,unit,color]=chartTypes[mode];const values=demo?{kcal:DEMO.kcal,water:DEMO.hydration,sleep:DEMO.rest}[mode]:dates.map(k=>{const d=getDay(k);return mode==='kcal'?(d.food.length?sum(d.food).kcal:null):mode==='water'?(d.water>0?d.water/1000:null):d.sleep;});const target=mode==='kcal'?t.kcal:mode==='water'?t.water/1000:8;
 const filters=`<div class="chart-filters" aria-label="نوع النشاط">${Object.entries(chartTypes).map(([v,[l]])=>`<button type="button" data-act="chart" data-value="${v}" aria-pressed="${v===mode}">${l}</button>`).join('')}</div>`;
 return panel('نشاط الأسبوع','chart','teal',`<div class="chart-wrap">${barChart(values,dates.map(shortWeek),{target,unit,color})}</div><div class="chart-legend"><span class="dot" style="color:var(--${color})"></span>${esc(label)} المسجّل <span class="dot" style="color:var(--teal)"></span> هدفك ${nf(target,mode==='water'?1:0)} ${unit}</div>`,filters,'chart-card');
}
function calorie(t,e,b,demo){
 const net=t.kcal-e.kcal+b,over=e.kcal>t.kcal*1.05;const pc=clamp(100*(e.kcal-b)/t.kcal,0,100);
 return panel('السعرات النهارده','flame','accent',`<div class="ring-wrap"><div class="ring ${over?'over':''}" role="img" aria-label="${nfmt(Math.abs(net))} سعرة ${net<0?'زيادة':'فاضلة'}"><svg viewBox="0 0 128 128" aria-hidden="true"><circle class="ring-track" cx="64" cy="64" r="56" fill="none" stroke-width="10"/><circle class="ring-fill" cx="64" cy="64" r="56" fill="none" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="${pc?Math.max(pc,1):0} 100" style="${pc===0?'visibility:hidden':''}"/></svg><div class="ring-text"><strong>${nf(Math.abs(net))}</strong><span>${net<0?'سُعرة زيادة':'سُعرة فاضلة'}</span></div></div><div class="ring-legend"><span>أكلت <strong>${nf(e.kcal)}</strong></span><span class="dot"></span><span>حرقت <strong>${nf(b)}</strong></span><span class="dot"></span><span>هدفك <strong>${nf(t.kcal)}</strong></span></div></div>${macroGrid(e,t)}`,demo?chip('بيانات تجريبية','','circle'):'','calorie-card');
}
function renderToday(){
 const demo=!state.profile,d=getDay(),t=energy()||DEMO.targets, e=demo?DEMO.eaten:sum(d.food), b=demo?DEMO.burn:burned(d), water=demo?DEMO.water:d.water, move=demo?DEMO.distance:d.distance, sleep=demo?DEMO.sleep:d.sleep, chain=demo?DEMO.streak:streak();const dates=range(7);
 const work=routine(),scheduled=demo?0:trainingToday(), rest=scheduled<0, w=work[rest?0:scheduled];
 const workout=`<section class="workout-banner" aria-label="تمرين النهارده"><div class="hero-content"><div class="hero-kicker">${icon('bolt')} ${rest?'خطة التمرين':'تمرين النهارده'}</div><h2>${rest?'يوم استشفاء':w[0]==='دفع'?'تمرين الدفع':esc('تمرين '+w[0])}</h2><p class="hero-sub">${rest?'الراحة جزء من التقدّم. خدها بهدوء.':esc(w[1])}</p><div class="hero-actions">${btn('افتح التمرين','open-workout','arrow','white',datum('value',rest?0:scheduled))}${rest?'':`<span class="hero-amount">${icon('dumbbell')} ${nf(dayExercises(scheduled).length)} تمارين</span>`}</div></div><span class="hero-index" aria-hidden="true">${String((rest?0:scheduled)+1).padStart(2,'0')} / ${String(work.length).padStart(2,'0')}</span></section>`;
 const waterCard=panel('الماية','drop','blue',`<div class="metric-value"><strong>${nf(water/1000,2)}</strong><small>من ${nf(t.water/1000,2)} لتر</small></div>${meter(percent(water,t.water),'هدف الماية','blue')}<div class="metric-footer">${btn('كوباية +','water','cup','blue btn-sm',datum('value',250))}${btn('إزازة +','water','bottle','blue btn-sm',datum('value',500))}${iconBtn('اطرح 250 مل','water','minus',datum('value',-250))}</div>`,chip(`${nfmt(percent(water,t.water))}٪`,'blue'),'metric');
 const moveCard=panel('الحركة','shoe','teal',`<div class="metric-visual"><div><div class="metric-value"><strong>${move==null?'—':nf(move,1)}</strong><small>كم</small></div><div class="metric-note">مشي النهارده</div></div>${sparkline(demo?[.4,1.4,1.2,2.1,1.9,3.1,3.2]:dates.map(k=>getDay(k).distance),'teal')}</div><div class="metric-footer"><button type="button" class="micro-link text-teal" data-act="activity" data-value="distance">${icon('plus')} سجّل الحركة</button></div>`,chip(`≈ ${nfmt(b)} سُعرة`,'teal'),'metric');
 const sleepCard=panel('النوم','moon','violet',`<div class="metric-visual"><div><div class="metric-value"><strong>${sleep==null?'—':nf(sleep,1)}</strong><small>ساعة</small></div><div class="metric-note">هدفك 7–9 ساعات</div></div>${sparkline(demo?DEMO.rest:dates.map(k=>getDay(k).sleep),'violet')}</div><div class="metric-footer"><button type="button" class="micro-link text-violet" data-act="activity" data-value="sleep">${icon('plus')} سجّل النوم</button></div>`,chip(sleep==null?'لسه متسجّلش':sleep<7?'أقل من الهدف':'في النطاق',sleep!=null&&sleep<7?'amber':'violet'),'metric');
 const streakCard=panel('استمراريتك','flame','accent',`<div class="streak-main"><strong>${nf(chain)}</strong><span class="muted">${chain===1?'يوم متسجّل':'أيام ورا بعض'}</span></div><p class="fine">${chain?'حتى أبسط تسجيل بيحسب خطوة لقدّام.':'سجّل أكلة أو كوباية وابدأ أول يوم.'}</p><div class="streak-week">${dates.map((date,i)=>{const hit=demo?i>=3:didLog(date);return `<div class="streak-day ${hit?'hit':''} ${i===6?'today':''}" title="${esc(fullDate(date))}: ${hit?'متسجّل':'لسه'}"><span>${icon(hit?'check':'minus')}</span><span>${esc(shortWeek(date))}</span></div>`;}).join('')}</div>`,chip('آخر 7 أيام','','calendar'));
 const tips=[];
 if(demo)tips.push('ابدأ بتسجيل وجباتك حتى لو مش عارف كل حاجة بالجرام.','وزّع شرب الماية على اليوم بدل ما تفتكرها آخر لحظة.');
 else {if(sleep!=null&&sleep<7)tips.push('نومك أقل من 7 ساعات. ادي جسمك وقت يستريح قبل تمرين تقيل.');if(e.p>=t.p)tips.push('عاش! وصلت لهدف البروتين النهارده.');else if(new Date().getHours()>=16&&e.p<t.p*.75)tips.push('لسه فاضل بروتين. ممكن تكمّل بجبنة قريش أو تونة لو مناسبين ليك.');if(water<t.water*.7)tips.push('خلي إزازة ماية جنبك وسجّل شربك على مدار اليوم.');if(!tips.length)tips.push('سجّل اللي حصل بصدق؛ الاستمرار أهم من يوم مثالي.');}
 const next=nextCheck(), checkDue=state.profile&&next<=today();
 const quick=panel('تسجيل سريع','bolt','amber',`<div class="quick-actions">${[['سجّل أكلة','food-add','utensils','accent'],['سجّل كارديو','cardio','shoe','teal'],['سجّل قياسات','checkin','scale','blue'],['مفكّرة اليوم','journal','book','violet']].map(([l,a,i,c])=>`<button type="button" class="quick-action" data-act="${a}">${tile(i,c)}${l}</button>`).join('')}</div>`);
 const supplements=panel('مكمّلات النهارده','pill','violet',`<div class="pills wrap-pills">${SUPPLEMENTS.map(s=>pill(s,'supplement',s,d.supplements.includes(s),d.supplements.includes(s)?'check':'plus')).join('')}</div><p class="fine under-card">متابعة بس، مش توصية إنك تاخدها.</p>`);
 return heading(fullDate(today()),demo?'أهلاً بيك في فورمة':`أهلاً يا ${userText(state.profile.name)}`,demo?'أكلك وتمرينك وتقدّمك، كلّه في مكان واحد.':'يوم جديد وفرصة جديدة تقرّب لهدفك.',demo?btn('ابدأ دلوقتي','onboard','userplus','primary'):btn('سجّل أكلة','food-add','plus','primary'),'calendar',true)+`<div class="dashboard-hero">${workout}${calorie(t,e,b,demo)}</div><div class="dashboard-metrics">${waterCard}${moveCard}${sleepCard}</div><div class="dashboard-lower">${dashboardChart(dates,t,demo)}${streakCard}</div>${demo?onboardStrip():''}<div class="grid-two">${quick}${panel('نصيحة النهارده','lightbulb','amber',`<ul class="tip-list">${tips.map(s=>`<li>${icon('check')}${esc(s)}</li>`).join('')}</ul>`)}</div><div class="grid-two">${supplements}${panel('متابعتك الجاية','calendar','teal',`<p class="fine">${demo?'بعد ما تعمل بروفايل، فورمة هيفكّرك بمعاد الوزن والقياسات.':checkDue?'جه وقت تسجيل الوزن والقياسات.':`المعاد الجاي ${esc(fullDate(next))}.`}</p><div class="under-card">${btn(checkDue?'سجّل دلوقتي':'شوف التذكيرات',checkDue?'checkin':'reminders',checkDue?'scale':'bell','quiet')}</div>`)}</div>`;
}
function activityDialog(focus){
 if(!gate())return;const d=getDay();openDialog('الحركة والنوم',`<form data-form="activity" class="stack"><div class="form-grid">${field('مسافة المشي (كم)',num('distance',d.distance,0,200,.01,false,'3.2'))}${field('نمت كام ساعة؟',num('sleep',d.sleep,0,24,.1,false,'7.5'))}${field('جودة النوم',`<select name="quality">${opts(QUALITY,d.quality)}</select>`,'full')}</div><p class="note">${icon('info')} حرق المشي تقديري: المسافة × وزنك × 0.75. الجري حوالي 1 سُعرة لكل كجم/كم. ما تسجّلش نفس المسافة مرتين.</p><div class="form-actions">${submit('احفظ')}${btn('سجّل نوع كارديو تاني','cardio','shoe')}</div></form>`,'activity');
 if(focus==='distance'||focus==='sleep')$(`[name=${focus}]`,$('#dialog'))?.focus();
}
function reminderDialog(){
 const date=nextCheck();const browser='Notification' in window;
 openDialog('التذكيرات',`<div class="stack"><div class="list-entry"><div class="flex">${tile('scale','teal')}<div><p class="strong">الوزن والقياسات</p><p class="fine">${state.profile?(date<=today()?'المتابعة مستنياك النهارده.':`المتابعة الجاية ${esc(fullDate(date))}.`):'فعّل المتابعة بعد ما تعمل بروفايل.'}</p></div></div>${btn('سجّل','checkin','plus','quiet btn-sm')}</div><div class="pills">${[7,14].map(v=>pill(v===7?'كل أسبوع':'كل أسبوعين','check-frequency',v,state.settings.checkEvery===v)).join('')}</div><p class="note">${icon('info')} تنبيهات الماية والقياسات بتشتغل والصفحة مفتوحة بس. مفيش إشعارات في الخلفية في نسخة الملف.</p>${browser?btn(state.settings.reminders?'اقفل تنبيهات المتصفح':'فعّل تنبيهات المتصفح','notification','bell',state.settings.reminders?'quiet':'primary'):''}</div>`,'reminders');
}
function renderProfile(){
 const t=energy(),p=state.profile;
  const identity=p?`${panel(userText(p.name),'user','accent',`<p class="fine">${esc(GOALS.find(g=>g[0]===p.goal)[1])} · ${nf(p.trainDays)} أيام تمرين في الأسبوع</p><div class="stat-grid three under-card">${cell('الوزن (كجم)',nf(p.weight,2))}${cell('الطول (سم)',nf(p.height,1))}${cell('السن',nf(p.age))}</div>${p.avoid?`<p class="note under-card">أكل هنبعد عنه في الاقتراحات: ${userText(p.avoid)}</p>`:''}`)}`:panel('بروفايلك','user','accent',empty('لسه مفيش بيانات','ضيف طولك ووزنك وهدفك عشان نحسب احتياجك.','userplus'));
  const cals=t?`<div class="stats-rows">${row('الحرق في الراحة (BMR)',nf(t.bmr)+' سُعرة')}${row('احتياج الثبات (TDEE)',nf(t.tdee)+' سُعرة')}${row('هدف السعرات النهارده',nf(t.kcal)+' سُعرة')}${row('البروتين',nf(t.p,1)+' جم · '+nf(percent(t.p*4,t.kcal))+'٪')}${row('الكارب',nf(t.c,1)+' جم · '+nf(percent(t.c*4,t.kcal))+'٪')}${row('الدهون',nf(t.f,1)+' جم · 25٪')}${row('الماية',nf(t.water/1000,2)+' لتر')}${row('مؤشر كتلة الجسم (BMI)',nf(t.bmi,1))}</div><p class="fine under-card">معادلة ميفلين–سانت جيور. الميزان ومؤشر الكتلة مش حكم على صحتك.</p>${t.kcal<1300?'<p class="note amber under-card">النتيجة قليلة. ما تعتمدش على الرقم لوحده وراجع أخصائي تغذية.</p>':''}`:empty('حساب احتياجك الشخصي','هنا هتشوف السعرات والبروتين والكارب والدهون والماية.','flame');
  const backup=panel('نسخة من بياناتك','download','blue',`<div class="stack"><p class="fine">احتفظ بنسخة JSON لنقلها لجهاز تاني. ملف CSV يتفتح في إكسل أو جداول جوجل. خزن النسخة في مكان آمن.</p><div class="section-buttons">${btn('اطلع نسخة JSON','backup-export','copy','tint')}${btn('نزّل JSON','backup-file','download')}${btn('نزّل السجل CSV','backup-csv','download')}${btn('استرجع نسخة','backup-import','upload')}</div></div>`);
  const languageCard=panel('لغة التطبيق','monitor','violet',`<div class="theme-row">${[['ar','عربي'],['en','English']].map(([v,l])=>pill(l,'language',v,state.settings.language===v)).join('')}</div><p class="fine under-card">اللغة بتأثر على أسماء الأكل والتمارين والأجهزة. سجلّك ووزنك ومحفوظاتك زي ما هما.</p>`);
  return heading('الإعدادات','حسابي','بياناتك وأهدافك والمظهر اللي يريحك.',btn(p?'عدّل بياناتك':'ابدأ دلوقتي','onboard',p?'edit':'userplus','primary'),'user')+onboardStrip()+`<div class="profile-top"><div class="stack">${identity}${panel('مظهر التطبيق','sun','amber',themeControls())}${languageCard}${backup}</div><div class="stack">${panel('احتياجاتك اليومية','flame','accent',cals)}${panel('بياناتك تخصّك','shield','teal',`<p class="fine">سجلّك محفوظ في المتصفح ده، من غير حساب أو مزامنة. مسح بيانات المتصفح أو تغيير الجهاز ممكن يضيّع السجل لو مفيش نسخة. أي تحليل خارجي بيتعمل بس بعد موافقتك.</p><p class="note under-card">الأرقام تقديرية، مش تشخيص ولا بديل عن دكتور أو مدرّب.</p>`)}</div></div>${friendsPanel()}`;
}
function backupDialog(mode){
 const isOut=mode==='out';const help=isOut?'انسخ النص ده أو نزّله كملف. النسخة فيها سجلاتك وصورك لو موجودة.':'الصق نسخة JSON من فورمة. استرجاعها هيستبدل السجل الموجود.';
 openDialog(isOut?'نسخة احتياطية':'استرجاع نسخة',`<div class="stack"><p class="muted">${help}</p>${field('محتوى النسخة',`<textarea class="code-box" id="backup-code" ${isOut?'readonly':''} spellcheck="false" placeholder="{ … }"></textarea>`)}${isOut?`<div class="form-actions">${btn('انسخ النسخة','backup-copy','copy','primary')}${btn('نزّل JSON','backup-file','download')}</div>`:`<div class="form-actions">${btn('راجع النسخة','backup-validate','check','primary')}</div>`}</div>`,'backup');
 if(isOut)$('#backup-code').value=JSON.stringify(state);
}
function exportCSV(){
 const csvValue=v=>{const s=typeof v==='string'&&/^\s*[=+\-@]/.test(v)?`'${v}`:String(v??'');return `"${s.replace(/"/g,'""')}"`;};
 const rows=[['التاريخ','النوع','الاسم','الوجبة','الجرام','السعرات','بروتين (جم)','كارب (جم)','دهون (جم)','الوزن (كجم)','تكرارات أو مدة','مجموعات','صعوبة']];
 Object.entries(state.days).sort().forEach(([date,d])=>d.food.forEach(f=>rows.push([date,'أكل',f.name,MEALS[f.meal],f.grams,rounded(f.kcal,1),rounded(f.p,1),rounded(f.c,1),rounded(f.f,1),'','','',''])));
 state.logs.forEach(l=>rows.push([l.date,'تمرين',exercise(l.exerciseId)?.name||'تمرين','','','','','','',l.kg,l.reps,l.sets,l.rpe]));
 if(rows.length===1){toast('لسه مفيش أكل أو تمرين يتصدّر.',true);return;}
 download(`forma-${today()}.csv`,'\uFEFF'+rows.map(r=>r.map(csvValue).join(',')).join('\r\n'),'text/csv;charset=utf-8');
}
