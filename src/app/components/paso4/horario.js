import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { withStyles } from '@material-ui/core/styles';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from '@material-ui/core/colors/';


const styles = ({ spacing, palette }) => ({
  
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {
    textAlign: 'center',
    display: 'inline-block',
  },
});

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({
  classes, data, formatDate, ...restProps
}) => (
  <Appointments.AppointmentContent {...restProps} formatDate={formatDate} data={data}>
    <div className={classes.container}>
      <div className={classes.title}>
        {data.codigo}
      </div>
      <div className={classes.title}>
        {data.nombre}
      </div>
      <div className={classes.text}>
        PAR {data.paralelo}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {formatDate(data.startDate.toString(), { hour: 'numeric', minute: 'numeric' })}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {formatDate(data.endDate.toString(), { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  </Appointments.AppointmentContent>
));

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
          instances: this.props.instancias
        }
      ]
    };
    this.setearColores();
    this.currentDateChange = (currentDate) => {this.setState({ currentDate });};
  }

  setearColores(){
    this.props.appointments.forEach(element => {
      element['members'] = [element['codigo']];//antes title
    });
  }

  getExcludedDays(){
    let todos = [0,6];
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
    
    const { data, currentDate, deltaFila,unaSemana, limitesVerticales,excludedDays,recursos} = this.state;
    return (
      <Paper>
        <Scheduler data={data} locale='es-ES' >
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
          <Appointments appointmentContentComponent={AppointmentContent} />
          <Resources
            palette={[Colors.red]}
            data={recursos}
          />
        </Scheduler>
      </Paper>
    );
  }
}
