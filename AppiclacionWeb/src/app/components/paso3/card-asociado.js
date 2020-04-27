import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  Divider
} from "@material-ui/core";
import {formatoIntevalo} from './../util/util'
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles(theme =>({
  div: {
    padding: 0,
    alignContent: 'left',
    alignItems: 'left',

  },
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const [paralelo,setParalelo] = useState();

  useEffect(()=>{
    setParalelo(props.paralelo)
  },[props.paralelo]);
 
  return ( paralelo ?
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        title={paralelo['profesor'] ? paralelo['profesor'] : "Sin nombre"}
        subheader="Sin calificación"
      /><Divider />
      <CardContent className={classes.div}>
      <Typography variant="body2" component="p"  aling='left'>
          Clases
      </Typography>
      {paralelo.hasOwnProperty('eventos')? 
      (paralelo.eventos.clases.map(clase => (
          <React.Fragment key={clase['inicio']}>
          <Typography variant="body2" aling='left' color='textSecondary'>
          - {formatoIntevalo(clase['inicio'], clase['fin'])}
          </Typography>
          </React.Fragment>
        ))):<></>}
      </CardContent>
    </Card>: <div>Loading...</div> 
  );
}
