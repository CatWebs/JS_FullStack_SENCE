// Función para establecer texto y estilo del span según prioridad de la tarea.
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
    default:
      valorPrioridad = "Prioridad baja";
      clasePrioridad = "badge-baja";
      break;
  }
  return `<span class="badge badge-prioridad ${clasePrioridad}">${valorPrioridad}</span>`;
}

// Plantilla que renderiza el Span donde va la fecha límite de cada tarea.
function renderFecha(requerido, fecha) {
  return requerido
    ? `<span class="span-date"> <i class="bi bi-calendar"> </i> ${fecha}</span>`
    : `<span class="span-date"> <i class="bi bi-calendar"> </i> Sin fecha límite</span>`;
}

// Función para calcular y renderizar el tiempo restante de cada tarea.
function calcTime(fechaRequerida, fechaLimite) {
  if (!fechaRequerida) return "";

  const dateNow = new Date();
  const limit = new Date(fechaLimite);
  const diff = limit - dateNow;

  let timeMessage = "";
  let timeClassSpan = "countdown span-date ms-2";

  if (diff <= 0) {
    timeMessage = "Tarea vencida";
    timeClassSpan = "countdown span-date ms-2 text-danger";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timeMessage = `Quedan ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `
    <span 
      class="${timeClassSpan}"
      data-fecha-limite="${fechaLimite}"
    >
      <i class="bi bi-clock"></i> ${timeMessage}
    </span>
  `;
}

// Función para actualizar el tiempo restante de cada tarea.
function updateCountdowns() {
  const countdowns = document.querySelectorAll(".countdown");

  countdowns.forEach((span) => {
    const fechaLimite = span.dataset.fechaLimite;
    const dateNow = new Date();
    const limit = new Date(fechaLimite);
    const diff = limit - dateNow;

    if (diff <= 0) {
      span.textContent = "Tarea vencida";
      span.classList.add("text-danger");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    span.innerHTML = `
      <i class="bi bi-clock"></i>
      Quedan ${days}d ${hours}h ${minutes}m ${seconds}s
    `;
  });
}

// Plantilla visual para las tareas que no están marcadas, es decir, tareas activas.
function itemTemplate(item) {
  return `<div class="item-box">
          <div class="row m-0 p-4">
            <div class="col task-data">
              <div class="task-input">
                <input
                  class="form-check-input task-check-status me-2"
                  type="checkbox"
                  ${item.estado ? "checked" : ""}
                  id="item${item.id}"
                  onchange="toggleTask(${item.id}, this.checked)"
                />
                <label class="form-check-label" for="item${item.id}">
                  ${item.descripcion}
                </label>
              </div>
              <div class="task-info ms-4">
                ${renderPrioridad(item.prioridad)}
                ${renderFecha(item.fechaRequerida, item.fechaLimite)}
                ${calcTime(item.fechaRequerida, item.fechaLimite)}
              </div>
            </div>
            <div class="col task-actions">
              <button
                class="btn btn-edit btn-with-tooltip"
                type="button"
                id="edit${item.id}"
                data-bs-placement="bottom"
                data-bs-title="Editar tarea"
                data-bs-toggle="tooltip"
                onclick="editTask(${item.id})"
              >
                <i class="bi bi-pen"></i>
              </button>
              <button
                class="btn btn-delete btn-with-tooltip"
                id="delete${item.id}"
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Eliminar tarea"
                onclick="deleteTask(${item.id})"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>`;
}

// Plantilla visual para las tareas marcadas como realizadas.
function itemCompleteTemplate(item) {
  return `<div class="item-box-complete p-4">
          <div class="form-check">
            <input class="form-check-input task-check-status" type="checkbox" id='item${item.id}' checked onchange="toggleTask(${item.id}, this.checked)"/>
            <label class="form-check-label form-check-label-complete" for='item${item.id}'>
              ${item.descripcion}
            </label>
          </div>
          <span class="span-complete">COMPLETADO EL ${item.fechaRealizada}</span>
        </div>`;
}

// Función que lee el estado de una tarea para renderizar de nuevo las tareas cuando el estado cambia.
function toggleTask(id, estado) {
  gestor.toggleEstadoTarea(id, estado);
  renderTasks();
}

// Función para renderizar cada tarea en el DOM
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  const taskCompleteContainer = document.getElementById(
    "task-complete-container",
  );

  let activeHTML = "";
  let completeHTML = "";
  // Renderizar tareas según estado.
  gestor.tasks.forEach((item) => {
    if (!item.estado) {
      activeHTML += itemTemplate(item);
    } else {
      completeHTML += itemCompleteTemplate(item);
    }
  });

  taskContainer.innerHTML = activeHTML;
  taskCompleteContainer.innerHTML = completeHTML;

  // Actualizar badge que indica cantidad de tareas activas
  const activeTasks = document.querySelector(".badge-task");
  if (activeTasks) {
    activeTasks.textContent = gestor.tasks.filter(
      (task) => !task.estado,
    ).length;
  }

  // Genero el tooltip de cada tarea, cada vez que se renderiza.
  document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el));
}

// Función para mostrar el input type Date del formulario
function toggleDateVisibility(show) {
  const container = document.getElementById("displayDateInput");
  if (!container) return;

  container.classList.toggle("d-none", !show);
  container.classList.toggle("d-block", show);
}

// Función para eliminar una tarea individual activa seleccionada por el usuario.
function deleteTask(id) {
  Swal.fire({
    title: "Estas seguro de eliminar esta tarea?",
    text: "Este proceso no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#166534",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (!result.isConfirmed) return;
    gestor.eliminarTarea(id);
    renderTasks();
    Swal.fire({
      title: "Eliminada!",
      text: "La tarea ha sido eliminada de tus archivos.",
      icon: "success",
    });
  });
}

// Función para eliminar todas las tareas realizadas.
function deleteAllTask() {
  const taskCompleteContainer = document.getElementById(
    "task-complete-container",
  );
  if (taskCompleteContainer.innerHTML == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay tareas para eliminar aquí!",
    });
  } else {
    Swal.fire({
      title: "Estas seguro de eliminar todas las tareas realizadas?",
      text: "Este proceso no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (!result.isConfirmed) return;
      gestor.tasks = gestor.tasks.filter((task) => !task.estado);
      gestor.guardarEnLocalStorage();
      renderTasks();
      Swal.fire({
        title: "Tareas eliminadas!",
        text: "Se han eliminado todas las tareas realizadas con éxito.",
        icon: "success",
      });
    });
  }
}

// Función para editar una tarea individual seleccionada por el usuario. No aplica a tareas completadas.
function editTask(id) {
  const task = gestor.obtenerTarea(id);
  if (!task) return;
  tareaEnEdicion = id;
  document.querySelector("#addTask .modal-title").textContent = "Editar tarea";
  document.querySelector("#addTaskForm button[type='submit']").textContent =
    "Guardar cambios";

  document.getElementById("descriptionInput").value = task.descripcion;
  document.getElementById("priorityInput").value = task.prioridad;
  document.getElementById("switchCheckDate").checked = task.fechaRequerida;

  toggleDateVisibility(task.fechaRequerida);

  if (task.fechaRequerida) {
    document.getElementById("fecha").value = task.fechaLimite || "";
  }
  const modal = new bootstrap.Modal(document.getElementById("addTask"));
  modal.show();
}

// Función que reinicia una variable global utilizada para definir si la tarea está en edición o si está siendo creada.
const addButton = document.getElementById("btnAddTask");
addButton.onclick = () => (tareaEnEdicion = null);

// Función que aplica un reset al formulario.
function resetTaskForm() {
  const form = document.getElementById("addTaskForm");

  form.reset();

  toggleDateVisibility(false);

  tareaEnEdicion = null;

  document.querySelector("#addTask .modal-title").textContent = "Agregar tarea";

  document.querySelector("#addTaskForm button[type='submit']").textContent =
    "+ Agregar tarea";
}

// Función para deshabilitar botones mientras se agrega una tarea.
function setFormLoading(isLoading) {
  const btnSubmit = document.getElementById("btnAddTaskSubmit");
  const btnCancel = document.querySelector(".btn-cancel-modal");
  const btnClose = document.querySelector("#addTask .btn-close");

  btnSubmit.disabled = isLoading;
  btnCancel.disabled = isLoading;
  btnClose.disabled = isLoading;
}
