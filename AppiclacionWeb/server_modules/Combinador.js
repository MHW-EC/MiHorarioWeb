class Combinador {
	constructor(clusters) {
		this.clusters = clusters;
		this.resultados = [];
		this.encontrarResultados();
	}

	permutations(arreglo) {
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
		return permutaciones;
	}

	encontrarResultados() {
		//Implementacion de producto cartesiano
		const f = (a, b) =>
			[].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
		const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

		//Obtengo las permutaciones de los grupos de materias
		let permutaciones = this.permutations(this.clusters);

		permutaciones.forEach((permutacion) => {
			//Obtengo el producto cartesiano entre las materias
			let producotCartesiano = cartesian(permutacion);
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
