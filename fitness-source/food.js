function foodOptions(query,current){
 const ts=words(query);const list=allFoods().filter(f=>ts.every(t=>normalize([f.name,f.nameEn||'',f.group,...f.aliases].join(' ')).includes(t)));
 return list.length?list.map(f=>opt(f.id,foodName(f),current)).join(''):opt('',appLanguage()==='en'?'No food matches your search':'مفيش أكل بالبحث ده','');
}
function foodPicker(inDialog=false){
 const current=getFood(ui.foodPick)||FOODS[0];const date=inDialog&&ui.tab!=='food'?today():ui.date;
 return `<form class="stack" data-form="food" data-food-picker="${inDialog?'dialog':'main'}" ${datum('date',date)}><div class="form-grid">${field('دوّر على أكلة',`<input type="search" data-food-query value="${esc(ui.foodQuery)}" placeholder="فول، كشري، فراخ…" autocomplete="off">`,'full')}${field('الأكلة',`<select name="foodId" data-food-select required>${foodOptions(ui.foodQuery,current.id)}</select>`,'full')}${field('الوجبة',`<select name="meal">${opts(Object.entries(MEALS),ui.meal)}</select>`)}${field('الكمية (جرام)',num('grams',ui.foodGrams||current.portion,1,5000,1,true))}</div><div class="note" data-food-preview aria-live="polite"></div><div class="form-actions">${submit('ضيف الأكلة','plus')}${inDialog?btn('أدخل بالصورة','photo','camera'):btn('ضيف صنف جديد','custom-food','edit')}</div></form>`;
}
function foodPreview(){
 for(const form of document.querySelectorAll('[data-food-picker]')){const f=getFood($('[name=foodId]',form)?.value),g=toNum($('[name=grams]',form)?.value);const current=$('[data-food-preview]',form);if(!current)continue;
  if(!f||g<=0){current.textContent='اختار صنف وكمية عشان تشوف الأرقام.';continue;}
  const totals=kcalOf(f,g);mount(current,`<strong>${nf(totals.kcal)} سُعرة</strong> · بروتين ${nf(totals.p,1)} جم · كارب ${nf(totals.c,1)} جم · دهون ${nf(totals.f,1)} جم <span class="tiny">(الحصة المعتادة ${nf(f.portion)} جم)</span>`);
 }
}
function foodInput(target){
 const form=target.closest('[data-food-picker]');if(!form)return;
 if(target.matches('[data-food-query]')){
   ui.foodQuery=target.value;const select=$('select[name=foodId]',form),previous=select.value;
   mount(select,foodOptions(ui.foodQuery,previous));
   if(previous!==select.value){ui.foodPick=select.value;ui.foodGrams=getFood(select.value)?.portion||'';$('[name=grams]',form).value=ui.foodGrams;}
 }else if(target.matches('[data-food-select]')){
   ui.foodPick=target.value;ui.foodGrams=getFood(target.value)?.portion||'';$('[name=grams]',form).value=ui.foodGrams;
 }else if(target.name==='grams'){ui.foodGrams=target.value;}
 foodPreview();
}
function foodAddDialog(){if(!gate())return;openDialog('سجّل أكلة',foodPicker(true),'food-add');foodPreview();}
function foodMacros(d){return `<div class="food-macros"><span>${nf(d.kcal)} سُعرة</span><span><i class="dot" style="color:var(--protein)"></i> بروتين ${nf(d.p,1)} جم</span><span><i class="dot" style="color:var(--carb)"></i> كارب ${nf(d.c,1)} جم</span><span><i class="dot" style="color:var(--fat)"></i> دهون ${nf(d.f,1)} جم</span></div>`;}
function foodEntry(f,d){return `<div class="list-entry"><div><div class="entry-name">${userText(f.name)} <span class="inline-detail">· ${nf(f.grams,1)} جم</span></div>${foodMacros(f)}</div>${iconBtn('امسح الأكلة','food-delete','trash',`${datum('value',f.id)} ${datum('date',d)}`)}</div>`;}
function foodDayCard(meal,d){const entries=getDay(d).food.filter(x=>x.meal===meal);return panel(MEALS[meal],MEAL_ICONS[meal],{breakfast:'amber',lunch:'accent',dinner:'violet',snack:'teal'}[meal],entries.length?`<div>${entries.map(f=>foodEntry(f,d)).join('')}</div>${btn('احفظ الوجبة','meal-save','copy','ghost btn-sm',datum('value',meal))}`:`<p class="fine">لسه مفيش أكل متسجّل هنا.</p>`,entries.length?chip(`${nfmt(sum(entries).kcal)} سُعرة`):'');}
function dateControls(){return `<div class="date-controls day-toolbar">${iconBtn('اليوم اللي قبله','food-date','chevron',datum('value',-1))}<input type="date" aria-label="تاريخ سجل الأكل" data-change="food-date" value="${ui.date}" min="2000-01-01" max="${today()}">${iconBtn('اليوم اللي بعده','food-date','left',`${datum('value',1)} ${ui.date>=today()?'disabled':''}`)}</div>`;}
function renderFood(){
 const picked=ui.date,d=getDay(picked),t=energy(),total=sum(d.food);
 const summary=panel('ملخص الأكل','flame','accent',`<div class="stats-rows">${row('أكلت',nf(total.kcal)+' سُعرة')}${row('هدفك',t?`${nf(t.kcal)} سُعرة`:'—')}${row('فاضل من هدف الأكل',t?(t.kcal>=total.kcal?`${nf(t.kcal-total.kcal)} سُعرة`:`${nf(total.kcal-t.kcal)} سُعرة زيادة`):'—')}</div>${t?macroGrid(total,t):`<p class="fine">بعد ما تعمل بروفايلك هتقارن الأكل بهدفك هنا.</p>`}`,chip(picked===today()?'النهارده':shortDate(picked),'','calendar'));
 const quick=panel('أدوات الأكل','bolt','amber',`<div class="quick-actions">${[['صورة الوجبة','photo','camera','accent'],['اكتب اللي أكلته','natural','book','teal'],['الأكل في التلاجة','fridge','bag','blue'],['حوّل نيّ / مطبوخ','raw-cooked','swap','violet']].map(([l,a,i,c])=>`<button type="button" class="quick-action" data-act="${a}">${tile(i,c)}${l}</button>`).join('')}</div><div class="section-buttons under-card">${btn('سجّل كافيين','caffeine','cup')}${btn('الوجبات المحفوظة','saved-meals','clipboard')}${btn('انسخ أكل اليوم اللي فات','copy-yesterday','copy','tint')}</div>`);
 return heading('سجل التغذية','الأكل','من الفطار لآخر سناك. كل وجبة بتفرق.',btn('سجّل أكلة','food-add','plus','primary'),'utensils')+onboardStrip()+`<div class="toolbar">${dateControls()}<span class="fine">${esc(fullDate(picked))}</span></div><div class="grid-two align-stretch">${panel('ضيف من دليل الأكل','utensils','accent',foodPicker(),chip(`${allFoods().length} صنف`))}${summary}</div><div class="grid-two">${Object.keys(MEALS).map(m=>foodDayCard(m,picked)).join('')}</div><div class="grid-two">${quick}${favoritePanel()}</div>`;
}
function favoritePanel(){const f=getFood(ui.favoritePick)||FOODS[0];return panel('حاسبة أكلتك المفضّلة','trophy','teal',`<div class="stack" id="favorite-form"><div class="form-grid">${field('اختار أكلة',`<select data-fav-select>${allFoods().map(x=>opt(x.id,foodName(x),f.id)).join('')}</select>`)}${field('الجرام',`<input type="number" min="1" max="5000" step="1" inputmode="numeric" data-fav-grams value="${esc(ui.favoriteGrams||f.portion)}">`)}</div><div id="favorite-result" class="stack-sm" aria-live="polite"></div></div>`);}
function favoritePreview(){
 const out=$('#favorite-result');if(!out)return; const f=getFood($('[data-fav-select]').value);const g=toNum($('[data-fav-grams]').value);if(!f||g<=0||g>5000){out.textContent='اكتب كمية بين 1 و5,000 جرام.';return;}
 const found=kcalOf(f,g),target=energy(),logged=sum(getDay(ui.date).food);const ranking=allFoods().filter(x=>x.id!==f.id&&x.kcal>0&&!excludedFood(x)).map(x=>{
  const grams=clamp(Math.round(found.kcal*100/x.kcal),5,Math.min(1000,3*x.portion));const value=kcalOf(x,grams);
  const score=Math.abs(found.kcal-value.kcal)/Math.max(found.kcal,50)+1.35*Math.abs(found.p-value.p)/Math.max(found.p,8)+.15*Math.abs(found.f-value.f)/Math.max(found.f,5);return {x,grams,value,score};
 }).sort((a,b)=>a.score-b.score).slice(0,3);
 let html=`<div class="note">${foodMacros(found)}</div>`;
 if(target){const format=[['kcal','السعرات','سُعرة'],['p','البروتين','جم'],['c','الكارب','جم'],['f','الدهون','جم']];html+=`<div class="stats-rows">${format.map(([k,l,unit])=>{const diff=target[k]-logged[k]-found[k];return row(l,`${nf(percent(found[k],target[k]))}٪ من الهدف · ${nf(Math.abs(diff),k==='kcal'?0:1)} ${unit} ${diff>=0?'فاضل':'زيادة'}`);}).join('')}</div>`;
  const diff=target.p-logged.p-found.p,moreKcal=target.kcal-logged.kcal-found.kcal;
  if(moreKcal>65){const suggestions=diff>15?['cottage','tuna','chick','greek']:['banana','pot','rice','apple'];const extra=suggestions.map(getFood).find(x=>!excludedFood(x)); if(extra)html+=`<p class="fine">للتكميل بعد الأكلة: ممكن تضيف ${userText(extra.name)}؛ راجع الكمية حسب اللي فاضل.</p>`;}
 }else html+='<p class="fine">ضيف بروفايلك عشان تعرف الأكلة غطّت كام من هدفك.</p>';
 if(ranking.length)html+=`<div><h3 class="subheading">بدائل قريبة من السعرات والبروتين</h3>${ranking.map(({x,grams,value})=>`<div class="list-entry"><div>${userText(x.name)} <span class="inline-detail">· ${nf(grams)} جم</span></div><small class="muted">${nf(value.kcal)} سُعرة · ${nf(value.p,1)} جم بروتين</small></div>`).join('')}</div>`;
 mount(out,html);
}
function customFoodDialog(){if(!gate())return;openDialog('ضيف صنف من عندك',`<form data-form="custom-food" class="stack"><p class="fine">خُد القيم لكل 100 جرام من العبوة لو متاحة.</p><div class="form-grid">${field('اسم الصنف','<input name="name" maxlength="85" required placeholder="مثال: زبادي من البيت">','full')}${field('السعرات لكل 100 جم',num('kcal','',0,900,.01,true))}${field('البروتين (جم)',num('p','',0,100,.01,true))}${field('الكارب (جم)',num('c','',0,100,.01,true))}${field('الدهون (جم)',num('f','',0,100,.01,true))}${field('الحصة المعتادة (جم)',num('portion',100,1,5000,1,true),'full')}</div><div class="form-actions">${submit('احفظ الصنف')}</div></form>`,'custom-food');}
function saveMealDialog(meal){if(!gate()||!own(MEALS,meal))return;const entries=getDay(ui.date).food.filter(x=>x.meal===meal);if(!entries.length){toast('الوجبة فاضية.',true);return;}openDialog(`احفظ وجبة ${MEALS[meal]}`,`<form data-form="save-meal" ${datum('meal',meal)} ${datum('date',ui.date)} class="stack">${field('سمّي الوجبة','<input name="name" maxlength="55" placeholder="فطاري المفضّل" required>')}<p class="fine">${nf(entries.length)} أصناف · ${nf(sum(entries).kcal)} سُعرة</p><div class="form-actions">${submit('احفظ الوجبة')}</div></form>`,'save-meal');}
function savedMealsDialog(){if(!gate())return;openDialog('وجباتك المحفوظة',`<div class="stack">${field('ضيف الوجبة إلى',`<select id="saved-meal-slot">${opts(Object.entries(MEALS),ui.meal)}</select>`)}${state.savedMeals.length?state.savedMeals.map(s=>`<div class="list-entry"><div><strong>${userText(s.name)}</strong><div class="fine">${nf(s.food.length)} أصناف · ${nf(sum(s.food).kcal)} سُعرة</div></div><div class="flex">${btn('ضيفها','saved-meal-add','plus','tint btn-sm',datum('value',s.id))}${iconBtn('امسح الوجبة المحفوظة','saved-meal-delete','trash',datum('value',s.id))}</div></div>`).join(''):empty('لسه مفيش وجبات','تقدر تحفظ أي وجبة متسجّلة في صفحة الأكل.','clipboard')}</div>`,'saved-meals');}
function copyFoodYesterday(){if(!gate())return;const date=ui.tab==='food'?ui.date:today(),prev=shiftDay(date,-1);const food=getDay(prev).food;if(!food.length){toast('مفيش أكل متسجّل اليوم اللي قبله.',true);return;}
 openDialog('انسخ أكل اليوم اللي فات',`<div class="stack"><p>${nf(food.length)} أصناف من ${esc(fullDate(prev))} هتتضاف لـ ${esc(fullDate(date))}. اللي مسجّله هنا مش هيتمسح.</p><div class="form-actions">${btn('ضيف الأكل','confirm-copy-food','copy','primary',datum('date',date))}${btn('إلغاء','close')}</div></div>`,'copy-food');
}
const spokenQuant={'واحد':1,'واحده':1,'اتنين':2,'اثنين':2,'اثنتين':2,'تلاته':3,'تلات':3,'ثلاثه':3,'ثلاث':3,'اربعه':4,'اربع':4,'خمسه':5,'خمس':5,'نص':.5,'نصف':.5,'ربع':.25,'ميه':100,'مئه':100};
const measureUnits={'جرام':1,'غرام':1,'جرامات':1,'جم':1,'غ':1,'g':1,'كيلو':1000,'كجم':1000,'kg':1000,'مل':1,'ملي':1};
function parseFoodText(input){
 const seq=words(normalize(input).replace(/(\d)(?=\p{L})/gu,'$1 '));const foods=allFoods();const special={بيضتين:2,رغيف:1,رغيفين:2,موزتين:2,كوبايتين:2,تفاحتين:2};
 const aliases=[];for(const food of foods){for(const term of new Set([food.name,...food.aliases,...(food.id==='apple'?['تفاحتين']:[])])){const tokens=words(term);if(tokens.length)aliases.push({food,tokens});}}
 aliases.sort((a,b)=>b.tokens.length-a.tokens.length||b.tokens.join('').length-a.tokens.join('').length);
 const numToken=t=>Object.hasOwn(spokenQuant,t)?spokenQuant[t]:/^\d+(\.\d+)?$/.test(t||'')?Number(t):null;
 const unitValue=t=>own(measureUnits,t)?measureUnits[t]:0;
 const rows=[];let pending=null,unit=0;
 for(let i=0;i<seq.length&&rows.length<12;i++){
   const token=seq[i];let first=token;let q=numToken(token);
   if(q==null&&token.startsWith('و')){const x=numToken(token.slice(1));if(x!=null)q=x;}
   if(q!=null){pending=q;unit=unitValue(seq[i+1]);if(unit)i++;continue;}
   if(token==='و'||token==='مع'||token==='زائد'){pending=null;unit=0;continue;}
   let match=aliases.find(a=>a.tokens.every((t,j)=>seq[i+j]===t));
   if(!match&&token.startsWith('و')&&token.length>2){first=token.slice(1);match=aliases.find(a=>a.tokens[0]===first&&a.tokens.slice(1).every((t,j)=>seq[i+j+1]===t));}
   if(!match)continue;
   const {food,tokens}=match;i+=tokens.length-1;
   if(own(special,first)){
     const repeatedName=aliases.find(a=>a.food.id===food.id&&a.tokens.every((t,j)=>seq[i+1+j]===t));
     if(repeatedName)i+=repeatedName.tokens.length;
   }
   const post=numToken(seq[i+1]),postUnit=unitValue(seq[i+2]);
   if(pending==null&&post!=null&&postUnit){pending=post;unit=postUnit;i+=2;}
   const grams=rounded(clamp(pending!=null?(unit?pending*unit:pending*food.portion):(special[first]||1)*food.portion,1,5000));
   rows.push({food,grams});pending=null;unit=0;
 }
 return rows;
}
function naturalDialog(){if(!gate())return;ui.parseDraft=[];openDialog('اكتب أكلك بطريقتك',`<form data-form="natural" class="stack">${field('أكلت إيه؟',`<textarea name="phrase" id="natural-input" required maxlength="500" placeholder="أكلت 150 جرام رز وبيضتين ورغيفين عيش بلدي"></textarea>`)}<div class="form-actions">${submit('راجع اللي اتفهم','search')}${btn('إملاء على الجهاز','dictate','mic')}</div><p class="fine">ممكن تستخدم ميكروفون الكيبورد كمان. الكميات اللي من غير جرام بتتخمّن من الحصة المعتادة، راجعها قبل الحفظ.</p><div id="natural-result" class="stack-sm" aria-live="polite"></div></form>`,'natural');}
function showNatural(value){const out=$('#natural-result');if(!out)return;ui.parseDraft=parseFoodText(value);if(!ui.parseDraft.length){mount(out,`<p class="note amber">ملقطناش أصناف. جرّب: «200 جرام فراخ مشوية و150 جرام رز».</p>`);return;}
 mount(out,`<p class="note amber">اتأكد إن كل اللي أكلته موجود. ممكن أصناف أو كميات تعدّي من غير ما تتفهم.</p>${ui.parseDraft.map(({food,grams},i)=>`<div class="list-entry"><strong class="entry-name">${userText(food.name)}</strong>${field('جرام',num('guess-'+i,grams,1,5000,1,true))}</div>`).join('')}${field('سجّل في وجبة',`<select id="natural-meal">${opts(Object.entries(MEALS),ui.meal)}</select>`)}<div class="form-actions">${btn('سجّل الأصناف دي','natural-save','check','primary')}</div>`);
}
async function localDictate(){
 const Engine=window.SpeechRecognition||window.webkitSpeechRecognition;
 try{
  if(!Engine||!Engine.available||!('processLocally' in new Engine()))throw Error();
  const result=await Engine.available({langs:['ar-EG'],processLocally:true});if(result!=='available')throw Error();
  const sr=new Engine();sr.processLocally=true;sr.lang='ar-EG';sr.maxAlternatives=1;
  sr.onresult=e=>{const node=$('#natural-input');if(node){node.value=[node.value,e.results[0][0].transcript].filter(Boolean).join(' ').slice(0,500);}};
  sr.onerror=()=>toast('مقدرناش نسمعك. جرّب تكتب الكلام.',true);sr.start();toast('اتكلم دلوقتي');
 }catch{toast('الإملاء العربي على الجهاز مش متاح في المتصفح ده. ممكن تستخدم الكيبورد.',true);}
}
const RAW_RATIOS={rice:['رز أبيض',2.9],pasta:['مكرونة',2.3],lent:['عدس',2.5],chickpea:['حمص',2.4],chick:['صدور فراخ',.75],beef:['لحمة بقري',.72],fish:['فيليه سمك',.83],pot:['بطاطس مسلوقة',.97]};
function rawDialog(){openDialog('حوّل الوزن قبل وبعد الطبخ',`<form data-form="raw" class="stack"><div class="form-grid">${field('الصنف',`<select name="food">${opts(Object.entries(RAW_RATIOS).map(([k,v])=>[k,v[0]]),'rice')}</select>`)}${field('الوزن (جم)',num('grams',100,1,5000,1,true))}${field('الوزن اللي معاك',`<select name="direction">${opts([['raw','قبل الطبخ'],['cooked','بعد الطبخ']],'raw')}</select>`,'full')}</div><p class="note">نسبة تقريبية حسب نوع الأكل والطريقة والماية. الأدق: اوزن نفس الكمية قبل الطبخ وبعده واحسب النسبة.</p><div class="form-actions">${submit('احسب','swap')}</div><p id="raw-result" class="note teal" hidden aria-live="polite"></p></form>`,'raw');}
function fridgeDialog(){openDialog('عندك إيه في التلاجة؟',`<form data-form="fridge" class="stack">${field('المكوّنات اللي عندك','<textarea name="ingredients" maxlength="350" required placeholder="بيض، فول، عيش، فراخ، رز"></textarea>')}<p class="fine">هنرشّح وجبات مصرية من الدليل. لو عندك حساسية راجع كل المكوّنات؛ الاقتراح مش ضمان.</p><div class="form-actions">${submit('اقترح وجبات','sparkles')}</div><div id="fridge-result" class="stack-sm" aria-live="polite"></div></form>`,'fridge');}
function fridgeResults(input){const result=$('#fridge-result');if(!result)return;const knownIds=new Set(parseFoodText(input).map(({food})=>food.id));const typed=normalize(input);
 for(const f of FOODS){if([f.name,...f.aliases].some(a=>normalize(a).length>=2&&` ${typed} `.includes(` ${normalize(a)} `)))knownIds.add(f.id);}
 const t=energy(),eaten=sum(getDay().food);const spend=t?Math.max(100,Math.min(850,t.kcal-eaten.kcal)):480,pNeed=t?Math.max(0,t.p-eaten.p):25;
 const options=Object.values(MEAL_PLAN).flat().filter(([,items])=>items.every(([k])=>!excludedFood(getFood(k)))).map(([name,items])=>{
  const base=sum(items.map(([k,g])=>kcalOf(getFood(k),g))),wanted=clamp(spend/base.kcal,.4,1.6);const scaled=items.map(([k,g])=>[k,Math.max(1,rounded(g*wanted))]);const present=items.filter(([k])=>knownIds.has(k)).length;
  return {name,items:scaled,present,score:present/items.length+.3*(present===items.length)-.12*Math.abs(Math.min(35,pNeed)-base.p*wanted)/35};
 }).filter(x=>x.present>0).sort((a,b)=>b.score-a.score).slice(0,3);
 if(!options.length){mount(result,`<p class="note amber">ملقيناش وجبة من المكوّنات دي. جرّب تكتب الأصناف زي «بيض، فول، عيش، رز، فراخ».</p>`);return;}
 mount(result,options.map(({name,items})=>{const total=sum(items.map(([k,g])=>kcalOf(getFood(k),g)));return `<div class="note"><strong>${esc(name)}</strong><div class="fine">${items.map(([k,g])=>`${userText(getFood(k).name)} ${nf(g)} جم${knownIds.has(k)?'':' (ناقص)'}`).join(' · ')}</div>${foodMacros(total)}</div>`;}).join(''));
}
function caffeineDialog(){if(!gate())return;const date=ui.tab==='food'?ui.date:today(),d=getDay(date);const total=d.caffeine.reduce((a,b)=>a+b.mg,0);openDialog('متابعة الكافيين',`<div class="stack"><p class="fine">${esc(fullDate(date))} · إجمالي ${nf(total)} مجم. محتوى القهوة والشاي بيختلف حسب الحجم وطريقة التحضير.</p>${d.caffeine.map(x=>`<div class="list-entry"><span>${esc(CAFFEINE.find(c=>c[0]===x.type)?.[1]||'مشروب')} <bdi>${nfmt(x.mg)}</bdi> مجم</span>${iconBtn('امسح المشروب','caffeine-delete','trash',`${datum('value',x.id)} ${datum('date',date)}`)}</div>`).join('')}<form data-form="caffeine" ${datum('date',date)} class="stack"><div class="form-grid">${field('المشروب',`<select name="type" data-change="caffeine-type">${opts(CAFFEINE.map(x=>[x[0],x[1]]),'coffee')}</select>`)}${field('الكافيين (مجم)',num('mg',95,1,900,1,true))}</div><p class="note ${total>=400?'amber':''}">${total>=400?'الإجمالي وصل 400 مجم أو أكتر؛ راجع الاستهلاك وتجنب جرعات زيادة.':'خفّف الكافيين قبل النوم بوقت كفاية، خصوصًا لو نومك متقطّع.'} لو حامل أو عندك حالة صحية، اسأل طبيبك.</p><div class="form-actions">${submit('سجّل المشروب','cup')}</div></form></div>`,'caffeine');}
function photoDialog(){
 if(!supportedServer()){staticAiNotice('تقدير أكل الصورة');return;}
 if(!gate())return;
 openDialog('قدّر أكلك من الصورة',`<form data-form="photo" class="stack"><p class="fine">صوّر الوجبة لوحدها. الحساب تقريبي جدًا؛ زوايا الصورة والزيت والمكونات ممكن يغيّروا الأرقام.</p>${field('صورة الوجبة','<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" required>')}<label class="check-label"><input type="checkbox" required name="consent"> موافق أبعت صورة الوجبة بس لمزوّد الذكاء الاصطناعي عشان يقدّرها. مفيش إرسال لوزني أو سجلّي مع الصورة.</label><div class="form-actions">${submit('قدّر من الصورة','sparkles')}</div><p class="note" id="photo-status" aria-live="polite">الميزة محتاجة اتصال واستضافة مفعّل عليها التحليل.</p></form>`,'photo');
}
async function encodePhoto(file,max=960,quality=.72){
 if(!file||file.size>15*1024*1024)throw Error('اختار صورة أصغر من 15 ميجابايت.');
 const url=URL.createObjectURL(file);
 try{
   const img=new Image();img.src=url;
   if(img.decode)await img.decode().catch(()=>{throw Error('صيغة الصورة مش مدعومة هنا. جرّب JPG أو PNG.');});
   else await new Promise((ok,no)=>{img.onload=ok;img.onerror=()=>no(Error('الصورة مش مفهومة.'));});
   const canvas=document.createElement('canvas');const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));const ctx=canvas.getContext('2d');if(!ctx)throw Error('معرفناش نعالج الصورة هنا.');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
   return canvas.toDataURL('image/jpeg',quality);
 }finally{URL.revokeObjectURL(url);}
}
function parseEstimate(answer){
 const slice=answer.match(/\{[\s\S]*\}/)?.[0];if(!slice)throw Error('مقدرناش نميّز الأكلة من الصورة. جرّب صورة أوضح.');
 let d;try{d=JSON.parse(slice);}catch{throw Error('مقدرناش نميّز الأكلة من الصورة. جرّب صورة أوضح.');}
 if(!isObj(d)||!txt(d.name,75)||!Number.isFinite(Number(d.grams))||+d.grams<=0||!['kcal','p','c','f'].every(k=>d[k]!==null&&d[k]!==''&&Number.isFinite(Number(d[k]))&&+d[k]>=0))throw Error('النتيجة ناقصة. سجّل الوجبة يدوي لو الأرقام مش واضحة.');
 return {name:txt(d.name,75),grams:rounded(bound(d.grams,1,5000)),kcal:rounded(bound(d.kcal,0,5000),1),p:rounded(bound(d.p,0,500),1),c:rounded(bound(d.c,0,1000),1),f:rounded(bound(d.f,0,500),1)};
}
function photoReview(d){ui.mediaDraft=d;openDialog('راجع تقدير الصورة',`<form data-form="photo-save" class="stack"><p class="note amber">الأرقام تقريبية ودي للوجبة كلها. لو عدّلت الوزن الحساب هيتغيّر بنفس النسبة؛ عدّل القيم كمان لو مكونات أكلتك مختلفة.</p><div class="form-grid">${field('اسم الأكلة',`<input name="name" value="${esc(d.name)}" maxlength="75" required>`,'full')}${field('الجرام',num('grams',d.grams,1,5000,1,true))}${field('الوجبة',`<select name="meal">${opts(Object.entries(MEALS),ui.meal)}</select>`)}${field('السعرات',num('kcal',d.kcal,0,5000,.1,true))}${field('البروتين (جم)',num('p',d.p,0,500,.1,true))}${field('الكارب (جم)',num('c',d.c,0,1000,.1,true))}${field('الدهون (جم)',num('f',d.f,0,500,.1,true))}</div><div class="form-actions">${submit('سجّل التقدير')}</div></form>`,'photo-save');}
function adjustPhotoGrams(target){const d=ui.mediaDraft,g=toNum(target.value);if(!d||g<=0)return;const form=target.form;for(const [k,max] of [['kcal',5000],['p',500],['c',1000],['f',500]])form.elements[k].value=rounded(clamp(d[k]*g/d.grams,0,max),1);}
