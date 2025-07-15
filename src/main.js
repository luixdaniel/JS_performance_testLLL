import { router } from "./router";

// Run router whenever the hash changes
window.addEventListener("hashchange", () => {
  localStorage.setItem("lastSection", location.hash);
  router();
});

// Run router when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const lastSection = localStorage.getItem("lastSection");

  // If there is a session and a saved hash, redirect to that section
  if (user && lastSection) {
    if (location.hash !== lastSection) {
      location.hash = lastSection;
    } else {
      router(); // Force render if already in that hash
    }
  } else {
    // No session or no saved section
    if (!location.hash || location.hash === "") {
      location.hash = "#/start"; // This will trigger hashchange
    } else {
      router(); // Force render if hash is already #/start
    }
  }
});
