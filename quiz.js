/* JStudyC — Quiz Engine */
(function () {
  'use strict';

  // ── Session check ──
  const session = JSON.parse(localStorage.getItem('jstudyc_session'));
  if (!session) { window.location.href = 'index.html'; return; }

  // ── Logout ──
  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('jstudyc_session');
    window.location.href = 'index.html';
  });

  // ── Mobile menu ──
  const mt = document.getElementById('menuToggle');
  const nl = document.getElementById('navLinks');
  mt.addEventListener('click', () => { mt.classList.toggle('active'); nl.classList.toggle('open'); });

  // ── Canvas (lightweight) ──
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  class P {
    constructor() { this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.s=Math.random()*1+0.3; this.sx=(Math.random()-0.5)*0.2; this.sy=(Math.random()-0.5)*0.2; this.o=Math.random()*0.2+0.05; }
    update() { this.x+=this.sx; this.y+=this.sy; if(this.x>canvas.width)this.x=0; if(this.x<0)this.x=canvas.width; if(this.y>canvas.height)this.y=0; if(this.y<0)this.y=canvas.height; }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); const theme = document.documentElement.getAttribute('data-theme'); const rgb = theme === 'light' ? '0,0,0' : '255,255,255'; ctx.fillStyle=`rgba(${rgb},${this.o})`; ctx.fill(); }
  }
  resize(); for(let i=0;i<30;i++) particles.push(new P());
  (function anim(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(anim); })();
  window.addEventListener('resize', ()=>{ resize(); particles=[]; for(let i=0;i<30;i++) particles.push(new P()); });

  // ── Parse URL params ──
  const params = new URLSearchParams(window.location.search);
  const blockId = params.get('block');
  const examId = params.get('exam');
  const typeId = params.get('type');
  const year = params.get('year');

  if (!blockId || !examId || !typeId || !year) {
    window.location.href = 'dashboard.html';
    return;
  }

  // ── Load questions ──
  const block = QUESTION_DATA[blockId];
  if (!block) { window.location.href = 'dashboard.html'; return; }
  const exam = block.exams[examId];
  const type = exam.types[typeId];
  const rawQuestions = type.years[year];

  if (!rawQuestions || rawQuestions.length === 0) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Handle randomization and state
  const progressKey = `${blockId}_${examId}_${typeId}_${year}`;
  let questions = JSON.parse(localStorage.getItem('jstudyc_quiz_data_' + progressKey) || 'null');

  if (!questions) {
    // Deep clone to avoid mutating original data
    questions = JSON.parse(JSON.stringify(rawQuestions));
    
    // Shuffle options for each question
    questions.forEach(q => {
      const correctText = q.options[q.correctAnswer];
      for (let i = q.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
      }
      q.correctAnswer = q.options.indexOf(correctText);
    });
    
    // Save shuffled questions to ensure consistency across reloads
    localStorage.setItem('jstudyc_quiz_data_' + progressKey, JSON.stringify(questions));
  }

  // ── Quiz state ──
  let currentIndex = 0;
  const answers = new Array(questions.length).fill(null); // user's selected answer index
  const flagged = new Set();
  let correctCount = 0;
  let wrongCount = 0;

  // ── Load previous progress for this set ──
  const savedState = JSON.parse(localStorage.getItem('jstudyc_quiz_' + progressKey) || 'null');
  if (savedState) {
    savedState.answers.forEach((a, i) => { answers[i] = a; });
    savedState.flagged.forEach(f => flagged.add(f));
    correctCount = savedState.correct;
    wrongCount = savedState.wrong;
  }

  // ── Set header ──
  const examNames = { 'cumex-1': 'Cumex 1', 'cumex-2': 'Cumex 2', 'uas': 'UAS' };
  document.getElementById('quizTitle').textContent = `${block.name} — ${examNames[examId] || examId}`;
  document.getElementById('quizSubtitle').textContent = `${type.name} · ${year} · ${questions.length} soal`;

  // ── Elements ──
  const questionBadge = document.getElementById('questionBadge');
  const questionText = document.getElementById('questionText');
  const optionsList = document.getElementById('optionsList');
  const explanationBox = document.getElementById('explanationBox');
  const explanationResult = document.getElementById('explanationResult');
  const explanationText = document.getElementById('explanationText');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const numberGrid = document.getElementById('numberGrid');
  const flagBtn = document.getElementById('flagBtn');
  const sidebarProgress = document.getElementById('sidebarProgress');
  const sidebarProgressText = document.getElementById('sidebarProgressText');
  const trackerCorrect = document.getElementById('trackerCorrect');
  const trackerWrong = document.getElementById('trackerWrong');
  const trackerRemaining = document.getElementById('trackerRemaining');

  // Modal Elements
  const resultModal = document.getElementById('resultModal');
  const resultPercentage = document.getElementById('resultPercentage');
  const resultDetails = document.getElementById('resultDetails');
  const btnRetake = document.getElementById('btnRetake');
  const btnDashboard = document.getElementById('btnDashboard');

  // ── Render number grid ──
  function renderNumberGrid() {
    numberGrid.innerHTML = '';
    questions.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'num-btn';
      btn.textContent = i + 1;
      if (i === currentIndex) btn.classList.add('current');
      if (answers[i] !== null) btn.classList.add('answered');
      if (flagged.has(i)) btn.classList.add('flagged');
      btn.addEventListener('click', () => { currentIndex = i; renderQuestion(); });
      numberGrid.appendChild(btn);
    });
  }

  // ── Update tracker ──
  function updateTracker() {
    const answered = answers.filter(a => a !== null).length;
    trackerCorrect.textContent = correctCount;
    trackerWrong.textContent = wrongCount;
    trackerRemaining.textContent = questions.length - answered;
    const pct = Math.round((answered / questions.length) * 100);
    sidebarProgress.style.width = pct + '%';
    sidebarProgressText.textContent = `${answered}/${questions.length} soal dijawab`;
  }

  // ── Save state ──
  function saveState() {
    const state = {
      answers: [...answers],
      flagged: [...flagged],
      correct: correctCount,
      wrong: wrongCount
    };
    localStorage.setItem('jstudyc_quiz_' + progressKey, JSON.stringify(state));

    // Also update overall progress
    const progress = JSON.parse(localStorage.getItem('jstudyc_progress') || '{}');
    progress[progressKey] = {
      answered: answers.filter(a => a !== null).length,
      correct: correctCount,
      total: questions.length
    };
    localStorage.setItem('jstudyc_progress', JSON.stringify(progress));
  }

  // ── Render question ──
  function renderQuestion() {
    const q = questions[currentIndex];
    const letters = ['A', 'B', 'C', 'D', 'E'];

    questionBadge.textContent = `Soal ${currentIndex + 1} dari ${questions.length}`;
    questionText.textContent = q.question;

    const alreadyAnswered = answers[currentIndex] !== null;

    // Options
    optionsList.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      if (alreadyAnswered) {
        btn.classList.add('disabled');
        if (i === q.correctAnswer) btn.classList.add('correct');
        if (i === answers[currentIndex] && i !== q.correctAnswer) btn.classList.add('wrong');
        if (i === answers[currentIndex]) btn.classList.add('selected');
      }
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      if (!alreadyAnswered) {
        btn.addEventListener('click', () => handleAnswer(i));
      }
      optionsList.appendChild(btn);
    });

    // Explanation
    if (alreadyAnswered) {
      explanationBox.classList.add('show');
      const isCorrect = answers[currentIndex] === q.correctAnswer;
      explanationResult.textContent = isCorrect ? '✓ Jawaban Benar!' : '✗ Jawaban Salah';
      explanationResult.className = 'explanation-result ' + (isCorrect ? 'correct-result' : 'wrong-result');
      explanationText.textContent = q.explanation;
    } else {
      explanationBox.classList.remove('show');
    }

    // Nav buttons
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === questions.length - 1;

    // Flag button
    flagBtn.classList.toggle('active', flagged.has(currentIndex));

    renderNumberGrid();
    updateTracker();
  }

  // ── Handle answer ──
  function handleAnswer(selectedIndex) {
    if (answers[currentIndex] !== null) return;
    answers[currentIndex] = selectedIndex;

    const q = questions[currentIndex];
    if (selectedIndex === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }

    saveState();
    renderQuestion();
  }

  // ── Navigation ──
  btnPrev.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } });
  btnNext.addEventListener('click', () => { if (currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); } });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; renderQuestion(); }
    if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); }
  });

  // ── Flag toggle ──
  flagBtn.addEventListener('click', () => {
    if (flagged.has(currentIndex)) { flagged.delete(currentIndex); }
    else { flagged.add(currentIndex); }
    saveState();
    renderQuestion();
  });

  // ── Finish & Modal ──
  document.getElementById('btnFinish').addEventListener('click', () => {
    const answered = answers.filter(a => a !== null).length;
    const unanswered = questions.length - answered;
    
    // Calculate percentage
    const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    
    resultPercentage.textContent = pct + '%';
    
    let detailsHTML = `Kamu menjawab <strong>${answered}</strong> dari <strong>${questions.length}</strong> soal.<br>`;
    detailsHTML += `Benar: <strong>${correctCount}</strong> | Salah: <strong>${wrongCount}</strong>`;
    if (unanswered > 0) detailsHTML += `<br><span style="color:var(--text-muted)">${unanswered} soal belum dijawab.</span>`;
    
    resultDetails.innerHTML = detailsHTML;
    resultModal.classList.add('show');
  });

  btnDashboard.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });

  btnRetake.addEventListener('click', () => {
    // Clear specific quiz state
    localStorage.removeItem('jstudyc_quiz_' + progressKey);
    localStorage.removeItem('jstudyc_quiz_data_' + progressKey);
    
    // Clear from overall progress
    const progress = JSON.parse(localStorage.getItem('jstudyc_progress') || '{}');
    if (progress[progressKey]) {
      delete progress[progressKey];
      localStorage.setItem('jstudyc_progress', JSON.stringify(progress));
    }
    
    // Hide modal and reload
    resultModal.classList.remove('show');
    window.location.reload();
  });

  // ── Toast ──
  const toast = document.getElementById('toast');
  function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }

  // ── Init ──
  renderQuestion();
})();
