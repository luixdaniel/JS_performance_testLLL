// getUsers() gets all users.
// createUser() allows you to register a new user in the database.
import { getUsers, createUser } from "../js/api.js";

export function RegisterView() {

  const div = document.createElement("div");

  div.innerHTML = `
    <h2>Registro</h2>
    <form id="registerForm">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required />
      
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required minlength="4"/>
      
      <button type="submit">Registrarse</button>

      <p>¿Ya tienes cuenta? <a href="#/login">Inicia sesión aquí</a></p>
    </form>
  `;

  const form = div.querySelector("#registerForm");


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capture the values entered by the user.
    const name = form.name.value.trim();
    const password = form.password.value.trim();

    // I query all registered users in the database.
    const users = await getUsers();

    // Check if the entered name is already registered (ignoring case).
    const nameExists = users.some(u => u.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      alert("Este nombre ya está registrado.");
      return;
    }

    // If the name is new, create the new user object.
    const newUser = { name, password, roleId: 2 };

    const createdUser = await createUser(newUser);

    localStorage.setItem("currentUser", JSON.stringify(createdUser));

    window.location.hash = "#/dashboard";
  });

  return div;
}
