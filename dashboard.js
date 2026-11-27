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

  // ── Scroll Reveal ──
  const ro = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);} }), {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── Patch updates ──
  const PATCH_UPDATES = [
    {
      id: 'materi-blok-ii-6-modul-2-2026-11-27',
      category: 'Materi',
      date: '27 Nov 2026',
      title: 'Materi Blok II.6 Modul 2 (2.1–2.8)',
      summary: 'Delapan lecture Modul 2 kini tersedia: rangkuman bergambar dan 10 soal latihan tipe Cumex per lecture.',
      highlights: [
        'EL 2.1 Dispnea & Takipnea, IS 2.2 Hipoksemia/Hipoksia, IS 2.3 Gangguan Pertukaran Gas, EL 2.4 Kanker Paru.',
        'IS 2.5 Gagal Napas Neurogenik Sentral, IS 2.6 Dispnea pada Penyakit Neurologis, PD 2.7 ARDS, IS 2.8 Pneumotoraks, Efusi Pleura & Hemotoraks.',
        'Daftar materi kini dikelompokkan per modul: lecture diurutkan sesuai nomor, praktikum dipisah.'
      ]
    },
    {
      id: 'dashboard-per-blok-materi-2026-11-19',
      category: 'Fitur Baru',
      date: '19 Nov 2026',
      title: 'Dashboard per blok & Materi Blok II.6',
      summary: 'Setiap blok kini punya halaman sendiri berisi materi per lecture, paket soal ujian, dan progres blok tersebut.',
      highlights: [
        'Dashboard menampilkan kartu per blok dengan progres soal dan akurasi masing-masing blok.',
        'Halaman blok memisahkan tab Materi dan Soal Ujian (Cumex 1, Cumex 2, UAS).',
        'Materi Blok II.6 EL 1.2–1.7, IS 1.8 Pneumonia, PS 1.1 praktikum mikrobiologi, PD 1.9 dan PD 1.10 Tuberkulosis: rangkuman bergambar, dengan 10 soal latihan tipe Cumex pada tiap lecture (praktikum tanpa soal).',
        'Lecture Blok II.6 lainnya menyusul bertahap.'
      ]
    },
    {
      id: 'blok-ii-6-cumex-1-2026-11-18',
      category: 'Paket Soal',
      date: '18 Nov 2026',
      title: 'Cumex 1 Blok II.6 — IUP & Reguler',
      summary: 'Paket Cough, Dyspnea, and Cyanosis tersedia untuk IUP 2021–2023 dan Reguler 2023.',
      highlights: [
        'IUP 2021: 18 soal; IUP 2022: 14 soal; IUP 2023: 15 soal.',
        'Reguler 2023: 15 soal.',
        'Delapan soal dilengkapi gambar (rontgen, histopatologi, makroskopis, uji katalase).',
        'Soal yang disusun ulang dari rekap tidak lengkap diberi label Rekonstruksi AI.'
      ]
    },
    {
      id: 'blok-ii-5-import-2026-10-29',
      category: 'Paket Soal',
      date: '29 Okt 2026',
      title: 'Cumex 2 & UAS Blok II.5',
      summary: '397 soal tambahan untuk Reguler 2023 dan IUP 2021–2023.',
      highlights: [
        'Cumex 2: 215 soal; UAS: 182 soal.',
        'Acromion masuk Reguler 2023; Lakrawiyasa masuk IUP 2023.',
        '100 soal tambahan berlabel: 81 rekonstruksi dan 19 soal pengganti AI.',
        'Sembilan gambar sumber tersedia pada soal terkait.',
        'Seluruh 79 soal Cumex 1 tetap tersedia.'
      ]
    },
    {
      id: 'blok-ii-5-cumex-1-update-2026-10-10',
      category: 'Paket Soal',
      date: '10 Okt 2026',
      title: 'Cumex 1 Blok II.5 — IUP & Reguler',
      summary: 'Paket Oedema, Urinary and Metabolic Disorders tersedia untuk IUP 2021–2023 dan Reguler 2023.',
      highlights: [
        'IUP 2021: 21 soal; IUP 2022: 20 soal; IUP 2023: 20 soal.',
        'Reguler 2023: 18 soal.',
        'Enam soal memiliki gambar rujukan yang belum tersedia; keterangan ditampilkan pada soal terkait.'
      ]
    },
    {
      id: 'blok-ii-4-uas-cumex2iup-update-2026-09-18',
      category: 'Paket Soal',
      date: '18 Sep 2026',
      title: 'UAS & Cumex 2 IUP Blok II.4 (2022 & 2023)',
      summary: 'Tersedia paket soal UAS (Reguler & IUP) dan Cumex 2 IUP untuk Blok II.4 tahun 2022 dan 2023 lengkap dengan pembahasan.',
      highlights: [
        'UAS Reguler 2022: 43 soal beserta pembahasan lengkap.',
        'UAS Reguler 2023: 42 soal beserta pembahasan lengkap.',
        'UAS IUP 2023: 43 soal beserta pembahasan lengkap.',
        'UAS IUP 2022: 36 soal beserta pembahasan lengkap.',
        'Cumex 2 IUP 2022: 22 soal beserta pembahasan.',
        'Cumex 2 IUP 2023: 41 soal beserta pembahasan.',
        'Navigasi tab UAS pada kartu Blok II.4 di dashboard.'
      ]
    },
    {
      id: 'blok-ii-4-cumex-2-update-2026-06-12',
      category: 'Paket Soal',
      date: '12 Jun 2026',
      title: 'Paket Soal Blok II.4 Cumex 2 (2022 & 2023)',
      summary: 'Tersedia paket latihan soal Cumex 2 Reguler untuk Blok II.4 tahun 2022 (96 soal) dan 2023 (61 soal) lengkap dengan pembahasan.',
      highlights: [
        'Cumex 2 Reguler 2022: 96 butir soal beserta materi kuliah dan pembahasan lengkap.',
        'Cumex 2 Reguler 2023: 61 butir soal beserta materi kuliah dan pembahasan lengkap.',
        'Navigasi tab Cumex 2 pada kartu Blok II.4 di dashboard untuk kemudahan akses.',
        'Penyimpanan progres pengerjaan kuis otomatis terhubung dengan profil akun.'
      ]
    },
    {
      id: 'osce-case-simulation-update-2026-06-10',
      category: 'OSCE',
      date: '10 Jun 2026',
      title: 'Skenario kasus & panduan penguji OSCE',
      summary: 'Setiap rubrik Mini OSCE kini dilengkapi pilihan kasus, panduan pasien simulasi, dan detail penilaian pada masing-masing kompetensi.',
      highlights: [
        'Tersedia 31 variasi kasus yang dipetakan ke seluruh 13 rubrik Mini OSCE.',
        'Panduan pasien simulasi memuat identitas, kalimat pembuka, sikap, serta jawaban anamnesis.',
        'Informasi kasus ditempatkan langsung pada kompetensi anamnesis, pemeriksaan fisik, penunjang, diagnosis, tatalaksana, edukasi, dan profesionalisme.',
        'Kasus dapat dipilih sebelum timer dimulai dan ikut ditampilkan dalam hasil cetak rubrik.',
        'Detail tatalaksana dan resep ditampilkan lengkap mengikuti materi kasus.'
      ]
    },
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
        'UAS Reguler: 2022 (47 soal) dan 2023 (45 soal).',
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

  // ── Block hub ──
  const Progress = window.JStudyCProgress;
  const progress = await Progress.load(supabase, user);

  function materiInfo(entry) {
    const materi = entry.materi && (window.MATERI_DATA || {})[entry.materi.id];
    if (!materi) return null;
    return { ready: materi.units.filter(u => u.available).length, total: materi.units.length };
  }

  function renderBlockCard(entry) {
    const stats = Progress.stats(Progress.blockQuestionIds(entry), progress);
    const exams = Progress.sortedExams(entry.questionBlock)
      .map(id => QUESTION_DATA[entry.questionBlock].exams[id].name || id);
    const materi = materiInfo(entry);
    const chips = [
      materi ? `<span class="hub-chip">Materi ${materi.ready}/${materi.total}</span>` : '',
      exams.length ? `<span class="hub-chip">${exams.map(escapeHTML).join(' · ')}</span>` : ''
    ].join('');
    const started = stats.answered > 0;
    return `<a class="hub-card" href="blok.html?id=${encodeURIComponent(entry.id)}">
      <div class="hub-card-top">
        <span class="block-badge">${escapeHTML(entry.badge)}</span>
        ${started ? `<span class="hub-card-status">${stats.completed}/${stats.total} paket selesai</span>` : ''}
      </div>
      <h3 class="hub-card-title">${escapeHTML(entry.name)}</h3>
      <p class="hub-card-desc">${escapeHTML(entry.desc)}</p>
      <div class="hub-chips">${chips}</div>
      <div class="hub-tracker" aria-label="Progres ${escapeHTML(entry.badge)}">
        <div class="hub-tracker-bar"><div style="width:${stats.coverage}%"></div></div>
        <div class="hub-tracker-stats">
          <span><strong>${stats.answered}</strong>/${stats.totalQuestions} soal</span>
          <span><strong>${stats.accuracy}%</strong> akurasi</span>
        </div>
      </div>
      <span class="hub-card-cta">${started ? 'Lanjutkan' : 'Buka blok'} <span aria-hidden="true">→</span></span>
    </a>`;
  }

  document.getElementById('blockGrid').innerHTML = BLOCK_CATALOG
    .filter(b => b.group !== 'other').map(renderBlockCard).join('');
  document.getElementById('otherGrid').insertAdjacentHTML('afterbegin', BLOCK_CATALOG
    .filter(b => b.group === 'other').map(renderBlockCard).join(''));

  initPatchUpdates();
})();
