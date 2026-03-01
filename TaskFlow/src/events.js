const fechaRequerida = document.getElementById("switchCheckDate");
fechaRequerida.addEventListener("change", () => {
  toggleDateVisibility(fechaRequerida.checked);
});

document
  .getElementById("addTask")
  .addEventListener("hidden.bs.modal", resetTaskForm);

const addTaskForm = document.getElementById("addTaskForm");
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("descriptionInput").value.trim();
  const prioridad = Number(document.getElementById("priorityInput").value);
  const fechaLimite = document.getElementById("fecha").value.trim();
  const fechaRequeridaInput =
    document.getElementById("switchCheckDate").checked;
  if (tareaEnEdicion !== null) {
    const task = gestor.obtenerTarea(tareaEnEdicion);
    if (!task) return;

    task.descripcion = descripcion;
    task.prioridad = prioridad;
    task.fechaRequerida = fechaRequeridaInput;
    task.fechaLimite = fechaLimite;

    gestor.guardarEnLocalStorage();

    tareaEnEdicion = null;
  } else {
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

  renderTasks();
  document.querySelector("#addTask .modal-title").textContent = "Agregar tarea";

  document.querySelector("#addTaskForm button[type='submit']").textContent =
    "+ Agregar tarea";
  const modal = bootstrap.Modal.getInstance(document.getElementById("addTask"));
  modal.hide();
});

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
