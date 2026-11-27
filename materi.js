/* JStudyC — Materi (lecture summaries + per-lecture quiz) */
(async function () {
  'use strict';

  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;
  const user = await backend.requireCurrentUser();
  if (!user) return;

  // ── Navbar ──
  document.getElementById('btnLogout').addEventListener('click', async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('jstudyc_session');
    window.location.href = 'index.html';
  });
  const mt = document.getElementById('menuToggle');
  const nl = document.getElementById('navLinks');
  mt.addEventListener('click', () => { mt.classList.toggle('active'); nl.classList.toggle('open'); });

  // ── Data ──
  const params = new URLSearchParams(window.location.search);
  const blockId = params.get('block') || 'blok-ii-6';
  const materi = (window.MATERI_DATA || {})[blockId];
  if (!materi) { window.location.href = 'dashboard.html'; return; }
  const units = materi.units;

  const back = document.getElementById('materiBack');
  back.href = `blok.html?id=${encodeURIComponent(blockId)}&tab=materi`;
  back.lastChild.textContent = ` ${materi.name}`;
  document.getElementById('materiBlockName').textContent = materi.name;
  document.getElementById('materiFullName').textContent = materi.fullName;
  const available = units.filter(u => u.available);
  const totalQuestions = units.reduce((n, u) => n + (u.quiz ? u.quiz.count : 0), 0);
  document.getElementById('materiStats').textContent =
    `${available.length}/${units.length} materi tersedia · ${totalQuestions} soal latihan`;

  // ── Quiz progress (same table quiz.js writes to) ──
  const progress = {};
  const { data: rows, error } = await supabase.from('quiz_progress')
    .select('progress_key, answered, correct, total')
    .eq('user_id', user.id)
    .like('progress_key', 'materi-%');
  if (error) console.error(error);
  (rows || []).forEach(r => { progress[r.progress_key] = r; });
  const progressFor = u => u.quiz
    ? progress[`${u.quiz.block}_${u.quiz.exam}_${u.quiz.type}_${u.quiz.year}`] : null;

  // ── Markdown (small, trusted subset: content is authored in the repo) ──
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function inline(s) {
    return escapeHTML(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  }
  function slugify(s) {
    return s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  const CALLOUTS = {
    TAMBAHAN: { icon: '💡', label: 'Tambahan' },
    KLINIS: { icon: '🩺', label: 'Klinis' },
    HIGHYIELD: { icon: '⭐', label: 'High-yield' },
    PENTING: { icon: '⚠️', label: 'Penting' }
  };

  function renderMarkdown(md) {
    const lines = md.replace(/\r/g, '').split('\n');
    const out = [];
    const toc = [];
    let i = 0;
    const isTable = l => /^\s*\|.*\|\s*$/.test(l);
    const listItem = l => l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      let m;
      if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
        const level = m[1].length;
        if (level === 1) { i++; continue; } // unit title is rendered from metadata
        const id = slugify(m[2]);
        if (level === 2) toc.push({ id, text: m[2] });
        out.push(`<h${level} id="${id}">${inline(m[2])}</h${level}>`);
        i++; continue;
      }
      if (/^-{3,}\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

      if ((m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/))) {
        out.push(`<figure class="materi-figure"><button type="button" class="materi-figure-btn" data-src="${escapeHTML(m[2])}" data-caption="${escapeHTML(m[1])}">` +
          `<img src="${escapeHTML(m[2])}" alt="${escapeHTML(m[1])}" loading="lazy"></button>` +
          `<figcaption>${inline(m[1])}</figcaption></figure>`);
        i++; continue;
      }

      if (line.startsWith('>')) {
        const buf = [];
        while (i < lines.length && lines[i].startsWith('>')) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
        let text = buf.join(' ');
        let type = null;
        const cm = text.match(/^\[!(\w+)\]\s*/);
        if (cm && CALLOUTS[cm[1]]) { type = cm[1]; text = text.slice(cm[0].length); }
        const c = CALLOUTS[type] || { icon: '📌', label: 'Catatan' };
        out.push(`<aside class="materi-callout materi-callout--${(type || 'note').toLowerCase()}">` +
          `<div class="materi-callout-label">${c.icon} ${c.label}</div><p>${inline(text)}</p></aside>`);
        continue;
      }

      if (isTable(line)) {
        const rowsMd = [];
        while (i < lines.length && isTable(lines[i])) { rowsMd.push(lines[i]); i++; }
        const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        const head = cells(rowsMd[0]);
        const body = rowsMd.slice(/^[\s|:-]+$/.test(rowsMd[1] || '') ? 2 : 1).map(cells);
        out.push('<div class="materi-table-wrap"><table><thead><tr>' +
          head.map(h => `<th>${inline(h)}</th>`).join('') + '</tr></thead><tbody>' +
          body.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
          '</tbody></table></div>');
        continue;
      }

      if (listItem(line)) {
        // One nesting level: items indented by 2+ spaces belong to the previous item.
        const ordered = /\d+\./.test(listItem(line)[2]);
        const items = [];
        while (i < lines.length && listItem(lines[i])) {
          const lm = listItem(lines[i]);
          if (lm[1].length >= 2 && items.length) items[items.length - 1].children.push(lm[3]);
          else items.push({ text: lm[3], children: [] });
          i++;
        }
        const tag = ordered ? 'ol' : 'ul';
        out.push(`<${tag}>` + items.map(it => `<li>${inline(it.text)}` +
          (it.children.length ? '<ul>' + it.children.map(c => `<li>${inline(c)}</li>`).join('') + '</ul>' : '') +
          '</li>').join('') + `</${tag}>`);
        continue;
      }

      const para = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|!\[|-{3,}\s*$)/.test(lines[i])
        && !isTable(lines[i]) && !listItem(lines[i])) { para.push(lines[i].trim()); i++; }
      out.push(`<p>${inline(para.join(' '))}</p>`);
    }
    return { html: out.join('\n'), toc };
  }

  // ── Sidebar ──
  // Lectures (EL/IS/PD) are listed together in numeric order; practicals stay in their own group.
  function groupUnits(list) {
    const num = u => (u.code.match(/(\d+)\.(\d+)/) || [0, 0, 0]).slice(1).map(Number);
    const sorted = [...list].sort((a, b) => { const x = num(a), y = num(b); return x[0] - y[0] || x[1] - y[1]; });
    const isPractical = u => u.practical || /^PS\b/.test(u.code);
    return [['Lecture', sorted.filter(u => !isPractical(u))], ['Praktikum', sorted.filter(isPractical)]]
      .filter(([, items]) => items.length);
  }
  const sidebar = document.getElementById('materiNav');
  function renderSidebar(activeSlug) {
    sidebar.innerHTML = groupUnits(units).map(([kind, list]) => `
      <div class="materi-nav-group">
        <div class="materi-nav-label">${escapeHTML(kind)}</div>
        ${list.map(u => {
          const p = progressFor(u);
          const done = p && u.quiz && p.answered >= u.quiz.count;
          const state = !u.available ? '<span class="materi-nav-state">Segera</span>'
            : done ? `<span class="materi-nav-state materi-nav-state--done">${p.correct}/${u.quiz.count}</span>` : '';
          return `<button type="button" class="materi-nav-item${u.slug === activeSlug ? ' active' : ''}${u.available ? '' : ' is-locked'}"
            data-slug="${u.slug}" ${u.available ? '' : 'disabled'}>
            <span class="materi-nav-code">${escapeHTML(u.code)}</span>
            <span class="materi-nav-title">${escapeHTML(u.title)}</span>${state}
          </button>`;
        }).join('')}
      </div>`).join('');
    sidebar.querySelectorAll('.materi-nav-item:not([disabled])').forEach(btn =>
      btn.addEventListener('click', () => showUnit(btn.dataset.slug, true)));
  }

  // ── Article ──
  const article = document.getElementById('materiArticle');
  function renderQuizCard(u) {
    if (!u.quiz) return '';
    const p = progressFor(u);
    const answered = p ? p.answered : 0;
    const pct = Math.min(100, Math.round(answered / u.quiz.count * 100));
    const href = `quiz.html?block=${encodeURIComponent(u.quiz.block)}&exam=${encodeURIComponent(u.quiz.exam)}` +
      `&type=${encodeURIComponent(u.quiz.type)}&year=${encodeURIComponent(u.quiz.year)}`;
    const status = answered === 0 ? 'Belum dikerjakan'
      : answered >= u.quiz.count ? `Selesai · ${p.correct}/${u.quiz.count} benar` : `${answered}/${u.quiz.count} dijawab`;
    return `<section class="materi-quiz-card">
      <div>
        <div class="materi-quiz-kicker">Latihan soal tipe Cumex</div>
        <h3>${u.quiz.count} soal ${escapeHTML(u.code)}</h3>
        <p>Kasus klinis dan soal bergambar, lengkap dengan pembahasan tiap pilihan jawaban.</p>
        <div class="materi-quiz-progress"><div style="width:${pct}%"></div></div>
        <span class="materi-quiz-status">${status}</span>
      </div>
      <a class="btn-primary" href="${href}">${answered ? 'Lanjutkan Quiz' : 'Mulai Quiz'}</a>
    </section>`;
  }

  function showUnit(slugValue, push) {
    const u = units.find(x => x.slug === slugValue && x.available) || available[0];
    if (!u) {
      article.innerHTML = '<div class="materi-empty">Materi belum tersedia.</div>';
      return;
    }
    const { html, toc } = renderMarkdown(u.markdown);
    article.innerHTML = `
      <header class="materi-unit-header">
        <div class="materi-unit-badges">
          <span class="block-badge">${escapeHTML(u.code)}</span>
          <span class="materi-kind">${escapeHTML(u.kind)}</span>
        </div>
        <h2 class="materi-unit-title">${escapeHTML(u.title)}</h2>
        <p class="materi-unit-meta">${escapeHTML(u.dept)}${u.lecturers.length ? ' · ' + u.lecturers.map(escapeHTML).join(' · ') : ''}</p>
        ${u.quiz ? `<a class="materi-jump" href="#materiQuiz">Langsung ke quiz ↓</a>` : ''}
      </header>
      ${toc.length ? `<nav class="materi-toc" aria-label="Daftar isi">${toc.map(t =>
        `<a href="#${t.id}">${inline(t.text)}</a>`).join('')}</nav>` : ''}
      <div class="materi-content">${html}</div>
      <div id="materiQuiz">${renderQuizCard(u)}</div>`;
    article.querySelectorAll('.materi-figure-btn').forEach(btn =>
      btn.addEventListener('click', () => openLightbox(btn.dataset.src, btn.dataset.caption)));
    renderSidebar(u.slug);
    if (push) {
      params.set('unit', u.slug);
      history.replaceState(null, '', `${location.pathname}?${params}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.title = `${u.code} ${u.title} — Materi JStudyC`;
  }

  // ── Lightbox ──
  const lightbox = document.getElementById('materiLightbox');
  const lightboxImg = document.getElementById('materiLightboxImg');
  const lightboxCaption = document.getElementById('materiLightboxCaption');
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  showUnit(params.get('unit'), false);
})();
