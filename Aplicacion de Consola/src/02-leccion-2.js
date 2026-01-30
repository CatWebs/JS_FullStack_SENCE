/*
CONSIGNA DE LA LECCIÓN
- Definir variables utilizando let y const
- Pedir al usuario que ingrese 2 numeros
- Implementar operaciones matematicas
- Usar estructuras condicionales


*/
const nombre = prompt("¿Cuál es tu nombre?");

console.log(nombre + ", Te doy la bienvenida!");
alert(
  "Esta es una calculadora por consola. Te voy a pedir que ingreses 2 números por favor",
);

let num1 = parseInt(prompt("Ingresa el primer número: "));
let num2 = parseInt(prompt("Ingresa el segundo número: "));

let resultado = 0;
let operacion = parseInt(
  prompt(
    `Debes elegir una operación para continuar. Por favor, elige una opción: \n1 Sumar \n2 Restar \n3 Multiplicar \n4 Dividir`,
  ),
);

switch (operacion) {
  case 1:
    resultado = num1 + num2;
    break;
  case 2:
    resultado = num1 - num2;
    break;
  case 3:
    resultado = num1 * num2;
    break;
  case 4:
    resultado = num1 / num2;
    break;
}

alert("El resultado de la operación es: " + resultado);

// Sólo se aplican estructuras condicionales. No hay validación de los datos ingresados.
