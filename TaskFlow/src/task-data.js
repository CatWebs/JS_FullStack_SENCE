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
  " 25/03/2026",
  undefined,
);

const tarea3 = new Task(
  2,
  "Implementar eventos en la aplicación",
  true,
  3,
  true,
  " 25/03/2026",
  " 22/03/2026",
);

let tasks = JSON.parse(localStorage.getItem("tasks"));

if (!tasks) {
  tasks = [tarea1, tarea2, tarea3];
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
