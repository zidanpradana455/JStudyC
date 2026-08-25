const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(appRoot, '..');
const sourcePath = path.join(workspaceRoot, 'cumex1_blok2.4.json');
const bankSoalDir = path.join(workspaceRoot, 'Bank Soal');
const outputPath = path.join(appRoot, 'data', 'cumex1-blok2.4.js');
const assetDir = 'assets/questions/cumex1-blok2.4-reg';

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const yearConfigs = {
  cumex1_reguler_2022: {
    year: '2022',
  },
  cumex1_reguler_2023: {
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

    if (normalized.image) {
      const sourceImage = path.join(bankSoalDir, normalized.image);
      const targetImage = path.join(appRoot, assetDir, normalized.image);

      if (!fs.existsSync(sourceImage)) {
        throw new Error(`Missing image: ${sourceImage}`);
      }

      fs.copyFileSync(sourceImage, targetImage);
      normalized.image = `${assetDir}/${normalized.image}`;
    }

    return normalized;
  });
}

const blockData = {
  id: 'blok-ii-4',
  name: 'Blok II.4',
  fullName: 'Diarrhea, Vomitting, and Nausea',
  exams: {
    'cumex-1': {
      name: 'Cumex 1',
      types: {
        reguler: {
          name: 'Reguler',
          years,
        },
      },
    },
  },
};

const output = [
  '/* JStudyC Blok II.4 Cumex 1 Question Data - generated from cumex1_blok2.4.json */',
  `QUESTION_DATA["blok-ii-4"] = ${JSON.stringify(blockData, null, 2)};`,
  '',
].join('\n');

fs.writeFileSync(outputPath, output);

console.log(`Generated ${path.relative(workspaceRoot, outputPath)}`);
for (const [year, questions] of Object.entries(years)) {
  const imageCount = questions.filter((question) => question.image).length;
  console.log(`${year}: ${questions.length} questions, ${imageCount} images`);
}
