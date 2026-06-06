/* ═══════════════════════════════════════════
   JStudyC — OSCE Assessment Logic
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  // ── State ──
  let currentStation = null;
  let currentRubrik = null;
  let penguji = '';
  let peserta = '';
  let scores = {};       // { itemIndex: scoreValue }
  let feedbacks = {};    // { itemIndex: feedbackText }
  let globalRating = null;
  let timerInterval = null;
  let timerSeconds = 12 * 60; // 12 minutes
  let timerRunning = false;
  let timerPaused = false;
  const TOTAL_SECONDS = 12 * 60;

  // ── Elements ──
  const viewStations = document.getElementById('viewStations');
  const viewRubriks = document.getElementById('viewRubriks');
  const viewAssessment = document.getElementById('viewAssessment');
  const stationsGrid = document.getElementById('stationsGrid');
  const rubrikList = document.getElementById('rubrikList');
  const rubrikItems = document.getElementById('rubrikItems');
  const prestartOverlay = document.getElementById('prestartOverlay');
  const toast = document.getElementById('toast');

  // ── Mobile menu ──
  const mt = document.getElementById('menuToggle');
  const nl = document.getElementById('navLinks');
  if (mt && nl) {
    mt.addEventListener('click', () => { mt.classList.toggle('active'); nl.classList.toggle('open'); });
    nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mt.classList.remove('active'); nl.classList.remove('open'); }));
  }

  // ── Canvas (lightweight) ──
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
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
  }

  // ── Scroll Reveal ──
  const ro = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);} }), {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── Toast ──
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── View Management ──
  function showView(view) {
    viewStations.classList.add('view-hidden');
    viewRubriks.classList.add('view-hidden');
    viewAssessment.classList.add('view-hidden');
    view.classList.remove('view-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Emoji icons for rubrics ──
  const rubrikIcons = {
    'abo-blood-grouping': '🩸',
    'apusan-darah': '🔬',
    'abdomen-anak': '👶',
    'abdomen-dewasa': '🏥',
    'cardio': '❤️',
    'dv': '🧬',
    'lung-exam': '🫁',
    'mata': '👁️',
    'muskuloskeletal': '🦴',
    'neuro': '🧠',
    'tht': '👂',
    'radiologi': '📡',
    'airway-management': '🫁',
  };

  // ══════════════════════════════════════
  // RENDER STATIONS
  // ══════════════════════════════════════
  function renderStations() {
    if (!window.OSCE_DATA) {
      stationsGrid.innerHTML = '<p style="color:var(--text-muted)">Data OSCE belum dimuat.</p>';
      return;
    }
    const stationDescriptions = {
      1: 'Thick and Thin Blood Film Preparation / ABO Blood Type Examination',
      2: 'Integrated Patient Management (Infection & Pain)',
      3: 'Intermediate Radiology Interpretation Skills',
      4: 'Advanced Life Support (Procedural Skills)'
    };
    let html = '';
    window.OSCE_DATA.stations.forEach(station => {
      html += `
        <div class="station-card reveal" data-station="${station.id}" onclick="window.__osceSelectStation(${station.id})">
          <div class="station-num">${station.id}</div>
          <h3 class="station-card-title">${station.title || station.name}</h3>
          <p class="station-card-desc">${stationDescriptions[station.id] || ''}</p>
          <div class="station-rubrik-count">📋 ${station.rubrics.length} Rubrik</div>
        </div>`;
    });
    stationsGrid.innerHTML = html;
    // Re-observe reveal elements
    document.querySelectorAll('.stations-grid .reveal').forEach(el => ro.observe(el));
  }

  // ══════════════════════════════════════
  // SELECT STATION → SHOW RUBRIKS
  // ══════════════════════════════════════
  window.__osceSelectStation = function(stationId) {
    const station = window.OSCE_DATA.stations.find(s => s.id === stationId);
    if (!station) return;
    currentStation = station;

    document.getElementById('stationTitle').textContent = station.title || station.name;
    document.getElementById('breadcrumbStation').textContent = station.name;

    let html = '';
    station.rubrics.forEach(rubrik => {
      const icon = rubrikIcons[rubrik.id] || '📋';
      html += `
        <div class="rubrik-card" onclick="window.__osceSelectRubrik('${rubrik.id}')">
          <div class="rubrik-card-icon">${icon}</div>
          <div class="rubrik-card-info">
            <h4>${rubrik.name}</h4>
            <p>${rubrik.items.length} kompetensi</p>
          </div>
        </div>`;
    });
    rubrikList.innerHTML = html;
    showView(viewRubriks);
  };

  // ── Back to stations ──
  document.getElementById('btnBackToStations').addEventListener('click', () => {
    currentStation = null;
    showView(viewStations);
  });
  document.getElementById('breadcrumbOsce').addEventListener('click', (e) => {
    e.preventDefault();
    stopTimer();
    currentStation = null;
    currentRubrik = null;
    showView(viewStations);
  });

  // ══════════════════════════════════════
  // SELECT RUBRIK → SHOW PRE-START
  // ══════════════════════════════════════
  window.__osceSelectRubrik = function(rubrikId) {
    const rubrik = currentStation.rubrics.find(r => r.id === rubrikId);
    if (!rubrik) return;
    currentRubrik = rubrik;

    // Reset state
    scores = {};
    feedbacks = {};
    globalRating = null;
    timerSeconds = TOTAL_SECONDS;

    // Show pre-start modal
    document.getElementById('prestartRubrikName').textContent = rubrik.name;
    document.getElementById('inputPenguji').value = penguji;
    document.getElementById('inputPeserta').value = peserta;
    prestartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => document.getElementById('inputPenguji').focus(), 300);
  };

  // ── Start exam ──
  document.getElementById('btnStartExam').addEventListener('click', () => {
    const p = document.getElementById('inputPenguji').value.trim();
    const s = document.getElementById('inputPeserta').value.trim();
    if (!p) { showToast('Masukkan nama penguji'); return; }
    if (!s) { showToast('Masukkan nama peserta'); return; }
    penguji = p;
    peserta = s;

    prestartOverlay.classList.remove('active');
    document.body.style.overflow = '';

    renderAssessment();
    showView(viewAssessment);
    startTimer();
  });

  // Close pre-start on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && prestartOverlay.classList.contains('active')) {
      prestartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ── Back to rubriks ──
  document.getElementById('btnBackToRubriks').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin kembali? Timer dan skor akan direset.')) {
      stopTimer();
      showView(viewRubriks);
    }
  });

  // ══════════════════════════════════════
  // RENDER ASSESSMENT
  // ══════════════════════════════════════
  function renderAssessment() {
    if (!currentRubrik) return;

    // Update timer info
    document.getElementById('timerPenguji').textContent = penguji;
    document.getElementById('timerPeserta').textContent = peserta;

    // Update print info
    document.getElementById('printRubrikName').textContent = `RUBRIK PENILAIAN OSCE — ${currentRubrik.name}`;
    document.getElementById('printPenguji').textContent = penguji;
    document.getElementById('printPeserta').textContent = peserta;
    const now = new Date();
    document.getElementById('printDate').textContent = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('printTime').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Render scenario
    const scenarioBox = document.getElementById('scenarioBox');
    if (currentRubrik.scenario && currentRubrik.scenario.trim()) {
      scenarioBox.style.display = '';
      document.getElementById('scenarioTitle').textContent = currentRubrik.name;
      document.getElementById('scenarioText').innerHTML = currentRubrik.scenario;

      const taskList = document.getElementById('scenarioTaskList');
      const tasksContainer = document.getElementById('scenarioTasks');
      if (currentRubrik.tasks && currentRubrik.tasks.length > 0) {
        tasksContainer.style.display = '';
        taskList.innerHTML = currentRubrik.tasks.map(t => `<li>${t}</li>`).join('');
      } else {
        tasksContainer.style.display = 'none';
      }
    } else {
      scenarioBox.style.display = 'none';
    }

    // Render rubrik items
    let itemsHtml = '';
    currentRubrik.items.forEach((item, idx) => {
      itemsHtml += `
        <div class="rubrik-item" id="rubrikItem${idx}">
          <div class="rubrik-item-header">
            <div class="rubrik-item-num">${idx + 1}</div>
            <div style="flex:1">
              <div class="rubrik-item-name">${item.name}${item.langkah ? `<div class="rubrik-item-langkah">${item.langkah}</div>` : ''}</div>
            </div>
            <div class="rubrik-item-bobot">Bobot: ${item.bobot}</div>
          </div>

          <button class="score-detail-trigger" onclick="window.__toggleDetail(${idx})">
            📖 Lihat Deskripsi Skor
          </button>
          <div class="score-detail-panel" id="scoreDetail${idx}">
            ${[0,1,2,3].map(s => `
              <div class="score-detail-item">
                <div class="score-detail-header">
                  <div class="score-detail-num">${s}</div>
                  <strong style="font-size:0.8rem;color:var(--text-secondary)">Skor ${s}</strong>
                </div>
                <div class="score-detail-text">${item.scores[s] || '-'}</div>
              </div>
            `).join('')}
          </div>

          <div class="score-options">
            ${[0,1,2,3].map(s => `
              <button class="score-btn score-${s}" data-item="${idx}" data-score="${s}" onclick="window.__setScore(${idx}, ${s})">
                <span class="score-num">${s}</span>
                <span class="score-label">${s === 0 ? 'Tidak' : s === 1 ? 'Kurang' : s === 2 ? 'Cukup' : 'Baik'}</span>
              </button>
            `).join('')}
          </div>

          <div>
            <label class="feedback-label" for="feedback${idx}">Feedback</label>
            <textarea class="feedback-input" id="feedback${idx}" placeholder="Tuliskan feedback untuk kompetensi ini..." oninput="window.__setFeedback(${idx}, this.value)"></textarea>
          </div>
        </div>`;
    });
    rubrikItems.innerHTML = itemsHtml;

    // Global rating visibility
    const globalRatingEl = document.getElementById('globalRating');
    if (currentRubrik.hasGlobalRating !== false) {
      globalRatingEl.style.display = '';
    } else {
      globalRatingEl.style.display = 'none';
    }

    // Reset global rating buttons
    document.querySelectorAll('.global-rating-btn').forEach(btn => btn.classList.remove('selected'));

    updateScoreSummary();
  }

  // ══════════════════════════════════════
  // SCORE MANAGEMENT
  // ══════════════════════════════════════
  window.__setScore = function(itemIdx, scoreVal) {
    scores[itemIdx] = scoreVal;

    // Update button UI
    document.querySelectorAll(`.score-btn[data-item="${itemIdx}"]`).forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.score) === scoreVal);
    });

    updateScoreSummary();
  };

  window.__setFeedback = function(itemIdx, text) {
    feedbacks[itemIdx] = text;
  };

  window.__toggleDetail = function(idx) {
    const panel = document.getElementById(`scoreDetail${idx}`);
    panel.classList.toggle('show');
  };

  function updateScoreSummary() {
    if (!currentRubrik) return;

    let totalWeightedScore = 0;
    let maxPossibleScore = 0;

    const breakdownHtml = currentRubrik.items.map((item, idx) => {
      const score = scores[idx] !== undefined ? scores[idx] : '-';
      const weighted = score !== '-' ? score * item.bobot : 0;
      maxPossibleScore += 3 * item.bobot;
      if (score !== '-') totalWeightedScore += weighted;

      return `
        <div class="score-breakdown-item">
          <span class="label">${item.name.substring(0, 20)}${item.name.length > 20 ? '...' : ''}</span>
          <span class="value">${score !== '-' ? weighted : '-'}/${3 * item.bobot}</span>
        </div>`;
    }).join('');

    document.getElementById('scoreBreakdown').innerHTML = breakdownHtml;
    document.getElementById('scoreTotalValue').textContent = totalWeightedScore;
    document.getElementById('scoreTotalMax').textContent = `/${maxPossibleScore}`;

    const pct = maxPossibleScore > 0 ? Math.round((totalWeightedScore / maxPossibleScore) * 100) : 0;
    document.getElementById('scorePercentage').textContent = `(${pct}%)`;
  }

  // ── Global Rating ──
  document.querySelectorAll('.global-rating-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.global-rating-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      globalRating = btn.dataset.rating;
    });
  });

  // ══════════════════════════════════════
  // TIMER
  // ══════════════════════════════════════
  function startTimer() {
    timerSeconds = TOTAL_SECONDS;
    timerRunning = true;
    timerPaused = false;
    updateTimerDisplay();
    document.getElementById('btnTimerPause').innerHTML = '⏸ Pause';

    timerInterval = setInterval(() => {
      if (!timerPaused) {
        timerSeconds--;
        updateTimerDisplay();
        if (timerSeconds <= 0) {
          stopTimer();
          showToast('⏰ Waktu habis!');
          // Play a beep sound
          try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = 800;
            gain.gain.value = 0.3;
            osc.start();
            setTimeout(() => { osc.stop(); audioCtx.close(); }, 1000);
          } catch (e) { /* Audio not supported */ }
        }
      }
    }, 1000);
  }

  function stopTimer() {
    timerRunning = false;
    timerPaused = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    const display = document.getElementById('timerDisplay');
    const bar = document.getElementById('timerProgressBar');

    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const pct = (timerSeconds / TOTAL_SECONDS) * 100;
    bar.style.width = `${pct}%`;

    // Warning states
    display.classList.remove('warning', 'danger');
    bar.classList.remove('warning', 'danger');
    if (timerSeconds <= 60) {
      display.classList.add('danger');
      bar.classList.add('danger');
    } else if (timerSeconds <= 180) {
      display.classList.add('warning');
      bar.classList.add('warning');
    }
  }

  // Timer controls
  document.getElementById('btnTimerPause').addEventListener('click', () => {
    if (!timerRunning) return;
    timerPaused = !timerPaused;
    document.getElementById('btnTimerPause').innerHTML = timerPaused ? '▶ Resume' : '⏸ Pause';
  });

  document.getElementById('btnTimerReset').addEventListener('click', () => {
    if (confirm('Reset timer ke 12:00?')) {
      stopTimer();
      startTimer();
    }
  });

  // ── Scenario toggle ──
  document.getElementById('btnToggleScenario').addEventListener('click', () => {
    const box = document.getElementById('scenarioBox');
    const btn = document.getElementById('btnToggleScenario');
    const content = box.querySelector('.scenario-text');
    const tasks = box.querySelector('.scenario-tasks');
    if (content.style.display === 'none') {
      content.style.display = '';
      tasks.style.display = '';
      btn.textContent = 'Sembunyikan Skenario';
    } else {
      content.style.display = 'none';
      tasks.style.display = 'none';
      btn.textContent = 'Tampilkan Skenario';
    }
  });

  // ══════════════════════════════════════
  // PRINT
  // ══════════════════════════════════════
  document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
  });

  // ══════════════════════════════════════
  // RESET
  // ══════════════════════════════════════
  document.getElementById('btnReset').addEventListener('click', () => {
    if (confirm('Reset semua skor dan feedback?')) {
      scores = {};
      feedbacks = {};
      globalRating = null;

      // Reset UI
      document.querySelectorAll('.score-btn').forEach(btn => btn.classList.remove('selected'));
      document.querySelectorAll('.feedback-input').forEach(input => input.value = '');
      document.querySelectorAll('.global-rating-btn').forEach(btn => btn.classList.remove('selected'));
      updateScoreSummary();
      showToast('Semua skor direset');
    }
  });

  // ══════════════════════════════════════
  // INIT
  // ══════════════════════════════════════
  renderStations();

})();
