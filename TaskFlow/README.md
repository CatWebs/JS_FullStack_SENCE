# **Proyecto: TaskFlow**

**Proyecto realizado con JavaScript. Cuenta con dos funcionalidades:**

- La primera funcionalidad consiste en un gestor de tareas. El objetivo es aplicar todos los aprendizajes de Javascript, incluyendo la programación orientada a objetos (POO).
- La segunda funcionalidad consiste en realizar consultas a una API y utilizar los datos que se obtienen de la consulta.

## Versión 1 del proyecto (versión actual)

### Funcionalidad: Gestor de tareas

![](./media/Taskflow.png)

Este gestor cuenta con una variedad de funcionalidades que serán enumeradas a continuación. Para conocer cada función y evento, dirigirse al código y ver el comentario asociado a cada uno.

**1. Cambiar el estado de una tarea.**

- Si la tarea se completa, renderiza en "Tareas realizadas" y muestra la fecha en que se completó.
- Se pueden desmarcar tareas completadas y volverán a aparecer como tareas activas.

**2. Crear tareas.**

- Se puede decidir si la tarea tiene fecha límite (caducidad)
- Se puede decidir la prioridad de la tarea (por defecto: Prioridad baja)

**3. Editar tareas.**

- Se puede editar cualquier tarea a elección, mientras esta no se encuentre completada

**4. Eliminar tareas.**

- Se puede eliminar cualquier tarea a elección, mientras esta no se encuentre completada
- Se pueden eliminar todas las tareas completadas

**5. Calculo de tiempo restante.**

- Se muestra el tiempo restante para completar la tarea (cuenta regresiva) y se actualiza cada un segundo.

### Funcionalidad: Consulta API Rest

![](./media/API.png)

Esta página realiza conexión a API personalizada, creada para fines prácticos y de prueba.
Se realizan consultas para solicitar los datos y para agregar datos a través de un formulario.

## Versión 2 del proyecto (próximamente)

Consideraciones para la próxima versión:

- Crear filtro de busqueda y dar la posibilidad al usuario de ordenar las tareas.
- Crear conexión a Calendario y permitir al usuario exportar sus tareas.
