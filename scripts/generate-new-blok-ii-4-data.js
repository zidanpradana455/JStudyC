const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(appRoot, '..');
const bankSoalDir = path.join(workspaceRoot, 'Bank Soal');

// ═══════════════════════════════════════════════════════════
// 1. Cumex 2 IUP — from rekap_cumex_2_gabungan.json
// ═══════════════════════════════════════════════════════════
const cumex2SourcePath = path.join(bankSoalDir, 'rekap_cumex_2_gabungan.json');
const cumex2Source = JSON.parse(fs.readFileSync(cumex2SourcePath, 'utf8'));

function normalizeCumex2Questions(items) {
  return items
    .filter(q => {
      const opts = q.options || [];
      if (opts.length < 2) return false;
      // answer must be a single letter matching an option label
      if (!q.answer || typeof q.answer !== 'string') return false;
      const answerLetter = q.answer.trim().toLowerCase();
      return opts.some(o => o.label && o.label.trim().toLowerCase() === answerLetter);
    })
    .map((q, idx) => {
      const options = q.options.map(o => o.text);
      const answerLetter = q.answer.trim().toLowerCase();
      const correctIndex = q.options.findIndex(
        o => o.label && o.label.trim().toLowerCase() === answerLetter
      );

      // Build explanation from available fields
      let explanation = '';
      if (q.discussion) explanation = q.discussion;
      else if (q.note) explanation = q.note;
      if (q.source && !explanation.includes(q.source)) {
        explanation = explanation
          ? `${explanation}\n\nSource: ${q.source}`
          : `Source: ${q.source}`;
      }

      return {
        id: idx + 1,
        question: q.question,
        image: '',
        options,
        correctAnswer: correctIndex >= 0 ? correctIndex : 0,
        explanation,
      };
    });
}

const cumex2Iup2022 = normalizeCumex2Questions(cumex2Source.batch_2022_iup);
const cumex2Iup2023 = normalizeCumex2Questions(cumex2Source.batch_2023_pd);

const cumex2IupOutput = [
  '/* JStudyC Blok II.4 Cumex 2 IUP Question Data - generated from Bank Soal/rekap_cumex_2_gabungan.json */',
  'QUESTION_DATA["blok-ii-4"].exams["cumex-2"].types["iup"] = {',
  '  "name": "IUP",',
  `  "years": ${JSON.stringify({ '2022': cumex2Iup2022, '2023': cumex2Iup2023 }, null, 2).replace(/^/gm, '  ').trim()}`,
  '};',
  '',
].join('\n');

const cumex2IupOutputPath = path.join(appRoot, 'data', 'cumex2-iup-blok2.4.js');
fs.writeFileSync(cumex2IupOutputPath, cumex2IupOutput);

console.log(`✅ Generated: ${path.relative(workspaceRoot, cumex2IupOutputPath)}`);
console.log(`   Cumex 2 IUP 2022: ${cumex2Iup2022.length} questions (filtered from ${cumex2Source.batch_2022_iup.length})`);
console.log(`   Cumex 2 IUP 2023: ${cumex2Iup2023.length} questions (filtered from ${cumex2Source.batch_2023_pd.length})`);

// ═══════════════════════════════════════════════════════════
// 2. UAS Reguler — from uas_blok2.4.json
// ═══════════════════════════════════════════════════════════
const uasRegSourcePath = path.join(bankSoalDir, 'uas_blok2.4.json');
const uasRegSource = JSON.parse(fs.readFileSync(uasRegSourcePath, 'utf8'));

// Format already matches — just pass through
const uasReg2022 = uasRegSource.uas_reguler_2022;
const uasReg2023 = uasRegSource.uas_reguler_2023;

// ═══════════════════════════════════════════════════════════
// 3. UAS IUP — from Rekap_Soal_UAS_II.4_2022_2023.json
// ═══════════════════════════════════════════════════════════
const uasIupSourcePath = path.join(bankSoalDir, 'Rekap_Soal_UAS_II.4_2022_2023.json');
const uasIupSource = JSON.parse(fs.readFileSync(uasIupSourcePath, 'utf8'));

// Split based on image file analysis:
// - Items id 1-43 (indices 0-42) = UAS IUP 2023
// - Items id 44-79 (indices 43-78) = UAS IUP 2022
// Verified by image name offsets: id 10 → uas2.4_iup_2023_q10 (10-10=0),
// id 56 → uas2.4_iup_2022_q13 (56-43=13), id 58 → q15 (58-43=15), etc.

const uasIupAssetDir = 'assets/questions/uas-blok2.4-iup';
fs.mkdirSync(path.join(appRoot, uasIupAssetDir), { recursive: true });

function processUasIupBatch(items, startId) {
  return items.map((q, idx) => {
    const normalized = { ...q, id: idx + 1 };

    // Handle images — copy if exists
    if (normalized.image && normalized.image.trim() !== '') {
      const sourceImage = path.join(bankSoalDir, normalized.image);
      if (fs.existsSync(sourceImage)) {
        const targetImage = path.join(appRoot, uasIupAssetDir, normalized.image);
        fs.copyFileSync(sourceImage, targetImage);
        normalized.image = `${uasIupAssetDir}/${normalized.image}`;
      } else {
        // Image referenced but file doesn't exist — clear the field
        normalized.image = '';
      }
    }

    return normalized;
  });
}

const uasIup2023 = processUasIupBatch(uasIupSource.slice(0, 43));
const uasIup2022 = processUasIupBatch(uasIupSource.slice(43));

// ═══════════════════════════════════════════════════════════
// Combine UAS data into a single output file
// ═══════════════════════════════════════════════════════════
const uasExamData = {
  name: 'UAS',
  types: {
    reguler: {
      name: 'Reguler',
      years: {
        '2022': uasReg2022,
        '2023': uasReg2023,
      },
    },
    iup: {
      name: 'IUP',
      years: {
        '2022': uasIup2022,
        '2023': uasIup2023,
      },
    },
  },
};

const uasOutput = [
  '/* JStudyC Blok II.4 UAS Question Data - generated from Bank Soal/uas_blok2.4.json & Bank Soal/Rekap_Soal_UAS_II.4_2022_2023.json */',
  'QUESTION_DATA["blok-ii-4"].exams = QUESTION_DATA["blok-ii-4"].exams || {};',
  `QUESTION_DATA["blok-ii-4"].exams["uas"] = ${JSON.stringify(uasExamData, null, 2)};`,
  '',
].join('\n');

const uasOutputPath = path.join(appRoot, 'data', 'uas-blok2.4.js');
fs.writeFileSync(uasOutputPath, uasOutput);

console.log(`\n✅ Generated: ${path.relative(workspaceRoot, uasOutputPath)}`);
console.log(`   UAS Reguler 2022: ${uasReg2022.length} questions`);
console.log(`   UAS Reguler 2023: ${uasReg2023.length} questions`);
console.log(`   UAS IUP 2023: ${uasIup2023.length} questions`);
console.log(`   UAS IUP 2022: ${uasIup2022.length} questions`);
