const formDeposit = document.getElementById("depositForm");
const amountInput = document.getElementById("depositAmount");
const modalMessage = document.getElementById("depositModalMessage");
const amountError = document.getElementById("amountError");

if (formDeposit) {
  formDeposit.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = Number(amountInput.value);
    const selectedCard = document.querySelector('input[name="card"]:checked');

    amountError.classList.add("d-none");

    if (!selectedCard) {
      alert("Selecciona una tarjeta");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      amountError.classList.remove("d-none");
      amountInput.classList.add("is-invalid");
      return;
    }

    amountInput.classList.remove("is-invalid");

    let saldo = Number(localStorage.getItem("saldo")) || 0;
    saldo += amount;
    localStorage.setItem("saldo", saldo);
    saveMovimiento({
      detalle: `Depósito (${selectedCard.value})`,
      fecha: new Date().toLocaleDateString("es-CL", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      monto: amount,
      simbolo: "+",
    });

    modalMessage.innerHTML = `
      <p>
        ¡Depósito exitoso!<br />
        Monto: <strong>$${amount.toLocaleString("es-CL")}</strong><br />
        Tarjeta: <strong>${selectedCard.value}</strong>
      </p>
    `;

    const modal = new bootstrap.Modal(document.getElementById("depositModal"));
    modal.show();

    amountInput.value = "";
    renderBalance();
  });
}
