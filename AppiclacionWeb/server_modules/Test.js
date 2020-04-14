const Generador = require('./Generador');
const listaPaquete1 = require('./listaPaquetes1');

//console.log(listaPaquete1);

let gen = new Generador(listaPaquete1);
let result = gen.HorariosGenerados;
console.log(result);
console.log(result.size);
