const message = document.getElementById("actionMessage");

const btnDepositar = document.getElementById("btnDepositar");
const btnEnviar = document.getElementById("btnEnviar");
const btnMovimientos = document.getElementById("btnMovimientos");

function redirect(messageText, url) {
  message.textContent = `Redirigiendo a ${messageText}...`;
  message.className = "text-info text-center mt-3 small";

  setTimeout(() => {
    window.location.href = url;
  }, 2000);
}
// Control de botones en el menú aside con getElementbyId
btnDepositar?.addEventListener("click", () => {
  redirect("depositar", "./deposit.html");
});

btnEnviar?.addEventListener("click", () => {
  redirect("Transferencias", "./sendmoney.html");
});

btnMovimientos?.addEventListener("click", () => {
  redirect("últimos movimientos", "./transactions.html");
});
// ______________________________________________________________________-

// Saldo inicial y guardado en el localStorage
const SALDO_INICIAL = 500000;
if (!localStorage.getItem("saldo")) {
  localStorage.setItem("saldo", SALDO_INICIAL);
}

// balance es el nombre del saldo de la cuenta en el HTML.
const balanceElement = document.getElementById("balance");
// cargar y mostrar el saldo actual en el HTML
function renderBalance() {
  const balance = Number(localStorage.getItem("saldo")) || 0;
  balanceElement.textContent = `$${balance.toLocaleString("es-CL")}`;
}
document.addEventListener("DOMContentLoaded", renderBalance);

// Lógica del formulario de depósito
const form = document.getElementById("depositForm"); // formulario
const amountInput = document.getElementById("depositAmount"); // input monto
const modalMessage = document.getElementById("depositModalMessage"); // mensaje del deposito
const amountError = document.getElementById("amountError"); // error en el monto

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = Number(amountInput.value);
  const selectedCard = document.querySelector('input[name="card"]:checked');

  amountError.classList.add("d-none");

  if (isNaN(amount) || amount <= 0) {
    amountError.classList.remove("d-none");
    amountInput.classList.add("is-invalid");
    return;
  }

  amountInput.classList.remove("is-invalid");

  // Obtener saldo actual
  let saldo = Number(localStorage.getItem("saldo"));

  // Sumar depósito
  saldo += amount;

  // Guardar nuevo saldo
  localStorage.setItem("saldo", saldo);

  // Mensaje del modal
  modalMessage.innerHTML = `
    <p>
      ¡Depósito exitoso!<br />
      Has realizado un depósito de 
      <strong>$${amount.toLocaleString()}</strong><br />
      desde la tarjeta <strong>${selectedCard.value}</strong>.
    </p>
  `;

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById("depositModal"));
  modal.show();

  // Limpiar input
  amountInput.value = "";
  renderBalance();
});
