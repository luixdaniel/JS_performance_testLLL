// Import the views used in the SPA
import { StartView } from "./view/start.js";
import { RegisterView } from "./view/register.js";
import { LoginView } from "./view/login.js";
import { DashboardView } from "./view/dashboard.js";

// Define the available routes and map them to their respective views
const routes = {
  "/start": StartView,
  "/register": RegisterView,
  "/login": LoginView,
  "/dashboard": DashboardView,
};

// This function loads the correct view based on the current URL hash
export function router() {
  // Get the current hash without "#" or default to "/"
  const path = window.location.hash.replace("#", "") || "/";

  // Get the view associated with the current path
  const view = routes[path];

  // Get the main container where the view will be displayed
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear any previous content

  // If the view exists, render it
  if (view) {
    app.appendChild(view());
  } else {
    // If route not found, show 404 error message
    app.innerHTML = "<h2>404 - Page not found</h2>";
  }
}
