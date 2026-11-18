/**
 * Blok II.6 (Cough, Dyspnea, and Cyanosis) — Cumex 1 importer.
 * Local only: no credentials, network, or Supabase writes. Questions live in data/blok2.6.js.
 *
 *   node scripts/import-soal-blok2.6.mjs            # dry-run (default): validate + summary, writes nothing to the web
 *   node scripts/import-soal-blok2.6.mjs --apply    # copy images + write data/blok2.6.js (append-only, idempotent)
 *   node scripts/import-soal-blok2.6.mjs --verify   # re-load published module and check it against the plan
 *
 * Inputs: scripts/blok-ii-6-cumex1.json (editorial), scripts/blok-ii-6-lectures.json (overview),
 *         tmp/blok2.6/image-manifest.json + tmp/blok2.6/images/* (from extract-blok-ii-6-images.py).
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const work = path.join(root, 'tmp/blok2.6');
const targetFile = path.join(root, 'data/blok2.6.js');
const assetDir = 'assets/questions/blok2.6';
const BLOCK = 'blok-ii-6';
const args = new Set(process.argv.slice(2));
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const assert = (c, m) => { if (!c) throw new Error(m); };

const editorial = read(path.join(root, 'scripts/blok-ii-6-cumex1.json'));
const lectures = read(path.join(root, 'scripts/blok-ii-6-lectures.json'));
const manifest = read(path.join(work, 'image-manifest.json'));
const lectureTitles = new Set(Object.values(lectures));

// Positions whose stem/options were substantially rebuilt by AI (shown as "Rekonstruksi AI" in the quiz).
const RECONSTRUCTED = new Set([
  'cumex1_blok2.6_iup_2021:3', 'cumex1_blok2.6_iup_2021:4', 'cumex1_blok2.6_iup_2021:12',
  'cumex1_blok2.6_iup_2021:16', 'cumex1_blok2.6_iup_2021:17', 'cumex1_blok2.6_iup_2021:18',
  'cumex1_blok2.6_iup_2022:2', 'cumex1_blok2.6_iup_2022:8', 'cumex1_blok2.6_iup_2022:9',
  'cumex1_blok2.6_reg_2023:4', 'cumex1_blok2.6_reg_2023:11',
]);

// ── Build + validate (fails hard) ──
const plan = [];
for (const [code, src] of Object.entries(editorial.sources)) {
  const rows = editorial.questions.filter(q => q.src === code);
  const skipped = Object.keys(src.skipped).map(Number);
  const expectedIds = Array.from({ length: src.numbered }, (_, i) => i + 1).filter(n => !skipped.includes(n));
  assert(rows.map(r => r.n).join() === expectedIds.join(),
    `${code}: numbering ${rows.map(r => r.n)} != expected ${expectedIds} (source has ${src.numbered}, skipped ${skipped})`);

  for (const r of rows) {
    const identity = `${code}:${r.n}`;
    const lecture = lectures[r.lec];
    assert(lecture && lectureTitles.has(lecture), `${identity}: unknown lecture code ${r.lec}`);
    assert(r.q?.trim() && r.e?.trim(), `${identity}: empty question/explanation`);
    assert(Array.isArray(r.o) && r.o.length === 5, `${identity}: needs exactly 5 options`);
    assert(new Set(r.o.map(o => o.trim().toLowerCase())).size === 5, `${identity}: duplicate options`);
    assert(Number.isInteger(r.a) && r.a >= 0 && r.a <= 4, `${identity}: invalid answer index`);
    for (const o of r.o) assert(o.trim() && !/^[A-Ea-e][.)]\s|[()*✓✔★]|<\/?(?:b|strong|mark)\b|\(benar\)|\bjawaban\b/i.test(o),
      `${identity}: option has marker/prefix/parentheses: "${o}"`);
    assert(['source', 'ai'].includes(r.key), `${identity}: key provenance missing`);

    const img = manifest.filter(m => m.sourceCode === code && m.id === r.n);
    assert(img.length <= 1, `${identity}: multiple images`);
    const refersImage = /seperti pada gambar|pada gambar/i.test(r.q);
    assert(refersImage === (img.length === 1), `${identity}: image reference/manifest mismatch`);
    let question = r.q, image = '';
    if (img.length) {
      const local = path.join(work, 'images', img[0].file);
      assert(fs.existsSync(local), `${identity}: image file missing ${local}`);
      assert(hash(fs.readFileSync(local)) === img[0].sha256, `${identity}: image checksum changed; re-verify visually`);
      assert(img[0].file === `${code}_q${r.n}.jpg`, `${identity}: image name convention`);
      image = `${assetDir}/${img[0].file}`;
      question = `[Perhatikan gambar ${img[0].file}]\n${question}`;
    }
    const q = {
      id: r.n, year: src.year, kelas: src.type === 'iup' ? 'IUP' : 'Reguler', source: src.title,
      sourceFile: src.file, sourceCode: code, sourceNumber: r.n, importIdentity: identity,
      lecture, lectureCode: r.lec, question, image, options: r.o, correctAnswer: r.a, explanation: r.e,
      answerProvenance: r.key === 'source' ? 'source-key' : 'ai-determined',
    };
    if (RECONSTRUCTED.has(identity)) {
      q.editorialStatus = 'ai-reconstructed';
      q.reconstructionNote = r.notes.join(' ');
    }
    plan.push({ type: src.type, typeName: q.kelas, year: String(src.year), notes: r.notes, question: q });
  }
}
for (const m of manifest) assert(plan.some(p => p.question.sourceCode === m.sourceCode && p.question.id === m.id),
  `Image without question: ${m.file}`);
assert(new Set(plan.map(p => p.question.importIdentity)).size === plan.length, 'Duplicate identity');

// ── Dry-run summary ──
const perSource = {}, perLecture = {};
for (const p of plan) {
  const q = p.question;
  perSource[q.sourceCode] ||= { file: q.sourceFile, numbered: editorial.sources[q.sourceCode].numbered, imported: 0, images: 0, aiKey: 0, reconstructed: 0 };
  const s = perSource[q.sourceCode];
  s.imported++; if (q.image) s.images++; if (q.answerProvenance === 'ai-determined') s.aiKey++; if (q.editorialStatus) s.reconstructed++;
  perLecture[q.lecture] = (perLecture[q.lecture] || 0) + 1;
}
fs.mkdirSync(work, { recursive: true });
fs.writeFileSync(path.join(work, 'staged.json'), JSON.stringify(plan, null, 2));
console.table(perSource);
console.log('Per lecture:'); console.table(perLecture);
console.log(`Total: ${plan.length} soal, ${plan.filter(p => p.question.image).length} bergambar. Plan SHA-256: ${hash(JSON.stringify(plan))}`);
for (const p of [plan[0], plan[20], plan[40]]) console.log('\nSample:', p.question.importIdentity, '\n', p.question.question,
  '\nOptions:', p.question.options.join(' | '), '\nAnswer:', p.question.correctAnswer, '\nExplanation:', p.question.explanation);

// ── Publish ──
function loadPublished() {
  const ctx = vm.createContext({ QUESTION_DATA: {} });
  if (fs.existsSync(targetFile)) vm.runInContext(fs.readFileSync(targetFile, 'utf8'), ctx, { timeout: 2000 });
  return JSON.parse(JSON.stringify(ctx.QUESTION_DATA[BLOCK] || null));
}
const allQuestions = b => !b ? [] : Object.values(b.exams).flatMap(e => Object.values(e.types).flatMap(t => Object.values(t.years).flat()));

if (args.has('--apply')) {
  const before = allQuestions(loadPublished());
  // Never overwrite: an already-published identity must match the plan exactly.
  for (const old of before) {
    const fresh = plan.find(p => p.question.importIdentity === old.importIdentity);
    assert(fresh, `Published question ${old.importIdentity} missing from plan; refusing deletion.`);
    assert(JSON.stringify(fresh.question) === JSON.stringify(old), `Conflicting published record ${old.importIdentity}; no overwrite.`);
  }
  // Images first.
  fs.mkdirSync(path.join(root, assetDir), { recursive: true });
  for (const { question: q } of plan.filter(p => p.question.image)) {
    const src = path.join(work, 'images', path.basename(q.image)), dst = path.join(root, q.image);
    if (fs.existsSync(dst)) assert(hash(fs.readFileSync(src)) === hash(fs.readFileSync(dst)), `Asset conflict ${q.image}`);
    else fs.copyFileSync(src, dst, fs.constants.COPYFILE_EXCL);
  }
  const block = { id: BLOCK, name: 'Blok II.6', fullName: 'Cough, Dyspnea, and Cyanosis', exams: { 'cumex-1': { name: 'Cumex 1', types: {} } } };
  const types = block.exams['cumex-1'].types;
  for (const t of ['reguler', 'iup']) for (const p of plan.filter(p => p.type === t)) {
    const type = types[t] ||= { name: p.typeName, years: {} };
    (type.years[p.year] ||= []).push(p.question);
  }
  for (const t of Object.values(types)) for (const qs of Object.values(t.years)) qs.sort((a, b) => a.id - b.id);
  const output = '/* Generated by scripts/import-soal-blok2.6.mjs — do not edit by hand. */\n' +
    `QUESTION_DATA[${JSON.stringify(BLOCK)}] = ${JSON.stringify(block, null, 2)};\n`;
  const test = vm.createContext({ QUESTION_DATA: {} });
  vm.runInContext(output, test, { timeout: 2000 });
  assert(allQuestions(test.QUESTION_DATA[BLOCK]).length === plan.length, 'Post-generation count mismatch');
  if (fs.existsSync(targetFile) && fs.readFileSync(targetFile, 'utf8') === output) console.log('No change: data/blok2.6.js already up to date.');
  else { fs.writeFileSync(targetFile + '.tmp', output); fs.renameSync(targetFile + '.tmp', targetFile); console.log(`Wrote ${targetFile}`); }
}

if (args.has('--verify') || args.has('--apply')) {
  const published = allQuestions(loadPublished());
  assert(published.length === plan.length, `Published count ${published.length} != plan ${plan.length}`);
  for (const p of plan) {
    const q = published.find(x => x.importIdentity === p.question.importIdentity);
    assert(q && JSON.stringify(q) === JSON.stringify(p.question), `Mismatch ${p.question.importIdentity}`);
    if (q.image) assert(fs.existsSync(path.join(root, q.image)), `Missing asset ${q.image}`);
  }
  for (const f of ['quiz.html', 'dashboard.html']) assert(fs.readFileSync(path.join(root, f), 'utf8').includes('data/blok2.6.js'), `${f} does not load data/blok2.6.js`);
  console.log(`VERIFY OK: ${published.length} soal Blok II.6 published, ${published.filter(q => q.image).length} images present.`);
}
