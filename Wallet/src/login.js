const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("loginMessage");

const VALID_EMAIL = "user@email.com";
const VALID_PASSWORD = "qwerty";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    message.textContent = "Inicio de sesión exitoso ✔️";
    message.className = "text-success text-center mt-2 small";

    setTimeout(() => {
      window.location.href = "./menu.html";
    }, 1000);
  } else {
    message.textContent = "Email o contraseña incorrectos ❌";
    message.className = "text-danger text-center mt-2 small";
  }
});
