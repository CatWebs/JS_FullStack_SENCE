/*
CONSIGNA DE LA LECCIÓN
- Crear funciones para cada operación matemática
- Implementar función que reciba parámetros y retorne un resultado
- Llamar funciones dentro de otras para optimizar el código
*/

function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  return a / b;
}

const calcular = (numA, numB, operacion) => {
  let resultado;
  switch (operacion) {
    case 1:
      alert("Usted ha seleccionado sumar " + numA + " y " + numB);
      resultado = sumar(numA, numB);
      break;
    case 2:
      alert("Usted ha seleccionado restar " + numA + " y " + numB);
      resultado = restar(numA, numB);
      break;
    case 3:
      alert("Usted ha seleccionado multiplicar " + numA + " y " + numB);
      resultado = multiplicar(numA, numB);
      break;
    case 4:
      alert("Usted ha seleccionado dividir " + numA + " y " + numB);
      resultado = dividir(numA, numB);
      break;
    default:
      alert("opción ingresada no válida");
  }
  return resultado;
};

let confirmacion = confirm(
  "Presione 'Aceptar' para comenzar a calcular y 'Cancelar' para detener la ejecución del programa",
);
if (confirmacion) {
  let ingresarNumA = parseFloat(prompt("Ingrese primer número:"));
  let ingresarNumB = parseFloat(prompt("Ingrese segundo número:"));
  let ingresarOperacion = parseInt(
    prompt(
      "Ingrese número que corresponda a la operación: \n1.sumar\n2.restar\n3.multiplicar\n4.dividir",
    ),
  );
  const resultado = calcular(ingresarNumA, ingresarNumB, ingresarOperacion);
  alert("El resultado de su operación es: " + resultado);
} else {
  alert("Usted ha detenido la ejecución del programa");
}
