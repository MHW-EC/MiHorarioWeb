const Util = require('./Util');

class Horario {
  //Clase que se encarga de guardar paquetes con objetos materia,
  //Se encarga de validar que no colisionen antes de guardarlas
  constructor() {
    this.materiasArr = [];
  }

  set materias(mats){
    this.materiasArr = mats;
  }

  get materias(){
    return this.materiasArr;
  }

  addPaquete(paquete) {
    //Recibe un arreglo llamado paquete que contiene objetos materia
    //Agrega el paquete completo si es que ninguna de las materias
    //dentro del paquete colisiona con lo que ya existe en Horario
    //retorna un booleano dependiendo si se agrego el paquete o no
    let entraPaquete = this.entraPaquete(paquete)
    if (entraPaquete) {
      this.materias = this.materias.concat(paquete);
    }
    return entraPaquete
  }

  entraPaquete(paquete) {
    //metodo auxiliar
    //recibe un arreglo llamado paquete con 1 o 2 objetos materia
    //valida si todas las materias del paquete entran al horario
    //retorna true si no hay colisiones, de otra manera
    //retrona un objeto como excepcion con los detalles de la colision (futuro)
    //NOTA: esta funcion asume que los paquetes continenen materias
    //que son mutuamente excluyentes en sus horarios
    let entra = true;
    paquete.forEach((materiaA) => {
      this.materias.forEach((materiaB) => {
          entra = entra && this.noHayColisionCLases(materiaA, materiaB)
          if(typeof(materiaA['eventos']['examenes']) !== "undefined" &&
          typeof(materiaB['eventos']['examenes']) !== "undefined" &&  
          Object.keys(materiaA['eventos']['examenes']).length > 0 && 
          Object.keys(materiaB['eventos']['examenes']).length > 0){
            entra = entra && this.noHayColisionExamenes(materiaA, materiaB)
          }
          
        })
    })
    return entra
  }

  noHayColisionCLases(materiaA, materiaB) {
    //Metodo auxiliar (privado)
    //que recibe dos objetos clase
    //retorna true o false dependiendo de si existe colision en sus clases
    let entra = true
    materiaA['eventos']['clases'].forEach((claseA) => {
      materiaB['eventos']['clases'].forEach((claseB) => {
        entra = entra && this.noHayColisionEvento(claseA, claseB)
      })
    })
    return entra
  }
  
  noHayColisionExamenes(materiaA, materiaB) {
    //Metodo auxiliar (privado)
    //que recibe dos objetos examenes
    //retorna true o false dependiendo de si existe colision en examenes
    let entra = true
    let parcialA = materiaA['eventos']['examenes']['parcial']
    let parcialB = materiaB['eventos']['examenes']['parcial']
    entra = entra && this.noHayColisionEvento(parcialA, parcialB)
    let finalA = materiaA['eventos']['examenes']['parcial']
    let finalB = materiaB['eventos']['examenes']['parcial']
    entra = entra && this.noHayColisionEvento(finalA, finalB)
    let mejoramientoA = materiaA['eventos']['examenes']['parcial']
    let mejoramientoB = materiaB['eventos']['examenes']['parcial']
    entra = entra && this.noHayColisionEvento(mejoramientoA, mejoramientoB)
    return entra
  }
  
  noHayColisionEvento(eventoA, eventoB) {
    //Metodo auxiliar (privado)
    //que recibe dos tipos de objetos evento: clases o examenes
    //retorna true o false dependiendo de si existe colision
    return Horario.noHayColision(eventoA.inicio, eventoA.fin, eventoB.inicio, eventoB.fin)
  }

  static noHayColision(dateAi, dateAf, dateBi, dateBf) {
    //Recibe 4 objetos date
    //dateA y dateB, con sus respectivos inicios y finales
    // retorna true si los intervalos no se intersecan 
    // retorna false caso contrario
    
    dateAi = new Date(Date.parse(dateAi));
    dateAf = new Date(Date.parse(dateAf));
    dateBi = new Date(Date.parse(dateBi));
    dateBf = new Date(Date.parse(dateBf));

    let bAntesA = dateBi < dateBf && dateBf <= dateAi && dateAi < dateAf;
    let aAntesB = dateAi < dateAf && dateAf <= dateBi && dateBi < dateBf;
    let noColisionan = bAntesA || aAntesB;
    return (noColisionan);
  }

  hashCode (){
    let acumulador = 0;
    this.materiasArr.forEach(materia => acumulador += Util.hashCode(materia['_id']))
    return acumulador
  }

  equals(horario){
    let hashA = this.hashCode();
    let hashB = horario.hashCode();
    return hashA === hashB
  }

}
module.exports = Horario