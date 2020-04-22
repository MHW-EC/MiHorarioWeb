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
  ghostIcon: {
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
  const [paralelo,setParalelo] = useState();
  const [isAdd, setIsAdd] = useState();
  const [paquete, setPaquete] = useState([]);

  const handleAddRemove = () => {
    (isAdd) ?setPaquete(paquete.filter(par => par["_id"] !== paralelo["_id"]))
    : setPaquete([...paquete, paralelo])
    setIsAdd(!isAdd);
    console.log(paquete)
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

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
    setParalelo(props.paralelo)
  },[props.paralelo]);

  useEffect(()=>{
    setIsTeorico(props.isteorico)
  },[props.isteorico]);

  useEffect(()=>{
    setIsAdd(true);
  },[]);

  const handleParAsociados = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  //fin de dependencias de cuadro de dialogo
  const getAction = () => {
    return (paralelo && isteorico) ? (<><AddBoxOutlinedIcon className={classes.ghostIcon}/>
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
    ))}</>) :(<></>)
  };

  return ( paralelo ?
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        action={ getAction()}
        title={paralelo['profesor']}
        subheader="Calificación: 87%"
      /><Divider />
      <CardContent className={classes.div}>
      <Typography variant="body2" component="p"  aling='left'>
          Clases
      </Typography>
      {paralelo.hasOwnProperty('eventos')? 
      (paralelo.eventos.clases.map(clase => (
          <React.Fragment key={clase}>
          <Typography variant="body2" aling='left' color='textSecondary'>
          - {formatoIntevalo(clase['inicio'], clase['fin'])}
          </Typography>
          </React.Fragment>
        ))):<></>}
      
      {isteorico && paralelo.hasOwnProperty('eventos')? (
          <React.Fragment className={classes.div}>
          <Typography variant="body2" component="p">
          Examenes
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Parcial {formatoIntevaloEx(paralelo.eventos.examenes.parcial['inicio'],
          paralelo.eventos.examenes.parcial['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Final {formatoIntevaloEx(paralelo.eventos.examenes.final['inicio'],
          paralelo.eventos.examenes.final['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Mejoramiento {formatoIntevaloEx(paralelo.eventos.examenes.mejoramiento['inicio'],
          paralelo.eventos.examenes.mejoramiento['fin'])}
          </Typography>
          </React.Fragment>
        ):<></>}
      </CardContent>
      
      {(paralelo && isteorico && paralelo['paralelos_practicos'].length > 0) ? (
        <><Divider />
          <CardActions>
            <Button size="small" onClick={handleParAsociados} color="primary">
              Par asociados
            </Button>
            <DialogPractico
              id="práctico-menu"
              open={open}
              keepMounted
              onClose={handleCloseDialog}
              parAsociados={paralelo['paralelos_practicos']}
            />
          </CardActions>
        </>
      ) : (<></>
      )}
    </Card>: <div>Loading...</div> 
  );
}
