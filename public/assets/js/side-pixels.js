window.initSidePixels = function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".pixel-rail").forEach(function (rail) {
    if (rail.dataset.pixelsReady) return;
    rail.dataset.pixelsReady = "true";

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var pixels = [];
    var frame = 0;
    var animationFrame = 0;
    var lastTime = 0;

    canvas.className = "pixel-rail-canvas";
    rail.appendChild(canvas);

    function cssColor(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function setup() {
      var rect = rail.getBoundingClientRect();
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var cols = Math.max(6, Math.floor(rect.width / 14));
      var rows = Math.max(16, Math.floor(rect.height / 14));

      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      pixels = Array.from({ length: Math.min(110, cols * 5) }, function () {
        return {
          x: Math.floor(Math.pow(Math.random(), 1.6) * cols),
          y: Math.floor(Math.random() * rows),
          life: Math.floor(Math.random() * 18),
          tone: Math.random(),
          accent: Math.random() < 0.055,
        };
      });
    }

    function draw(time) {
      if (document.hidden) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      if (time - lastTime < 110) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      lastTime = time;
      frame += 1;

      var rect = rail.getBoundingClientRect();
      var cell = 14;
      var main = cssColor("--color-main");
      var accent = cssColor("--color-pixel-accent-1");

      context.clearRect(0, 0, rect.width, rect.height);

      pixels.forEach(function (pixel) {
        if (pixel.life <= 0 || Math.random() > 0.86) {
          pixel.x = Math.floor(Math.pow(Math.random(), 1.7) * Math.max(8, rect.width / cell));
          pixel.y = Math.floor(Math.random() * Math.max(24, rect.height / cell));
          pixel.life = 2 + Math.floor(Math.random() * 9);
          pixel.tone = Math.random();
          pixel.accent = Math.random() < 0.055;
        } else {
          pixel.life -= 1;
        }

        if ((pixel.life + frame) % 3 === 0) return;

        context.globalAlpha = pixel.accent ? 0.72 : pixel.tone > 0.82 ? 0.1 : pixel.tone < 0.18 ? 0.15 : 0.22;
        context.fillStyle = pixel.accent ? accent : main;
        context.fillRect(pixel.x * cell, pixel.y * cell, 6 + (pixel.tone > 0.7 ? 3 : 0), 6 + (pixel.tone < 0.3 ? 3 : 0));
      });

      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    }

    setup();
    animationFrame = requestAnimationFrame(draw);

    window.addEventListener("resize", setup, { passive: true });
    window.addEventListener("beforeunload", function () {
      cancelAnimationFrame(animationFrame);
    }, { once: true });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.initSidePixels);
} else {
  window.initSidePixels();
}

document.addEventListener("astro:page-load", window.initSidePixels);
