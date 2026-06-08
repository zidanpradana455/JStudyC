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

  // ── Patch updates ──
  const PATCH_UPDATES = [
    {
      id: 'dashboard-and-question-pack-update-2026-06-08',
      category: 'Paket Soal',
      date: '8 Jun 2026',
      title: 'Update paket soal & dashboard',
      summary: 'Daftar paket soal aktif kini ditampilkan lebih jelas: Cumex 1 Reguler/IUP, Cumex 2 Reguler, dan UAS Reguler.',
      highlights: [
        'Cumex 1 Reguler: 2021 (10 soal), 2022 (25 soal), 2023 (15 soal).',
        'Cumex 1 IUP: 2021 (20 soal), 2022 (17 soal), 2023 (16 soal).',
        'Cumex 2 Reguler: 2021 (91 soal), 2022 (72 soal), 2023 (68 soal).',
        'UAS Reguler: 2022 (47 soal).',
        'Badge Baru otomatis hilang setelah update terbaru dibaca.'
      ]
    },
    {
      id: 'mini-osce-semester-4-2026-06-06',
      category: 'OSCE',
      date: '6 Jun 2026',
      title: 'Mini OSCE Semester 4',
      summary: 'Mode OSCE mendapat station overview, timer 12 menit, rubrik berbobot, feedback, dan mode cetak.',
      highlights: [
        'Station OSCE diringkas di dashboard supaya pemilihan latihan lebih cepat.',
        'Timer, scoring, dan global rating dibuat dalam satu alur ujian.',
        'Rubrik PDF tetap tersedia sebagai referensi pendamping.'
      ]
    },
    {
      id: 'cumex-progress-and-question-packs-2026-05-15',
      category: 'Paket Soal',
      date: '15 Mei 2026',
      title: 'Progress latihan & paket Cumex',
      summary: 'Paket Cumex 1, Cumex 2, dan UAS dibuat lebih mudah dipilih dengan progres belajar per paket.',
      highlights: [
        'Statistik soal dijawab, akurasi, dan paket selesai ditampilkan di bagian atas.',
        'Progress bar per tahun membantu melihat paket soal yang sudah mulai dikerjakan.',
        'Navigasi paket Cumex 1, Cumex 2, dan UAS dibuat sebagai tab.'
      ]
    }
  ];

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function initPatchUpdates() {
    const latest = PATCH_UPDATES[0];
    const summary = document.getElementById('patchUpdateSummary');
    const list = document.getElementById('patchUpdatesList');
    const badge = document.getElementById('patchNewBadge');
    const detailBtn = document.getElementById('patchDetailBtn');
    const modal = document.getElementById('patchModal');
    const closeBtn = document.getElementById('patchModalClose');
    const modalContent = document.getElementById('patchModalContent');

    if (!latest || !summary || !list || !badge || !detailBtn || !modal || !closeBtn || !modalContent) return;

    const seenUpdate = localStorage.getItem('jstudyc_seen_latest_update');
    badge.classList.toggle('show', seenUpdate !== latest.id);
    summary.textContent = latest.summary;

    list.innerHTML = PATCH_UPDATES.slice(0, 3).map(update => `
      <div class="patch-item">
        <div class="patch-item-category">${escapeHTML(update.category)}</div>
        <div class="patch-item-copy">
          <strong>${escapeHTML(update.title)}</strong>
          <span>${escapeHTML(update.date)} - ${escapeHTML(update.summary)}</span>
        </div>
      </div>
    `).join('');

    modalContent.innerHTML = PATCH_UPDATES.map(update => `
      <article class="patch-release">
        <span class="patch-release-category">${escapeHTML(update.category)}</span>
        <div class="patch-release-header">
          <h3>${escapeHTML(update.title)}</h3>
          <time>${escapeHTML(update.date)}</time>
        </div>
        <ul>
          ${update.highlights.map(item => `<li>${escapeHTML(item)}</li>`).join('')}
        </ul>
      </article>
    `).join('');

    function openPatchModal() {
      localStorage.setItem('jstudyc_seen_latest_update', latest.id);
      badge.classList.remove('show');
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    }

    function closePatchModal() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      detailBtn.focus();
    }

    detailBtn.addEventListener('click', openPatchModal);
    closeBtn.addEventListener('click', closePatchModal);
    modal.addEventListener('click', event => {
      if (event.target === modal) closePatchModal();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.classList.contains('show')) closePatchModal();
    });
  }

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

  // ── Dashboard Mode Tabs (Cumex / OSCE) ──
  const modeTabs = document.querySelectorAll('.dashboard-mode-tab');
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(tab.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });

  initPatchUpdates();
  progressCache = await loadProgress();
  renderExamContent(currentExam);
  updateOverallStats();
})();
