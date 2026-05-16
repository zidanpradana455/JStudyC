/* ═══════════════════════════════════════════
   JStudyC — App Logic
   Particles, Animations, Auth, Mobile Menu
   ═══════════════════════════════════════════ */

(async function () {
  'use strict';

  const backend = window.JStudyCBackend;
  const supabase = backend.supabase;

  // ─── Particle Canvas System ───
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animId;
  const PARTICLE_COUNT_DESKTOP = 80;
  const PARTICLE_COUNT_MOBILE = 35;
  const CONNECTION_DIST = 140;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.015;
          this.y -= dy * force * 0.015;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      const theme = document.documentElement.getAttribute('data-theme');
      const rgb = theme === 'light' ? '0, 0, 0' : '255, 255, 255';
      ctx.fillStyle = `rgba(${rgb}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = window.innerWidth < 640 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animId = requestAnimationFrame(animateParticles);
  }

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // ─── Navbar Scroll ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ─── Mobile Menu ───
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
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
    document.getElementById('btnHeroStart').textContent = 'Ke Dashboard';
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
