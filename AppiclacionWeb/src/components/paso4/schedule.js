import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from '@material-ui/core/colors/';

export default class Demo extends React.PureComponent {

  constructor(props) {

    super(props);
    this.ordenarAppointments();
    
    const deltaFila = 30;
    
    this.state = {
      data: this.props.appointments,
      currentDate: this.props.appointments[0]['startDate'],
      deltaFila : deltaFila,
      unaSemana: this.enUnaMismaSemana(),
      limitesVerticales: this.limitesVerticales(deltaFila),
      excludedDays : this.getExcludedDays(),
      recursos: [
        {
          fieldName: 'members',
          allowMultiple: true,
          instances: this.obtenerInstancias()
        }
      ]
    };
    this.setearColores();
    this.currentDateChange = (currentDate) => {this.setState({ currentDate });};
  }

  obtenerInstancias(){
    let nombreMaterias = [];
    this.props.appointments.forEach( (elemento) => {
      let indice = nombreMaterias.findIndex(f => f === elemento['title']);
      if(indice === -1){
        nombreMaterias.push(elemento['title']) ; }
    });
    
    let colores = Object.values(Colors).slice(1);
    let instancias = [];
    nombreMaterias.forEach((materia,indice)=>{
      let objetoColores = {};
      objetoColores['id']=materia;
      objetoColores['color']=colores[indice];
      instancias.push(objetoColores);
    });
    //console.log(instancias);
    return instancias;
  }

  setearColores(){
    this.props.appointments.forEach(element => {
      element['members'] = [element['title']];
    });
  }

  getExcludedDays(){
    let todos = [0,1,2,3,4,5,6];
    this.props.appointments.forEach(element => {
      let indice = todos.findIndex(f => f === element['startDate'].getDay());
      if(indice !== -1){ todos.splice(indice, 1);}
    });
    return todos;
  }
  

  getNumberHour(date,delta){//Metodo provicional 
    // 13:30 -> 13.5, 13:10 -> 13, 13:45-> 14
    let fraccion = delta / 60;
    let hora = date.getHours();
    let horaFraccion = Math.ceil(date.getMinutes()/delta) * fraccion;
    return hora+horaFraccion;
  }

  limitesVerticales(delta){
    let inicio = this.props.appointments[0]['startDate'];
    let inicioNumber = this.getNumberHour(inicio,delta);
    let fin = this.props.appointments[0]['endDate'];
    let finNumber = this.getNumberHour(fin,delta);
    
    this.props.appointments.forEach(element => {
      inicioNumber = (this.getNumberHour(element['startDate'],delta)<inicioNumber) 
      ? this.getNumberHour(element['startDate'],delta) 
      : inicioNumber;
      finNumber = (this.getNumberHour(element['endDate'],delta)>finNumber) 
      ? this.getNumberHour(element['endDate'],delta) 
      : finNumber;
      
    });
    return {inicio:inicioNumber,
            fin:finNumber};
  }

  ordenarAppointments(){
    this.props.appointments.sort(function(a, b){return a['startDate'] - b['startDate']});
  }

  enUnaMismaSemana(){
    
    if(this.props.appointments.length>1){
      let MILLISINDAY = 24*60*60*1000;
      let inicioHorario = this.props.appointments[0]['startDate'];
      let finHorario = this.props.appointments[this.props.appointments.length-1]['startDate'];
      
      return ((finHorario - inicioHorario) <= 7*MILLISINDAY)
    }
    return true;
  }


  render() {
    //console.log(this.getExcludedDays());
    const { data, currentDate, deltaFila,unaSemana, limitesVerticales,excludedDays,recursos} = this.state;
    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView
            excludedDays={excludedDays}
            cellDuration={deltaFila}
            startDayHour={limitesVerticales["inicio"]}
            endDayHour={limitesVerticales["fin"]}
          />
          { ((!unaSemana)?<><Toolbar /></>:<></>)}
          { ((!unaSemana)?<><DateNavigator /></>:<></>) }
          <Appointments />
          <Resources
            palette={[Colors.red]}
            data={recursos}
          />
        </Scheduler>
      </Paper>
    );
  }
}
