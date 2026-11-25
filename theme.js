/* JStudyC — Theme Management */
(function () {
  let stored = null;
  try { stored = localStorage.getItem('jstudyc_theme'); } catch (e) { /* storage blocked */ }
  const currentTheme = stored || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  function render(btn, theme) {
    btn.innerHTML = '<span class="theme-dot" aria-hidden="true"></span><span class="theme-label">' +
      (theme === 'light' ? 'Light' : 'Dark') + '</span>';
    btn.setAttribute('aria-label', theme === 'light' ? 'Ganti ke mode gelap' : 'Ganti ke mode terang');
  }

  window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    render(themeToggle, currentTheme);
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      try { localStorage.setItem('jstudyc_theme', newTheme); } catch (e) { /* ignore */ }
      render(themeToggle, newTheme);
      window.dispatchEvent(new Event('themeChanged'));
    });
  });
})();
