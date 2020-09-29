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
import { profesorSelector } from '../../../redux/selectors';
import { getProfesor } from "../../../redux/actions/profesor";
import { useSelector, useDispatch } from 'react-redux';
import { GetChip } from "./chips";
const useStyles = makeStyles(theme =>({
  div: {
    padding: 0,
    alignContent: 'left',
    alignItems: 'left',
    
  },root: {
    maxWidth: 250,
  }
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
	const [paralelo] = useState(props.paralelo);
  const profesor = useSelector((state) =>
		profesorSelector(state, paralelo['profesor'] ? paralelo['profesor']:"SIN NOMBRE")
	);
	useEffect(() => {
		if (paralelo && !profesor) {
			dispatch(getProfesor(paralelo['profesor'] ? paralelo['profesor']:"SIN NOMBRE"
			, paralelo['codigo'], paralelo['nombre']));
		}
	}, [paralelo, profesor, dispatch]);


  /*useEffect(()=>{
    setParalelo(props.paralelo)
  },[props.paralelo]);
 */
  return ( paralelo && profesor ?
    <Card  className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        title={paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE'}
				subheader={ GetChip(profesor['registros'][0]['promedio'])}
				style={{ padding: 12 }}
      /><Divider />
      <CardContent className={classes.div}>
        <br/>
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
