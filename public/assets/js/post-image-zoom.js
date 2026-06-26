function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

window.initPostImageZoom = function () {
  function isImageOnlyParagraph(node) {
    if (!node || node.tagName !== "P") {
      return false;
    }

    const images = node.querySelectorAll("img");
    return images.length > 0 && node.textContent.trim() === "";
  }

  function groupImageRows(container) {
    if (!container) return;
    var paragraphs = Array.from(container.querySelectorAll("p"));

    paragraphs.forEach(function (paragraph) {
      if (!isImageOnlyParagraph(paragraph)) {
        return;
      }

      var images = Array.from(paragraph.querySelectorAll("img"));

      if (images.length < 2) {
        return;
      }

      var row = document.createElement("div");
      row.className = "post-image-row";

      paragraph.parentNode.insertBefore(row, paragraph);
      images.forEach(function (image) { row.appendChild(image); });
      paragraph.remove();
    });
  }

  var postText = document.querySelector(".posttext");
  groupImageRows(postText);

  if (window.__postImageZoomReady) return;
  window.__postImageZoomReady = true;

  var overlay = document.querySelector(".image-zoom-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "image-zoom-overlay";
    overlay.setAttribute("aria-hidden", "true");

    var zoomedImage = document.createElement("img");
    zoomedImage.alt = "";

    overlay.appendChild(zoomedImage);
    document.body.appendChild(overlay);
  }

  var zoomedImage = overlay.querySelector("img");

  function closeOverlay() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    zoomedImage.removeAttribute("src");
    document.body.style.overflow = "";
  }

  function openOverlay(image) {
    zoomedImage.src = image.currentSrc || image.src;
    zoomedImage.alt = image.alt || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  document.addEventListener("click", function (event) {
    if (overlay.classList.contains("is-open")) return;
    var image = event.target.closest("img");
    if (!image) return;
    var postCont = document.querySelector(".postcont");
    if (!postCont || !postCont.contains(image)) return;
    event.preventDefault();
    openOverlay(image);
  });

  overlay.addEventListener("click", function (event) {
    closeOverlay();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });
};

onReady(window.initPostImageZoom);
