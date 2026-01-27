const MOVIMIENTOS_BASE = [
  {
    detalle: "Google play servicios",
    fecha: "24 ene 2026",
    tipo: "Cargo",
    monto: 3600,
    simbolo: "-",
  },
  {
    detalle: "Sence bono",
    fecha: "19 ene 2026",
    tipo: "Abono",
    monto: 150000,
    simbolo: "+",
  },
  {
    detalle: "Farmacia",
    fecha: "14 ene 2026",
    tipo: "Cargo",
    monto: 10500,
    simbolo: "-",
  },
  {
    detalle: "Gimnasio",
    fecha: "4 ene 2026",
    tipo: "Cargo",
    monto: 20000,
    simbolo: "-",
  },
];

if (!localStorage.getItem("movimientos")) {
  localStorage.setItem("movimientos", JSON.stringify(MOVIMIENTOS_BASE));
}

document.addEventListener("DOMContentLoaded", renderMovimientos);
document.addEventListener("DOMContentLoaded", renderUltimosMovimientos);

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
  renderUltimosMovimientos();
}

function renderUltimosMovimientos() {
  const tbody = document.getElementById("movimientos-recientes");
  if (!tbody) return;
  const limite = 5;

  const movimientosRecientes = getMovimientos();
  tbody.innerHTML = "";

  for (let i = 0; i <= limite; i++) {
    const mov = movimientosRecientes[i];
    const clase = mov.simbolo === "+" ? "text-success" : "text-danger";

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${mov.detalle}</td>
      <td>${mov.tipo}</td>
      <td>${mov.fecha}</td>
      <td class="text-end ${clase}">
        ${mov.simbolo}$${mov.monto.toLocaleString("es-CL")}
      </td>
    `;

    tbody.appendChild(tr);
  }
}

function tablaMovimientos(movimiento, tbody) {
  movimiento.forEach((mov) => {
    const clase = mov.simbolo === "+" ? "text-success" : "text-danger";

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${mov.detalle}</td>
      <td>${mov.tipo}</td>
      <td>${mov.fecha}</td>
      <td class="text-end ${clase}">
        ${mov.simbolo}$${mov.monto.toLocaleString("es-CL")}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function renderMovimientos() {
  const tbody = document.getElementById("movimientos-body");
  if (!tbody) return;
  const movimientos = getMovimientos();
  tbody.innerHTML = "";
  const tipo = document.getElementById("filtroTipo").value;

  if (tipo === "Todos") {
    tablaMovimientos(movimientos, tbody);
  } else {
    const movFiltrados = movimientos.filter((mov) => mov.tipo === tipo);
    tablaMovimientos(movFiltrados, tbody);
  }
}

const selectMovimientos = document.getElementById("filtroTipo");
selectMovimientos.addEventListener("change", renderMovimientos);
