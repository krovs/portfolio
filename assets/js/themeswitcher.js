// Theme switcher logic
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-switch');
    var sun = btn ? btn.querySelector('.icon-sun') : null;
    var moon = btn ? btn.querySelector('.icon-moon') : null;

    function updateIcon(theme) {
      if (!sun || !moon) return;
      if (theme === 'dark') {
        sun.style.display = 'none';
        moon.style.display = '';
      } else {
        sun.style.display = '';
        moon.style.display = 'none';
      }
    }

    // Initial icon state
    var currentTheme = document.documentElement.getAttribute('data-theme');
    updateIcon(currentTheme);

    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();

        const switchTheme = () => {
          var current = document.documentElement.getAttribute('data-theme');
          var next = current === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
          updateIcon(next);
        }

        if (!document.startViewTransition) {
          switchTheme();
        } else {
          document.startViewTransition(switchTheme);
        }
      });
    }
  });