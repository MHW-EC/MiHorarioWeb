import { permutations } from 'itertools'

export class Combinador {

  constructor(clusters){
    this.clusters = clusters
    this.resultados = []
    encontrarResultados()
  }

  encontrarResultados(){

    //Implementacion de producto cartesiano
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

    //Obtengo las permutaciones de los grupos de materias
    permutaciones = permutations(clusters, clusters.length)
    permutaciones.array.forEach(permutacion => {

      //Obtengo el producto cartesiano entre las materias
      producotCartesiano = cartesian(permutacion)
      producotCartesiano.array.forEach( producto => {

        //Añado ese producto a los resultados
        this.resultados.push(producto)
      })
    });
  }

  getResultados() {
    return resultados;
  } 

  getClusters() {
    return clusters;
  }

  setResultados(resultados) {
    this.resultados = resultados;
  }

  setClusters(clusters) {
    this.clusters = clusters;
  }

}