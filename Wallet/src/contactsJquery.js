$(document).ready(function () {
  var data = JSON.parse(localStorage.getItem("contactos")) || [];

  function mostrar() {
    $("#listadoContactos").empty();
    data.forEach(function (contacto) {
      $("#listadoContactos").append("<li>" + contacto.nombre + "</li>");
    });
  }
  mostrar();
});

$("#volver").click(function () {
  window.location.href = "./menu.html";
});
