/* JStudyC — Quiz Engine */
(async function () {
  'use strict';

  // ── Session check ──
  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;
  const user = await backend.requireCurrentUser();
  if (!user) return;

  // ── Logout ──
  document.getElementById('btnLogout').addEventListener('click', async () => {
    await supabase.auth.signOut();
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

  function hashString(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    return function () {
      seed += 0x6D2B79F5;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWithSeed(items, seedText) {
    const result = [...items];
    const random = seededRandom(hashString(seedText));
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const questions = JSON.parse(JSON.stringify(rawQuestions));
  questions.forEach((q, index) => {
    const correctText = q.options[q.correctAnswer];
    q.options = shuffleWithSeed(q.options, `${user.id}_${progressKey}_${q.id || index}`);
    q.correctAnswer = q.options.indexOf(correctText);
  });

  function getLectureLine(q) {
    const parts = [];
    if (q.lectureNumber) parts.push(`Lecture ${q.lectureNumber}`);
    if (q.lecture) parts.push(q.lecture);
    return parts.length ? parts.join(': ') : '';
  }

  function formatExplanation(q) {
    const explanation = q.explanation || '';
    const lectureLine = getLectureLine(q);
    if (!lectureLine) return explanation;

    const trimmed = explanation.trimStart();
    if (trimmed.startsWith(lectureLine) || /^Lecture\s+\d+\s*:/.test(trimmed)) {
      return explanation;
    }

    return `${lectureLine}\n\n${explanation}`;
  }

  // ── Quiz state ──
  let currentIndex = 0;
  const answers = new Array(questions.length).fill(null); // user's selected answer index
  const flagged = new Set();
  let correctCount = 0;
  let wrongCount = 0;

  // ── Load previous progress for this set ──
  const { data: savedState, error: savedStateError } = await supabase
    .from('quiz_progress')
    .select('answers, flagged, correct')
    .eq('user_id', user.id)
    .eq('progress_key', progressKey)
    .maybeSingle();
  if (savedStateError) console.error(savedStateError);

  if (savedState) {
    (savedState.answers || []).forEach((a, i) => { answers[i] = a; });
    (savedState.flagged || []).forEach(f => flagged.add(f));
    correctCount = savedState.correct || 0;
    wrongCount = answers.filter(a => a !== null).length - correctCount;
  }

  // ── Set header ──
  const examNames = { 'cumex-1': 'Cumex 1', 'cumex-2': 'Cumex 2', 'uas': 'UAS' };
  document.getElementById('quizTitle').textContent = `${block.name} — ${examNames[examId] || examId}`;
  document.getElementById('quizSubtitle').textContent = `${type.name} · ${year} · ${questions.length} soal`;

  // ── Elements ──
  const questionBadge = document.getElementById('questionBadge');
  const questionText = document.getElementById('questionText');
  const questionMedia = document.getElementById('questionMedia');
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
  async function saveState() {
    const answered = answers.filter(a => a !== null).length;
    const { error } = await supabase
      .from('quiz_progress')
      .upsert({
        user_id: user.id,
        progress_key: progressKey,
        block_id: blockId,
        exam_id: examId,
        type_id: typeId,
        quiz_year: year,
        answered,
        correct: correctCount,
        total: questions.length,
        answers: [...answers],
        flagged: [...flagged],
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error(error);
      showToast('Progres belum tersimpan. Cek koneksi.');
    }
  }

  // ── Render question ──
  function renderQuestion() {
    const q = questions[currentIndex];
    const letters = ['A', 'B', 'C', 'D', 'E'];

    questionBadge.textContent = `Soal ${currentIndex + 1} dari ${questions.length}`;
    questionText.textContent = q.question;
    questionMedia.innerHTML = '';

    if (q.image) {
      const img = document.createElement('img');
      img.src = q.image;
      img.alt = `Gambar soal ${q.id || currentIndex + 1}`;
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        questionMedia.classList.remove('show');
        questionMedia.innerHTML = '';
      });
      questionMedia.appendChild(img);
      questionMedia.classList.add('show');
    } else {
      questionMedia.classList.remove('show');
    }

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
      explanationText.textContent = formatExplanation(q);
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

  btnRetake.addEventListener('click', async () => {
    // Clear specific quiz state
    localStorage.removeItem('jstudyc_quiz_' + progressKey);
    localStorage.removeItem('jstudyc_quiz_data_' + progressKey);

    const { error } = await supabase
      .from('quiz_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('progress_key', progressKey);

    if (error) {
      console.error(error);
      showToast('Progres belum bisa direset. Coba lagi.');
      return;
    }

    // Hide modal and reload
    resultModal.classList.remove('show');
    window.location.reload();
  });

  // ── Toast ──
  const toast = document.getElementById('toast');
  function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }

  // ── Mobile Sidebar Drawer Toggle ──
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const quizSidebar = document.querySelector('.quiz-sidebar');

  function openSidebar() {
    quizSidebar.classList.add('open');
    sidebarBackdrop.classList.add('show');
    sidebarToggle.classList.add('active');
  }

  function closeSidebar() {
    quizSidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('show');
    sidebarToggle.classList.remove('active');
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (quizSidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  // Close sidebar when a number button is clicked (mobile)
  const origRenderNumberGrid = renderNumberGrid;
  renderNumberGrid = function() {
    origRenderNumberGrid();
    // Re-attach close on click for mobile
    if (window.innerWidth <= 900) {
      numberGrid.querySelectorAll('.num-btn').forEach(btn => {
        btn.addEventListener('click', closeSidebar);
      });
    }
  };

  // ── Init ──
  renderQuestion();
})();
