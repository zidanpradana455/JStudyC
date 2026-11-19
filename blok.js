/* JStudyC — Block page: Materi + Soal Ujian with this block's progress. */
(async function () {
  'use strict';

  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;
  const user = await backend.requireCurrentUser();
  if (!user) return;

  document.getElementById('btnLogout').addEventListener('click', async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('jstudyc_session');
    window.location.href = 'index.html';
  });
  const mt = document.getElementById('menuToggle');
  const nl = document.getElementById('navLinks');
  mt.addEventListener('click', () => { mt.classList.toggle('active'); nl.classList.toggle('open'); });

  const params = new URLSearchParams(window.location.search);
  const entry = BLOCK_CATALOG.find(b => b.id === params.get('id'));
  if (!entry || !QUESTION_DATA[entry.questionBlock]) { window.location.href = 'dashboard.html'; return; }

  const Progress = window.JStudyCProgress;
  const progress = await Progress.load(supabase, user);
  const materi = entry.materi ? (window.MATERI_DATA || {})[entry.materi.id] : null;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ── Header ──
  document.title = `${entry.badge} — JStudyC`;
  document.getElementById('blockBadge').textContent = entry.badge;
  document.getElementById('blockTitle').textContent = entry.name;
  document.getElementById('blockDesc').textContent = entry.desc;

  // ── Tracker (this block only) ──
  const examStats = Progress.stats([entry.questionBlock], progress);
  const materiStats = entry.materi ? Progress.stats([entry.materi.quizBlock], progress) : null;
  const all = Progress.stats(Progress.blockQuestionIds(entry), progress);
  const cards = [
    ['statAnswered', '📊', `${all.answered}<small>/${all.totalQuestions}</small>`, 'Soal dijawab'],
    ['statAccuracy', '✅', `${all.accuracy}%`, 'Akurasi'],
    ['statPackages', '🔥', `${examStats.completed}<small>/${examStats.total}</small>`, 'Paket ujian selesai']
  ];
  if (materiStats) cards.push(['statMateri', '📖', `${materiStats.completed}<small>/${materi.units.length}</small>`, 'Latihan materi selesai']);
  document.getElementById('blockTracker').innerHTML = cards.map(([id, icon, value, label]) => `
    <div class="progress-card">
      <div class="progress-icon" aria-hidden="true">${icon}</div>
      <div class="progress-info">
        <span class="progress-value" id="${id}">${value}</span>
        <span class="progress-label">${label}</span>
      </div>
    </div>`).join('');
  document.getElementById('blockTracker').style.setProperty('--tracker-cols', cards.length);

  // ── Mode tabs: Materi / Soal Ujian ──
  const modes = [
    { id: 'materi', label: '📖 Materi', panel: document.getElementById('panelMateri') },
    { id: 'soal', label: '📝 Soal Ujian', panel: document.getElementById('panelSoal') }
  ];
  const tabsEl = document.getElementById('blockModeTabs');
  tabsEl.innerHTML = modes.map(m =>
    `<button type="button" role="tab" id="tab-${m.id}" aria-controls="${m.panel.id}" class="block-mode-tab" data-mode="${m.id}">${m.label}</button>`
  ).join('');
  const tabButtons = [...tabsEl.querySelectorAll('[role="tab"]')];

  function selectMode(id, focus) {
    modes.forEach((m, i) => {
      const active = m.id === id;
      tabButtons[i].classList.toggle('active', active);
      tabButtons[i].setAttribute('aria-selected', String(active));
      tabButtons[i].tabIndex = active ? 0 : -1;
      m.panel.hidden = !active;
      if (active && focus) tabButtons[i].focus();
    });
    params.set('tab', id);
    history.replaceState(null, '', `${location.pathname}?${params}`);
  }
  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => selectMode(btn.dataset.mode));
    btn.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + modes.length) % modes.length;
      selectMode(modes[next].id, true);
    });
  });

  // ── Materi panel ──
  const panelMateri = document.getElementById('panelMateri');
  if (!materi) {
    panelMateri.innerHTML = `<div class="block-card block-empty">
      <h3>Materi belum tersedia</h3>
      <p>Rangkuman per lecture untuk ${escapeHTML(entry.badge)} sedang disiapkan. Sementara itu, gunakan tab Soal Ujian.</p>
    </div>`;
  } else {
    const groups = {};
    materi.units.forEach(u => { (groups[u.kind] = groups[u.kind] || []).push(u); });
    const ready = materi.units.filter(u => u.available).length;
    panelMateri.innerHTML = `<p class="block-panel-intro">${ready} dari ${materi.units.length} lecture sudah tersedia. Setiap materi berisi rangkuman bergambar dan 10 soal latihan tipe Cumex.</p>` +
      Object.entries(groups).map(([kind, units]) => `
        <div class="unit-group">
          <h2 class="unit-group-title">${escapeHTML(kind)}</h2>
          <div class="unit-grid">${units.map(u => {
            const q = u.quiz;
            const p = q ? progress[Progress.packageKey(q.block, q.exam, q.type, q.year)] : null;
            const status = !u.available ? 'Segera hadir'
              : !p || !p.answered ? (q ? `Quiz ${q.count} soal` : 'Rangkuman')
              : p.answered >= q.count ? `Quiz selesai · ${p.correct}/${q.count}` : `Quiz ${p.answered}/${q.count}`;
            const body = `
              <span class="unit-code">${escapeHTML(u.code)}</span>
              <span class="unit-title">${escapeHTML(u.title)}</span>
              <span class="unit-meta">${escapeHTML(u.dept)}</span>
              <span class="unit-status${p && q && p.answered >= q.count ? ' is-done' : ''}">${status}</span>`;
            return u.available
              ? `<a class="unit-card" href="materi.html?block=${encodeURIComponent(materi.id)}&unit=${encodeURIComponent(u.slug)}">${body}</a>`
              : `<div class="unit-card is-locked" aria-disabled="true">${body}</div>`;
          }).join('')}</div>
        </div>`).join('');
  }

  // ── Soal panel: exam tabs + package cards ──
  const block = QUESTION_DATA[entry.questionBlock];
  const examIds = Progress.sortedExams(entry.questionBlock);
  const examTabs = document.getElementById('examTabs');
  const examContent = document.getElementById('examContent');

  function renderExam(examId) {
    const exam = block.exams[examId];
    let html = '';
    Object.entries(exam.types).forEach(([typeId, typeData]) => {
      const isLocked = typeData.locked === true;
      html += `<div class="type-group">
        <div class="type-label">${escapeHTML(typeData.name)}${isLocked ? ' <span style="opacity:0.5">🔒</span>' : ''}</div>
        <div class="year-cards">`;
      Object.entries(typeData.years).forEach(([year, questions]) => {
        const key = Progress.packageKey(entry.questionBlock, examId, typeId, year);
        const p = progress[key] || { answered: 0 };
        const pct = questions.length ? Math.min(100, Math.round(p.answered / questions.length * 100)) : 0;
        if (isLocked || !questions.length) {
          html += `<div class="year-card year-card--locked">
            <span class="year-num">${escapeHTML(year)}</span>
            <span class="year-info">🔒 Segera hadir</span>
            <div class="year-progress"><div class="year-progress-bar" style="width:0%"></div></div>
          </div>`;
        } else {
          const done = p.answered >= questions.length;
          html += `<a class="year-card" href="quiz.html?block=${encodeURIComponent(entry.questionBlock)}&exam=${encodeURIComponent(examId)}&type=${encodeURIComponent(typeId)}&year=${encodeURIComponent(year)}">
            <span class="year-num">${escapeHTML(year)}</span>
            <span class="year-info">${questions.length} soal${p.answered ? (done ? ` · ${p.correct} benar` : ` · ${p.answered} dijawab`) : ''}</span>
            <div class="year-progress"><div class="year-progress-bar" style="width:${pct}%"></div></div>
          </a>`;
        }
      });
      html += '</div></div>';
    });
    examContent.innerHTML = html;
    examTabs.querySelectorAll('[role="tab"]').forEach(t => {
      const active = t.dataset.exam === examId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
  }

  examTabs.innerHTML = examIds.map(id =>
    `<button type="button" role="tab" class="exam-tab" data-exam="${id}">${escapeHTML(block.exams[id].name || id)}</button>`).join('');
  examTabs.querySelectorAll('[role="tab"]').forEach(t => t.addEventListener('click', () => renderExam(t.dataset.exam)));
  if (examIds.length) renderExam(examIds[0]);

  const requested = params.get('tab');
  const defaultMode = materi && materi.units.some(u => u.available) ? 'materi' : 'soal';
  selectMode(modes.some(m => m.id === requested) ? requested : defaultMode);
})();
