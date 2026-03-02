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
  contenedor.innerHTML = `<div class="loader"></div>`;
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
    contenedor.innerHTML = empresas.map(templateData).join("");
  } catch (error) {
    console.error("error: ", error);
    contenedor.innerHTML = `<h3 class="text-center text-danger">Error al cargar datos</h3>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
