/* JStudyC — Shared quiz-progress helpers (dashboard + block pages). */
(function () {
  'use strict';

  const EXAM_ORDER = ['cumex-1', 'cumex-2', 'uas'];

  function packageKey(blockId, examId, typeId, year) {
    return `${blockId}_${examId}_${typeId}_${year}`;
  }

  // Load every quiz_progress row for the user. Legacy archive keys (see
  // packageAliases in the question data) are folded into their current key
  // so a package is never counted twice.
  async function load(supabase, user) {
    const { data, error } = await supabase
      .from('quiz_progress')
      .select('progress_key, answered, correct, total')
      .eq('user_id', user.id);
    if (error) {
      console.error(error);
      return {};
    }
    const progress = {};
    (data || []).forEach(item => {
      progress[item.progress_key] = { answered: item.answered, correct: item.correct, total: item.total };
    });
    for (const [blockId, block] of Object.entries(QUESTION_DATA)) {
      for (const alias of block.packageAliases || []) for (const examId of alias.exams) {
        const oldKey = packageKey(blockId, examId, alias.from.type, alias.from.year);
        const newKey = packageKey(blockId, examId, alias.to.type, alias.to.year);
        if (progress[oldKey]) {
          progress[newKey] ||= progress[oldKey];
          delete progress[oldKey];
        }
      }
    }
    return progress;
  }

  // All playable packages of one QUESTION_DATA block: [{key, size, ...}].
  function packages(questionBlockId) {
    const block = QUESTION_DATA[questionBlockId];
    const list = [];
    if (!block) return list;
    for (const [examId, exam] of Object.entries(block.exams || {})) {
      for (const [typeId, type] of Object.entries(exam.types || {})) {
        if (type.locked) continue;
        for (const [year, questions] of Object.entries(type.years || {})) {
          if (Array.isArray(questions) && questions.length) {
            list.push({ key: packageKey(questionBlockId, examId, typeId, year), size: questions.length, examId, typeId, year });
          }
        }
      }
    }
    return list;
  }

  // Aggregate progress over the given QUESTION_DATA blocks.
  function stats(questionBlockIds, progress) {
    let answered = 0, correct = 0, completed = 0, total = 0, totalQuestions = 0;
    questionBlockIds.forEach(id => packages(id).forEach(pkg => {
      total++;
      totalQuestions += pkg.size;
      const p = progress[pkg.key];
      if (!p) return;
      answered += p.answered || 0;
      correct += p.correct || 0;
      if (p.answered > 0 && p.answered >= pkg.size) completed++;
    }));
    return {
      answered, correct, completed, total, totalQuestions,
      accuracy: answered ? Math.round(correct / answered * 100) : 0,
      coverage: totalQuestions ? Math.min(100, Math.round(answered / totalQuestions * 100)) : 0
    };
  }

  function sortedExams(questionBlockId) {
    const exams = Object.keys(QUESTION_DATA[questionBlockId]?.exams || {});
    const rank = id => (EXAM_ORDER.indexOf(id) + 1) || EXAM_ORDER.length + 1;
    return exams.sort((a, b) => rank(a) - rank(b));
  }

  function blockQuestionIds(entry) {
    return [entry.questionBlock, entry.materi && entry.materi.quizBlock].filter(Boolean);
  }

  window.JStudyCProgress = { load, packages, stats, sortedExams, blockQuestionIds, packageKey };
})();
