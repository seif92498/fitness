function commitProfile(f){
 if(!validProfile(f)){toast('اتأكد من السن والطول والوزن والبيانات المطلوبة.',true);return;}
 const previous=state.profile;state.profile=normalizeProfile(f);
 if((!previous||previous.trainDays!==state.profile.trainDays)&&state.settings.split==='classic'&&state.profile.trainDays!==5){state.settings.split=state.profile.trainDays<=3?'full':state.profile.trainDays===4?'upper':'ppl';ui.workday=0;}
 saved(previous?'بياناتك اتحدّثت':'بروفايلك جاهز. يلا نبدأ!',true);
}
async function busy(form,resultId,working,fn){
 if(form.getAttribute('aria-busy')==='true')return;const target=$('#'+resultId,form);const submitter=$('[type=submit]',form);const set=s=>{if(target&&target.isConnected)target.textContent=s;};
 form.setAttribute('aria-busy','true');if(submitter)submitter.disabled=true;set(working);
 try{await fn(set);}catch(e){set(e instanceof Error?e.message:'في حاجة وقفت العملية. جرّب تاني.');}finally{if(form.isConnected){form.removeAttribute('aria-busy');if(submitter)submitter.disabled=false;}}
}
function formResult(selector,text){const node=$(selector);if(node){node.hidden=false;node.textContent=text;}}
function planLog(slot){
 if(!gate()||!planSlots.includes(slot))return;const meal=diet(ui.planDay,energy().kcal).find(x=>x.slot===slot);if(!meal?.rows.length){toast('الوجبة مش موجودة في الخطة.',true);return;}
 openDialog('سجّل وجبة من الخطة',`<div class="stack"><p class="fine">هنضيف ${esc(meal.choice.label)} لـ${MEALS[slot]} النهارده. متسجّلهاش لو لسه ماأكلتهاش.</p>${foodMacros(meal.total)}<div class="form-actions">${btn('سجّل إني أكلتها','plan-confirm','check','primary',`${datum('value',slot)} ${datum('index',ui.planDay)}`)}${btn('إلغاء','close')}</div></div>`,'plan-log');
}
function applyRoutine(ds){
 if(!gate()||!own(ROUTINE_NAMES,ds.value))return;const days=Math.floor(bound(ds.days,1,6,3));state.profile.trainDays=days;state.settings.split=ds.value;ui.workday=0;
 if(ds.equipment==='none')for(let n=0;n<days;n++)state.routineEdits[`custom-${n}`]=n%2?['pike','reverselunge','bridge','sideplank','bwcalf']:['pushup','bodysquat','bridge','deadbug','floorcrunch'];
 saved('اتطبّق نظام التمرين',true);
}
function sendReminder(message){
 if(state.settings.reminders&&'Notification' in window&&Notification.permission==='granted'){
  try{new Notification('فورمة',{body:message,tag:'forma-reminder'});return;}catch{}
 }
 toast(message);
}
async function toggleReminder(){
 if(state.settings.reminders){state.settings.reminders=false;saved('تنبيهات المتصفح اتقفلت');reminderDialog();return;}
 if(!('Notification' in window)){toast('المتصفح ده مش بيدعم التنبيهات.',true);return;}
 try{const result=await Notification.requestPermission();if(result!=='granted'){toast('التنبيهات مش مسموحة في المتصفح. التذكيرات جوّه التطبيق شغّالة.',true);return;}state.settings.reminders=true;ui.lastReminder=Date.now();saved('التنبيهات اتفعّلت والصفحة مفتوحة');reminderDialog();}
 catch{toast('التنبيهات مش متاحة هنا.',true);}
}
function backupValidate(){
 const data=$('#backup-code')?.value||'';if(!data||data.length>5_000_000){toast('الصق نسخة سليمة أصغر من 5 ميجابايت.',true);return;}
 try{ui.importValue=cleanBackup(JSON.parse(data));}catch{toast('النسخة مش مفهومة. اتأكد إن نص JSON كامل ومن فورمة.',true);return;}
 openDialog('استبدل السجل الحالي؟',`<div class="stack"><p>النسخة فيها ${nf(Object.keys(ui.importValue.days).length)} أيام سجل و${nf(ui.importValue.logs.length)} تسجيل تمرين. استرجاعها هيستبدل كل اللي على الجهاز ده.</p><div class="form-actions">${btn('استرجع النسخة','backup-restore','upload','primary')}${btn('إلغاء','close')}</div></div>`,'backup-confirm');
}
const clicks={
 nav:ds=>go(ds.value),onboard:profileDialog,close:closeDialog,share:shareDialog,
 'pages-help':publishHelpDialog,
 'copy-link':()=>clipboard(appURL(),$('#share-url')),
 'native-share':async()=>{try{await navigator.share({title:'فورمة',text:'جرّب فورمة عشان تسجّل أكلك وتمرينك.',url:appURL()});}catch(e){if(e?.name!=='AbortError')await clipboard(appURL(),$('#share-url'));}},
 'theme-dialog':()=>openDialog('مظهر التطبيق',`<div class="stack"><p class="fine">تلقائي بيختار حسب مظهر جهازك.</p>${themeControls()}</div>`,'theme'),
 theme:ds=>{if(!['auto','light','dark'].includes(ds.value))return;state.settings.theme=ds.value;saved('المظهر اتغيّر');if(ui.modal==='theme')clicks['theme-dialog']();},
 reminders:reminderDialog,notification:toggleReminder,
 'check-frequency':ds=>{state.settings.checkEvery=ds.value==='14'?14:7;saved('معاد المتابعة اتحدّث');reminderDialog();},
 'open-workout':ds=>{ui.workday=Math.round(bound(ds.value,0,routine().length-1));go('workout');},
 chart:ds=>{if(own(chartTypes,ds.value)){ui.chart=ds.value;render();$(`[data-act=chart][data-value="${ds.value}"]`)?.focus({preventScroll:true});}},
 water:ds=>{if(!gate())return;const d=editDay(),v=toNum(ds.value);if(![-250,250,500].includes(v))return;const reach=energy().water,chosen=clamp(d.water+v,0,20000);const hit=d.water<reach&&chosen>=reach;d.water=chosen;saved(hit?'عاش! وصلت لهدف الماية':v>0?`اتضاف ${v} مل ماية`:'الكمية اتعدّلت');},
 activity:ds=>activityDialog(ds.value),cardio:cardioDialog,
 'cardio-delete':ds=>{const d=editDay();d.cardio=d.cardio.filter(x=>x.id!==ds.value);saved('النشاط اتمسح');cardioDialog();},
 supplement:ds=>{if(!gate()||!SUPPLEMENTS.includes(ds.value))return;const d=editDay();d.supplements=d.supplements.includes(ds.value)?d.supplements.filter(s=>s!==ds.value):[...d.supplements,ds.value];saved('المكمّلات اتحدّثت');},
 'food-add':foodAddDialog,'custom-food':customFoodDialog,
 'food-date':ds=>{const date=shiftDay(ui.date,toNum(ds.value));if(validDay(date)&&date<=today()){ui.date=date;render();}},
 'food-delete':ds=>{if(!gate()||!validDay(ds.date))return;const d=editDay(ds.date);d.food=d.food.filter(x=>x.id!==ds.value);saved('الأكلة اتمسحت');},
 'meal-save':ds=>saveMealDialog(ds.value),'saved-meals':savedMealsDialog,
 'saved-meal-add':ds=>{if(!gate())return;const found=state.savedMeals.find(s=>s.id===ds.value),meal=$('#saved-meal-slot')?.value;if(!found||!own(MEALS,meal))return;editDay(ui.date).food.push(...found.food.map(f=>({...f,id:id(),meal})));saved('الوجبة اتضافت',true);},
 'saved-meal-delete':ds=>{state.savedMeals=state.savedMeals.filter(s=>s.id!==ds.value);saved('الوجبة المحفوظة اتمسحت');savedMealsDialog();},
 'copy-yesterday':copyFoodYesterday,
 'confirm-copy-food':ds=>{if(!gate()||!validDay(ds.date)||ds.date>today())return;const list=getDay(shiftDay(ds.date,-1)).food;editDay(ds.date).food.push(...list.map(x=>({...x,id:id()})));saved('اتنسخ أكل اليوم اللي فات',true);},
 natural:naturalDialog,dictate:localDictate,
 'natural-save':()=>{if(!gate()||!ui.parseDraft.length)return;const meal=$('#natural-meal')?.value;const date=ui.tab==='food'?ui.date:today();const form=$('[data-form=natural]');if(!own(MEALS,meal)||!form)return;const entries=ui.parseDraft.map(({food},i)=>snapFood(food,toNum(form.elements[`guess-${i}`]?.value),meal));if(entries.some(x=>x.grams<1||x.grams>5000)){toast('راجع كمية كل صنف قبل الحفظ.',true);return;}editDay(date).food.push(...entries);saved('الأكل اتسجّل بعد المراجعة',true);},
 fridge:fridgeDialog,'raw-cooked':rawDialog,caffeine:caffeineDialog,photo:photoDialog,
 'caffeine-delete':ds=>{if(!validDay(ds.date))return;const d=editDay(ds.date);d.caffeine=d.caffeine.filter(x=>x.id!==ds.value);saved('المشروب اتمسح');caffeineDialog();},
 'work-day':ds=>{ui.workday=Math.round(bound(ds.value,0,routine().length-1));render();$(`[data-act=work-day][data-value="${ui.workday}"]`)?.focus({preventScroll:true});},
 'log-exercise':ds=>logDialog(ds.value),'exercise-swap':ds=>swapDialog(ds.value),'exercise-notes':ds=>notesDialog(ds.value),'exercise-history':ds=>historyDialog(ds.value),
 'log-delete':ds=>{state.logs=state.logs.filter(l=>l.id!==ds.value);saved('التسجيل اتمسح');historyDialog(ds.base);},
 'open-lift':ds=>{ui.lift=ds.value;closeDialog();go('progress');},
 'routine-edit':routineEditDialog,'exercise-create':exerciseCreateDialog,'routine-generator':routineMaker,'apply-routine':applyRoutine,
 'routine-remove':ds=>{if(!gate())return;state.routineEdits[routineKey(ui.workday)]=dayExercises(ui.workday).filter(k=>k!==ds.value);saved('اتشال من جدول اليوم');routineEditDialog();},
 'routine-reset':()=>{if(!gate())return;delete state.routineEdits[routineKey(ui.workday)];saved('الجدول الأصلي رجع');routineEditDialog();},
 'rest-start':ds=>{const s=toNum(ds.value);if(![60,90,120].includes(s))return;ui.restUntil=Date.now()+s*1000;ui.restSeconds=s;render();},
 'rest-reset':()=>{ui.restUntil=0;render();},
 'work-lang':ds=>{if(!['ar','en'].includes(ds.value))return;state.settings.language=ds.value;saved('لغة التمرين اتغيّرت');},
 language:ds=>{if(!['ar','en'].includes(ds.value))return;state.settings.language=ds.value;saved('لغة التطبيق اتغيّرت');},
 'machine-add':ds=>{if(!gate())return;const id=ds.value;if(!MACHINES.some(m=>m[0]===id))return;const key=routineKey(ui.workday);const list=dayExercises(ui.workday);const chosen=equipmentChoice(id);const wanted=state.equipment[id]?.added?id:chosen;if(!list.includes(wanted)){state.routineEdits[key]=[...list,wanted];}state.equipment[id]={choice:chosen,added:true};saved('الجهاز اتضاف لجدول اليوم');},
 'machine-swap':ds=>machineSwapDialog(ds.value),
 'use-machine-day':()=>useMachineDay(),
 'session-start':()=>{if(!gate()||ui.sessionStart)return;ui.sessionStart=Date.now();render();},
 'session-pause':()=>{if(!ui.sessionStart)return;ui.sessionElapsed+=Date.now()-ui.sessionStart;ui.sessionStart=0;render();},
 'session-reset':()=>{ui.sessionStart=0;ui.sessionElapsed=0;render();},
 'session-save':()=>{if(!gate())return;const elapsed=ui.sessionElapsed+(ui.sessionStart?Date.now()-ui.sessionStart:0);if(elapsed<30_000){toast('استنى شوية عشان مدة الحصّة تتحسب.',true);return;}editDay().cardio.push({id:id(),mode:'strength',minutes:bound(rounded(elapsed/60000),1,400),km:0});ui.sessionStart=0;ui.sessionElapsed=0;saved('وقت الحصّة اتسجّل');},
 'plan-day':ds=>{ui.planDay=Math.round(bound(ds.value,0,6));render();$(`[data-act=plan-day][data-value="${ui.planDay}"]`)?.focus({preventScroll:true});},
 shopping:shoppingDialog,'plan-log':ds=>planLog(ds.value),
 'plan-confirm':ds=>{if(!gate()||!planSlots.includes(ds.value))return;const idx=Math.floor(bound(ds.index,0,6));const meal=diet(idx,energy().kcal).find(x=>x.slot===ds.value);if(!meal?.rows.length)return;editDay().food.push(...meal.rows.map(({food,grams})=>snapFood(food,grams,meal.slot)));saved('الوجبة اتضافت لسجل النهارده',true);},
 checkin:checkInDialog,review:reviewDialog,journal:journalDialog,'sleep-debt':sleepDebtDialog,month:reportDialog,
 'progress-photo':progressPhotoDialog,'progress-photo-delete':ds=>{state.photos=state.photos.filter(x=>x.id!==ds.value);saved('الصورة اتمسحت من المتصفح');},
 'ai-open':ds=>aiDialog(ds.value,ds.value==='routine'?{requested_days:bound(ds.days,1,6,3),equipment:pick(ds.equipment,['gym','band','none'],'gym')}:{}),
 'backup-export':()=>backupDialog('out'),'backup-import':()=>backupDialog('in'),
 'backup-copy':()=>{const input=$('#backup-code');if(input)clipboard(input.value,input);},
 'backup-file':()=>download(`forma-backup-${today()}.json`,JSON.stringify(state)), 'backup-csv':exportCSV,
 'backup-validate':backupValidate,'backup-restore':()=>{if(!ui.importValue)return;state=ui.importValue;ui.importValue=null;ui.workday=0;ui.meal='breakfast';ui.foodQuery='';ui.foodPick='';ui.foodGrams='';ui.favoritePick='';ui.favoriteGrams='';saved('النسخة رجعت على الجهاز ده',true);},
 'friend-code':()=>friendDialog('out'),'friend-import':()=>friendDialog('in'),'friend-copy':()=>{const a=$('#friend-output');if(a?.value)clipboard(a.value,a);}
};
const forms={
 profile:commitProfile,
 activity:f=>{if(!gate())return;const d=editDay();d.distance=f.distance===''?null:bound(f.distance,0,200);d.sleep=f.sleep===''?null:bound(f.sleep,0,24);d.quality=pick(f.quality,QUALITY.map(x=>x[0]),'');saved('الحركة والنوم اتحفظوا',true);},
 cardio:f=>{if(!gate()||!own(CARDIO,f.mode))return;editDay().cardio.push({id:id(),mode:f.mode,minutes:bound(f.minutes,1,400),km:['walk','run'].includes(f.mode)?bound(f.km,0,200):0});saved('الكارديو اتسجّل',true);},
 food:(f,ds)=>{if(!gate()||!own(MEALS,f.meal))return;const food=getFood(f.foodId),g=toNum(f.grams);if(!food||g<1||g>5000){toast('اختار أكلة وجرام صحيح.',true);return;}const d=validDay(ds.date)&&ds.date<=today()?ds.date:today();editDay(d).food.push(snapFood(food,g,f.meal));ui.meal=f.meal;saved('الأكلة اتسجّلت',true);},
 'custom-food':f=>{if(!gate())return;const name=txt(f.name,85);if(!name){toast('اكتب اسم الصنف.',true);return;}const a={id:id(),name,portion:bound(f.portion,1,5000,100),kcal:bound(f.kcal,0,900),p:bound(f.p,0,100),c:bound(f.c,0,100),f:bound(f.f,0,100),group:'إضافاتك',aliases:[]};state.customFoods.push(a);ui.foodPick=a.id;ui.foodGrams=a.portion;ui.foodQuery='';saved('الصنف اتضاف للدليل',true);},
 'save-meal':(f,ds)=>{if(!gate()||!own(MEALS,ds.meal)||!validDay(ds.date))return;const list=getDay(ds.date).food.filter(x=>x.meal===ds.meal),name=txt(f.name,55);if(!name||!list.length){toast('اكتب اسم لوجبة فيها أكل.',true);return;}state.savedMeals.push({id:id(),name,food:list.map(x=>({...x}))});saved('الوجبة اتحفظت',true);},
 natural:f=>showNatural(f.phrase),fridge:f=>fridgeResults(f.ingredients),
 raw:f=>{const v=RAW_RATIOS[f.food],g=toNum(f.grams);if(!v||!g)return;const raw=f.direction==='raw';formResult('#raw-result',`${nfmt(g)} جم ${raw?'نيّ':'مطبوخ'} ≈ ${nfmt(raw?g*v[1]:g/v[1])} جم ${raw?'مطبوخ':'نيّ'} (${v[0]}).`);},
 caffeine:(f,ds)=>{if(!gate()||!CAFFEINE.some(c=>c[0]===f.type)||!validDay(ds.date))return;editDay(ds.date).caffeine.push({id:id(),type:f.type,mg:bound(f.mg,1,900)});saved('الكافيين اتسجّل');caffeineDialog();},
 photo:(f,ds,form)=>{if(!gate()||f.consent!=='on')return;return busy(form,'photo-status','بنجهّز الصورة ونطلب تقدير…',async()=>{const image=await encodePhoto(f.image);const answer=await askAI({mode:'photo',image});if(!form.isConnected)return;photoReview(parseEstimate(answer));});},
 'photo-save':f=>{if(!gate()||!own(MEALS,f.meal))return;const name=txt(f.name,75);if(!name){toast('اكتب اسم الأكلة.',true);return;}const entry={id:id(),foodId:'photo',name,meal:f.meal,grams:bound(f.grams,1,5000),kcal:bound(f.kcal,0,5000),p:bound(f.p,0,500),c:bound(f.c,0,1000),f:bound(f.f,0,500)};editDay(ui.tab==='food'?ui.date:today()).food.push(entry);ui.mediaDraft=null;saved('التقدير اتسجّل بعد المراجعة',true);},
 workout:(f,ds)=>{if(!gate()||!exercise(ds.value))return;const kg=bound(f.kg,0,1000),history=usedLogs(ds.value);const pr=kg>0&&kg>Math.max(0,...history.map(l=>l.kg));state.logs.push({id:id(),date:today(),exerciseId:ds.value,kg,reps:bound(f.reps,1,900),sets:bound(f.sets,1,40),rpe:f.rpe===''?null:bound(f.rpe,1,10)});saved(pr?'عاش! عملت رقم قياسي جديد':'التمرين اتسجّل',true);},
 swap:(f,ds)=>{if(!gate()||!exercise(ds.value)||!exercise(f.exerciseId))return;const key=slotKey(ui.workday,ds.value);if(f.exerciseId===ds.value)delete state.swaps[key];else state.swaps[key]=f.exerciseId;saved('اختيار التمرين اتحفظ',true);},
 notes:(f,ds)=>{if(!gate()||!exercise(ds.value))return;state.notes[ds.value]=txt(f.note,650);saved('الملاحظات اتحفظت',true);},
 'routine-add':f=>{if(!gate()||!exercise(f.exerciseId))return;const list=dayExercises(ui.workday);if(list.includes(f.exerciseId)){toast('التمرين موجود في اليوم ده.',true);return;}state.routineEdits[routineKey(ui.workday)]=[...list,f.exerciseId];saved('التمرين اتضاف للجدول');routineEditDialog();},
 'exercise-create':f=>{if(!gate())return;const name=txt(f.name,75),group=txt(f.group,26),reps=bound(f.reps,1,100),top=bound(f.top,1,120);if(!name||!group||top<reps){toast('اتأكد من الاسم والعضلة ونطاق التكرارات.',true);return;}const ex={id:id(),name,group,sets:bound(f.sets,1,15),reps,top,tip:txt(f.tip,400)||'ابدأ بوزن تقدر تتحكّم فيه.',unit:'rep',other:[]};state.customExercises.push(ex);state.routineEdits[routineKey(ui.workday)]=[...dayExercises(ui.workday),ex.id];saved('تمرينك الجديد اتضاف',true);},
 'machine-swap':f=>{if(!gate())return;const id=f.value;if(!MACHINES.some(m=>m[0]===id))return;const choice=machineExercise(f.exerciseId);if(!choice)return;const current=equipmentChoice(id);state.equipment[id]={choice:choice.id===id?id:choice.id,added:state.equipment[id]?.added===true};const key=routineKey(ui.workday);const list=dayExercises(ui.workday);const from=list.indexOf(current);if(from>=0){list[from]=choice.id===id?id:choice.id;state.routineEdits[key]=list;}saved('اختيار الجهاز اتحفظ',true);},
 'routine-maker':routineResult,
 'one-rm':f=>{const max=toNum(f.kg)*(1+toNum(f.reps)/30);formResult('#rm-result',`الوزن الأقصى تقديريًا ${nfmt(max,1)} كجم. 80٪ منه = ${nfmt(max*.8,1)} كجم.`);},
 plates:f=>{const total=bound(f.kg,20,700);let remainder=(total-20)/2;const parts=[];for(const kg of [25,20,15,10,5,2.5,1.25]){const count=Math.floor((remainder+1e-7)/kg);if(count){parts.push(`${count} × ${nfmt(kg,2)} كجم`);remainder-=kg*count;}}formResult('#plates-result',(parts.length?`لكل ناحية: ${parts.join(' + ')}.`:'مفيش أطباق متاحة تتركّب للوزن ده.')+(remainder>.001?` أقرب وزن أقل: ${nfmt(total-remainder*2,2)} كجم.`:''));},
 checkin:f=>{if(!gate()||!validDay(f.date)||f.date>today())return;const old=state.measurements.find(m=>m.date===f.date);const entry={date:f.date,weight:bound(f.weight,35,300),...Object.fromEntries(sizeFields.map(([k])=>[k,f[k]===''?(old?.[k]??null):bound(f[k],10,300)]))};state.measurements=[...state.measurements.filter(m=>m.date!==f.date),entry].sort((a,b)=>a.date.localeCompare(b.date));const latest=state.measurements.at(-1).date===f.date;if(latest)state.profile.weight=entry.weight;saved(latest?'القياسات اتحفظت والهدف اتحدّث':'القياس اتضاف للسجل',true);},
 review:f=>{if(!gate())return;const r={date:today(),energy:pick(f.energy,['low','mid','high'],'mid'),commit:pick(f.commit,['low','mid','high'],'mid'),pain:pick(f.pain,['none','mild','severe'],'none'),sleep:pick(f.sleep,['poor','okay','good'],'okay')};state.reviews=[...state.reviews.filter(x=>x.date!==r.date),r];saved('المراجعة اتحفظت',true);openDialog('مراجعة الأسبوع',reviewMarkup(r),'review-result');},
 journal:f=>{if(!gate())return;editDay().journal=txt(f.journal,800);saved('المفكّرة اتحفظت على جهازك',true);},
 'sleep-debt':f=>{const match=/^(\d{2}):(\d{2})$/.exec(f.wake||'');if(!match)return;const wake=+match[1]*60 + +match[2], bed=(wake-8*60-15+1440)%1440;formResult('#bedtime',`جرّب تدخل السرير حوالي ${clockString(bed)} عشان تدي لنفسك 8 ساعات وربع قبل معاد الصحيان.`);},
 'progress-photo':(f,ds,form)=>{if(!gate()||!validDay(f.date)||f.date>today())return;return busy(form,'local-photo-status','بنحضّر الصورة للحفظ…',async()=>{const src=await encodePhoto(f.image,620,.68);if(!form.isConnected)return;if(src.length>=300000)throw Error('الصورة لسه كبيرة. جرّب نسخة أصغر.');if(state.photos.length>=6)throw Error('وصلت لـ6 صور. امسح واحدة من تقدّمي الأول.');state.photos.push({id:id(),date:f.date,src});saved('الصورة اتحفظت محليًا',true);});},
 ai:(f,ds,form)=>{if(!gate()||!own(AI_ACTIONS,ds.value)||f.consent!=='on')return;return busy(form,'ai-output','بنجهّز الملخص…',async set=>{const answer=await askAI({mode:ds.value,context:aiContext(ui.aiExtra),question:txt(f.question,700)});set(answer);});},
 'friend-code':f=>{const name=txt(f.name,30);if(!name){toast('اكتب اسم مستعار.',true);return;}$('#friend-code-area').hidden=false;$('#friend-output').value=makeFriendCode(name);},
 'friend-import':f=>{try{const a=decodeFriendCode(f.code);state.friends=[...state.friends.filter(x=>x.name!==a.name),a].slice(-30);saved('الرمز اتضاف للمقارنة',true);}catch(e){toast(e.message,true);}}
};
document.addEventListener('click',e=>{
 const node=e.target instanceof Element?e.target.closest('button[data-act]'):null;if(!node||node.disabled)return;
 const act=node.dataset.act;if(!own(clicks,act))return;
 try{const result=clicks[act](node.dataset);if(result?.catch)result.catch(()=>toast('مقدرناش نكمّل الطلب دلوقتي.',true));}catch(error){console.error(error);toast('حصلت مشكلة. جرّب تاني.',true);}
});
document.addEventListener('submit',e=>{const form=e.target;if(!(form instanceof HTMLFormElement)||!form.dataset.form)return;e.preventDefault();const action=form.dataset.form;if(!own(forms,action))return;
 try{const f=Object.fromEntries(new FormData(form));const result=forms[action](f,form.dataset,form);if(result?.catch)result.catch(()=>toast('مقدرناش نكمّل الطلب دلوقتي.',true));}catch(error){console.error(error);toast('حصلت مشكلة. راجع البيانات وجرّب تاني.',true);}
});
document.addEventListener('input',e=>{
 const el=e.target;if(!(el instanceof HTMLInputElement||el instanceof HTMLTextAreaElement))return;
 if(el.matches('[data-food-query], [data-food-picker] [name=grams]'))foodInput(el);
 if(el.matches('[data-fav-grams]')){ui.favoriteGrams=el.value;favoritePreview();}
 if(el.matches('[data-form=photo-save] [name=grams]'))adjustPhotoGrams(el);
});
document.addEventListener('change',e=>{
 const el=e.target;if(!(el instanceof HTMLInputElement||el instanceof HTMLSelectElement))return;
 if(el.matches('[data-food-select]'))foodInput(el);
 if(el.matches('[data-food-picker] [name=meal]')&&own(MEALS,el.value))ui.meal=el.value;
 if(el.matches('[data-fav-select]')){ui.favoritePick=el.value;ui.favoriteGrams=getFood(el.value)?.portion||'';$('[data-fav-grams]').value=ui.favoriteGrams;favoritePreview();}
 const type=el.dataset.change;
 if(type==='food-date'&&validDay(el.value)&&el.value<=today()){ui.date=el.value;render();}
 if(type==='split'&&own(ROUTINE_NAMES,el.value)){const mode=el.value;if(!state.profile){render();gate();return;}state.settings.split=mode;ui.workday=0;saved('نظام التمرين اتغير');}
 if(type==='plan-choice'&&planSlots.includes(el.dataset.meal)){const v=toNum(el.value,-1);if(!state.profile){render();gate();return;}if([0,1,2].includes(v)){state.planChoices[ui.planDay+'-'+el.dataset.meal]=v;saved('البديل اتثبت');}}
 if(type==='strength'){ui.lift=el.value;render();}
 if(type==='caffeine-type'){const item=CAFFEINE.find(x=>x[0]===el.value);if(item&&el.form)el.form.elements.mg.value=item[2];}
});
$('#dialog').addEventListener('close',()=>{if(!$('#dialog').open)ui.modal='';});
window.addEventListener('hashchange',()=>{const tab=location.hash.slice(1);if(TABS.some(x=>x[0]===tab)&&ui.tab!==tab)go(tab,false);else if(!tab&&ui.tab!=='today')go('today',false);});
window.addEventListener('popstate',()=>{const tab=location.hash.slice(1)||'today';if(tab!==ui.tab&&TABS.some(x=>x[0]===tab))go(tab,false);});
let lastDate=today(),lastCheckNotice='';
setInterval(()=>{
 updateTimers();
 if(today()!==lastDate&&!$('#dialog').open){if(ui.date===lastDate)ui.date=today();lastDate=today();render();}
 if(!state.profile||!state.settings.reminders||document.visibilityState!=='visible')return;
 const h=new Date().getHours();if(h>=10&&h<21&&Date.now()-ui.lastReminder>2*3600_000&&getDay().water<energy().water){ui.lastReminder=Date.now();sendReminder('خد لك شوية ماية وسجّلها لو حابب.');}
 if(h>=10&&h<21&&nextCheck()<=today()&&lastCheckNotice!==today()){lastCheckNotice=today();sendReminder('جه معاد تسجيل الوزن والقياسات.');}
},500);
render();
