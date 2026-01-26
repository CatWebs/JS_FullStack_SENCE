function redirect(messageText, url, messageId) {
  const container = document.getElementById(messageId);

  if (container) {
    container.textContent = `Redirigiendo a ${messageText}...`;
    container.className = "text-info text-center mt-3 small";
  }

  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

const actions = [
  // Botones en el Aside
  {
    id: "btnDepositar",
    text: "depositar",
    url: "./deposit.html",
    msg: "actionMessage",
  },
  {
    id: "btnEnviar",
    text: "transferencias",
    url: "./sendmoney.html",
    msg: "actionMessage",
  },
  {
    id: "btnMovimientos",
    text: "movimientos",
    url: "./transactions.html",
    msg: "actionMessage",
  },

  // Botones en el Aside Mobile
  {
    id: "btnDepositarMobile",
    text: "depositar",
    url: "./deposit.html",
    msg: "actionMessageMobile",
  },
  {
    id: "btnEnviarMobile",
    text: "transferencias",
    url: "./sendmoney.html",
    msg: "actionMessageMobile",
  },
  {
    id: "btnMovimientosMobile",
    text: "movimientos",
    url: "./transactions.html",
    msg: "actionMessageMobile",
  },

  // Botones del menu.html
  {
    id: "btnDepositarMenu",
    text: "depositar",
    url: "./deposit.html",
    msg: "actionMessageMenu",
  },
  {
    id: "btnEnviarMenu",
    text: "transferencias",
    url: "./sendmoney.html",
    msg: "actionMessageMenu",
  },
];

actions.forEach((action) => {
  document.getElementById(action.id)?.addEventListener("click", () => {
    redirect(action.text, action.url, action.msg);
  });
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
