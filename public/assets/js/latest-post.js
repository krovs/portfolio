function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

// Wait for page content when needed, but also support idle-loaded execution.
window.initLatestPost = function () {
  const feedUrl = "https://krovs.github.io/seclogs/feed_rss_created.xml";
  const placeholderId = "latest-mkdocs-post";

  let placeholder = document.getElementById(placeholderId);

  function parseDate(dateText) {
    if (!dateText) {
      return null;
    }

    const timestamp = Date.parse(dateText);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  function getText(item, selector) {
    return item.querySelector(selector)?.textContent?.trim() || "";
  }

  function renderMkdocsPost(link, category, title) {
    const postLink = document.createElement("a");
    postLink.href = link;
    postLink.target = "_blank";
    postLink.rel = "noopener noreferrer";
    postLink.textContent = `[${category}] ${title}`;

    placeholder.replaceChildren(postLink);
  }

  // Only run this script if the placeholder element exists (i.e., we're on the home page)
  if (!placeholder) {
    return;
  }

  if (placeholder.dataset.latestPostReady) {
    return;
  }
  placeholder.dataset.latestPostReady = "true";

  fetch(feedUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      return response.text();
    })
    .then((str) => {
      const data = new window.DOMParser().parseFromString(str, "text/xml");
      const firstItem = data.querySelector("item");
      if (firstItem) {
        const localDate = parseDate(placeholder.dataset.localDate);
        const mkdocsDate = parseDate(getText(firstItem, "pubDate"));

        if (localDate && mkdocsDate && mkdocsDate <= localDate) {
          return;
        }

        const title = getText(firstItem, "title");
        const link = getText(firstItem, "link");
        if (!title || !link) {
          return;
        }

        // Handle multiple categories
        const categories = Array.from(
          firstItem.querySelectorAll("category"),
        ).map((cat) => cat.textContent);
        let category = categories[0] || "";
        if (categories.includes("HackTheBox")) {
          category = "HTB";
        } else if (categories.includes("TryHackMe")) {
          category = "THM";
        } else if (categories.includes("ProvingGrounds")) {
          category = "PG";
        }

        renderMkdocsPost(link, category, title);
      } else {
        placeholder.innerHTML = "<p>No posts found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      // Do not modify HTML if fetch fails
    });
};

onReady(window.initLatestPost);
