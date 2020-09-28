class Combinador {
	constructor(clusters) {
		this.clusters = clusters;
		this.resultados = [];
		this.encontrarResultados();
	}

	static permutations(arreglo) {
		let permutaciones = [];

		for (let i = 0; i < arreglo.length; i = i + 1) {
			let rest = this.permutations(
				arreglo.slice(0, i).concat(arreglo.slice(i + 1))
			);

			if (!rest.length) {
				permutaciones.push([arreglo[i]]);
			} else {
				for (let j = 0; j < rest.length; j = j + 1) {
					permutaciones.push([arreglo[i]].concat(rest[j]));
				}
			}
		}
		return permutaciones
	}
	static cartesianProduct(a,b,...c){
		//Implementacion de producto cartesiano
		const concatCallBack = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
		
		return (b ? Combinador.cartesianProduct(concatCallBack(a, b), ...c) : a);
	}

	encontrarResultados() {
		//Obtengo las permutaciones de los grupos de materias
		let permutaciones = Combinador.permutations(this.clusters);
		
		if(permutaciones.length === 1 ){ 
			//console.log(permutaciones)
			permutaciones =[permutaciones]
		} //parche 1 sola materia
		
		permutaciones.forEach((permutacion) => {
			//Obtengo el producto cartesiano entre las materias
			let producotCartesiano = Combinador.cartesianProduct(...permutacion);
			producotCartesiano.forEach((producto) => {
				//Añado ese producto a los resultados
				this.resultados.push(producto);
			});
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
module.exports = Combinador;
