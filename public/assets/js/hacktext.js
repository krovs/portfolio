function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

window.initHackText = function () {
  const chars = '!<>-_\\/[]{}=+*^?#@$%&|~;:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  document.querySelectorAll('nav a.secondary').forEach(link => {
    if (link.dataset.hackTextReady) return;
    link.dataset.hackTextReady = "true";

    var target = link.querySelector('span') || link;
    var originalText = target.textContent;
    var interval = null;

    link.addEventListener('mouseenter', () => {
      clearInterval(interval);
      var iteration = 0;

      interval = setInterval(() => {
        target.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor(iteration)) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 0.45;

        if (iteration > originalText.length) {
          target.textContent = originalText;
          clearInterval(interval);
        }
      }, 30);
    });

    link.addEventListener('mouseleave', () => {
      clearInterval(interval);
      target.textContent = originalText;
    });
  });
};

onReady(window.initHackText);
