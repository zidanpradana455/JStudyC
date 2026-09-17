const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(appRoot, '..');
const sourcePath = path.join(workspaceRoot, 'Bank Soal', 'cumex2_blok2.4.json');
const bankSoalDir = path.join(workspaceRoot, 'Bank Soal');
const outputPath = path.join(appRoot, 'data', 'cumex2-blok2.4.js');
const assetDir = 'assets/questions/cumex2-blok2.4-reg';

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Source file not found: ${sourcePath}`);
}

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const yearConfigs = {
  cumex2_reguler_2022: {
    year: '2022',
  },
  cumex2_reguler_2023: {
    year: '2023',
  },
};

const years = {};
fs.mkdirSync(path.join(appRoot, assetDir), { recursive: true });

for (const [sourceKey, config] of Object.entries(yearConfigs)) {
  const questions = source[sourceKey];
  if (!Array.isArray(questions)) {
    throw new Error(`Missing question array: ${sourceKey}`);
  }

  years[config.year] = questions.map((question) => {
    const normalized = { ...question };

    if (normalized.image && normalized.image.trim() !== '') {
      const sourceImage = path.join(bankSoalDir, normalized.image);
      const targetImage = path.join(appRoot, assetDir, normalized.image);

      if (fs.existsSync(sourceImage)) {
        fs.copyFileSync(sourceImage, targetImage);
        normalized.image = `${assetDir}/${normalized.image}`;
      }
    }

    return normalized;
  });
}

const cumex2ExamData = {
  name: 'Cumex 2',
  types: {
    reguler: {
      name: 'Reguler',
      years,
    },
  },
};

const output = [
  '/* JStudyC Blok II.4 Cumex 2 Question Data - generated from Bank Soal/cumex2_blok2.4.json */',
  'QUESTION_DATA["blok-ii-4"] = QUESTION_DATA["blok-ii-4"] || {',
  '  id: "blok-ii-4",',
  '  name: "Blok II.4",',
  '  fullName: "Diarrhea, Vomitting, and Nausea",',
  '  exams: {}',
  '};',
  'QUESTION_DATA["blok-ii-4"].exams = QUESTION_DATA["blok-ii-4"].exams || {};',
  `QUESTION_DATA["blok-ii-4"].exams["cumex-2"] = ${JSON.stringify(cumex2ExamData, null, 2)};`,
  '',
].join('\n');

fs.writeFileSync(outputPath, output);

console.log(`Successfully generated: ${path.relative(workspaceRoot, outputPath)}`);
for (const [year, questions] of Object.entries(years)) {
  const imageCount = questions.filter((question) => question.image).length;
  console.log(`${year}: ${questions.length} questions (with image: ${imageCount})`);
}
