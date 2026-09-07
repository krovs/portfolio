(function () {
  function sameOriginLink(link) {
    if (!link || link.target || link.hasAttribute("download")) return false;
    if (link.dataset.noRouter !== undefined) return false;
    var url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  }

  function updateHead(doc) {
    var title = doc.querySelector("title");
    if (title) document.title = title.textContent;

    var nextDescription = doc.querySelector('meta[name="description"]');
    var description = document.querySelector('meta[name="description"]');
    if (description && nextDescription) description.content = nextDescription.content;

    var nextCanonical = doc.querySelector('link[rel="canonical"]');
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && nextCanonical) canonical.href = nextCanonical.href;
  }

  function initPageScripts() {
    if (window.initThemeSwitcher) window.initThemeSwitcher();
    if (window.initHackText) window.initHackText();
    if (window.initMorphText) window.initMorphText();
    if (window.initLatestPost) window.initLatestPost();
    if (window.initPostImageZoom) window.initPostImageZoom();
  }

  async function navigate(url, push) {
    var target = new URL(url, window.location.href);
    if (
      target.pathname === window.location.pathname &&
      target.search === window.location.search &&
      target.hash === window.location.hash
    ) return;

    var response = await fetch(url, { headers: { "X-Requested-With": "fetch" } });
    if (!response.ok) {
      window.location.href = url;
      return;
    }

    var html = await response.text();
    var doc = new DOMParser().parseFromString(html, "text/html");
    var nextMain = doc.querySelector("main");
    var currentMain = document.querySelector("main");
    if (!nextMain || !currentMain) {
      window.location.href = url;
      return;
    }

    currentMain.innerHTML = nextMain.innerHTML;
    document.body.classList.toggle("home-page", doc.body.classList.contains("home-page"));
    updateHead(doc);
    if (push) history.pushState({}, "", url);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    initPageScripts();
  }

  document.addEventListener("click", function (event) {
    var openMenu = document.querySelector(".mobile-nav[open]");
    if (openMenu && !openMenu.contains(event.target)) openMenu.removeAttribute("open");

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target.closest("a");
    if (!sameOriginLink(link)) return;

    event.preventDefault();
    navigate(link.href, true).catch(function () {
      window.location.href = link.href;
    });
  });

  window.addEventListener("popstate", function () {
    navigate(window.location.href, false).catch(function () {
      window.location.reload();
    });
  });

  window.initPageScripts = initPageScripts;
  document.addEventListener("DOMContentLoaded", initPageScripts);
})();
