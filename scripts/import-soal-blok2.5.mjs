/**
 * Local, append-only Blok II.5 importer. No credentials, network, or Supabase writes.
 * --dry-run (default): prepare and validate, print counts and three samples.
 * --apply: publish only when every source position is resolved.
 * --apply --allow-quarantine: publish the reviewed subset ONLY with user authorization.
 * --verify: validate the previously published import and unchanged original bank.
 * Inputs are extracted using the companion Python scripts documented in the report.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const work = path.join(root, 'tmp/blok2.5');
const scripts = path.join(root, 'scripts');
const baseFile = path.join(root, 'data/cumex1-blok2.5.js');
const targetFile = path.join(root, 'data/blok2.5-import.js');
const args = new Set(process.argv.slice(2));
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const save = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const baseBytes = fs.readFileSync(baseFile);
const context = vm.createContext({ QUESTION_DATA: {} });
vm.runInContext(baseBytes.toString('utf8'), context, { timeout: 2000 });
const original = JSON.parse(JSON.stringify(context.QUESTION_DATA['blok-ii-5']));

const originalQuestions = b => Object.values(b.exams).flatMap(e =>
  Object.values(e.types).flatMap(t => Object.values(t.years).flat()));
assert(originalQuestions(original).length === 79, 'Expected original bank of 79 questions; re-audit changed bank.');
const baselinePath = path.join(work, 'original-bank-backup.json');
if (!fs.existsSync(baselinePath)) save(baselinePath, { sha256: hash(baseBytes), block: original });
const baseline = read(baselinePath);
assert(baseline.sha256 === hash(baseBytes), 'Original bank changed since staging; re-audit before proceeding.');

const titles = read(path.join(work, 'lectures.json'));
const inventory = read(path.join(work, 'inventory.json'));
const corpus = read(path.join(work, 'raw-questions.json'));
const mappings = read(path.join(scripts, 'blok-ii-5-review-map.json'));
const imageManifest = read(path.join(work, 'image-manifest.json'));
const imageReviews = read(path.join(scripts, 'blok-ii-5-image-review.json'));
const templates = new Map();
for (const line of fs.readFileSync(path.join(scripts, 'blok-ii-5-reviewed.tsv'), 'utf8').split(/\r?\n/)) {
  if (!line || line.startsWith('#')) continue;
  const cells = line.split('|');
  assert(cells.length === 5, `Invalid editorial row: ${cells[0]}`);
  const [key, lectureCode, question, opts, explanation] = cells;
  assert(!templates.has(key), `Duplicate template ${key}`);
  assert(titles[lectureCode], `Unknown overview code ${lectureCode}`);
  templates.set(key, { lecture: titles[lectureCode], question, options: opts.split('~'), explanation });
}

// User-authorized reconstructions override only the previously quarantined positions.
// The original decision and raw text remain in the audit; no uncertain image is reused.
const reconstructions = new Map();
for (const line of fs.readFileSync(path.join(scripts, 'blok-ii-5-reconstruction.tsv'), 'utf8').split(/\r?\n/)) {
  if (!line || line.startsWith('#')) continue;
  const cells = line.split('|');
  assert(cells.length === 7, `Invalid reconstruction row: ${cells[0]}`);
  const [location, lectureCode, kind, question, opts, explanation, note] = cells;
  assert(!reconstructions.has(location), `Duplicate reconstruction ${location}`);
  assert(titles[lectureCode], `Unknown overview code ${lectureCode}`);
  assert(['adapted','replacement'].includes(kind) && note.trim(), `Missing reconstruction provenance ${location}`);
  const [source,exam,id] = location.split(':');
  assert(mappings[`${source}:${exam}`]?.[Number(id)-1]?.startsWith('!'), `Reconstruction must target a quarantined position: ${location}`);
  assert(corpus.filter(r=>r.sourceCode===source && r.exam===exam && r.id===Number(id)).length===1, `Reconstruction source absent or ambiguous: ${location}`);
  reconstructions.set(location, { kind, note, template:{lecture:titles[lectureCode],question,options:opts.split('~'),explanation} });
}
const reconstructionReferences = read(path.join(scripts, 'blok-ii-5-reconstruction-references.json'));

// Cohort mapping explicitly confirmed by the user: Acromion = Reguler 2023,
// Lakrawiyasa = IUP 2023. Keep the document name as source provenance.
const packageFor = {
  source_02: ['reguler', 'Reguler', '2023'],
  source_03: ['reguler', 'Reguler', '2023'],
  source_05: ['iup', 'IUP', '2023'],
  source_06: ['iup', 'IUP', '2022'],
  source_07: ['iup', 'IUP', '2022'],
  source_08: ['iup', 'IUP', '2021'],
  source_10: ['iup', 'IUP', '2023'],
};
const packageAliases = [
  {exams:['cumex-2','uas'],from:{type:'arsip-acromion',year:'Tanpa-tahun'},to:{type:'reguler',year:'2023'}},
  {exams:['cumex-2','uas'],from:{type:'arsip-lakrawiyasa',year:'Tanpa-tahun'},to:{type:'iup',year:'2023'}},
];
const examNames = { 'cumex-1': 'Cumex 1', 'cumex-2': 'Cumex 2', uas: 'UAS' };
const expected = {
  'source_01:cumex-1':18, 'source_02:uas':47, 'source_03:cumex-2':48,
  'source_04:cumex-1':21, 'source_05:uas':46, 'source_06:cumex-2':55,
  'source_07:uas':47, 'source_08:cumex-1':21, 'source_08:cumex-2':38,
  'source_08:uas':42, 'source_09:cumex-1':20, 'source_10:cumex-2':74,
};
for (const [group, n] of Object.entries(expected)) {
  const rs = corpus.filter(r => `${r.sourceCode}:${r.exam}` === group);
  assert(rs.length === n, `Source completeness failure ${group}: ${rs.length}/${n}`);
  if (group !== 'source_04:cumex-1') {
    assert(rs.every((r, i) => r.id === i+1), `Source numbering gap/duplicate ${group}`);
  } else {
    assert(rs.map(r => r.id).join(',') === [1,...Array.from({length:20},(_,i)=>i+1)].join(','),
      'Recheck the genuine duplicated #1 and empty #20 in source_04.');
  }
  if (mappings[group]) assert(mappings[group].length === n, `Missing editorial positions ${group}`);
}
assert(corpus.length === Object.values(expected).reduce((a,b)=>a+b,0), 'Unaccounted source group.');

function validateQuestion(q, location) {
  assert(q.question?.trim() && q.explanation?.trim(), `Empty question/explanation ${location}`);
  assert(q.options.length === 5 && new Set(q.options.map(x=>x.toLowerCase().trim())).size === 5,
    `Expected five distinct options ${location}`);
  assert(Number.isInteger(q.correctAnswer) && q.correctAnswer >= 0 && q.correctAnswer < 5,
    `Invalid answer index ${location}`);
  assert(Object.values(titles).includes(q.lecture), `Non-overview lecture ${location}`);
  if (q.editorialStatus) {
    assert(['ai-reconstructed','ai-replacement'].includes(q.editorialStatus) && q.reconstructionNote?.trim(), `Missing reconstruction provenance ${location}`);
    assert(!q.image, `Reconstructed text must not reuse an unverified image ${location}`);
  }
  assert(q.options.every(o => o.trim() && !/^[A-Ea-e][.)\s]\s*|[()*]|<\/?(?:b|strong|mark)\b|[✓✔★]/.test(o)),
    `Answer marker, option prefix or parentheses ${location}`);
  const refs = [...q.question.matchAll(/\[Perhatikan gambar ([^\]]+)\]/g)];
  assert(refs.length === (q.image ? 1 : 0), `Image placeholder mismatch ${location}`);
  if (q.image) {
    assert(refs[0][1] === path.basename(q.image), `Image filename mismatch ${location}`);
    assert(q.image.startsWith('assets/questions/blok2.5-import/'), 'Unsafe asset path');
    const local = path.join(work, 'images', path.basename(q.image));
    assert(fs.existsSync(local), `Image absent ${local}`);
    const review = imageReviews[location];
    assert(review?.verified && review.sha256 === hash(fs.readFileSync(local)), `Image needs visual QA ${location}`);
  }
}

const audit = [], ready = [], identities = new Set();
for (const record of corpus) {
  const group = `${record.sourceCode}:${record.exam}`;
  const identity = `${group}:${record.id}:${record.occurrence}`;
  assert(!identities.has(identity), `Duplicate source identity ${identity}`);
  identities.add(identity);
  const provenance = { ...record, identity };
  if (!mappings[group]) {
    // Existing data is deliberately preserved, not silently revalidated or re-keyed.
    audit.push({ ...provenance, status:'preserved_existing', note:
      record.sourceCode === 'source_04' ? 'Preserved entire 2022 bank; source has duplicate #1 and blank #20, requiring separate reconciliation.' : 'Existing Cumex 1 bank preserved by user instruction.' });
    continue;
  }
  const decision = mappings[group][record.id-1];
  const location = `${group}:${record.id}`;
  const reconstruction = reconstructions.get(location);
  if (decision.startsWith('!') && !reconstruction) {
    audit.push({ ...provenance, status:'quarantined', reason:decision.slice(1) });
    continue;
  }
  const template = reconstruction?.template || templates.get(decision);
  assert(template, `Missing clinical adaptation ${decision}`);
  const q = JSON.parse(JSON.stringify(template));
  const [typeId, typeName, year] = packageFor[record.sourceCode];
  Object.assign(q, { id:record.id, year:/^\d{4}$/.test(year) ? Number(year) : year,
    source:record.sourceFile, sourceCode:record.sourceCode, sourceNumber:record.id,
    sourcePage:record.page, importIdentity:identity, sourceSha256:inventory.find(x=>x.code===record.sourceCode).sha256,
    image:'' });
  // Stable option rotation keeps answer indices reproducible while avoiding a fixed correct slot.
  const rotation = parseInt(hash(identity).slice(0,8),16)%5;
  q.options = q.options.slice(rotation).concat(q.options.slice(0,rotation));
  q.correctAnswer = (5-rotation)%5;
  if (reconstruction) {
    q.editorialStatus = reconstruction.kind === 'replacement' ? 'ai-replacement' : 'ai-reconstructed';
    q.reconstructionNote = reconstruction.note;
  }
  const image = !reconstruction && imageManifest.find(im => im.sourceCode===record.sourceCode && im.exam===record.exam && im.id===record.id);
  if (image) {
    q.image = `assets/questions/blok2.5-import/${image.file}`;
    q.question = `[Perhatikan gambar ${image.file}]\n${q.question}`;
  }
  validateQuestion(q, location);
  const sourceKey = record.raw.match(/Answer:\s*([A-Ea-e])(?:\.|\b)/)?.[1]?.toUpperCase() || null;
  const flags = ['Skenario dan opsi diadaptasi AI; rincian yang ditambahkan bukan kutipan kasus asli.'];
  if (reconstruction) flags.push('kunci rekonstruksi ditentukan AI; penanda kunci lama tidak dipakai otomatis.', reconstruction.note);
  else if (!sourceKey) flags.push('kunci ditentukan AI');
  else flags.push('Kunci sumber diperiksa terhadap konsep; indeks opsi dirotasi ulang.');
  if (record.sourceCode==='source_10' && [16,30,33,52].includes(record.id)) flags.push('Kunci atau teks jawaban sumber dikoreksi; lihat catatan konflik.');
  const originalOptionCount = (record.raw.match(/(?:^|\n)\s*[A-Ea-e]\.\s+/g)||[]).length;
  if (originalOptionCount < 5) flags.push(`Distraktor dilengkapi dari ${originalOptionCount} opsi terbaca menjadi 5.`);
  q.answerProvenance = reconstruction ? 'ai-reconstructed' : sourceKey ? 'source-key-reviewed-by-ai' : 'ai-inferred';
  audit.push({ ...provenance, status:'ready', template:reconstruction ? location : decision, originalAnswerLetter:sourceKey,
    ...(reconstruction ? {originalIssue:decision.slice(1), reconstructionKind:reconstruction.kind, reconstructionNote:reconstruction.note} : {}),
    originalOptionCount, flags, package:{exam:record.exam,typeId,typeName,year}, question:q });
  ready.push({ exam:record.exam, typeId, typeName, year, question:q });
}

const counts = {};
for (const a of audit) {
  const k=`${a.sourceCode}:${a.exam}`;
  const c=counts[k] ||= {file:a.sourceFile,total:0,ready:0,preserved_existing:0,quarantined:0};
  c.total++; c[a.status]++;
}
const quarantine = audit.filter(a=>a.status==='quarantined');
const lectures = {};
for (const {question:q} of ready) lectures[q.lecture]=(lectures[q.lecture]||0)+1;
const summary = { extractedPositions:audit.length, preservedOriginalQuestions:79,
  ready:ready.length, quarantined:quarantine.length, images:ready.filter(r=>r.question.image).length,
  aiInferredKeys:ready.filter(r=>r.question.answerProvenance.startsWith('ai-')).length,
  reconstructed:ready.filter(r=>r.question.editorialStatus==='ai-reconstructed').length,
  replacements:ready.filter(r=>r.question.editorialStatus==='ai-replacement').length, counts, lectures,
  planSha256:hash(JSON.stringify(ready)), originalBankSha256:hash(baseBytes) };
summary.existingMissingImages = originalQuestions(original).filter(q=>q.sourceImage).map(q=>({source:q.source,id:q.id,year:q.year,file:q.sourceImage}));
save(path.join(work,'staged.json'),ready);
save(path.join(work,'audit.json'),audit);
save(path.join(work,'dry-run.json'),summary);
save(path.join(work,'quarantine.json'),quarantine);

const report = ['# Blok II.5 — laporan impor', '',
  `Status: ${ready.length} siap; ${quarantine.length} ditahan; 79 soal lama dipertahankan.`,
  `Posisi nomor sumber: ${audit.length}. Jumlah termasuk #20 kosong dan dua #1 pada source_04.`,
  'Semua file merupakan rekap ujian; tidak ada materi kuliah terpisah dalam ZIP. Overview berisi 48 judul.',
  'Pemetaan dikonfirmasi pengguna: Acromion = Reguler 2023; Lakrawiyasa = IUP 2023. Nama dokumen asli tetap tersimpan sebagai sumber.',
  'Tautan dan progres dengan nama arsip lama tetap dikenali melalui alias paket; kartu dashboard memakai kelas dan tahun yang benar.', '',
  '| Sumber | Ujian | Posisi | Siap | Cakupan lama | Ditahan |', '|---|---|---:|---:|---:|---:|',
  ...Object.entries(counts).map(([k,c])=>`| ${k}: ${c.file} | ${k.split(':')[1]} | ${c.total} | ${c.ready} | ${c.preserved_existing} | ${c.quarantined} |`),
  '', '## Paket setelah koreksi angkatan', '',
  '| Ujian | Kelas | Tahun | Soal tambahan |', '|---|---|---|---:|',
  ...Object.entries(ready.reduce((acc,r)=>{const key=`${examNames[r.exam]} | ${r.typeName} | ${r.year}`;acc[key]=(acc[key]||0)+1;return acc;},{})).map(([k,n])=>`| ${k} | ${n} |`),
  '', '## Distribusi lecture baru', '', ...Object.entries(lectures).map(([l,n])=>`- ${l}: ${n}`),
  '', '## Catatan sumber dan adaptasi', '',
  '- Seluruh adaptasi baru ditulis/diperiksa AI, bukan dinyatakan telah ditelaah pakar medis.',
  '- Audit JSON menyimpan nomor dan halaman, batang sumber, opsi terbaca, asal kunci, serta catatan perubahan setiap soal.',
  '- Source_04 memakai #1 dua kali dan #20 kosong. Seluruh bank lama 2022 dipertahankan; nomor tidak diam-diam direkonsiliasi.',
  '- Source_10 #16 memuat jawaban tersalin tentang sintesis tiroid; adaptasi memakai latihan dasar panggul.',
  '- Source_10 #30 memberi kunci paru untuk ensefalopati uremik; adaptasi memakai otak.',
  '- Source_10 #33 memberi fibrat pada TG 450 dan LDL 160; adaptasi menilai prioritas risiko ASCVD/statin.',
  '- Source_10 #52 menyebut ACR 256 sebagai makroalbuminuria; adaptasi memakai A2.',
  '- Foto ulkus tidak membuktikan perfusi; skenario adaptasi menyatakan temuan perfusi sebagai informasi tambahan.',
  '- Soal gagal napas, PTH, dan glukosa yang tumpang tindih ditelusuri per nomor; duplikasi konsep pada sumber tidak menghapus nomor.',
  '- Rincian kasus dan opsi adaptasi dapat berbeda dari redaksi asli; batang asli tetap tersedia dalam audit.json.',
  `- Rekonstruksi disetujui pengguna: ${summary.reconstructed} adaptasi dan ${summary.replacements} soal pengganti; bukan klaim pemulihan redaksi asli. Label terlihat di halaman kuis.`,
  '- Source_07 #4 membedakan analog kerja cepat lispro dari insulin regular kerja pendek.',
  '', '## Enam rujukan gambar lama yang tetap belum tersedia', '',
  ...summary.existingMissingImages.map(q=>`- ${q.source} #${q.id}: ${q.file}`),
  '', '## Gambar siap', '', ...ready.filter(r=>r.question.image).map(r=>`- ${r.question.importIdentity}: ${r.question.image}`),
  '', '## Ditahan — informasi sumber belum memadai', '', ...quarantine.map(a=>`- ${a.identity} (halaman ${a.page??'?'}): ${a.reason}`),
  ...(!quarantine.length ? ['Tidak ada lagi nomor baru yang ditahan. Nomor kosong atau gambar tidak dapat dipulihkan diisi soal pengganti berlabel.'] : []),
  '', '## Rekonstruksi dan soal pengganti', '',
  ...audit.filter(a=>a.reconstructionKind).map(a=>`- ${a.identity} — ${a.reconstructionKind==='replacement'?'PENGGANTI':'REKONSTRUKSI'}: ${a.reconstructionNote} Masalah asli: ${a.originalIssue}`),
  '', '## Rujukan tambahan rekonstruksi', '',
  ...reconstructionReferences.map(r=>`- [${r.title}](${r.url}) — ${r.scope}`),
  '', '## Kunci AI dan distraktor', '',
  ...audit.filter(a=>a.status==='ready').map(a=>`- ${a.identity}: ${a.flags.join(' ')}`),
  '', '## Rujukan pemeriksaan klinis', '',
  '- [KDIGO 2024](https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf)',
  '- [ADA 2026: diagnosis](https://doi.org/10.2337/dc26-s002)',
  '- [ADA 2026: risiko kardiovaskular dan lipid](https://doi.org/10.2337/dc26-s010)',
  '- [Konsensus krisis hiperglikemia 2024](https://diabetesjournals.org/care/article/47/8/1257/156811/Hyperglycemic-Crises-in-Adults-With-Diabetes-A)',
  '- [WHO filariasis](https://www.who.int/news-room/fact-sheets/detail/lymphatic-filariasis)',
  '- [CDC DPDx](https://www.cdc.gov/dpdx/lymphaticfilariasis/)',
  '- [AAP tekanan darah anak](https://publications.aap.org/pediatrics/article/140/3/e20171904/38358)',
  '- [NICE cairan IV](https://www.nice.org.uk/guidance/cg174/chapter/Recommendations)',
  '', '## Menjalankan ulang', '',
  'Gunakan Python dengan PyMuPDF dan Pillow tersedia. Paket lokal sementara ada di tmp/blok2.5/python-packages.',
  '```powershell', 'python scripts/extract-blok-ii-5.py', 'python scripts/prepare-blok-ii-5-staging.py',
  'python scripts/extract-blok-ii-5-lectures.py', 'python scripts/extract-blok-ii-5-question-images.py',
  'node scripts/import-soal-blok2.5.mjs --dry-run',
  'node scripts/import-soal-blok2.5.mjs --apply',
  '# --apply gagal jika ada karantina. --allow-quarantine hanya setelah pengguna menyetujui subset.',
  'node scripts/import-soal-blok2.5.mjs --verify', '```',
  'Penerbitan awal mencakup 297 soal. Pengguna kemudian mengizinkan rekonstruksi dan pemasukan seluruh 100 nomor tertahan. Jalankan --apply tanpa pengecualian karantina untuk rencana lengkap ini.',
  'Jika ekstraksi gambar dijalankan ulang, checksum dan verifikasi visual wajib cocok. Tidak ada secret baru atau penulisan Supabase.',
  '', `Plan SHA-256: ${summary.planSha256}`, `Original bank SHA-256: ${summary.originalBankSha256}`,
];
fs.writeFileSync(path.join(work,'REPORT.md'),report.join('\n')+'\n');
console.table(counts);
console.log(JSON.stringify({ extracted:summary.extractedPositions, ready:summary.ready,
  quarantined:summary.quarantined, images:summary.images, originalQuestions:79,
  aiInferredKeys:summary.aiInferredKeys, planSha256:summary.planSha256 },null,2));
console.log('Per lecture:', JSON.stringify(lectures));
for (const item of ready.slice(0,3)) console.log('Sample:', item.question.question,
  '\nOptions:', item.question.options.join(' | '), '\nAnswer index:', item.question.correctAnswer,
  '\nExplanation:', item.question.explanation);

function loadPublished() {
  const ctx=vm.createContext({QUESTION_DATA:{'blok-ii-5':JSON.parse(JSON.stringify(original))}});
  if (fs.existsSync(targetFile)) vm.runInContext(fs.readFileSync(targetFile,'utf8'),ctx,{timeout:2000});
  return JSON.parse(JSON.stringify(ctx.QUESTION_DATA['blok-ii-5']));
}

if (args.has('--apply')) {
  assert(!quarantine.length || args.has('--allow-quarantine'),
    `${quarantine.length} unresolved source positions. Publication blocked; inspect REPORT.md. Explicit approval is required to publish only the ready subset.`);
  const before=loadPublished();
  const existingImports=originalQuestions(before).filter(q=>q.importIdentity);
  const newIds=new Set(ready.map(r=>r.question.importIdentity));
  // Do not silently remove prior imported records when the editorial map changes.
  assert(existingImports.every(q=>newIds.has(q.importIdentity)), 'Previously published rows absent from current plan. Refusing deletion.');
  const batches={};
  for (const item of ready) {
    const {exam,typeId,typeName,year,question:q}=item;
    const bucket=before.exams[exam]?.types?.[typeId]?.years?.[year]||[];
    const previous=existingImports.find(p=>p.importIdentity===q.importIdentity);
    if(previous) {
      // Only the user-confirmed cohort metadata may change. Content stays exact,
      // including IDs, option order, answer, source and reconstruction disclosure.
      const comparable={...previous};
      const alias=packageAliases.find(a=>a.exams.includes(exam)&&a.to.type===typeId&&a.to.year===year);
      if(alias && previous.year===alias.from.year && q.year===Number(alias.to.year)) {
        const oldBucket=before.exams[exam]?.types?.[alias.from.type]?.years?.[alias.from.year]||[];
        assert(oldBucket.some(p=>p.importIdentity===q.importIdentity), `Unexpected cohort migration ${q.importIdentity}`);
        comparable.year=q.year;
      }
      assert(JSON.stringify(comparable)===JSON.stringify(q), `Conflicting published record ${q.importIdentity}; no overwrite allowed.`);
    }
    assert(!bucket.some(p=>p.id===q.id && p.importIdentity!==q.importIdentity), `Question number collision ${exam}/${typeId}/${year}/${q.id}`);
    const key=`${exam}:${typeId}:${year}`;
    (batches[key] ||= {exam,typeId,typeName,year,questions:[]}).questions.push(q);
  }
  const assetRoot=path.join(root,'assets/questions/blok2.5-import');
  fs.mkdirSync(assetRoot,{recursive:true});
  for(const {question:q} of ready.filter(r=>r.question.image)) {
    const src=path.join(work,'images',path.basename(q.image)), dst=path.join(root,q.image);
    if(fs.existsSync(dst)) assert(hash(fs.readFileSync(src))===hash(fs.readFileSync(dst)), `Asset conflict ${q.image}`);
    else fs.copyFileSync(src,dst,fs.constants.COPYFILE_EXCL);
  }
  const output='/* Generated by scripts/import-soal-blok2.5.mjs; append-only source imports. */\n'+
    '(function () {\n  const block = QUESTION_DATA["blok-ii-5"];\n  if (!block) throw new Error("Load original Blok II.5 bank first");\n'+
    `  block.packageAliases = ${JSON.stringify(packageAliases)};\n`+
    `  const batches = ${JSON.stringify(Object.values(batches),null,2)};\n`+
    '  for (const batch of batches) {\n'+
    '    const exam = block.exams[batch.exam] ||= { name: ({"cumex-2":"Cumex 2","uas":"UAS"})[batch.exam], types: {} };\n'+
    '    const type = exam.types[batch.typeId] ||= { name: batch.typeName, years: {} };\n'+
    '    const questions = type.years[batch.year] ||= [];\n'+
    '    for (const q of batch.questions) {\n'+
    '      const old = questions.find(p => p.importIdentity === q.importIdentity);\n'+
    '      if (old) { if (JSON.stringify(old) !== JSON.stringify(q)) throw new Error("Conflicting import: " + q.importIdentity); continue; }\n'+
    '      if (questions.some(p => p.id === q.id)) throw new Error("Source number collision: " + q.id);\n'+
    '      questions.push(q);\n    }\n    questions.sort((a,b)=>a.id-b.id);\n  }\n})();\n';
  // Validate generated JS in memory before committing the file.
  const test=vm.createContext({QUESTION_DATA:{'blok-ii-5':JSON.parse(JSON.stringify(original))}});
  vm.runInContext(output,test,{timeout:2000});
  const snapshot=JSON.stringify(test.QUESTION_DATA);
  vm.runInContext(output,test,{timeout:2000});
  assert(JSON.stringify(test.QUESTION_DATA)===snapshot,'Generated module is not idempotent');
  assert(originalQuestions(test.QUESTION_DATA['blok-ii-5']).length===79+ready.length,'Post-insert count mismatch');
  fs.writeFileSync(targetFile+'.tmp',output);
  fs.renameSync(targetFile+'.tmp',targetFile);
  save(path.join(work,'applied.json'),{...summary,allowQuarantine:args.has('--allow-quarantine'),importFileSha256:hash(output),at:new Date().toISOString()});
  console.log(`Published ${ready.length} additive questions. Original 79 unchanged.`);
}

if(args.has('--verify')||args.has('--apply')) {
  assert(fs.existsSync(targetFile),'No published import module yet.');
  const final=loadPublished();
  const questions=originalQuestions(final);
  assert(questions.length===79+ready.length,'Published count mismatch');
  for (const item of ready) {
    const actual=final.exams[item.exam]?.types?.[item.typeId]?.years?.[item.year]?.find(q=>q.importIdentity===item.question.importIdentity);
    assert(actual && JSON.stringify(actual)===JSON.stringify(item.question), `Published package/content mismatch ${item.question.importIdentity}`);
  }
  for(const alias of packageAliases)for(const exam of alias.exams)assert(!final.exams[exam]?.types?.[alias.from.type], `Obsolete archive package ${exam}/${alias.from.type}`);
  for (const q of questions.filter(q=>q.importIdentity)) {
    validateQuestion(q,`${q.sourceCode}:${q.importIdentity.split(':')[1]}:${q.sourceNumber}`);
    if(q.image) assert(fs.existsSync(path.join(root,q.image)),`Published asset absent ${q.image}`);
  }
  for(const [exam,e] of Object.entries(original.exams)) for(const [type,t] of Object.entries(e.types)) for(const [year,qs] of Object.entries(t.years)) {
    assert(JSON.stringify(final.exams[exam].types[type].years[year])===JSON.stringify(qs),`Original package changed ${exam}/${type}/${year}`);
  }
  console.log(`VERIFY OK: ${questions.length} total; 79 original byte-equivalent; ${ready.length} imported.`);
}

if (args.has('--write-report')) {
  assert(args.has('--verify') || args.has('--apply'), '--write-report requires successful --verify or --apply.');
  const folder=path.join(root,'docs');fs.mkdirSync(folder,{recursive:true});
  const reportPath=path.join(folder,'blok-ii-5-import-report.md');
  const intro=[
    '# Hasil penerbitan Blok II.5 — 29 Oktober 2026', '',
    `${ready.length} soal baru telah masuk ke bank soal proyek; total ${79+ready.length} soal. Deployment hosting terpisah dari verifikasi lokal ini.`,
    'Acromion = Reguler 2023; Lakrawiyasa = IUP 2023, berdasarkan konfirmasi pengguna. Nama dokumen sumber tidak diubah.',
    `Cumex 1: 79 soal lama tidak berubah. Cumex 2: ${ready.filter(r=>r.exam==='cumex-2').length} soal baru. UAS: ${ready.filter(r=>r.exam==='uas').length} soal baru.`,
    `Tambahan terakhir: ${summary.reconstructed} rekonstruksi dan ${summary.replacements} soal pengganti berlabel. Tersisa ${quarantine.length} soal ditahan.`,
    `Terdapat ${summary.aiInferredKeys} kunci yang ditentukan AI dan ${ready.length-summary.aiInferredKeys} adaptasi dengan penanda kunci eksplisit di sumber.`,
    'Seluruh adaptasi AI dan penambahan rincian klinis tercatat; hasil ini tidak dinyatakan sudah ditelaah pakar.',
    '', '## Verifikasi', '',
    '- Dua belas uji integrasi lulus: hitung sumber, idempotensi, perlindungan isi soal lama, lecture, gambar, konflik, metadata rekonstruksi, dan migrasi angkatan.',
    '- Uji browser lulus pada 12 paket, sembilan gambar, 81 rekonstruksi, 19 pengganti, pemetaan progres lama, penyimpanan ulang progres, dan tampilan lebar 390 piksel. Hasil tersimpan di tmp/blok2.5/browser/result.json.',
    '- Autentikasi dan progres dimock pada uji browser; tidak ada penulisan ke Supabase saat pengujian.',
    '- Nomor sumber dipertahankan, termasuk nomor kosong yang kini diberi soal pengganti berlabel; tidak ada klaim bahwa redaksi aslinya telah dipulihkan.',
    '- Penambahan soal tidak menggeser jawaban lama: progres rilis 297 soal dipetakan ke identitas sumber dan jumlah soal dashboard diperbarui.',
    '- Empat tautan arsip lama diarahkan ke paket 2023; progres lama dibaca sebagai fallback, urutan opsi tetap sama, dan dashboard menghindari hitungan ganda.',
    '- Enam gambar yang sudah hilang pada bank lama tetap belum tersedia karena 79 soal lama dipertahankan.',
    '', '## Perintah untuk mengulang', '',
    'Jalankan dari folder JStudyC:', '', '```powershell',
    'node scripts/import-soal-blok2.5.mjs --dry-run',
    'node scripts/import-soal-blok2.5.mjs --apply',
    'node scripts/import-soal-blok2.5.mjs --verify --write-report',
    'node scripts/test-import-soal-blok2.5.mjs',
    'node scripts/smoke-blok-ii-5.cjs', '```',
    'PyMuPDF dan Pillow diperlukan hanya untuk ekstraksi ulang. Corpus, staging, backup bank lama, dan dependensi sementara ada di tmp/blok2.5 dan diabaikan Git.',
    'Python bawaan tersedia di $env:USERPROFILE\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe.',
    '', '---', '',
  ].join('\n');
  fs.writeFileSync(reportPath,intro+fs.readFileSync(path.join(work,'REPORT.md'),'utf8'));
  const status=spawnSync('git',['status','--short'],{cwd:root,encoding:'utf8'});
  assert(status.status===0,'Unable to record git status.');
  fs.appendFileSync(reportPath,'\n## Git status saat verifikasi\n\n```text\n'+status.stdout+'```\n');
  console.log(`Report written: ${reportPath}`);
}
