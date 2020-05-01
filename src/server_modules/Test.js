const Generador = require('./Generador');
const listaPaquete1 = require('./listaPaqueres2');
const Combinador = require('./Combinador');
//console.log(listaPaquete1);
//{{A1,A2},{B1},{C1,C2}}

////////Test Combinador///////////////////////

/*let gru = [
[["A1","A101"],["A2"],["A3","A103"]],
[["B1"],["B2","B102"],["B3","B103"]],
[["C1","C101"],["C2"],["C3"]],
[["D1","D101"],["D3","D103"]]
];//[["D1","D101"],["D3","D103"]]
let gre = [{'bloque':gru[0]},{'bloque':gru[1]},
{'bloque':gru[2]},{'bloque':gru[3]}];
console.log("Cluster: ",gru)
let combi = new Combinador(gru);
console.log(combi.Resultados);
console.log(combi.Resultados.length);
*/

/////////Test Generador///////////////
let listaPaquete2 = listaPaquete1.slice(0,1)
console.log(listaPaquete2)
console.log("Tamaño paqueteria: ",listaPaquete2.length);
const retFun = (arr) => { return {'paquete': arr} };

let paquetesObj = listaPaquete2.map( retFun );
console.log(paquetesObj)
let gen = new Generador(paquetesObj);
let result = gen.HorariosGenerados;

result.forEach((horario,indice) => {
    //console.log("Horario # ", indice+1)
    let mats = horario.materias;
    let idsMats = []
    mats.forEach(mat => {
        //console.log(mat['nombre'],mat['paralelo']);
        idsMats.push(mat['_id']);
    })
    console.log(idsMats);
})
console.log("Horarios generados: ",result.length);
