import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { withStyles } from '@material-ui/core/styles';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  Resources,
  DayView
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from '@material-ui/core/colors/';
import withWidth from "@material-ui/core/withWidth";

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
    width: '100%'
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

function Demo(props) {
  const width = props.width;
  const deltaFila = 30;
  const [currentViewName, setCurrentViewName] = useState("Week");
  const [appointments, setAppointments] = useState();
  const [currentDate, setcurrentDate] = useState()
  //const [unaSemana, setUnaSemana] = useState();
  const [limitesVerticales, setLimitesVerticales] = useState();
  const [excludedDays, setexcludedDays] = useState();
  const [recursos, setRecursos] = useState();
  const [firstDay, setFirstDay] = useState();
  
  useEffect(() => {
    if(props.appointments){
      let sorted = [...props.appointments].sort(function (a, b) { return a['startDate'] - b['startDate'] });
      console.log(sorted);
      setAppointments(sorted)
    }
  },[props.appointments])

  useEffect(() => {
    if(currentDate){
      setFirstDay(new Date(currentDate).getDay())
    }
  },[currentDate])

  useEffect(() => {
    if(props.instancias){
      setRecursos([
        {
          fieldName: 'members',
          allowMultiple: true,
          instances: props.instancias
        }
      ])
    }
  }, [props.instancias])

  useEffect(() => {
    console.log(width)
    if (width === "xs") {
      setCurrentViewName("Day");
    } else {
      setCurrentViewName("Week");
    }
  }, [width])
  //this.ordenarAppointments();
  
  /*const enUnaMismaSemana = (appointments) => {
    if (appointments.length > 1) {
      let MILLISINDAY = 24 * 60 * 60 * 1000;
      let inicioHorario = this.props.appointments[0]['startDate'];
      let finHorario = this.props.appointments[this.props.appointments.length - 1]['startDate'];
      return ((finHorario - inicioHorario) <= 7 * MILLISINDAY)
    }
    return true;
  }*/
  

  useEffect(() => {
    const getNumberHour = (date, delta) => {//Metodo provicional 
      // 13:30 -> 13.5, 13:10 -> 13, 13:45-> 14
      let fraccion = delta / 60;
      let hora = date.getHours();
      let horaFraccion = Math.ceil(date.getMinutes() / delta) * fraccion;
      return hora + horaFraccion;
    }
  
    const getLimitesVerticales = (delta, appointments) => {
      let inicio = appointments[0]['startDate'];
      let inicioNumber = getNumberHour(inicio, delta);
      let fin = appointments[0]['endDate'];
      let finNumber = getNumberHour(fin, delta);
  
      appointments.forEach(element => {
        inicioNumber = (getNumberHour(element['startDate'], delta) < inicioNumber)
          ? getNumberHour(element['startDate'], delta)
          : inicioNumber;
        finNumber = (getNumberHour(element['endDate'], delta) > finNumber)
          ? getNumberHour(element['endDate'], delta)
          : finNumber;
  
      });
      return {
        inicio: inicioNumber,
        fin: finNumber
      };
    }
    const getExcludedDays = (appointments) => {
      let todos = [0, 6];
      appointments.forEach(element => {
        let indice = todos.findIndex(f => f === element['startDate'].getDay());
        if (indice !== -1) { todos.splice(indice, 1); }
      });
      return todos;
    }
    const setearColores = (appointments) => {
      appointments.forEach(element => {
        element['members'] = [element['codigo']];//antes title
      });
      return appointments
    }
    
    /*const obtenerPrimerEvento = (appointments) => {
      appointments.sort(function (a, b) { return a['startDate'] - b['startDate'] });
      return appointments[0]['startDate']
    }*/
    if (appointments) {
      setcurrentDate(appointments[0]['startDate'])
      //setUnaSemana(enUnaMismaSemana(appointments))
      setLimitesVerticales(getLimitesVerticales(deltaFila, appointments))
      setexcludedDays(getExcludedDays(appointments))
      setAppointments(setearColores(appointments))
    }
  }, [appointments])

  const currentDateChange = (currentDate) => {
    let origen = new Date(appointments[0]['startDate'])
    let fin = new Date(appointments[appointments.length - 1]['startDate'])
    let actual = new Date(currentDate)
    console.log(origen);
    console.log(actual);
    console.log(fin);
    if (origen <= actual && actual <= fin ) {
        setcurrentDate(currentDate)
    }
  };

  return (
    appointments && recursos && currentDate
    && excludedDays && limitesVerticales? (
      <Paper>
      <Scheduler data={appointments} 
      locale='es-ES' 
      firstDayOfWeek={firstDay}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
          currentViewName={currentViewName}
        //onCurrentViewNameChange={currentViewNameChange}
        />
        <WeekView
          excludedDays={excludedDays}
          cellDuration={deltaFila}
          startDayHour={limitesVerticales["inicio"]}
          endDayHour={limitesVerticales["fin"]}
        />
        <DayView
          cellDuration={deltaFila}
          startDayHour={limitesVerticales["inicio"]}
          endDayHour={limitesVerticales["fin"]}
        />
        <Toolbar />
        <DateNavigator />
        <Appointments appointmentContentComponent={AppointmentContent} />
        <Resources
          palette={[Colors.red]}
          data={recursos}
        />
      </Scheduler>
    </Paper>
    )
     : null  );
}
export default withWidth()(Demo);
