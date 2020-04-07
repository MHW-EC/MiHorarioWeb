const Horario = require('./Horario')

function sumarTiempo(date, tipo, unidades) {
  //recibe (date) date
  //tipo: (string) minuto, hora, dia
  //unidades, (int) las unidades de tipo a sumar
  //retorna un nuevo objeto date con el tiempo sumado 
  let factor;
  let millisEnSegundo = 1000;
  switch (tipo) {
    case 'minuto':
      factor = millisEnSegundo * 60;
      break;
    case 'hora':
      factor = millisEnSegundo * 60 * 60;
      break;
    case 'dia':
      factor = millisEnSegundo * 60 * 60 * 24;
      break;
    default:
      factor = millisEnSegundo;
  }
  return new Date(factor * unidades + date.getTime());
}

function test() {
  //Prueba nohayColision y sumarTiempo
  let initA = new Date(2018, 11, 24, 9, 20);
  let finA = new Date(2018, 11, 24, 10, 20);
  let initB = new Date(2018, 11, 24, 11, 30);
  let finB = new Date(2018, 11, 24, 13, 30);
  [1, 1, 1, 1, 1, 1, 1, 1].map(e => {
    console.log(initA);
    console.log(finA);
    console.log(initB);
    console.log(finB);
    console.log(Horario.noHayColision(initA, finA, initB, finB));
    console.log()
    initA = sumarTiempo(initA, 'hora', 1);
    finA = sumarTiempo(finA, 'hora', 1);
  })
}

