export function StartView() {

  const main = document.createElement("main");

  // I add the CSS class "container" to apply styles.
  main.classList.add("container");

  main.innerHTML = `
    <h1>BIENVENIDOS A EVENTOS COLOMBIA</h1>
    <p>diviértete en grande</p>
    <div class="buttons">
      <button class="register">Register</button>
      <button class="login">Login</button>
    </div>
  `;

  // I program the "Register" button to redirect to the #/register route.
  main.querySelector(".register").addEventListener("click", () => {
    window.location.hash = "#/register"; 
  });


  main.querySelector(".login").addEventListener("click", () => {
    window.location.hash = "#/login";    
  });

  return main;
}
