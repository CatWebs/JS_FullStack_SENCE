/*
CONSIGNA DE LA LECCIÓN
- Crear un arreglo con una lista de elementos
- Usar for y while para recorrer arreglos
- Implementar una función que filtre elementos según una condición


*/
console.log("Juan tenía la siguiente lista de compras:");
let lista = [
  "detergente",
  "trapero",
  "café",
  "aceite",
  "sal",
  "pollo",
  "cilantro",
  "pan",
];
for (let i = 0; i < lista.length; i++) {
  let numeroLista = i + 1;
  console.log(numeroLista + ". " + lista[i]);
}
console.log(
  "Por lo tanto, Juan fue al almacén más cercano y compró lo que pudo. Tenía $5.000 y cada producto costaba $1.000",
);

let dineroInicial = 5;
let precioProductos = 1;
let productos = [
  "detergente",
  "trapero",
  "café",
  "aceite",
  "sal",
  "pollo",
  "cilantro",
  "pan",
];
let comprado = [];

do {
  let item = productos.shift();
  comprado.push(item);
  productos.unshift();
  dineroInicial -= precioProductos;
} while (dineroInicial > 0);
console.log("Juan compró lo siguiente:");
for (let i = 0; i < comprado.length; i++) {
  let numeroListaComprada = i + 1;
  console.log(numeroListaComprada + ". " + comprado[i]);
}
console.log(
  "Para saber qué cosas le hace falta comprar a Juan, podemos usar el método Filter",
);
console.log("Ahora veremos, qué le faltó por comprar:");
let itemsFaltantes = lista.filter((items) => !comprado.includes(items));
console.log(itemsFaltantes);

// Se aplica estructura con For y con do While. Se incluye función de filtro.
