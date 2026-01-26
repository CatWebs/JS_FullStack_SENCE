// MENÚ LATERAL

const message = document.getElementById("actionMessage");

function redirect(messageText, url) {
  if (!message) return;

  message.textContent = `Redirigiendo a ${messageText}...`;
  message.className = "text-info text-center mt-3 small";

  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

document.getElementById("btnDepositar")?.addEventListener("click", () => {
  redirect("depositar", "./deposit.html");
});

document.getElementById("btnEnviar")?.addEventListener("click", () => {
  redirect("transferencias", "./sendmoney.html");
});

document.getElementById("btnMovimientos")?.addEventListener("click", () => {
  redirect("movimientos", "./transactions.html");
});

// SALDO GLOBAL

const SALDO_INICIAL = 500000;

if (!localStorage.getItem("saldo")) {
  localStorage.setItem("saldo", SALDO_INICIAL);
}

function renderBalance() {
  const balanceElement = document.getElementById("balance");
  if (!balanceElement) return;

  const saldo = Number(localStorage.getItem("saldo")) || 0;
  balanceElement.textContent = `$${saldo.toLocaleString("es-CL")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderBalance();
});
