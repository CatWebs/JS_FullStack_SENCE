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

const addTaskForm = document.getElementById("addTaskForm");
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const descripcion = document.getElementById("descriptionInput").value.trim();
  let newID = gestor.tasks.length;
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
  gestor.agregarTarea(task);
  renderTasks();
  addTaskForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
