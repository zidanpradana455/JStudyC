/* JStudyC — Dashboard Logic */
(async function () {
  'use strict';

  // ── Session check ──
  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;
  const user = await backend.requireCurrentUser();
  if (!user) return;
  const profile = await backend.ensureProfile(user);
  document.getElementById('userName').textContent = profile.name;

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
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mt.classList.remove('active'); nl.classList.remove('open'); }));

  // ── Canvas (lightweight for dashboard) ──
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  class P {
    constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.s = Math.random()*1+0.3; this.sx = (Math.random()-0.5)*0.3; this.sy = (Math.random()-0.5)*0.3; this.o = Math.random()*0.3+0.05; }
    update() { this.x += this.sx; this.y += this.sy; if(this.x>canvas.width)this.x=0; if(this.x<0)this.x=canvas.width; if(this.y>canvas.height)this.y=0; if(this.y<0)this.y=canvas.height; }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); const theme = document.documentElement.getAttribute('data-theme'); const rgb = theme === 'light' ? '0,0,0' : '255,255,255'; ctx.fillStyle=`rgba(${rgb},${this.o})`; ctx.fill(); }
  }
  resize(); for(let i=0;i<40;i++) particles.push(new P());
  (function anim() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(anim); })();
  window.addEventListener('resize', () => { resize(); particles=[]; for(let i=0;i<40;i++) particles.push(new P()); });

  // ── Scroll Reveal ──
  const ro = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);} }), {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── Progress tracking ──
  let progressCache = {};

  async function loadProgress() {
    const { data, error } = await supabase
      .from('quiz_progress')
      .select('progress_key, answered, correct, total')
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
      return {};
    }

    return (data || []).reduce((acc, item) => {
      acc[item.progress_key] = {
        answered: item.answered,
        correct: item.correct,
        total: item.total
      };
      return acc;
    }, {});
  }

  function getProgress() { return progressCache; }

  function updateOverallStats() {
    const progress = getProgress();
    let total = 0, correct = 0, completed = 0;
    Object.values(progress).forEach(p => {
      total += (p.answered || 0);
      correct += (p.correct || 0);
      if (p.answered > 0 && p.answered >= p.total) completed++;
    });
    document.getElementById('totalAnswered').textContent = total;
    document.getElementById('totalCorrect').textContent = total > 0 ? Math.round((correct/total)*100)+'%' : '0%';
    document.getElementById('totalPakets').textContent = completed + '/6';
  }

  // ── Exam Tabs ──
  const tabs = document.querySelectorAll('.exam-tab');
  const content = document.getElementById('examContent');
  let currentExam = 'cumex-1';

  function renderExamContent(examId) {
    const block = QUESTION_DATA['blok-ii-3'];
    const exam = block.exams[examId];
    if (!exam) return;
    const progress = getProgress();

    let html = '';
    Object.entries(exam.types).forEach(([typeId, typeData]) => {
      const isLocked = typeData.locked === true;
      html += `<div class="type-group">
        <div class="type-label">${typeData.name}${isLocked ? ' <span style="opacity:0.5">🔒</span>' : ''}</div>
        <div class="year-cards">`;
      Object.entries(typeData.years).forEach(([year, questions]) => {
        const key = `blok-ii-3_${examId}_${typeId}_${year}`;
        const p = progress[key] || { answered: 0, total: questions.length };
        const pct = p.total > 0 ? Math.round((p.answered / p.total) * 100) : 0;
        const hasQuestions = questions.length > 0;
        
        if (isLocked || !hasQuestions) {
          html += `<div class="year-card year-card--locked">
            <span class="year-num">${year}</span>
            <span class="year-info">🔒 Segera hadir</span>
            <div class="year-progress"><div class="year-progress-bar" style="width:0%"></div></div>
          </div>`;
        } else {
          html += `<a class="year-card" href="quiz.html?block=blok-ii-3&exam=${examId}&type=${typeId}&year=${year}">
            <span class="year-num">${year}</span>
            <span class="year-info">${questions.length} soal</span>
            <div class="year-progress"><div class="year-progress-bar" style="width:${pct}%"></div></div>
          </a>`;
        }
      });
      html += `</div></div>`;
    });
    content.innerHTML = html;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentExam = tab.dataset.exam;
      renderExamContent(currentExam);
    });
  });

  progressCache = await loadProgress();
  renderExamContent(currentExam);
  updateOverallStats();
})();
