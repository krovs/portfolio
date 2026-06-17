function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

onReady(() => {
  const el = document.getElementById('morph-text');
  if (!el) return;

  const originalText = el.textContent;
  const chars = '!<>-_\\/[]{}=+*^?#@$%&|~;:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function scrambleChar() {
    const count = Math.floor(Math.random() * Math.min(3, originalText.length)) + 1;
    const indices = new Set();

    while (indices.size < count) {
      const i = Math.floor(Math.random() * originalText.length);
      if (originalText[i] !== ' ') indices.add(i);
    }

    const charsArr = originalText.split('');

    const tick = () => {
      for (const i of indices) {
        charsArr[i] = chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = charsArr.join('');
    };

    let ticks = 0;
    const maxTicks = 8 + Math.floor(Math.random() * 8);
    const id = setInterval(() => {
      tick();
      ticks++;
      if (ticks >= maxTicks) {
        el.textContent = originalText;
        clearInterval(id);
      }
    }, 30);
  }

  setInterval(scrambleChar, 10000);
});
