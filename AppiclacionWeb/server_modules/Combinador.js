//import { permutations } from 'itertools'
const itertools = require('itertools')

class Combinador {

  constructor(clusters){
    this.clusters = clusters;
    this.resultados = [];
    this.encontrarResultados();
  }

  encontrarResultados(){

    //Implementacion de producto cartesiano
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

    //Obtengo las permutaciones de los grupos de materias
    var permutaciones = itertools.permutations(this.clusters, this.clusters.length);
    console.log(permutaciones)
    permutaciones.forEach(permutacion => {

      //Obtengo el producto cartesiano entre las materias
      var producotCartesiano = cartesian(permutacion)
      producotCartesiano.forEach( producto => {

        //Añado ese producto a los resultados
        this.resultados.push(producto)
      })
    });
  }

  get Resultados() {
    return this.resultados;
  } 

  get Clusters() {
    return this.clusters;
  }

  setResultados(resultados) {
    this.resultados = resultados;
  }

  setClusters(clusters) {
    this.clusters = clusters;
  }

}
module.exports = Combinador