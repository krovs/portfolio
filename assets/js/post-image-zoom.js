function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

onReady(function () {
  const postText = document.querySelector(".posttext");

  if (!postText) {
    return;
  }

  function isImageOnlyParagraph(node) {
    if (!node || node.tagName !== "P") {
      return false;
    }

    const images = node.querySelectorAll("img");
    return images.length > 0 && node.textContent.trim() === "";
  }

  function groupImageRows() {
    const paragraphs = Array.from(postText.querySelectorAll("p"));

    paragraphs.forEach((paragraph) => {
      if (!isImageOnlyParagraph(paragraph)) {
        return;
      }

      const images = Array.from(paragraph.querySelectorAll("img"));

      if (images.length < 2) {
        return;
      }

      const row = document.createElement("div");
      row.className = "post-image-row";

      paragraph.parentNode.insertBefore(row, paragraph);
      images.forEach((image) => row.appendChild(image));
      paragraph.remove();
    });
  }

  groupImageRows();

  const overlay = document.createElement("div");
  overlay.className = "image-zoom-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const zoomedImage = document.createElement("img");
  zoomedImage.alt = "";

  overlay.appendChild(zoomedImage);
  document.body.appendChild(overlay);

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

  postText.addEventListener("click", function (event) {
    const image = event.target.closest("img");

    if (!image || !postText.contains(image)) {
      return;
    }

    event.preventDefault();
    openOverlay(image);
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });
});
