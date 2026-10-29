/** Integration checks use isolated local fixtures and never alter the real bank. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const testRoot=fs.mkdtempSync(path.join(root,'tmp/blok25-integration-'));
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const fixture=name=>{
 const f=path.join(testRoot,name);fs.mkdirSync(path.join(f,'data'),{recursive:true});
 fs.mkdirSync(path.join(f,'scripts'),{recursive:true});fs.mkdirSync(path.join(f,'tmp/blok2.5'),{recursive:true});
 for(const name of ['import-soal-blok2.5.mjs','blok-ii-5-reviewed.tsv','blok-ii-5-review-map.json','blok-ii-5-image-review.json','blok-ii-5-reconstruction.tsv','blok-ii-5-reconstruction-references.json'])
  fs.copyFileSync(path.join(root,'scripts',name),path.join(f,'scripts',name));
 fs.copyFileSync(path.join(root,'data/cumex1-blok2.5.js'),path.join(f,'data/cumex1-blok2.5.js'));
 for(const name of ['lectures.json','inventory.json','raw-questions.json','image-manifest.json'])
  fs.copyFileSync(path.join(root,'tmp/blok2.5',name),path.join(f,'tmp/blok2.5',name));
 fs.cpSync(path.join(root,'tmp/blok2.5/images'),path.join(f,'tmp/blok2.5/images'),{recursive:true});
 return f;
};
const run=(f,...args)=>spawnSync(process.execPath,[path.join(f,'scripts/import-soal-blok2.5.mjs'),...args],{encoding:'utf8',timeout:15000});
const edit=(f,p,fn)=>{const file=path.join(f,p);const v=JSON.parse(fs.readFileSync(file,'utf8'));fn(v);fs.writeFileSync(file,JSON.stringify(v));};
const ok=(r)=>assert.equal(r.status,0,r.stderr||r.stdout);
const fail=(r,re)=>{assert.notEqual(r.status,0);assert.match(r.stderr,re);};
let passed=0;
const test=(name,fn)=>{fn();passed++;console.log('PASS',name);};
test('dry-run preserves original bank and creates no publication',()=>{
 const f=fixture('dry');const bank=path.join(f,'data/cumex1-blok2.5.js'),old=digest(bank);
 ok(run(f,'--dry-run'));assert.equal(digest(bank),old);assert(!fs.existsSync(path.join(f,'data/blok2.5-import.js')));
});
test('strict apply rejects unresolved sources without publishing',()=>{
 const f=fixture('strict');
 const file=path.join(f,'scripts/blok-ii-5-reconstruction.tsv');
 fs.writeFileSync(file,fs.readFileSync(file,'utf8').split(/\r?\n/).filter(l=>!l.startsWith('source_02:uas:16|')).join('\n'));
 fail(run(f,'--apply'),/unresolved source positions/);
 assert(!fs.existsSync(path.join(f,'data/blok2.5-import.js')));
});
test('full apply preserves 79 originals and is idempotent',()=>{
 const f=fixture('subset'),bank=path.join(f,'data/cumex1-blok2.5.js'),old=digest(bank);
 ok(run(f,'--apply'));const output=path.join(f,'data/blok2.5-import.js'),first=digest(output);
 ok(run(f,'--apply'));assert.equal(digest(output),first);assert.equal(digest(bank),old);ok(run(f,'--verify'));
 const plan=JSON.parse(fs.readFileSync(path.join(f,'tmp/blok2.5/dry-run.json')));
 assert.equal(plan.ready,397);assert.equal(plan.quarantined,0);assert.equal(plan.reconstructed,81);assert.equal(plan.replacements,19);
});

test('adding 100 reconstructions preserves every previously published question',()=>{
 const f=fixture('append'),file=path.join(f,'scripts/blok-ii-5-reconstruction.tsv'),full=fs.readFileSync(file,'utf8');
 const published=()=>{
  const c=vm.createContext({QUESTION_DATA:{}});
  for(const file of ['data/cumex1-blok2.5.js','data/blok2.5-import.js'])vm.runInContext(fs.readFileSync(path.join(f,file),'utf8'),c);
  return Object.values(c.QUESTION_DATA['blok-ii-5'].exams).flatMap(e=>Object.values(e.types).flatMap(t=>Object.values(t.years).flat()));
 };
 fs.writeFileSync(file,'# Reconstruction pending\n');ok(run(f,'--apply','--allow-quarantine'));
 const before=published();assert.equal(before.length,376);
 fs.writeFileSync(file,full);ok(run(f,'--apply'));const after=published();assert.equal(after.length,476);
 for(const q of before.filter(q=>q.importIdentity))assert.equal(JSON.stringify(after.find(n=>n.importIdentity===q.importIdentity)),JSON.stringify(q));
 const added=after.filter(q=>q.editorialStatus);assert.equal(added.length,100);
 assert(added.every(q=>q.answerProvenance==='ai-reconstructed'&&q.reconstructionNote&&!q.image));
});

test('confirmed cohort migration moves packages and changes only the year metadata',()=>{
 const f=fixture('cohorts');ok(run(f,'--apply'));
 const c=vm.createContext({QUESTION_DATA:{}});
 for(const file of ['data/cumex1-blok2.5.js','data/blok2.5-import.js'])vm.runInContext(fs.readFileSync(path.join(f,file),'utf8'),c);
 const before=JSON.parse(JSON.stringify(c.QUESTION_DATA['blok-ii-5']));
 const legacy=JSON.parse(JSON.stringify(before));
 for(const alias of legacy.packageAliases)for(const exam of alias.exams){
  const types=legacy.exams[exam].types;
  const qs=types[alias.to.type].years[alias.to.year];
  qs.forEach(q=>q.year=alias.from.year);
  types[alias.from.type]={name:alias.from.type,years:{[alias.from.year]:qs}};
  delete types[alias.to.type].years[alias.to.year];
  if(!Object.keys(types[alias.to.type].years).length)delete types[alias.to.type];
 }
 const target=path.join(f,'data/blok2.5-import.js');
 fs.writeFileSync(target,`QUESTION_DATA['blok-ii-5']=${JSON.stringify(legacy)};`);
 ok(run(f,'--apply','--verify'));
 const after=vm.createContext({QUESTION_DATA:{}});
 for(const file of ['data/cumex1-blok2.5.js','data/blok2.5-import.js'])vm.runInContext(fs.readFileSync(path.join(f,file),'utf8'),after);
 assert.equal(JSON.stringify(after.QUESTION_DATA['blok-ii-5']),JSON.stringify(before));
 // Cohort authorization must not allow a clinical change to hide in the move.
 legacy.exams.uas.types['arsip-acromion'].years['Tanpa-tahun'][0].question+=' changed';
 fs.writeFileSync(target,`QUESTION_DATA['blok-ii-5']=${JSON.stringify(legacy)};`);
 fail(run(f,'--apply'),/Conflicting published record/);
});

test('reconstruction without disclosure is rejected',()=>{
 const f=fixture('disclosure'),file=path.join(f,'scripts/blok-ii-5-reconstruction.tsv');
 const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);const i=lines.findIndex(l=>l.startsWith('source_02:uas:16|'));
 const cells=lines[i].split('|');cells[6]='';lines[i]=cells.join('|');fs.writeFileSync(file,lines.join('\n'));
 fail(run(f,'--apply'),/Missing reconstruction provenance/);
});

test('reconstruction cannot replace a previously accepted source position',()=>{
 const f=fixture('target'),file=path.join(f,'scripts/blok-ii-5-reconstruction.tsv');
 fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('source_02:uas:16|','source_02:uas:1|'));
 fail(run(f,'--apply'),/must target a quarantined position/);
});
test('missing source number fails completeness validation',()=>{
 const f=fixture('missing');edit(f,'tmp/blok2.5/raw-questions.json',v=>v.splice(v.findIndex(x=>x.sourceCode==='source_02'),1));
 fail(run(f,'--dry-run'),/Source completeness failure/);
});
test('missing clinical image blocks staging',()=>{
 const f=fixture('image');fs.unlinkSync(path.join(f,'tmp/blok2.5/images/final_examination_ii.5_q8.jpg'));
 fail(run(f,'--dry-run'),/Image absent/);
});
test('altered image requires new visual review',()=>{
 const f=fixture('tamper');fs.appendFileSync(path.join(f,'tmp/blok2.5/images/final_examination_ii.5_q8.jpg'),'tamper');
 fail(run(f,'--dry-run'),/Image needs visual QA/);
});
test('unknown lecture cannot enter staging',()=>{
 const f=fixture('lecture');const file=path.join(f,'scripts/blok-ii-5-reviewed.tsv');fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('tzdoedema|3.9|','tzdoedema|999.9|'));
 fail(run(f,'--dry-run'),/Unknown overview code/);
});
test('changed published content cannot be silently overwritten',()=>{
 const f=fixture('conflict');ok(run(f,'--apply','--allow-quarantine'));
 const p=path.join(f,'scripts/blok-ii-5-reviewed.tsv');fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('Pasien DM tipe 2 mengalami edema perifer','Pasien DM tipe 2 mengalami perubahan edema perifer'));
 const output=path.join(f,'data/blok2.5-import.js'),old=digest(output);
 fail(run(f,'--apply','--allow-quarantine'),/Conflicting published record/);assert.equal(digest(output),old);
});
console.log(`${passed} integration checks passed. Fixtures: ${testRoot}`);
