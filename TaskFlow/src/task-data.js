class Task {
  constructor(
    id,
    descripcion,
    estado,
    prioridad,
    fechaRequerida,
    fechaLimite,
    fechaCreacion = new Date(),
    fechaRealizada = undefined,
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.prioridad = prioridad;
    this.fechaRequerida = fechaRequerida;
    this.fechaLimite = fechaLimite;
    this.fechaCreacion = fechaCreacion;
    this.fechaRealizada = fechaRealizada;
  }
  toggleEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    if (nuevoEstado) {
      this.fechaRealizada = new Date().toLocaleString();
    } else {
      this.fechaRealizada = undefined;
    }
  }
}

//Creación del gestor de tareas
class TaskManager {
  constructor() {
    this.tasks = [];
    this.cargarDesdeLocalStorage();
  }

  agregarTarea(task) {
    this.tasks.push(task);
    this.guardarEnLocalStorage();
  }

  eliminarTarea(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.guardarEnLocalStorage();
  }

  obtenerTarea(id) {
    return this.tasks.find((task) => task.id === id);
  }

  toggleEstadoTarea(id, nuevoEstado) {
    const task = this.obtenerTarea(id);
    if (task) {
      task.toggleEstado(nuevoEstado);
      this.guardarEnLocalStorage();
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  cargarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem("tasks"));

    if (data) {
      this.tasks = data.map(
        (t) =>
          new Task(
            t.id,
            t.descripcion,
            t.estado,
            t.prioridad,
            t.fechaRequerida,
            t.fechaLimite,
            t.fechaCreacion,
            t.fechaRealizada,
          ),
      );
    }
  }
}

// Tareas iniciales
const gestor = new TaskManager();

if (gestor.tasks.length === 0) {
  const tarea1 = new Task(
    0,
    "Aplicar conceptos de POO para estructurar el código de la aplicación",
    false,
    1,
    false,
    undefined,
    undefined,
  );

  const tarea2 = new Task(
    1,
    "Aplicar nuevas funcionalidades de JavaScript ES6+",
    false,
    2,
    true,
    "2026-03-25",
    undefined,
  );

  const tarea3 = new Task(
    2,
    "Implementar eventos en la aplicación",
    true,
    3,
    true,
    "2026-03-25",
    "2026-03-22",
  );

  gestor.agregarTarea(tarea1);
  gestor.agregarTarea(tarea2);
  gestor.agregarTarea(tarea3);
}

let tareaEnEdicion = null;
