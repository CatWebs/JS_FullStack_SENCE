/*
CONSIGNA DE LA LECCIÓN
- Crear un objeto con propiedades y valores
- Implementar métodos dentro de un objeto
- Usar un arreglo de objetos y recorrerlo con map() o forEach()
*/

const juego = {
  nombre: "Sons of the forest",
  categoria: ["survival", "indie"],
  dificultad: "media",
  esMultiplayer: true,
  miPerfil: {
    nickName: "Cata",
    horasJugadas: 100,
    historiaTerminada: true,
  },
  mensajePersonal: function () {
    console.log(
      `Hola soy ${this.miPerfil.nickName} y tengo ${this.miPerfil.horasJugadas} horas jugadas en ${this.nombre}`,
    );
  },
};

juego.mensajePersonal();

const productos = [
  {
    nombre: "Escritorio Gamer",
    precio: 120000,
    disponible: true,
    descripcion: function () {
      console.log(
        `${this.nombre} es un escritorio específicamente diseñado para tu comodidad. Cuenta con un amplio espacio y está a tan sólo ${this.precio}CLP`,
      );
    },
    informacion: {
      peso: "30kg",
      medicion: "cm",
      ancho: 70,
      alto: 75,
      largo: 140,
      fabricacion: {
        pais: "Chile",
        Empresa: "GamerChile Ltda",
      },
    },
  },
  {
    nombre: "Silla Gamer",
    precio: 70000,
    disponible: false,
    descripcion: function () {
      console.log(
        `${this.nombre} es una silla específicamente diseñada para tu comodidad. Cuenta con almohadillas ergonómicas y está a tan sólo ${this.precio}CLP`,
      );
    },
    informacion: {
      peso: "12kg",
      medicion: "cm",
      ancho: 60,
      alto: 120,
      largo: 60,
      fabricacion: {
        pais: "Chile",
        Empresa: "GamerChile Ltda",
      },
    },
  },
];

const descripcionCompleta = productos.map((el) => {
  const disponible = el.disponible ? "disponible" : "no disponible";
  const precio = el.disponible ? `Tiene un precio de ${el.precio}CLP` : "";
  const dimensiones = [];
  dimensiones.push(
    `El ancho del producto es de ${el.informacion.ancho} ${el.informacion.medicion}. `,
  );
  dimensiones.push(
    `El alto del producto es de ${el.informacion.alto} ${el.informacion.medicion}. `,
  );
  dimensiones.push(
    `El largo del producto es de ${el.informacion.largo} ${el.informacion.medicion}. `,
  );
  let fraseDimensiones = "";
  dimensiones.forEach((element) => {
    fraseDimensiones += element;
  });
  const frase = `${el.nombre} es un artículo fabricado en ${el.informacion.fabricacion.pais} por la empresa ${el.informacion.fabricacion.empresa} y actualmente se encuentra ${disponible}. ${precio}. ${fraseDimensiones} `;
  console.log(frase);
});

const persona = {
  nombre: "Arly",
  apellido: "Donoso",
  edad: 22,
  ciudad: "Los Angeles",
  saludo: function () {
    console.log("Hola soy Arly");
  },
  ocupacion: {
    titulo: "Medico",
    aniosExp: 1,
    especialidad: {
      title: "Cirujano",
      estudios: "postgrado",
      ejecucion: function () {
        console.log("es una buena doctora");
      },
    },
  },
};
