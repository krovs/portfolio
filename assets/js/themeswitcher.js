// Theme switcher logic
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("theme-switch");
  var sun = btn ? btn.querySelector(".icon-sun") : null;
  var moon = btn ? btn.querySelector(".icon-moon") : null;
  var logoVideo = document.getElementById("logo-video");

  function updateIcon(theme) {
    if (!sun || !moon) return;
    if (theme === "dark") {
      sun.style.display = "none";
      moon.style.display = "";
    } else {
      sun.style.display = "";
      moon.style.display = "none";
    }
  }

  function updateLogo(theme) {
    if (!logoVideo) return;
    var videoSrc = theme === "dark" ? "assets/images/darkme.webm" : "assets/images/lightme.webm";
    logoVideo.src = videoSrc;
    logoVideo.querySelector("source").src = videoSrc;
    logoVideo.load();
  }

  // Initial icon state and logo
  var currentTheme = document.documentElement.getAttribute("data-theme");
  updateIcon(currentTheme);
  updateLogo(currentTheme);

  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const switchTheme = () => {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateIcon(next);
        updateLogo(next);
      };

      if (!document.startViewTransition) {
        switchTheme();
      } else {
        document.startViewTransition(switchTheme);
      }
    });
  }
});
