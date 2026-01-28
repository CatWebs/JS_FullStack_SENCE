const transferForm = document.getElementById("transferir");
const amountTransfer = document.getElementById("montoTransferencia");
const modalTransferMessage = document.getElementById("transferModalMessage");
const amountErrorTransfer = document.getElementById("amountErrorTransferencia");

if (transferForm) {
  transferForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = Number(amountTransfer.value);
    const contactSelected = document.querySelector(
      'input[name="contacto"]:checked',
    );

    amountErrorTransfer.classList.add("d-none");

    if (!contactSelected) {
      alert("Selecciona un contacto");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      amountErrorTransfer.classList.remove("d-none");
      amountTransfer.classList.add("is-invalid");
      return;
    }

    let saldo = Number(localStorage.getItem("saldo")) || 0;

    if (amount > saldo) {
      amountErrorTransfer.textContent = "Saldo insuficiente";
      amountErrorTransfer.classList.remove("d-none");
      return;
    }

    saldo -= amount;
    localStorage.setItem("saldo", saldo);
    saveMovimiento({
      detalle: `Transferencia a ${contactSelected.value}`,
      tipo: "Transferencia",
      fecha: new Date().toLocaleDateString("es-CL", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      monto: amount,
      simbolo: "-",
    });

    modalTransferMessage.innerHTML = `
      <p>
        Transferencia exitosa<br />
        Monto: <strong>$${amount.toLocaleString("es-CL")}</strong><br />
        Destinatario: <strong>${contactSelected.value}</strong>
      </p>
    `;

    const modal = new bootstrap.Modal(document.getElementById("transferModal"));
    modal.show();

    amountTransfer.value = "";
    transferForm.reset();
    document.dispatchEvent(new Event("resetContactsView"));
    renderBalance();
  });
}
