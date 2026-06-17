// Function to get particle colors based on current theme
function getParticleColors() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    particleColor: isDark ? "#ffffff" : "#888888",
    linkColor: isDark ? "#ffffff" : "#888888",
    particleOpacity: isDark ? 0.2 : 0.3,
    linkOpacity: isDark ? 0.2 : 0.2,
  };
}

// Expose for external use
window.refreshParticleColors = function() {
  var colors = getParticleColors();
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    var pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = colors.particleColor;
    pJS.particles.opacity.value = colors.particleOpacity;
    pJS.particles.line_linked.color = colors.linkColor;
    pJS.particles.line_linked.opacity = colors.linkOpacity;
    pJS.fn.particlesRefresh();
  }
};

// Initialize particles with theme-appropriate colors
const initialColors = getParticleColors();

particlesJS("particles-js", {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: initialColors.particleColor,
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: initialColors.particleOpacity,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: initialColors.linkColor,
      opacity: initialColors.linkOpacity,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
