// Evento que genera la visibilidad del input type Date en el formulario.
const fechaRequerida = document.getElementById("switchCheckDate");
fechaRequerida.addEventListener("change", () => {
  toggleDateVisibility(fechaRequerida.checked);
});

// Evento que resetea el formulario al ocultar el modal.
document
  .getElementById("addTask")
  .addEventListener("hidden.bs.modal", resetTaskForm);

// Evento Submit del formulario
const addTaskForm = document.getElementById("addTaskForm");
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("descriptionInput").value.trim();
  const prioridad = Number(document.getElementById("priorityInput").value);
  const fechaLimite = document.getElementById("fecha").value.trim();
  const fechaRequeridaInput =
    document.getElementById("switchCheckDate").checked;
  if (tareaEnEdicion !== null) {
    // Control del formulario cuando la tarea se encuentra en edición
    const task = gestor.obtenerTarea(tareaEnEdicion);
    if (!task) return;

    task.descripcion = descripcion;
    task.prioridad = prioridad;
    task.fechaRequerida = fechaRequeridaInput;
    task.fechaLimite = fechaLimite;

    gestor.guardarEnLocalStorage();

    tareaEnEdicion = null;
  } else {
    // Control del formulario cuando la tarea se está creando.
    let newID = Date.now();
    const task = new Task(
      newID,
      descripcion,
      false,
      prioridad,
      fechaRequeridaInput,
      fechaLimite,
      undefined,
    );
    gestor.agregarTarea(task);
  }

  // Renderizo tareas y normalizo textos del modal del formulario.
  renderTasks();
  document.querySelector("#addTask .modal-title").textContent = "Agregar tarea";

  document.querySelector("#addTaskForm button[type='submit']").textContent =
    "+ Agregar tarea";
  const modal = bootstrap.Modal.getInstance(document.getElementById("addTask"));
  modal.hide();
});

// Evento que renderiza las tareas cada vez que se recarga la página.
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
