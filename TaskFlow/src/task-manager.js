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
  return `<span class="badge badge-prioridad ${clasePrioridad}">${valorPrioridad}</span>`;
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
                  class="form-check-input task-check-status me-2"
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
                id="edit${id}"
                onclick="editTask(${id})"
                data-bs-placement="bottom"
                data-bs-title="Editar tarea"
                data-bs-toggle="modal"
                data-bs-target="#editTask"
              >
                <i class="bi bi-pen"></i>
              </button>
              <button
                class="btn btn-task btn-delete"
                id="delete${id}"
                onclick="deleteTask(${id})"
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
            <input class="form-check-input task-check-status" type="checkbox" value=${item.estado} id='item${id}' checked/>
            <label class="form-check-label form-check-label-complete" for='item${id}'>
              ${item.descripcion}
            </label>
          </div>
          <span class="span-complete">COMPLETADO EL ${item.fechaRealizada}</span>
        </div>`;
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  const taskCompleteContainer = document.getElementById(
    "task-complete-container",
  );

  taskContainer.innerHTML = "";
  taskCompleteContainer.innerHTML = "";

  tasks.forEach((item) => {
    if (!item.estado) {
      taskContainer.innerHTML += itemTemplate(item, item.id);
    } else {
      taskCompleteContainer.innerHTML += itemCompleteTemplate(item, item.id);
    }
    console.log(item);
  });

  const activeTasks = document.querySelector(".badge-task");
  if (activeTasks) {
    activeTasks.textContent = tasks.filter((task) => !task.estado).length;
  }
}

const fechaRequerida = document.getElementById("switchCheckDate");
fechaRequerida.addEventListener("change", () => {
  const dateInputContainer = document.getElementById("displayDateInput");
  if (fechaRequerida.checked) {
    dateInputContainer.classList.remove("d-none");
    dateInputContainer.classList.add("d-block");
  } else {
    dateInputContainer.classList.add("d-none");
    dateInputContainer.classList.remove("d-block");
  }
});

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const descripcion = document.getElementById("descriptionInput").value.trim();
  let newID = tasks.length;
  const prioridad = Number(document.getElementById("priorityInput").value);
  const fechaLimite = document.getElementById("fecha").value.trim();
  const fechaRequeridaInput =
    document.getElementById("switchCheckDate").checked;
  const task = new Task(
    newID,
    descripcion,
    false,
    prioridad,
    fechaRequeridaInput,
    fechaLimite,
    undefined,
  );
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  addTaskForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

document.addEventListener("change", (e) => {
  if (!e.target.classList.contains("task-check-status")) return;

  const id = Number(e.target.id.replace("item", ""));
  const checked = e.target.checked;

  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.toggleEstado(checked);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});
