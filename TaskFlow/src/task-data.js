if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

class Task {
  constructor(
    id,
    descripcion,
    estado,
    prioridad,
    fechaRequerida,
    fechaLimite,
    fechaRealizada,
    fechaCreacion = new Date(),
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.prioridad = prioridad; // 1: Prioridad alta; 2: Prioridad media; 3: Prioridad baja;
    this.fechaRequerida = fechaRequerida;
    this.fechaLimite = fechaLimite;
    this.fechaRealizada = fechaRealizada;
    this.fechaCreacion = fechaCreacion;
  }
  obtenerFechaCreacion() {
    return this.fechaCreacion.toLocaleString();
  }
}

const tarea1 = new Task(
  undefined,
  "Aplicar conceptos de POO para estructurar el código de la aplicación",
  false,
  1,
  false,
  undefined,
  undefined,
);

const tarea2 = new Task(
  undefined,
  "Aplicar nuevas funcionalidades de JavaScript ES6+",
  false,
  2,
  true,
  " 25/03/2026",
  undefined,
);

const tarea3 = new Task(
  undefined,
  "Implementar eventos en la aplicación",
  true,
  3,
  true,
  " 25/03/2026",
  " 22/03/2026",
);

tasks.push(tarea1);
tasks.push(tarea2);
tasks.push(tarea3);
