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
addTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnAddTaskSubmit");
  if (tareaEnEdicion === null) {
    setFormLoading(true);

    btnSubmit.innerHTML = `
  <div class="spinner-border" style="width: 15px; height: 15px" role="status"></div>
  Agregando tarea
`;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setFormLoading(false);
  }

  const titulo = document.getElementById("titleInput").value.trim();
  const descripcion = document.getElementById("descriptionInput").value.trim();
  const prioridad = Number(document.getElementById("priorityInput").value);
  const fechaLimite = document.getElementById("fecha").value.trim();
  const fechaRequeridaInput =
    document.getElementById("switchCheckDate").checked;
  if (tareaEnEdicion !== null) {
    // Control del formulario cuando la tarea se encuentra en edición
    const task = gestor.obtenerTarea(tareaEnEdicion);
    if (!task) return;

    task.titulo = titulo;
    task.descripcion = descripcion;
    task.prioridad = prioridad;
    task.fechaRequerida = fechaRequeridaInput;
    task.fechaLimite = fechaLimite;

    gestor.guardarEnLocalStorage();

    Toastify({
      text: "Tarea editada con éxito",
      offset: {
        x: 50,
        y: 10,
      },
      duration: 3000,
    }).showToast();
  } else {
    // Control del formulario cuando la tarea se está creando.
    let newID = Date.now();
    const task = new Task(
      newID,
      titulo,
      descripcion,
      false,
      prioridad,
      fechaRequeridaInput,
      fechaLimite,
      undefined,
    );

    gestor.agregarTarea(task);

    Toastify({
      text: "Tarea agregada con éxito",
      offset: {
        x: 50,
        y: 10,
      },
      duration: 3000,
    }).showToast();
  }

  // Renderizo tareas, habilito botones y cierro el modal.
  const modal = bootstrap.Modal.getInstance(document.getElementById("addTask"));
  modal.hide();
  renderTasks();
});

// Evento que renderiza las tareas cada vez que se recarga la página.
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  setInterval(updateCountdowns, 1000);
});
