function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

onReady(() => {
  const chars = '!<>-_\\/[]{}=+*^?#@$%&|~;:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  document.querySelectorAll('nav a.secondary').forEach(link => {
    const originalText = link.textContent;
    let interval = null;

    link.addEventListener('mouseenter', () => {
      clearInterval(interval);
      let iteration = 0;

      interval = setInterval(() => {
        link.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor(iteration)) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 0.45;

        if (iteration > originalText.length) {
          link.textContent = originalText;
          clearInterval(interval);
        }
      }, 30);
    });

    link.addEventListener('mouseleave', () => {
      clearInterval(interval);
      link.textContent = originalText;
    });
  });
});
