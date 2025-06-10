document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareBtn");
  const sharePopup = document.getElementById("sharePopup");
  const articleFooter = document.getElementById("articleFooter");

  // Function to toggle popup visibility using CSS classes
  function toggleSharePopup() {
    sharePopup.classList.toggle("hidden");
    shareButton.classList.toggle("active");

    // mobile-specific *visual replacement* logic
    if (window.innerWidth < 768) {
      if (!sharePopup.classList.contains("hidden")) {
        articleFooter.querySelector(".author-info").style.opacity = "0";
        articleFooter.querySelector(".author-info").style.pointerEvents =
          "none";
        articleFooter.querySelector(".author-info").style.transform =
          "translateY(1rem)";
      } else {
        articleFooter.querySelector(".author-info").style.opacity = "1";
        articleFooter.querySelector(".author-info").style.pointerEvents =
          "auto";
        articleFooter.querySelector(".author-info").style.transform =
          "translateY(0)";
      }
    }
  }

  shareButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSharePopup();
  });

  // Close popup when clicking anywhere else on the document (desktop only)
  document.addEventListener("click", (event) => {
    if (
      !sharePopup.classList.contains("hidden") &&
      !sharePopup.contains(event.target) &&
      event.target !== shareButton &&
      !shareButton.contains(event.target)
    ) {
      if (window.innerWidth >= 768) {
        toggleSharePopup();
      }
    }
  });

  // Handle resize to adjust popup state if breakpoint is crossed
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && !sharePopup.classList.contains("hidden")) {
      articleFooter.querySelector(".author-info").style.opacity = "0";
      articleFooter.querySelector(".author-info").style.pointerEvents = "none";
      articleFooter.querySelector(".author-info").style.transform =
        "translateY(1rem)";
    } else if (
      window.innerWidth >= 768 &&
      !sharePopup.classList.contains("hidden")
    ) {
      articleFooter.querySelector(".author-info").style.opacity = "1";
      articleFooter.querySelector(".author-info").style.pointerEvents = "auto";
      articleFooter.querySelector(".author-info").style.transform =
        "translateY(0)";
    }
  });
});
