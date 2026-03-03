function templateData(empresa) {
  const { id, direccion, empleados, nombreEmpresa } = empresa;
  return `<div class="col" id=${id}>
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${nombreEmpresa}</h5>
                <p>Cantidad de empleados: <span class="empleados">${empleados}</span></p>
                <p class="card-text">Dirección: <span class="direccion">${direccion}</span></p>
              </div>
            </div>
          </div>`;
}

function renderData(empresa) {
  let contenedor = document.getElementById("api-data-container");
  contenedor.innerHTML += templateData(empresa);
}

async function loadData() {
  const contenedor = document.getElementById("api-data-container");
  const loader = document.getElementById("loader");
  loader.innerHTML = `<div class="loader"></div>`;
  try {
    let response = await fetch("https://retoolapi.dev/3U6bRe/empresas/");
    if (response.status === 404) {
      contenedor.innerHTML = `<h3 class="text-center text-danger">Datos no encontrados</h3>`;
      return;
    }
    if (response.status === 429) {
      contenedor.innerHTML = `<h3 class="text-center text-danger">Límite de peticiones alcanzado</h3>`;
      return;
    }
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    let empresas = await response.json();
    loader.innerHTML = "";
    contenedor.innerHTML = empresas.map(templateData).join("");
  } catch (error) {
    console.error("error: ", error);
    contenedor.innerHTML = `<h3 class="text-center text-danger">Error al cargar datos</h3>`;
  }
}

async function createEmpresa(nuevaEmpresa) {
  try {
    const response = await fetch(
      "https://api-generator.retool.com/3U6bRe/empresas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaEmpresa),
      },
    );

    if (!response.ok) {
      throw new Error(`Error al crear empresa: ${response.status}`);
    }

    const data = await response.json();
    console.log("Empresa creada:", data);

    loadData();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

document.getElementById("empresa-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaEmpresa = {
    nombreEmpresa: document.getElementById("nombreEmpresa").value,
    direccion: document.getElementById("direccion").value,
    empleados: Number(document.getElementById("empleados").value),
  };
  Toastify({
    text: "Empresa añadida con éxito",
    offset: {
      x: 50,
      y: 10,
    },
    duration: 3000,
  }).showToast();
  createEmpresa(nuevaEmpresa);
  const form = document.getElementById("empresa-form");
  form.reset();
});
