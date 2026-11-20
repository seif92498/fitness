/* Optional browser test: PLAYWRIGHT_MODULE=/path/to/playwright node scripts/smoke-fitness.cjs */
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'public/index.html');
const store = 'forma.eg.v1';

async function run() {
  const html = await fs.readFile(file);
  const pagesHtml = await fs.readFile(path.join(root,'public/downloads/index.html'));
  const server = http.createServer((req, res) => {
    if (req.url === '/api/ai') { res.writeHead(503, { 'Content-Type':'application/json' }); res.end('{"error":"not_configured"}'); }
    else if(req.url==='/downloads/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Disposition':'attachment; filename="index.html"'});res.end(pagesHtml);}
    else { res.writeHead(200, { 'Content-Type':'text/html; charset=utf-8' }); res.end(req.url==='/forma/'?pagesHtml:html); }
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url = process.env.BASE_URL || `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch();
  const errors=[];
  try {
    const desktop=await browser.newContext({ viewport:{width:1440,height:900}, colorScheme:'light' });
    const page=await desktop.newPage(); page.setDefaultTimeout(5000);
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('status of 503'))errors.push(m.text());});
    const outbound=[];
    page.on('request',r=>{if(r.url().startsWith('http'))outbound.push(r.url());});
    await page.goto(url);
    assert.match(await page.locator('h1').innerText(),/أهلاً بيك/);
    assert.match(await page.locator('.calorie-card').innerText(),/بيانات تجريبية/);
    assert.equal(await page.evaluate(()=>Object.keys(localStorage).length),0);
    assert.equal(outbound.length,1,'Initial view must fetch no subresources');
    const click=(act,scope='main')=>page.locator(`${scope} [data-act="${act}"]`).first().click();
    const nav=tab=>page.locator(`.sidebar [data-act=nav][data-value=${tab}][class=nav-btn]`).click();
    const dlg=page.locator('dialog');
    const details=key=>dlg.locator(`[name="${key}"]`);
    const submit=()=>dlg.locator('button[type=submit]').click();
    const close=()=>click('close','dialog');
    const state=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),store);

    await click('share','header.topbar');
    assert.equal(await dlg.locator('#share-url').inputValue(),url);
    await click('pages-help','dialog');
    assert.equal(await dlg.locator('.publish-step').count(),4);
    assert.match(await dlg.innerText(),/Upload files/);
    assert.equal(await dlg.locator('a[href="https://github.com/new"]').count(),1);
    const siteDownload=page.waitForEvent('download');
    await dlg.locator('a[download="index.html"]').click();
    assert.equal((await siteDownload).suggestedFilename(),'index.html');
    await click('share','dialog');
    assert.equal(await dlg.locator('#share-url').inputValue(),url);
    await close();
    await click('onboard','.page-heading');
    for(const [k,v] of Object.entries({name:'عمر',age:'26',height:'178',weight:'80',goalWeight:'85'}))await details(k).fill(v);
    await details('sex').selectOption('male');
    await submit();
    assert.match(await page.locator('h1').innerText(),/عمر/);
    assert.equal(await page.locator('.ring-text strong').innerText(),'3,171');
    await click('water');
    await page.locator('main [data-act=water][data-value="500"]').click();
    await click('activity');
    await details('distance').fill('3.2'); await details('sleep').fill('6.5'); await submit();
    let saved=await state();const today=Object.keys(saved.days)[0];
    assert.equal(saved.days[today].water,750);assert.equal(saved.days[today].sleep,6.5);
    assert.match(await page.locator('.dashboard-metrics').innerText(),/192/);
    await click('chart');

    await nav('food');
    assert.ok(await page.locator('main [name=foodId] option').count()>=100);
    await page.locator('main [data-food-query]').fill('كشري');
    assert.equal(await page.locator('main [name=foodId]').inputValue(),'kosh');
    await page.locator('main [name=grams]').fill('200');await page.locator('main [data-form=food] button[type=submit]').click();
    assert.equal((await state()).days[today].food[0].kcal,326);
    await click('meal-save');await details('name').fill('فطاري');await submit();
    await click('saved-meals');await click('saved-meal-add','dialog');
    assert.equal((await state()).days[today].food.length,2);
    await click('natural');await details('phrase').fill('أكلت 150 جرام رز وبيضتين ورغيفين عيش بلدي');await submit();
    assert.equal(await dlg.locator('input[name^=guess-]').count(),3);
    assert.equal(await details('guess-1').inputValue(),'100');
    assert.equal(await details('guess-2').inputValue(),'120');
    await click('natural-save','dialog');
    assert.equal((await state()).days[today].food.length,5);
    await click('custom-food');await details('name').fill('<b>زبادي البيت</b>');
    for(const [k,v] of Object.entries({kcal:'65',p:'5',c:'5',f:'3'}))await details(k).fill(v);
    await submit();assert.match(await page.locator('main [name=foodId] option:checked').innerText(),/<b>زبادي البيت<\/b>/);
    await click('fridge');await details('ingredients').fill('بيض، فول، عيش، لبن');await submit();assert.match(await dlg.locator('#fridge-result').innerText(),/فول/);await close();

    await nav('workout');
    assert.equal(await page.locator('main [data-act=work-day]').count(),5);
    await click('exercise-swap');await details('exerciseId').selectOption('dbpress');await submit();
    await click('log-exercise');await details('kg').fill('40');await details('reps').fill('12');await details('rpe').fill('8');await submit();
    assert.equal((await state()).logs[0].exerciseId,'dbpress');
    assert.match(await page.locator('.exercise-card').first().innerText(),/2.5 كجم/);
    await click('rest-start');assert.notEqual(await page.locator('#rest-clock').innerText(),'00:00');
    await nav('plan');assert.equal(await page.locator('[data-change=plan-choice]').count(),4);
    await click('shopping');assert.ok(await dlg.locator('.shopping-list .list-entry').count()>10);await close();
    await nav('progress');await click('checkin','.page-heading');
    await details('weight').fill('81');await details('waist').fill('86');await details('neck').fill('37');await submit();
    assert.equal((await state()).profile.weight,81);assert.match(await page.locator('main').innerText(),/البحرية الأمريكية/);
    await click('review');await details('pain').selectOption('severe');await submit();assert.match(await dlg.innerText(),/راجع دكتور/);await close();

    await page.route('**/api/ai',route=>{
      const payload=route.request().postDataJSON();
      assert.equal(payload.consent,true);assert.equal(payload.context.profile.name,undefined);assert.equal(payload.context.profile.weight_kg,81);
      return route.fulfill({json:{answer:'تجربة <b>نص عادي</b>'}});
    });
    await click('ai-open');await submit();assert.equal(outbound.filter(x=>x.endsWith('/api/ai')).length,0);
    await details('consent').check();await submit();await dlg.locator('#ai-output').getByText('تجربة <b>نص عادي</b>',{exact:true}).waitFor();await close();
    await page.unroute('**/api/ai');

    await nav('food');
    await page.route('**/api/ai',route=>{
      const payload=route.request().postDataJSON();
      assert.equal(payload.mode,'photo');assert.equal(payload.context,undefined);assert.match(payload.image,/^data:image\/jpeg;base64,/);
      return route.fulfill({json:{answer:'{"name":"وجبة مراجعة","grams":150,"kcal":180,"p":15,"c":20,"f":4}'}});
    });
    await click('photo');await details('image').setInputFiles(path.join(root,'design/training-hero.jpg'));await details('consent').check();await submit();
    await dlg.getByRole('heading',{name:'راجع تقدير الصورة'}).waitFor();
    assert.equal((await state()).days[today].food.length,5);
    await details('grams').fill('300');assert.equal(await details('kcal').inputValue(),'360');await submit();
    assert.equal((await state()).days[today].food.at(-1).kcal,360);
    await page.unroute('**/api/ai');

    await nav('workout');
    await page.locator('main [data-act=work-lang][data-value=en]').click();
    assert.match(await page.locator('main').innerText(),/Prestige chest press/);
    assert.match(await page.locator('main').innerText(),/Hoist shoulder press machine/);
    assert.match(await page.locator('main').innerText(),/Machine push/);
    await page.locator('main [data-act=machine-add][data-value=machchestpress]').click();
    assert.equal((await state()).equipment.machchestpress.added,true);
    await page.locator('main [data-act=work-lang][data-value=ar]').click();

    await nav('profile');await page.locator('main [data-act=theme][data-value=dark]').click();
    const csv=page.waitForEvent('download');await click('backup-csv');assert.match((await csv).suggestedFilename(),/\.csv$/);
    assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    await click('backup-export');const backup=await dlg.locator('#backup-code').inputValue();assert.equal(JSON.parse(backup).profile.weight,81);await close();
    await click('backup-import');await dlg.locator('#backup-code').fill('{}');await click('backup-validate','dialog');assert.match(await page.locator('#toast').innerText(),/مش مفهومة/);
    await dlg.locator('#backup-code').fill(backup);await click('backup-validate','dialog');await click('backup-restore','dialog');
    await page.reload();assert.equal((await state()).profile.weight,81);assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    await desktop.close();

    const phone=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark'}); const m=await phone.newPage();
    m.on('pageerror',e=>errors.push(e.message));
    await m.goto(pathToFileURL(file).href);
    for(const tab of ['today','food','workout','plan','progress','profile']){
      await m.locator(`.bottom-nav [data-value=${tab}]`).click();
      assert.equal(await m.evaluate(()=>document.documentElement.scrollWidth),390,`Layout overflow in ${tab}`);
    }
    assert.equal(await m.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()),'#090e13');
    await phone.close();

    const pages=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const requests=[];
    pages.on('pageerror',e=>errors.push(e.message));
    pages.on('request',r=>{if(r.url().startsWith('http'))requests.push(r.url());});
    const pagesUrl=`http://127.0.0.1:${server.address().port}/forma/`;
    await pages.goto(pagesUrl);
    assert.equal(await pages.locator('html').getAttribute('data-host'),'static');
    await pages.locator('.top-share').click();
    assert.equal(await pages.locator('#share-url').inputValue(),pagesUrl);
    assert.equal(await pages.locator('dialog a[download]').count(),1);
    await pages.locator('dialog [data-act=close]').click();
    await pages.locator('.bottom-nav [data-value=progress]').click();
    await pages.locator('main [data-act=ai-open]').first().click();
    assert.match(await pages.locator('dialog').innerText(),/مفيش بيانات هتتبعت/);
    assert.equal(await pages.locator('dialog form').count(),0);
    assert.deepEqual(requests,[pagesUrl]);
    await pages.close();
    assert.deepEqual(errors,[]);
    console.log('PASS: file offline, RTL layouts, onboarding, water/sleep, food/search/saved meals, workouts, plan, measurements, review, opt-in AI, theme, JSON and reload.');
  } finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
}
run().catch(e=>{console.error(e);process.exitCode=1;});
