// Wait for the page content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {

  const feedUrl = "https://krovs.github.io/seclogs/feed_rss_created.xml";
  const placeholderId = "latest-mkdocs-post";

  let placeholder = document.getElementById(placeholderId);
  
  // Only run this script if the placeholder element exists (i.e., we're on the home page)
  if (!placeholder) {
    return;
  }

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
      console.log(firstItem);
      if (firstItem) {
        const title = firstItem.querySelector("title").textContent;
        const link = firstItem.querySelector("link").textContent;
        // Handle multiple categories
        const categories = Array.from(firstItem.querySelectorAll("category")).map(cat => cat.textContent);
        let category = categories[0] || "";
        if (categories.includes("HackTheBox")) {
          category = "HTB";
        } else if (categories.includes("TryHackMe")) {
          category = "THM";
        } else if (categories.includes("ProvingGrounds")) {
          category = "PG";
        }

        const postHtml = `
                <a href="${link}" target="_blank" rel="noopener noreferrer">
                  [${category}] ${title}
                </a>
            `;
        placeholder.innerHTML = postHtml;
      } else {
        placeholder.innerHTML = "<p>No posts found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
      // Do not modify HTML if fetch fails
    });
});
