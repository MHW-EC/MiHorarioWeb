import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Horario from './horario';
import * as Colors from '@material-ui/core/colors/';
import { eventoToAppointment } from '../util/util'
//import  {appointmentsC}  from './demo-data/appointments';
//import  {appointmentsP}  from './demo-data/appointmentsP';
//import  {appointmentsF}  from './demo-data/appointmentsF';
//import  {appointmentsM}  from './demo-data/appointmentsM';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [instancias, setInstancias] = React.useState();
  const [appos, setApos] = React.useState();
  const [horario, setHorario] = React.useState();


  React.useEffect(()=>{
    setHorario(props.horario)
  }, [props.horario])

  React.useEffect(()=>{
    if (horario){
      setInstancias(obtenerInstancias(horario))
    }
  }, [horario])

  React.useEffect(()=>{
    if(horario){
      setApos(obtenerAppointments(horario))
    }
    
  }, [horario])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  console.log("se mostro un horario")

  const obtenerInstancias = (horario) => {
    let codigosUnicos = new Set();
    horario.forEach( (elemento) => { codigosUnicos.add(elemento['codigo']) })
    
    let colores = Object.values(Colors).slice(1); //cojo colores de la lib Colors de material ui
    let instancias = []; //asi le llama la documentacion a un prop de appointment
    
    let index = 0
    for( let codigo of codigosUnicos) {
      instancias.push({id: codigo, color: colores[index++]}); //agrego un color por cada codigo
    }
    return instancias;
  }

  const obtenerAppointments = (horario) => {
    let appointmentsC = []
    let appointmentsP = [] 
    let appointmentsF = []
    let appointmentsM = []

    horario.forEach((materia) => {

      materia['eventos']['clases'].forEach(clase => {
        appointmentsC.push(eventoToAppointment(materia, clase, appointmentsC.length, true))
      })
      
      if("examenes" in materia['eventos'] && Object.keys(materia['eventos']['examenes'].length === 3)){
        //deben haber 3 examenes
        let objParcial = materia['eventos']['examenes']['parcial']
        appointmentsP.push(eventoToAppointment(materia, objParcial, appointmentsP.length, false))
        let objFinal = materia['eventos']['examenes']['final']
        appointmentsF.push(eventoToAppointment(materia, objFinal, appointmentsF.length, false))
        let objMejoramiento = materia['eventos']['examenes']['mejoramiento']
        appointmentsM.push(eventoToAppointment(materia, objMejoramiento, appointmentsM.length, false))
      }

    });

    return [appointmentsC, appointmentsP, appointmentsF, appointmentsM];
  }

  return ( horario && instancias && appos ? 
    <div className={classes.root}>
      <AppBar position="static" color='inherit'>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
           
        >
          <LinkTab label="CLASES" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="PARCIAL" href="/trash" {...a11yProps(1)} />
          <LinkTab label="FINAL" href="/spam" {...a11yProps(2)} />
          <LinkTab label="MEJORAMIENTO" href="/spam" {...a11yProps(3)} />
        </Tabs>
      </AppBar>


      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Horario appointments={appos[0]} instancias={instancias}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Horario appointments={appos[1]} instancias={instancias}/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Horario appointments={appos[2]} instancias={instancias}/>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Horario appointments={appos[3]}  instancias={instancias} />
        </TabPanel>

      </SwipeableViews>

      
    </div> : <></>
  );
}
