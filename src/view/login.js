import { BASE_URL } from "../js/api";

// This function constructs and returns the login view
export function LoginView() {
  // I create a <div> container where the login interface will be loaded
  const div = document.createElement("div");


  div.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  `; 


  const loginForm = div.querySelector("#loginForm");

 
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get the values entered by the user
    const name = loginForm.name.value.trim();
    const password = loginForm.password.value.trim();

    // I query all users from the json Server
    const res = await fetch(`${BASE_URL}/users`); 
    const users = await res.json();

    // I search if a user exists with that name (ignoring upper/lower case) and exact password
    const user = users.find(u => 
      u.name.toLowerCase() === name.toLowerCase() &&
      u.password === password
    );

   // If it doesn't exist, I show an error message
    if (!user) {
      alert("Nombre o contraseña incorrectos.");
      return;
    }

    // If the user exists:
    // Save the user to localStorage to maintain the session
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.hash = "#/dashboard";
  });

  return div;
}
