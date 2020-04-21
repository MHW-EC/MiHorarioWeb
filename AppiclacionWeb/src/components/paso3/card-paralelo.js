import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardHeader,
  Button
} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import DialogPractico from "./dialog-practico";
//import axios from 'axios';
//import {formatoIntevalo} from './../util/util'
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    //minWidth: 250,
    //maxWidth: 250,
    //maxHeight: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
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
  const isteorico = props.isteorico;
  const [teorico,setTeorico] = useState();
  
  useEffect(()=>{
    setTeorico(props.teorico)
  },[props.teorico]);

  
  console.log("par",teorico);

  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //fin de dependencias de cuadro de dialogo
  const getAction = () => {
    return isteorico ? (
      <Tooltip title={toolTipNode}>
        <IconButton aria-label="add-delete">
          <AddBoxOutlinedIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <></>
    );
  };
  return ( teorico ?
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {teorico['paralelo']}
          </Avatar>
        }
        action={getAction()}
        title={teorico['profesor']}
        subheader="Calificacion: 87%"
      />
      <CardContent>
      {[0,1].map(clase => (
          <React.Fragment key={clase}>
          <Typography variant="body2" component="p">
          Hola prueba
          </Typography>
          <br/>
          </React.Fragment>
        ))}
      </CardContent>
        
      {isteorico ? (
        <>
          <CardActions>
            <Button size="small" onClick={handleClickListItem}>
              Seleccionar practico
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
