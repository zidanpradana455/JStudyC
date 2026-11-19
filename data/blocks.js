/* JStudyC — Block catalog for the dashboard and block pages.
 * questionBlock: key in QUESTION_DATA with the exam packages (Cumex/UAS).
 * materi: key in MATERI_DATA (lecture summaries) and the QUESTION_DATA key
 *         holding that block's per-lecture quizzes; omit if no materi yet.
 */
const BLOCK_CATALOG = [
  {
    id: 'blok-ii-3',
    badge: 'Blok II.3',
    name: 'Seizure, Unconsciousness, and Sense Organ Problem',
    desc: 'Kejang, penurunan kesadaran, dan gangguan organ sensorik.',
    questionBlock: 'blok-ii-3'
  },
  {
    id: 'blok-ii-4',
    badge: 'Blok II.4',
    name: 'Diarrhea, Vomitting, and Nausea',
    desc: 'Diare, muntah, mual, dan gangguan gastrointestinal terkait.',
    questionBlock: 'blok-ii-4'
  },
  {
    id: 'blok-ii-5',
    badge: 'Blok II.5',
    name: 'Oedema, Urinary and Metabolic Disorders',
    desc: 'Oedema, gangguan saluran kemih, dan gangguan metabolik. Tersedia IUP 2021–2023 dan Reguler 2023.',
    questionBlock: 'blok-ii-5'
  },
  {
    id: 'blok-ii-6',
    badge: 'Blok II.6',
    name: 'Cough, Dyspnea, and Cyanosis',
    desc: 'Batuk, sesak napas, sianosis, serta gangguan kardiorespirasi terkait.',
    questionBlock: 'blok-ii-6',
    materi: { id: 'blok-ii-6', quizBlock: 'materi-blok-ii-6' }
  },
  {
    id: 'ebm-cas-2',
    badge: 'EBM-CAS 2',
    name: 'Evidence-Based Medicine and Critical Appraisal Skills 2',
    desc: 'Latihan EBM-CAS 2 dari Blok II.1, II.2, dan II.3 dengan urutan soal dan opsi diacak.',
    questionBlock: 'ebm-cas-2',
    group: 'other'
  }
];
