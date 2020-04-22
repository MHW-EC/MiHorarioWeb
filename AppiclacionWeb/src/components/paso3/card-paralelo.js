import React,{useState, useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardHeader,
  Button,
  Divider
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import DialogPractico from "./dialog-practico";
import Zoom from "@material-ui/core/Zoom";
import {formatoIntevalo, formatoIntevaloEx} from './../util/util'
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles(theme =>({
  root: {
    //minWidth: 250,
    //maxWidth: 250,
    //maxHeight: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  div: {
    padding: 0,
    alignContent: 'left',
    alignItems: 'left',

  },
  fab: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0)
  },
  ghosthIcon: {
    opacity: 0
  }
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  var toolTipNode = React.createElement(
    "div",
    {
      style: {
        backgroundColor: "transparent",
        fontSize: "13px"
      }
    },
    "Añadir"
  );
  //const bull = <span className={classes.bullet}>•</span>;
  //necesarios para el cuadro de dialogo de paralelo
  const [open, setOpen] = useState(false);
  const [isteorico, setIsTeorico]= useState();
  const [teorico,setTeorico] = useState();
  const [isAdd, setIsAdd] = useState();
  const [paquete, setPaquete] = useState([]);

  const handleAddRemove = () => {
    (isAdd) ?setPaquete(paquete.filter(paralelo => paralelo["_id"] !== teorico["_id"]))
    : setPaquete([...paquete, teorico])
    setIsAdd(!isAdd);
    console.log(paquete)
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const addToPaquete = (par) =>{
    
  }
  const removeToPaquete = (par) =>{
    
  }

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddBoxOutlinedIcon />,
      label: "Add",
      entra: true,
      tooltipNode: "Add"
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <DeleteOutlineIcon />,
      label: "Remove",
      entra: false,
      tooltipNode: "Remove"
    }
  ];

  useEffect(()=>{
    setTeorico(props.teorico)
  },[props.teorico]);

  useEffect(()=>{
    setIsTeorico(props.isteorico)
  },[props.isteorico]);

  useEffect(()=>{
    setIsAdd(true);
  },[]);

  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //fin de dependencias de cuadro de dialogo
  const getAction = () => {
    return (isteorico && teorico) ? (<><AddBoxOutlinedIcon className={classes.ghosthIcon}/>
    {fabs.map((fab, index) => (
      <Zoom
        key={fab.color}
        in={isAdd === fab.entra}
        timeout={transitionDuration}
        unmountOnExit
      >
        <Tooltip title={fab.tooltipNode}>
          <IconButton
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={() => {
              handleAddRemove();
            }}
          >
            {fab.icon}
          </IconButton>
        </Tooltip>
      </Zoom>
    ))}</>) :(<><p>jo</p></>)
  };

  return ( teorico ?
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {teorico['paralelo']}
          </Avatar>
        }
        action={teorico ? getAction() : <p>H</p>}
        title={teorico['profesor']}
        subheader="Calificación: 87%"
      /><Divider />
      <CardContent className={classes.div}>
      <Typography variant="body2" component="p"  aling='left'>
          Clases
          </Typography>
      {teorico.hasOwnProperty('eventos')? (teorico.eventos.clases.map(clase => (
          <React.Fragment key={clase}>
          <Typography variant="body2" aling='left' color='textSecondary'>
          - {formatoIntevalo(clase['inicio'], clase['fin'])}
          </Typography>
          </React.Fragment>
        ))):<div>Loading...</div>}
      <Typography variant="body2" component="p">
          Examenes
      </Typography>
      {teorico.hasOwnProperty('eventos')? (<React.Fragment className={classes.div}>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Parcial {formatoIntevaloEx(teorico.eventos.examenes.parcial['inicio'],
          teorico.eventos.examenes.parcial['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Final {formatoIntevaloEx(teorico.eventos.examenes.final['inicio'],
          teorico.eventos.examenes.final['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Mejoramiento {formatoIntevaloEx(teorico.eventos.examenes.mejoramiento['inicio'],
          teorico.eventos.examenes.mejoramiento['fin'])}
          </Typography>
          </React.Fragment>
        ):<div>Loading...</div>}
      </CardContent>
      
      {isteorico ? (
        
        <><Divider />
          <CardActions>
            <Button size="small" onClick={handleClickListItem} color="primary">
              Par asociados
            </Button>
            <DialogPractico
              id="práctico-menu"
              open={open}
              keepMounted
              onClose={handleClose}
            />
          </CardActions>
        </>
      ) : (
        <></>
      )}
    </Card>: <div>Loading...</div> 
  );
}
