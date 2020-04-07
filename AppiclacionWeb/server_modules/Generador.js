const Combinador = requiere('./Combinador')
const Horario = require('./Horario')
export class Generador{

  constructor(paquetes){
    this.paquetes = paquetes
    this.mapaPaquetes = new Map()
    this.permutaciones = []
    this.horariosGenerados = new Set();
  }


  /**
   * Description. Crea un mapa cen la que sus claves son los nombres de las 
   * materias y como valor una lista de todos los paralelos de esa materia 
   * 
   * @param {Paquete} paquete Lista de todas las materias selecionadas por el usuario
   * 
   */
  crearMapa(){

    this.paquetes.array.forEach(paquete => {

      nombreMateria = paquete[0]['nombre']
      if(!this.mapaPaquetes.has(nombreMateria) ){
        this.mapaPaquetes.set(nombreMateria, [])
      }
      this.mapaPaquetes.get(nombreMateria).push(paquete)
    });
  }

  /**
   * Description. Genera los horarios pposibles dado las materias seleccionadas
   */
  generarHorarios(){

    //Crearmos los maquetes
    crearMapa()

    //Lista que contiene lista de materias del mismo nombre
    //Ejemplo: [[CVU1, CVU2], [FP2,FP6], [DS6, DS9]]
    clusters = []

    this.mapaPaquetes.values.forEach( materia => {

      clusters.push(materia)
    })

    combinaciones = new Combinador(this.clusters)

    combinaciones.getResultados().array.forEach(combinacion => {
      
      entroMatPrioritaria = true
      materiaAnterior = null  
      horario = new Horario()
      
      combinacion.array.forEach(materiaActual => {
        
        try {
          horario.addPaquete(materiaActual)
          materiaAnterior = materiaActual
        }catch(error){
          console.log('Error :(')
          if(materiaActual['obligatoria']){
            entroMatPrioritaria = false;
            break
          }
        }
      });
      if(entroMatPrioritaria) this.horariosGenerados.push(horario)
    });
  }

  getHorariosGenerados() {
    return horariosGenerados;
  }

}