/* Browser smoke test for Blok II.6: auth/progress mocked, no Supabase traffic. Usage: node scripts/smoke-blok-ii-6.cjs */
const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(require('node:os').homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))); }
const out = path.join(root, 'tmp/blok2.6/browser'); fs.mkdirSync(out, { recursive: true });
const ctx = vm.createContext({ QUESTION_DATA: {} });
vm.runInContext(fs.readFileSync(path.join(root, 'data/blok2.6.js'), 'utf8'), ctx);
const block = ctx.QUESTION_DATA['blok-ii-6'];
const stub = `(() => { const user={id:'isolated-local-smoke',email:'local-test@example.invalid'};
 function query(){return {select(){return this},eq(){return this},delete(){return this},
  maybeSingle(){return Promise.resolve({data:null,error:null})},upsert(){return Promise.resolve({data:null,error:null})},
  then(r,j){return Promise.resolve({data:[],error:null}).then(r,j)}}}
 window.JStudyCBackend={supabase:{from:query,auth:{signOut:async()=>({error:null})}},
  getCurrentUser:async()=>user,requireCurrentUser:async()=>user,ensureProfile:async()=>({id:user.id,name:'Local test'})}; })();`;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (e, d) => { res.writeHead(e ? 404 : 200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(e ? 'Not found' : d); });
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const result = { packages: [], images: [] };
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route('**/*', async route => {
      const u = new URL(route.request().url());
      if (u.origin !== origin) { await route.abort(); return; }
      if (u.pathname === '/supabaseClient.js') { await route.fulfill({ status: 200, contentType: 'text/javascript', body: stub }); return; }
      await route.continue();
    });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${origin}/dashboard.html`);
    await page.waitForSelector('#blok26ExamContent .year-card');
    const cards = await page.$$eval('#blok26ExamContent .year-card', els => els.map(e => [e.querySelector('.year-num').textContent, e.querySelector('.year-info').textContent, e.getAttribute('href')]));
    result.dashboard = cards;
    await page.locator('#block-ii-6').scrollIntoViewIfNeeded();
    await page.locator('#block-ii-6').screenshot({ path: path.join(out, 'dashboard-card.png') });
    for (const [typeId, type] of Object.entries(block.exams['cumex-1'].types)) for (const [year, qs] of Object.entries(type.years)) {
      assert(cards.some(c => c[2] === `quiz.html?block=blok-ii-6&exam=cumex-1&type=${typeId}&year=${year}` && c[1] === `${qs.length} soal`), `Dashboard card ${typeId} ${year}`);
      await page.goto(`${origin}/quiz.html?block=blok-ii-6&exam=cumex-1&type=${typeId}&year=${year}`);
      await page.waitForSelector('#questionText');
      const badge = await page.textContent('#questionBadge').catch(() => '');
      result.packages.push({ typeId, year, count: qs.length, badge });
      for (const [i, q] of qs.entries()) if (q.image) {
        // Jump to the question via the navigator buttons if present; else step with Next.
        await page.evaluate(idx => { const b = document.querySelectorAll('#numberGrid .num-btn')[idx]; if (b) b.click(); }, i);
        let ok = await page.waitForFunction(src => [...document.querySelectorAll('#questionMedia img')].some(im => im.getAttribute('src') === src && im.complete && im.naturalWidth > 0), q.image, { timeout: 4000 }).then(() => true).catch(() => false);
        if (ok && q.importIdentity === 'cumex1_blok2.6_iup_2023:3') await page.screenshot({ path: path.join(out, 'quiz-image.png') });
        result.images.push({ id: q.importIdentity, image: q.image, ok });
        assert(ok, `Image not loadable ${q.image}`);
      }
    }
    await page.screenshot({ path: path.join(out, 'quiz.png') });
    assert(!errors.length, 'Page errors: ' + errors.join('; '));
    fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2)); console.log('SMOKE OK');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
