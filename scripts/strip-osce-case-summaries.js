const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'data', 'osce-cases.js');
const context = { window: {} };

vm.createContext(context);
vm.runInContext(fs.readFileSync(inputPath, 'utf8'), context);

const patientOnlyCases = {};
for (const [rubricId, cases] of Object.entries(context.window.OSCE_CASES)) {
  patientOnlyCases[rubricId] = cases.map(({ id, title, diagnosis, prompt, patient }) => ({
    id,
    title,
    diagnosis,
    prompt,
    patient
  }));
}

const output = [
  '/* Skenario pasien simulasi Mini OSCE Semester 4. */',
  'window.OSCE_CASES = ' + JSON.stringify(patientOnlyCases, null, 2) + ';',
  ''
].join('\n');

fs.writeFileSync(inputPath, output, 'utf8');
console.log(`Wrote ${inputPath}`);
