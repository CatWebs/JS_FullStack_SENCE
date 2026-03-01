function deleteTask() {
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
    if (result.isConfirmed) {
      Swal.fire({
        title: "Eliminada!",
        text: "La tarea ha sido eliminada de tus archivos.",
        icon: "success",
      });
    }
  });
}
