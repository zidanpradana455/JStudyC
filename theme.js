/* JStudyC — Theme Management */
(function() {
  const currentTheme = localStorage.getItem('jstudyc_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
      themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('jstudyc_theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
        
        // Dispatch custom event to notify canvas animations
        window.dispatchEvent(new Event('themeChanged'));
      });
    }
  });
})();
