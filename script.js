document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareBtn");
  const sharePopup = document.getElementById("sharePopup");
  const articleFooter = document.getElementById("articleFooter");

  let currentIsMobileView = window.innerWidth < 768;

  // Function to toggle popup visibility based on screen size
  function togglePopupVisibility() {
    shareButton.classList.toggle("active"); //Change Colors

    if (window.innerWidth < 768) {
      articleFooter.classList.toggle("share-active");
      sharePopup.classList.remove("hidden"); // Ensure 'hidden' is removed for mobile CSS
    } else {
      sharePopup.classList.toggle("hidden");
      articleFooter.classList.remove("share-active"); // Remove mobile-specific class
    }
  }

  // Set initial state on page load
  // Popup starts hidden on both desktop and mobile
  if (currentIsMobileView) {
    sharePopup.classList.add("hidden");
    articleFooter.classList.remove("share-active");
  } else {
    sharePopup.classList.add("hidden");
    articleFooter.classList.remove("share-active");
  }
  shareButton.classList.remove("active"); // Button not active initially

  shareButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent document click from closing immediately
    togglePopupVisibility();
  });

  // Close popup when clicking anywhere outside
  document.addEventListener("click", (event) => {
    const isPopupVisible = shareButton.classList.contains("active");

    if (
      isPopupVisible &&
      !sharePopup.contains(event.target) &&
      event.target !== shareButton &&
      !shareButton.contains(event.target)
    ) {
      togglePopupVisibility();
    }
  });

  // Handle resize to adjust popup state without hiding it
  window.addEventListener("resize", () => {
    const newIsMobileView = window.innerWidth < 768;

    // Only update state if the breakpoint has been crossed
    if (newIsMobileView !== currentIsMobileView) {
      if (shareButton.classList.contains("active")) {
        if (newIsMobileView) {
          // Activate mobile state
          articleFooter.classList.add("share-active");
          sharePopup.classList.remove("hidden");
        } else {
          // Deactivate mobile state
          articleFooter.classList.remove("share-active");
          sharePopup.classList.remove("hidden");
        }
      } else {
        // If popup was NOT active, ensure it's hidden and classes are clean
        sharePopup.classList.add("hidden");
        articleFooter.classList.remove("share-active");
        shareButton.classList.remove("active");
      }
      currentIsMobileView = newIsMobileView; // Update the view
    }
  });
});
