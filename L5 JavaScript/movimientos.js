const MOVIMIENTOS_BASE = [
  {
    detalle: "Google play servicios",
    fecha: "Ene 24, 2026",
    monto: 3600,
    simbolo: "-",
  },
  {
    detalle: "Sence bono",
    fecha: "Ene 19, 2026",
    monto: 150000,
    simbolo: "+",
  },
  { detalle: "Farmacia", fecha: "Ene 14, 2026", monto: 10500, simbolo: "-" },
  { detalle: "Gimnasio", fecha: "Ene 4, 2026", monto: 20000, simbolo: "-" },
];

if (!localStorage.getItem("movimientos")) {
  localStorage.setItem("movimientos", JSON.stringify(MOVIMIENTOS_BASE));
}

document.addEventListener("DOMContentLoaded", renderMovimientos);

// usar metodo unshift()
//{ detalle: "", fecha: "", monto: "", simbolo: "" },

function getMovimientos() {
  return JSON.parse(localStorage.getItem("movimientos")) || MOVIMIENTOS_BASE;
}

function saveMovimiento(movimiento) {
  const movimientos = getMovimientos();
  movimientos.unshift(movimiento);
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
  renderMovimientos();
}

function renderMovimientos() {
  const tbody = document.getElementById("movimientos-body");
  if (!tbody) return;

  const movimientos = getMovimientos();
  tbody.innerHTML = "";

  movimientos.forEach((mov) => {
    const clase = mov.simbolo === "+" ? "text-success" : "text-danger";

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${mov.detalle}</td>
      <td>${mov.fecha}</td>
      <td class="text-end ${clase}">
        ${mov.simbolo}$${mov.monto.toLocaleString("es-CL")}
      </td>
    `;

    tbody.appendChild(tr);
  });
}
