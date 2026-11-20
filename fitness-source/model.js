const STORE = 'forma.eg.v1';
const TABS = [['today','اليوم','home'],['food','الأكل','utensils'],['workout','التمرين','dumbbell'],['plan','الخطة','clipboard'],['progress','تقدّمي','chart'],['profile','حسابي','user']];
const ACTIVITY = [['1.2','قليل الحركة'],['1.375','خفيف · تمرين 1–3 أيام'],['1.55','متوسط · تمرين 3–5 أيام'],['1.725','عالي · تمرين 6–7 أيام']];
const GOALS = [['bulk','أزيد وزن (تضخيم)'],['cut','أقلّل وزن (تنشيف)'],['maintain','أثبّت وزني']];
const QUALITY = [['','مش محدد'],['good','كويس'],['okay','متوسط'],['poor','متقطّع']];
const toNum = (x, fallback=0) => x !== '' && x !== null && x !== undefined && Number.isFinite(Number(x)) ? Number(x) : fallback;
const clamp = (x,min,max) => Math.min(max,Math.max(min,x));
const rounded = (n,dec=0)=>Math.round(n*10**dec)/10**dec;
const bound = (x,lo,hi,fallback=lo)=>clamp(toNum(x,fallback),lo,hi);
const numFmt = [0,1,2].map(maximumFractionDigits=>new Intl.NumberFormat('en-US',{maximumFractionDigits}));
const nfmt = (n,d=0)=>numFmt[d].format(Number.isFinite(n)?(Object.is(n,-0)?0:n):0);
const nf = (n,d=0)=>`<bdi>${nfmt(n,d)}</bdi>`;
const txt = (v,max=120) => typeof v==='string' ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g,'').trim().slice(0,max) : '';
const isObj = x=>x!==null && typeof x==='object' && !Array.isArray(x);
const arr = x=>Array.isArray(x)?x:[];
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
const pick=(v,values,fallback)=>values.includes(v)?v:fallback;
const keyOK=x=>typeof x==='string' && /^[a-z0-9_-]{1,72}$/i.test(x) && !['__proto__','constructor','prototype'].includes(x);
const id=()=>globalThis.crypto?.randomUUID?.() || 'local-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);
const ONE_DAY=86400000;
function dateKey(date=new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
const fromDay = day=>new Date(`${day}T12:00:00`);
const validDay = s=>typeof s==='string' && /^20\d{2}-\d{2}-\d{2}$/.test(s) && Number.isFinite(+fromDay(s)) && dateKey(fromDay(s))===s;
function shiftDay(k,offset) { const date=fromDay(k); date.setDate(date.getDate()+offset); return dateKey(date); }
const today=()=>dateKey();
const range=(n,end=today())=>Array.from({length:n},(_,i)=>shiftDay(end,i-n+1));
const fullDate=k=>new Intl.DateTimeFormat('ar-EG-u-nu-latn',{weekday:'long',day:'numeric',month:'long'}).format(fromDay(k));
const shortDate=k=>new Intl.DateTimeFormat('ar-EG-u-nu-latn',{day:'numeric',month:'short'}).format(fromDay(k));
const weekday=k=>WEEK[(fromDay(k).getDay()+1)%7];
const shortWeek=k=>({'السبت':'سبت','الأحد':'أحد','الاتنين':'اتنين','التلات':'تلات','الأربع':'أربع','الخميس':'خميس','الجمعة':'جمعة'})[weekday(k)];
const gapDays=(a,b)=>Math.round((fromDay(a)-fromDay(b))/ONE_DAY);
const localSort=(a,b)=>a.localeCompare(b,'ar-EG');
const mean=ns=>ns.length?ns.reduce((a,b)=>a+b,0)/ns.length:null;
const zero=()=>({kcal:0,p:0,c:0,f:0});
const sum=(items)=>items.reduce((out,e)=>({kcal:out.kcal+e.kcal,p:out.p+e.p,c:out.c+e.c,f:out.f+e.f}),zero());
const percent=(value,target)=>target>0?100*value/target:0;
const kcalOf=(f,g)=>({kcal:f.kcal*g/100,p:f.p*g/100,c:f.c*g/100,f:f.f*g/100});
const snapFood=(f,grams,meal)=>({id:id(),foodId:f.id,name:f.name,grams,meal,...kcalOf(f,grams)});
const blankDay=()=>({food:[],water:0,sleep:null,quality:'',distance:null,supplements:[],cardio:[],caffeine:[],journal:''});
const initial=()=>({version:1,profile:null,settings:{theme:'auto',split:'classic',checkEvery:7,reminders:false,language:'ar'},days:Object.create(null),logs:[],measurements:[],swaps:Object.create(null),customFoods:[],customExercises:[],routineEdits:Object.create(null),notes:Object.create(null),planChoices:Object.create(null),savedMeals:[],reviews:[],photos:[],friends:[],equipment:{}});
const sizeFields=[['chest','الصدر'],['arm','الدراع'],['waist','الوسط'],['thigh','الفخذ'],['neck','الرقبة']];
function validProfile(p){return isObj(p) && txt(p.name,40) && toNum(p.age)>=18 && toNum(p.age)<=100 && toNum(p.height)>=120 && toNum(p.height)<=230 && toNum(p.weight)>=35 && toNum(p.weight)<=300 && ['male','female'].includes(p.sex) && ACTIVITY.some(a=>a[0]===String(p.activity)) && GOALS.some(a=>a[0]===p.goal);}
function normalizeProfile(p){return {name:txt(p.name,40),age:Math.floor(+p.age),height:+p.height,weight:rounded(+p.weight,2),sex:p.sex,activity:String(p.activity),goal:p.goal,trainDays:Math.floor(bound(p.trainDays,1,6,5)),avoid:txt(p.avoid,170),goalWeight:toNum(p.goalWeight)>=35&&toNum(p.goalWeight)<=300?+p.goalWeight:null};}
function cleanFood(e) {
  if(!isObj(e) || !txt(e.name,85) || toNum(e.grams)<=0 || !own(MEALS,e.meal) || !keyOK(e.foodId))return null;
  return {id:keyOK(e.id)?e.id:id(),foodId:e.foodId,name:txt(e.name,85),meal:e.meal,grams:bound(e.grams,1,5000),kcal:bound(e.kcal,0,50000),p:bound(e.p,0,5000),c:bound(e.c,0,5000),f:bound(e.f,0,5000)};
}
function cleanBackup(raw) {
  if(!isObj(raw)||raw.version!==1||!own(raw,'profile')||(raw.profile!==null&&!validProfile(raw.profile))||!isObj(raw.days)||!isObj(raw.settings)||!Array.isArray(raw.logs)||!Array.isArray(raw.measurements)||!Array.isArray(raw.customFoods)) throw Error('شكل النسخة مش صحيح. استخدم نسخة طالعة من فورمة.');
  const out=initial(); out.profile=raw.profile?normalizeProfile(raw.profile):null;
  out.settings={theme:pick(raw.settings.theme,['auto','light','dark'],'auto'),split:pick(raw.settings.split,Object.keys(ROUTINE_NAMES),'classic'),checkEvery:raw.settings.checkEvery===14?14:7,reminders:raw.settings.reminders===true,language:pick(raw.settings.language,['ar','en'],'ar')};
  for(const [date,e] of Object.entries(raw.days).slice(-4000)){
    if(!validDay(date)||!isObj(e))continue;
    out.days[date]={
      food:arr(e.food).slice(0,250).map(cleanFood).filter(Boolean),water:bound(e.water,0,20000),sleep:e.sleep==null?null:bound(e.sleep,0,24),quality:pick(e.quality,QUALITY.map(x=>x[0]),''),distance:e.distance==null?null:bound(e.distance,0,200),
      supplements:arr(e.supplements).filter(s=>SUPPLEMENTS.includes(s)).slice(0,5),journal:txt(e.journal,800),
      cardio:arr(e.cardio).slice(0,24).filter(x=>isObj(x)&&([...Object.keys(CARDIO),'strength'].includes(x.mode))&&toNum(x.minutes)>0).map(x=>({id:keyOK(x.id)?x.id:id(),mode:x.mode,minutes:bound(x.minutes,1,400),km:bound(x.km,0,200)})),
      caffeine:arr(e.caffeine).slice(0,40).filter(x=>isObj(x)&&CAFFEINE.some(a=>a[0]===x.type)).map(x=>({id:keyOK(x.id)?x.id:id(),type:x.type,mg:bound(x.mg,1,900)}))
    };
  }
  out.logs=arr(raw.logs).slice(-12000).filter(x=>isObj(x)&&keyOK(x.exerciseId)&&validDay(x.date)&&toNum(x.reps)>0&&toNum(x.sets)>0).map(x=>({id:keyOK(x.id)?x.id:id(),exerciseId:x.exerciseId,date:x.date,kg:bound(x.kg,0,1000),reps:bound(x.reps,1,900),sets:bound(x.sets,1,40),rpe:x.rpe==null?null:bound(x.rpe,1,10)}));
  out.measurements=arr(raw.measurements).slice(-500).filter(x=>isObj(x)&&validDay(x.date)&&toNum(x.weight)>=35&&toNum(x.weight)<=300).map(x=>({date:x.date,weight:+x.weight,...Object.fromEntries(sizeFields.map(([k])=>[k,toNum(x[k])>=10&&toNum(x[k])<=300?+x[k]:null]))})).sort((a,b)=>a.date.localeCompare(b.date));
  out.customFoods=arr(raw.customFoods).slice(0,350).filter(x=>isObj(x)&&keyOK(x.id)&&txt(x.name,85)).map(x=>({id:x.id,name:txt(x.name,85),nameEn:txt(x.nameEn,85)||txt(x.name,85),portion:bound(x.portion,1,5000,100),kcal:bound(x.kcal,0,900),p:bound(x.p,0,100),c:bound(x.c,0,100),f:bound(x.f,0,100),group:'إضافاتك',aliases:[]}));
  out.customExercises=arr(raw.customExercises).slice(0,160).filter(x=>isObj(x)&&keyOK(x.id)&&txt(x.name,75)).map(x=>({id:x.id,name:txt(x.name,75),group:txt(x.group,26)||'تمارينك',sets:bound(x.sets,1,15,3),reps:bound(x.reps,1,100,8),top:bound(x.top,bound(x.reps,1,100,8),120,12),tip:txt(x.tip,400),other:arr(x.other).filter(keyOK).slice(0,8),unit:pick(x.unit,['rep','sec','min'],'rep')}));
  for(const [k,v] of Object.entries(isObj(raw.swaps)?raw.swaps:{}).slice(0,600)) if(keyOK(k)&&keyOK(v))out.swaps[k]=v;
  for(const [k,v] of Object.entries(isObj(raw.notes)?raw.notes:{}).slice(0,300)) if(keyOK(k))out.notes[k]=txt(v,650);
  for(const [k,v] of Object.entries(isObj(raw.routineEdits)?raw.routineEdits:{}).slice(0,50)) if(keyOK(k)&&Array.isArray(v))out.routineEdits[k]=v.filter(keyOK).slice(0,30);
  for(const [k,v] of Object.entries(isObj(raw.planChoices)?raw.planChoices:{})) if(/^[0-6]-(breakfast|lunch|dinner|snack)$/.test(k)&&[0,1,2].includes(v))out.planChoices[k]=v;
  out.savedMeals=arr(raw.savedMeals).slice(0,100).filter(x=>isObj(x)&&txt(x.name,55)&&Array.isArray(x.food)).map(x=>({id:keyOK(x.id)?x.id:id(),name:txt(x.name,55),food:x.food.slice(0,80).map(cleanFood).filter(Boolean)}));
  out.reviews=arr(raw.reviews).slice(-100).filter(x=>isObj(x)&&validDay(x.date)).map(x=>({date:x.date,energy:pick(x.energy,['low','mid','high'],'mid'),commit:pick(x.commit,['low','mid','high'],'mid'),pain:pick(x.pain,['none','mild','severe'],'none'),sleep:pick(x.sleep,['poor','okay','good'],'okay')}));
  out.photos=arr(raw.photos).slice(-6).filter(x=>isObj(x)&&validDay(x.date)&&typeof x.src==='string'&&x.src.length<300000&&/^data:image\/jpeg;base64,[\w+/=]+$/.test(x.src)).map(x=>({id:keyOK(x.id)?x.id:id(),date:x.date,src:x.src}));
  out.friends=arr(raw.friends).slice(0,30).filter(x=>isObj(x)&&txt(x.name,30)).map(x=>({id:keyOK(x.id)?x.id:id(),name:txt(x.name,30),streak:Math.floor(bound(x.streak,0,4000)),date:validDay(x.date)?x.date:today()}));
  for(const [k,v] of Object.entries(isObj(raw.equipment)?raw.equipment:{})){
    if(!MACHINES.some(m=>m[0]===k)||!isObj(v)||!keyOK(v.choice))continue;
    out.equipment[k]={choice:v.choice,added:v.added===true};
  }
  return out;
}
let storageWarning='';
function load(){
  try { const raw=localStorage.getItem(STORE); if(!raw) return initial(); try{return cleanBackup(JSON.parse(raw));}catch{storageWarning='في نسخة قديمة مش مفهومة. تقدر تسترجع آخر نسخة سليمة من حسابي.';return initial();} }
  catch{ storageWarning='الحفظ مش متاح في المتصفح ده. خُد نسخة من حسابي قبل ما تقفل الصفحة.';return initial(); }
}
let state=load();
function persist(){
  try{localStorage.setItem(STORE,JSON.stringify(state));storageWarning='';return true;}catch{storageWarning='التغيير موجود هنا مؤقتًا؛ المتصفح ماقدرش يحفظه. خد نسخة من حسابي.';return false;}
}
function getDay(date=today()){return state.days[date]||blankDay();}
function editDay(date=today()){return state.days[date]||(state.days[date]=blankDay());}
const hasWorkout=(date)=>state.logs.some(x=>x.date===date)||getDay(date).cardio.some(x=>x.mode==='strength');
function didLog(date){const d=getDay(date);return Boolean(d.food.length||d.water>0||d.sleep!==null||d.distance>0||d.cardio.length||hasWorkout(date));}
function streak(){let d=didLog(today())?today():shiftDay(today(),-1),total=0;while(total<4000&&didLog(d)){d=shiftDay(d,-1);total++;}return total;}
function bestStreak(){const ds=[...new Set([...Object.keys(state.days),...state.logs.map(x=>x.date)])].filter(didLog).sort();let best=0,run=0,prev='';for(const d of ds){run=prev&&gapDays(d,prev)===1?run+1:1;best=Math.max(best,run);prev=d;}return best;}
function energy(profile=state.profile,override){
  if(!profile)return null;
  const w=profile.weight;const bmr=10*w+6.25*profile.height-5*profile.age+(profile.sex==='male'?5:-161);
  const tdee=bmr*Number(profile.activity);const kcal=tdee+(override??({bulk:400,cut:-400,maintain:0}[profile.goal]));
  const p=w*(override===undefined&&profile.goal==='cut'?2.2:2);const f=kcal*.25/9;
  return {bmr,tdee,kcal,p,f,c:Math.max(0,(kcal-4*p-9*f)/4),water:35*w,bmi:w/(profile.height/100)**2};
}
function burned(d,p=state.profile){
  if(!p)return 0;
  return (d.distance||0)*p.weight*.75 + d.cardio.reduce((a,entry)=>{
    if(entry.km>0&&entry.mode==='run')return a+entry.km*p.weight;
    if(entry.km>0&&entry.mode==='walk')return a+entry.km*p.weight*.75;
    const met=(CARDIO[entry.mode]?.[1]||3.5)-1;
    return a+met*3.5*p.weight/200*entry.minutes;
  },0);
}
const foodMap=new Map(FOODS.map(f=>[f.id,f]));
const exMap=new Map(EXERCISES.map(e=>[e.id,e]));
const allFoods=()=>[...FOODS,...state.customFoods];
const allExercises=()=>[...EXERCISES,...state.customExercises];
const appLanguage=()=>state.settings.language==='en'?'en':'ar';
const foodName=f=>appLanguage()==='en'?(f.nameEn||f.name):f.name;
const exName=e=>appLanguage()==='en'?(EX_EN[e.id]||e.nameEn||e.name):e.name;
const exGroup=e=>appLanguage()==='en'?({'صدر':'Chest','كتف':'Shoulders','ترايسبس':'Triceps','ضهر':'Back','بايسبس':'Biceps','سواعد':'Forearms','رجل أمامي':'Quads','رجل خلفي':'Hamstrings','مؤخرة':'Glutes','سمانة':'Calves','بطن':'Core','كارديو':'Cardio','تمارينك':'Custom'}[e.group]||e.group):e.group;
const exTip=e=>appLanguage()==='en'?(EX_TIP_EN[e.id]||e.tipEn||e.tip):e.tip;
const machineDayName=()=>appLanguage()==='en'?'Machine push':'مكينة الدفع';
const machineLabel=m=>appLanguage()==='en'?m[2]:m[1];
const machineTarget=m=>appLanguage()==='en'?m[4]:m[3];
function machineExercise(id){return allExercises().find(x=>x.id===id);}
function equipmentChoice(id){
 const item=state.equipment[id];
 if(item?.choice&&machineExercise(item.choice))return item.choice;
 return id;
}
function machineAdded(id){return state.equipment[id]?.added===true;}
function machineUseLabel(id){const e=machineExercise(equipmentChoice(id));return e?exName(e):'';}
const getFood=k=>foodMap.get(k)||state.customFoods.find(f=>f.id===k);
const exercise=k=>exMap.get(k)||state.customExercises.find(e=>e.id===k);
const usedLogs=k=>state.logs.filter(x=>x.exerciseId===k).sort((a,b)=>a.date.localeCompare(b.date));
function normalize(s){return txt(s,800).toLowerCase().replace(/[\u064B-\u065F\u0670ـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[٠-٩]/g,m=>String(m.charCodeAt(0)-1632)).replace(/[۰-۹]/g,m=>String(m.charCodeAt(0)-1776)).replace(/٫/g,'.').replace(/[^\p{L}\p{N}. ]/gu,' ').replace(/\s+/g,' ').trim();}
const words=s=>normalize(s).split(' ').filter(Boolean);
const avoidSets={
 'بيض':['egg','eggwhite','omelet','eggh','bech'], 'لبن':['milk','skim','rayeb','cottage','dom','romi','yog','greek','labna','whey','ricepud','oum','feteerch','sahlab','teamilk','bech','keshk'],
 'قمح':['bread','fino','toast','pasta','feteer','feteerch','kosh','tagen','bech','fatta','rusk','haw','samosa','orzosoup','friedch','oum','freek','bulgur','loqma','konafa','qatayef','basbousa'],
 'مكسرات':['nuts','peanuts','almonds','pb','oum','konafa','qatayef','dukkah'], 'سمك':['fish','tuna','tunaoil','sardine','mackerel'], 'فراخ':['chick','chbreast','thigh','friedch','chsoup']
};
const avoidWords=(p=state.profile)=>txt(p?.avoid,170).split(/[,،;/\n]+/).map(normalize).filter(Boolean);
function excludedFood(f,p=state.profile){
  if(!f)return true;
  return avoidWords(p).some(word=>{
    const synonyms={'حليب':'لبن','البان':'لبن','اللبن':'لبن','لاكتوز':'لبن','جلوتين':'قمح','البيض':'بيض','دجاج':'فراخ','المكسرات':'مكسرات','سوداني':'مكسرات','فول سوداني':'مكسرات','السمك':'سمك'};
    const w=own(synonyms,word)?synonyms[word]:word;
    return (own(avoidSets,w)&&avoidSets[w].includes(f.id))||[f.name,f.group,...f.aliases].some(x=>normalize(x).includes(w));
  });
}
function routine(){
  const kind=state.settings.split, days=state.profile?.trainDays||5;
  const basic='ابدأ بـ 5 دقايق حركة خفيفة، وبعدها مجموعة أو اتنين بوزن سهل قبل أوزان الشغل.';
  if(kind==='classic')return CLASSIC;
  const variants={
    ppl:CLASSIC.slice(0,3),
    upper:[['علوي','صدر، ضهر ودراعات',basic,['bench','cable','shoulder','lat','dbcurl','rope']],['سفلي','رجل وكور',basic,['squat','rdl','calf','legcurl','plank']]],
    full:[['جسم كامل أ','دفع وسحب ورجل',basic,['goblet','bench','cable','hip','plank']],['جسم كامل ب','رجل وكتف وضهر',basic,['legpress','lat','shoulder','rdl','crunch']],['جسم كامل ج','حركة من كل اتجاه',basic,['lunge','incline','dbrow','calf','deadbug']]],
    home:[['البيت أ','وزن جسم من غير أجهزة',basic,['pushup','bodysquat','bridge','reverselunge','deadbug']],['البيت ب','وزن جسم واستيك (اختياري)',basic,['bandrow','pike','bandhinge','bwcalf','plank']]],
    custom:[['يوم خاص','جدول من اختياراتك',basic,[]]],
    machines:[MACHINE_PUSH,CLASSIC[1],CLASSIC[2],CLASSIC[3],CLASSIC[4]]
  };
  const split=variants[kind]||variants.full;
  return Array.from({length:days},(_,i)=>split[i%split.length]);
}
function routineLabel(r){
 const en=appLanguage()==='en';
 if(en&&r===MACHINE_PUSH)return MACHINE_PUSH_EN;
 if(en&&state.settings.split==='classic'){const i=CLASSIC.indexOf(r);return CLASSIC_EN[i]||r;}
 return r;
}
const trainWeeks={1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,5],5:[0,1,2,4,5],6:[0,1,2,3,4,5]};
const trainingDays=()=>trainWeeks[routine().length]||[];
const trainingToday=()=>trainingDays().indexOf((new Date().getDay()+1)%7);
const routineKey=(idx)=>`${state.settings.split}-${idx}`;
const slotKey=(idx,e)=>`${routineKey(idx)}-${e}`;
function dayExercises(idx){const r=routine();if(!r[idx])return [];return state.routineEdits[routineKey(idx)]||r[idx][3];}
function alternatives(e){return [...new Set([...e.other,...allExercises().filter(x=>x.group===e.group&&x.id!==e.id).map(x=>x.id)])].map(exercise).filter(Boolean).slice(0,9);}
function machineAlternatives(id){
 const base=machineExercise(id);
 if(!base)return [];
 return [...new Set([id,...base.other,...allExercises().filter(x=>x.group===base.group&&x.id!==id).map(x=>x.id)])].map(machineExercise).filter(Boolean).slice(0,9);
}
function currentEx(idx,base){
 const machine=MACHINES.some(m=>m[0]===base);
 const selected=machine?equipmentChoice(base):state.swaps[slotKey(idx,base)];
 const e=exercise(selected);
 if(machine&&e)return {...e,id:base};
 return e||exercise(base);
}
function nextCheck(){const last=state.measurements.at(-1);return last?shiftDay(last.date,state.settings.checkEvery):today();}
function bodyFat(m,p=state.profile){if(!m||!p||p.sex!=='male'||!m.neck||!m.waist||m.waist<=m.neck)return null;const f=86.010*Math.log10((m.waist-m.neck)/2.54)-70.041*Math.log10(p.height/2.54)+36.76;return f>=2&&f<=65?f:null;}
function weekly(end=today()){
  const days=range(7,end).map(date=>{const d=getDay(date);return {date,food:d.food.length>0,water:d.water,sleep:d.sleep,kcal:sum(d.food).kcal,p:sum(d.food).p,worked:hasWorkout(date),logged:didLog(date)};});
  return {days,logged:days.filter(d=>d.logged).length,foodDays:days.filter(d=>d.food).length,work:days.filter(d=>d.worked).length,p:mean(days.filter(d=>d.food).map(d=>d.p)),kcal:mean(days.filter(d=>d.food).map(d=>d.kcal)),sleep:mean(days.filter(d=>d.sleep!=null).map(d=>d.sleep)),water:mean(days.filter(d=>d.logged).map(d=>d.water))};
}
function weightTrend(period=28){
  const ms=state.measurements.filter(m=>m.date>=shiftDay(today(),-period)&&m.date<=today());
  if(ms.length<2)return null; const a=ms[0],b=ms.at(-1),days=gapDays(b.date,a.date);if(days<5)return null;
  return {a,b,days,delta:b.weight-a.weight,week:(b.weight-a.weight)*7/days};
}
function plateau(){const m=state.measurements.filter(x=>x.date>=shiftDay(today(),-40));if(m.length<4)return false;const last=m.at(-1);const segment=m.filter(x=>gapDays(last.date,x.date)<=32);if(segment.length<4||gapDays(last.date,segment[0].date)<21||gapDays(today(),last.date)>9)return false;const weights=segment.map(x=>x.weight);return Math.max(...weights)-Math.min(...weights)<Math.max(.3,last.weight*.005);}
const ui={tab:TABS.some(x=>x[0]===location.hash.slice(1))?location.hash.slice(1):'today',date:today(),meal:'breakfast',workday:0,planDay:(new Date().getDay()+1)%7,chart:'kcal',lift:'',restUntil:0,sessionStart:0,sessionElapsed:0,lastReminder:Date.now(),aiMode:'',aiText:'',modal:'',mediaDraft:null,parseDraft:[],foodQuery:'',foodPick:'',foodGrams:'',favoritePick:'',favoriteGrams:'',copiedDate:''};
const DEMO={targets:{kcal:2800,p:160,c:365,f:78,water:2800},eaten:{kcal:1752,p:112,c:205,f:55},water:1250,distance:3.2,burn:192,sleep:7.5,streak:4,kcal:[1650,2100,1880,2490,2200,2610,1752],hydration:[1.3,1.8,1.5,2.1,1.8,2.55,1.25],rest:[6.1,7,6.5,8,7.1,7.8,7.5]};
