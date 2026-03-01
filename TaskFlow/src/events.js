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
