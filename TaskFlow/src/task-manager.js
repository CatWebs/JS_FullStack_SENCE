function renderPrioridad(prioridad) {
  let valorPrioridad;
  let clasePrioridad;
  switch (prioridad) {
    case 1:
      valorPrioridad = "Prioridad alta";
      clasePrioridad = "badge-alta";
      break;
    case 2:
      valorPrioridad = "Prioridad media";
      clasePrioridad = "badge-media";
      break;
    case 3:
      valorPrioridad = "Prioridad baja";
      clasePrioridad = "badge-baja";
      break;
    default:
      valorPrioridad = "Prioridad baja";
      clasePrioridad = "badge-baja";
      break;
  }
  return `<span class="badge badge-prioridad ${clasePrioridad}"
                  >${valorPrioridad}</span
                >`;
}

function renderFecha(requerido, fecha) {
  return requerido
    ? `<span class="span-date"> <i class="bi bi-calendar"> </i> ${fecha}</span>`
    : `<span class="span-date"> <i class="bi bi-calendar"> </i> Sin fecha límite</span>`;
}

function itemTemplate(item, id) {
  return `<div class="item-box">
          <div class="row m-0 p-4">
            <div class="col task-data">
              <div class="task-input">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value="${item.estado}"
                  id="item${id}"
                />
                <label class="form-check-label" for="item${id}">
                  ${item.descripcion}
                </label>
              </div>
              <div class="task-info ms-4">
                ${renderPrioridad(item.prioridad)}
                ${renderFecha(item.fechaRequerida, item.fechaLimite)}
              </div>
            </div>
            <div class="col task-actions">
              <button
                class="btn btn-task btn-edit"
                type="button"
                data-bs-placement="bottom"
                data-bs-title="Editar tarea"
                data-bs-toggle="modal"
                data-bs-target="#editTask"
              >
                <i class="bi bi-pen"></i>
              </button>
              <button
                class="btn btn-task btn-delete"
                onclick="deleteTask()"
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Eliminar tarea"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>`;
}

function itemCompleteTemplate(item, id) {
  return `<div class="item-box-complete p-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value=${item.estado} id='item${id}' checked/>
            <label class="form-check-label form-check-label-complete" for='item${id}'>
              ${item.descripcion}
            </label>
          </div>
          <span class="span-complete">COMPLETADO EL ${item.fechaRealizada}</span>
        </div>`;
}

let taskContainer = document.getElementById("task-container");
let taskCompleteContainer = document.getElementById("task-complete-container");

tasks.forEach((item, index) => {
  if (!item.estado && item.fechaRealizada == undefined) {
    taskContainer.innerHTML += itemTemplate(item, index);
  } else {
    taskCompleteContainer.innerHTML += itemCompleteTemplate(item, index);
  }
});
