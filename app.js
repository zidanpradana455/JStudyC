/* ═══════════════════════════════════════════
   JStudyC — App Logic
   Intro, Animations, Auth, Mobile Menu
   ═══════════════════════════════════════════ */

// Intro reveal runs first so the page never waits on the auth SDK.
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));

(async function () {
  'use strict';

  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;

  // ─── Navbar Scroll ───
  const navbar = document.getElementById('navbar');
  const syncNav = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  // ─── Mobile Menu ───
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    const open = !navLinks.classList.contains('open');
    menuToggle.classList.toggle('active', open);
    navLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ─── Scroll Reveal (Intersection Observer) ───
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Counter Animation ───
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(el => {
      const target = +el.dataset.target;
      const duration = 2000;
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + '+';
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  const statsSection = document.getElementById('stats');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);

  // ─── Login Modal ───
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const loginFormDiv = document.getElementById('loginForm');
  const registerFormDiv = document.getElementById('registerForm');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');

  function openModal(mode) {
    if (mode === 'register') {
      loginFormDiv.style.display = 'none';
      registerFormDiv.style.display = 'block';
    } else {
      loginFormDiv.style.display = 'block';
      registerFormDiv.style.display = 'none';
    }
    clearErrors();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('btnOpenLogin').addEventListener('click', () => openModal('login'));
  document.getElementById('btnHeroLogin').addEventListener('click', () => openModal('login'));
  document.getElementById('btnHeroStart').addEventListener('click', () => openModal('register'));
  document.getElementById('btnCtaStart').addEventListener('click', () => openModal('register'));

  // Close on button click inside mobile menu
  navLinks.querySelector('.btn-login').addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  switchToRegister.addEventListener('click', () => openModal('register'));
  switchToLogin.addEventListener('click', () => openModal('login'));

  // ─── Toast ───
  const toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ─── Form Validation & LocalStorage Auth ───
  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
      el.classList.remove('show');
      el.textContent = '';
    });
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.add('show');
  }

  function getAuthMessage(error) {
    if (!error) return 'Terjadi kesalahan. Coba lagi.';
    const msg = error.message || '';
    if (msg.toLowerCase().includes('invalid login credentials')) return 'Email atau password salah';
    if (msg.toLowerCase().includes('already registered')) return 'Email sudah terdaftar';
    if (msg.toLowerCase().includes('password')) return 'Password belum memenuhi syarat';
    return msg;
  }

  function setButtonLoading(button, isLoading, text) {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalText = button.textContent;
      button.textContent = text;
      button.disabled = true;
    } else {
      button.textContent = button.dataset.originalText || button.textContent;
      button.disabled = false;
    }
  }

  // Register
  document.getElementById('btnRegister').addEventListener('click', async () => {
    clearErrors();
    const button = document.getElementById('btnRegister');
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    let valid = true;
    if (!name) { showError('regNameError', 'Nama wajib diisi'); valid = false; }
    if (!email || !email.includes('@')) { showError('regEmailError', 'Email tidak valid'); valid = false; }
    if (password.length < 6) { showError('regPasswordError', 'Minimal 6 karakter'); valid = false; }
    if (!valid) return;

    setButtonLoading(button, true, 'Mendaftarkan...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      showError('regEmailError', getAuthMessage(error));
      setButtonLoading(button, false);
      return;
    }

    if (data.session && data.user) {
      await backend.ensureProfile(data.user, name);
      localStorage.removeItem('jstudyc_session');
      localStorage.removeItem('jstudyc_users');
      closeModal();
      showToast('Registrasi berhasil! Mengalihkan...');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      return;
    }

    closeModal();
    showToast('Registrasi berhasil. Cek email untuk konfirmasi akun.');
    setButtonLoading(button, false);
  });

  // Login
  document.getElementById('btnLogin').addEventListener('click', async () => {
    clearErrors();
    const button = document.getElementById('btnLogin');
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let valid = true;
    if (!email || !email.includes('@')) { showError('loginEmailError', 'Email tidak valid'); valid = false; }
    if (!password) { showError('loginPasswordError', 'Password wajib diisi'); valid = false; }
    if (!valid) return;

    setButtonLoading(button, true, 'Masuk...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showError('loginPasswordError', getAuthMessage(error));
      setButtonLoading(button, false);
      return;
    }

    await backend.ensureProfile(data.user);
    localStorage.removeItem('jstudyc_session');
    localStorage.removeItem('jstudyc_users');
    closeModal();
    showToast('Selamat datang kembali! Mengalihkan...');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  });

  // ─── Session UI ───
  function updateNavForLoggedIn(name) {
    const btn = document.getElementById('btnOpenLogin');
    btn.textContent = 'Dashboard';
    btn.onclick = () => { window.location.href = 'dashboard.html'; };
    // Also update hero buttons to go to dashboard
    document.getElementById('btnHeroStart').innerHTML = 'Ke dashboard <span class="btn-arrow">→</span>';
    document.getElementById('btnHeroStart').onclick = () => { window.location.href = 'dashboard.html'; };
    document.getElementById('btnHeroLogin').textContent = 'Dashboard';
    document.getElementById('btnHeroLogin').onclick = () => { window.location.href = 'dashboard.html'; };
  }

  // Check session on load
  const user = await backend.getCurrentUser();
  if (user) {
    const profile = await backend.ensureProfile(user);
    updateNavForLoggedIn(profile.name);
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
