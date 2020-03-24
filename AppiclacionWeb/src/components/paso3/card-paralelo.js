import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardHeader,
  Button} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import DialogPractico from "./dialog-practico";
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250,
    maxHeight: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
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
  const bull = <span className={classes.bullet}>•</span>;

  //necesarios para el cuadro de dialogo de paralelo
  const [open, setOpen] = React.useState(false);
  const {teorico} = props;
  
  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //fin de dependencias de cuadro de dialogo
  const getAction = () =>{
    return (teorico)
    ?<Tooltip title={toolTipNode}>
      <IconButton aria-label="add-delete">
        <AddBoxOutlinedIcon />
      </IconButton>
      </Tooltip>
      :<></>
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            #
          </Avatar>
        }
        action={getAction()}
        title="Profesor Nombre Nombre Apellido"
        subheader="Calificacion: 87%"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {bull} Martes 7:30 - 9:30
          <br />
          {bull} Jueves 7:30 - 9:30
        </Typography>
            
      </CardContent>
      
      { (teorico)?<>
        <CardActions>
        <Button size="small" onClick={handleClickListItem}>Seleccionar practico</Button>
        <DialogPractico
          id="práctico-menu"
          open={open}
          keepMounted
          onClose={handleClose}
        />
      </CardActions>
      </>:<></> }
      
    </Card>
  );
}
