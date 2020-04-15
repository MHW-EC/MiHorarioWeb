const Generador = require('./Generador');
const listaPaquete1 = require('./listaPaquetes1');
const Combinador = require('./Combinador');
//console.log(listaPaquete1);
//{{A1,A2},{B1},{C1,C2}}

////////Test Combinador///////////////////////
/*let gru = [[["A1","A101"],["A2","A201"]],[["B1"]],[["C1","C101"],["C2","C201"]]];
let gre = [[{'bloque':["A1","A101"]},{'bloque':["A2","A201"]}],
[{'bloque':["B1"]}],[{'bloque':["C1","C101"]},{'bloque':["C2","C201"]}]];
console.log("Cluster: ",gru)
let combi = new Combinador(gru);
console.log(combi.Resultados);
console.log(combi.Resultados.length);
*/

/////////Test Generador///////////////
console.log("Tamaño paqueteria: ",listaPaquete1.length);

const retFun = (arr) => { return {'paquete': arr} };
let paquetesObj = listaPaquete1.map( retFun );

let gen = new Generador(paquetesObj);
let result = gen.HorariosGenerados;
//console.log(result);
console.log("Horarios generados: ",result.length);