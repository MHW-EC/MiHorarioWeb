const Combinador = require('./Combinador');
const Horario = require('./Horario');

class Generador {
	constructor(paquetes) {
		this.paquetes = paquetes;
		this.mapaPaquetes = new Map();
		this.permutaciones = [];
		this.horariosGenerados = [];
		this.generarHorarios();
	}

	/**
	 * Description. Crea un mapa cen la que sus claves son los nombres de las
	 * materias y como valor una lista de todos los paralelos de esa materia
	 *
	 * @param {Paquete} paquete Lista de todas las materias selecionadas por el usuario
	 *
	 */
	crearMapa() {
		this.paquetes.forEach((paquete) => {
			let nombreMateria = paquete['paquete'][0]['nombre'];
			if (!this.mapaPaquetes.has(nombreMateria)) {
				this.mapaPaquetes.set(nombreMateria, []);
			}
			this.mapaPaquetes.get(nombreMateria).push(paquete);
		});
	}

	/**
	 * Description. Genera los horarios pposibles dado las materias seleccionadas
	 */
	generarHorarios() {
		//Crearmos los maquetes
		this.crearMapa();

		//Lista que contiene lista de materias del mismo nombre
		//Ejemplo: [[CVU1, CVU2], [FP2,FP6], [DS6, DS9]]
		let clusters = [];

		for (let [clave, valor] of this.mapaPaquetes) {
			clusters.push(valor);
		}

		let combinaciones = new Combinador(clusters);
		combinaciones.Resultados.forEach((combinacion) => {
			//let entroMatPrioritaria = true;
			//let materiaAnterior = null;
			let horario = new Horario();
			combinacion.forEach((paquete) => {
				horario.addPaquete(paquete['paquete']);
			});
			let repetido = false;
			for (let hor of this.horariosGenerados) {
				if (horario.equals(hor)) {
					repetido = true;
					break;
				}
			}
			if (!repetido) { this.horariosGenerados.push(horario); }
		});
	}


	get HorariosGenerados() {
		return this.horariosGenerados;
	}
}
module.exports = Generador;
