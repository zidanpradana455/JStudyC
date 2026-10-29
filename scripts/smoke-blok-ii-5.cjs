/* Browser integration checks: all auth/progress calls are mocked, no Supabase writes. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let chromium;
try {({chromium}=require('playwright'));}
catch {({chromium}=require(process.env.BLOK25_PLAYWRIGHT || path.join(require('node:os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')));}
const output=path.join(root,'tmp/blok2.5/browser');fs.mkdirSync(output,{recursive:true});
const ctx=vm.createContext({QUESTION_DATA:{}});
for(const file of ['data/cumex1-blok2.5.js','data/blok2.5-import.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const block=ctx.QUESTION_DATA['blok-ii-5'];
const stub=`(() => {
 const user={id:'isolated-local-smoke',email:'local-test@example.invalid'};
 function query(){const filters={};return {select(){return this},eq(k,v){filters[k]=v;return this},delete(){this.removing=true;return this},
  maybeSingle(){return Promise.resolve({data:window.__testProgress?.[filters.progress_key]||null,error:null})},
  upsert(value){window.__testSaved=value;return Promise.resolve({data:null,error:null})},
  then(resolve,reject){if(this.removing){(window.__testDeleted||=[]).push(filters.progress_key);delete window.__testProgress?.[filters.progress_key];}
   return Promise.resolve({data:Object.entries(window.__testProgress||{}).map(([progress_key,v])=>({...v,progress_key})),error:null}).then(resolve,reject)}}}
 window.JStudyCBackend={supabase:{from:query,auth:{signOut:async()=>({error:null})}},
  getCurrentUser:async()=>user,requireCurrentUser:async()=>user,ensureProfile:async()=>({id:user.id,name:'Local browser test'})};
})();`;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+name);
 if(!file.startsWith(root+path.sep)||name.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);res.end();return;}
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'content-type':types[path.extname(file)]||'application/octet-stream'});res.end(error?'Not found':data);});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin=`http://127.0.0.1:${server.address().port}`;
 let browser;
 try {
  browser=await chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  let testProgress={};
  await context.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.origin!==origin){await route.abort();return;}
   if(u.pathname==='/supabaseClient.js'){await route.fulfill({status:200,contentType:'text/javascript',body:`window.__testProgress=${JSON.stringify(testProgress)};\n`+stub});return;}
   await route.continue();
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/dashboard.html');
  await page.locator('#block-ii-5 [data-exam="cumex-2"]').click();
  assert.equal(await page.locator('#blok25ExamContent a.year-card').count(),4);
  await page.locator('#block-ii-5 [data-exam="uas"]').click();
  assert.equal(await page.locator('#blok25ExamContent a.year-card').count(),4);
  await page.locator('#block-ii-5').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'dashboard.png')});
  let packages=0,images=0,reconstructed=0,replacements=0;
  for(const [exam,e] of Object.entries(block.exams))for(const [type,t] of Object.entries(e.types))for(const [year,questions] of Object.entries(t.years)){
   const url=origin+'/quiz.html?'+new URLSearchParams({block:'blok-ii-5',exam,type,year});
   await page.goto(url);
   await page.locator('#optionsList button').first().waitFor();
   assert.equal(await page.locator('#optionsList button').count(),5);
   assert.equal(await page.locator('#numberGrid button').count(),questions.length);
   assert((await page.locator('#quizSubtitle').innerText()).includes(`${questions.length} soal`));
   const first=questions[0];
   await page.locator('#optionsList button').filter({hasText:first.options[first.correctAnswer]}).click();
   await page.waitForFunction(()=>document.querySelector('#explanationBox').classList.contains('show'));
   assert((await page.locator('#explanationText').innerText()).includes(first.lecture));
   for(const [i,q] of questions.entries())if(q.editorialStatus){
    await page.locator('#numberGrid button').nth(i).click();
    const label=q.editorialStatus==='ai-replacement'?'Soal pengganti AI':'Rekonstruksi AI';
    assert((await page.locator('#questionBadge').textContent()).includes(label));
    assert.equal(await page.locator('#optionsList button').count(),5);
    assert.equal(await page.locator('#questionMedia img').count(),0);
    if(i!==0)await page.locator('#optionsList button').filter({hasText:q.options[q.correctAnswer]}).click();
    assert((await page.locator('#explanationText').innerText()).includes(q.reconstructionNote));
    if(q.editorialStatus==='ai-replacement')replacements++;else reconstructed++;
   }
   for(const [i,q] of questions.entries())if(q.importIdentity&&q.image){
    await page.locator('#numberGrid button').nth(i).click();
    const image=page.locator('#questionMedia img');
    await image.waitFor();
    await page.waitForFunction(()=>{const i=document.querySelector('#questionMedia img');return i?.complete&&i.naturalWidth>0;});
    assert.equal(await image.getAttribute('src'),q.image);
    assert((await page.locator('#questionBadge').textContent()).includes(`sumber ${q.sourceNumber}`));
    const response=await page.request.get(origin+'/'+q.image);assert.equal(response.status(),200);
    if(images===0)await page.screenshot({path:path.join(output,'quiz-image.png'),fullPage:true});
    images++;
   }
   packages++;
  }
  assert.deepEqual(errors,[]);
  assert.equal(packages,12);assert.equal(images,9);
  assert.equal(reconstructed,81);assert.equal(replacements,19);

  // Restore a saved positional answer after the first inserted gap. Option seeds
  // remain stable because they use the unchanged source ID, not the new position.
  const qs=block.exams.uas.types.reguler.years['2023'];
  const old=qs.filter(q=>!q.editorialStatus), oldIndex=old.findIndex(q=>q.id===18);
  const progressKey='blok-ii-5_uas_reguler_2023';
  const legacyKey='blok-ii-5_uas_arsip-acromion_Tanpa-tahun';
  const saved={answers:old.map((_,i)=>i===oldIndex?0:null),flagged:[oldIndex],correct:0,answered:1,total:old.length};
  testProgress={[legacyKey]:saved};
  const quizUrl=origin+'/quiz.html?block=blok-ii-5&exam=uas&type=reguler&year=2023';
  await page.goto(quizUrl);await page.locator('#optionsList button').first().waitFor();
  assert.equal((await page.locator('#numberGrid button.answered').allTextContents()).join(','),'18');
  assert.equal((await page.locator('#numberGrid button.flagged').allTextContents()).join(','),'18');
  await page.locator('#numberGrid button').nth(qs.findIndex(q=>q.id===18)).click();
  assert.equal(await page.locator('#optionsList button.selected').count(),1);
  const expectedSelected=await page.evaluate(({options,key})=>{
   let seed=2166136261;for(const ch of 'isolated-local-smoke_'+key+'_18'){seed^=ch.charCodeAt(0);seed=Math.imul(seed,16777619);}seed>>>=0;
   const random=()=>{seed+=0x6D2B79F5;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
   const a=[...options];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a[0];
  },{options:qs.find(q=>q.id===18).options,key:legacyKey});
  assert((await page.locator('#optionsList button.selected').textContent()).includes(expectedSelected));
  await page.locator('#numberGrid button').nth(qs.findIndex(q=>q.id===16)).click();
  assert.equal(await page.locator('#optionsList button:disabled').count(),0);
  await page.locator('#optionsList button').first().click();
  await page.waitForFunction(()=>window.__testSaved?.total===47);
  const persisted=await page.evaluate(()=>window.__testSaved);
  assert.equal(persisted.progress_key,progressKey);assert.equal(persisted.type_id,'reguler');assert.equal(persisted.quiz_year,'2023');
  assert.equal(persisted.answers.length,47);assert.equal(persisted.answers[17],0);
  assert.equal(persisted.answers[15],0);assert.deepEqual(persisted.flagged,[17]);
  // Reopening a new-format save must not migrate it a second time.
  testProgress={[legacyKey]:saved,[progressKey]:persisted};
  await page.goto(quizUrl);await page.locator('#optionsList button').first().waitFor();
  assert.deepEqual(await page.locator('#numberGrid button.answered').allTextContents(),['16','18']);
  // A formerly complete 42-question package is now 42/47, not complete.
  testProgress={[legacyKey]:{answered:42,correct:30,total:42}};
  await page.goto(origin+'/dashboard.html');await page.locator('#block-ii-5 [data-exam="uas"]').click();
  const card=page.locator('#blok25ExamContent a.year-card[href*="type=reguler&year=2023"]');
  assert.equal(await card.locator('.year-progress-bar').getAttribute('style'),'width:89%');
  assert((await page.locator('#totalPakets').innerText()).startsWith('0/'));
  assert.equal(await page.locator('a.year-card[href*="arsip-"]').count(),0);
  // Current data wins when both progress keys exist; totals are not doubled.
  testProgress={[legacyKey]:{answered:42,correct:30,total:42},[progressKey]:{answered:2,correct:1,total:47}};
  await page.goto(origin+'/dashboard.html');await page.locator('#block-ii-5 [data-exam="uas"]').click();
  assert.equal(await card.locator('.year-progress-bar').getAttribute('style'),'width:4%');
  assert.equal(await page.locator('#totalAnswered').innerText(),'2');
  testProgress={};
  for(const alias of block.packageAliases)for(const exam of alias.exams){
   await page.goto(origin+'/quiz.html?'+new URLSearchParams({block:'blok-ii-5',exam,type:alias.from.type,year:alias.from.year}));
   await page.locator('#optionsList button').first().waitFor();
   const url=new URL(page.url());assert.equal(url.searchParams.get('type'),alias.to.type);assert.equal(url.searchParams.get('year'),'2023');
   assert((await page.locator('#quizSubtitle').textContent()).includes('2023'));
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(quizUrl);
  await page.locator('#optionsList button').first().waitFor();
  await page.locator('#sidebarToggle').click();
  await page.locator('#numberGrid button').nth(qs.findIndex(q=>q.id===44)).click();
  await page.waitForFunction(()=>document.querySelector('.quiz-sidebar').getBoundingClientRect().top>=innerHeight);
  assert((await page.locator('#questionBadge').textContent()).includes('Soal pengganti AI'));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(output,'quiz-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  const result={packages,images,reconstructed,replacements,legacyProgressMigration:true,cohortAliases:4,legacyAnswerSeed:true,newProgressReload:true,dashboardExpandedTotal:true,dashboardDeduplicatesAliases:true,optionsPerQuestion:5,pageErrors:errors,mobileOverflow:false,auth:'mocked locally',supabaseWrites:0};
  fs.writeFileSync(path.join(output,'result.json'),JSON.stringify(result,null,2));
  console.log('BROWSER PASS',JSON.stringify(result));
 } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
