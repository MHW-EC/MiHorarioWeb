import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabla from "./tabla";

import {useState} from 'react'
import { paqueteria as paqSelector } from '../../redux/selectors';
import { seleccionados as selSelector } from '../../redux/selectors';


import { useSelector, useDispatch } from 'react-redux'
import { resultadosGenerados as resultadosSelector } from '../../redux/selectors';
import { getResultadosGenerados } from '../../redux/actions/generador'
const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      display: "flex"
    }
  },
  pagination:{
    
  }
}));

export default function PaginationControlled() {
  const classes = useStyles();

  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  //const [elementos] = React.useState(pros.elementos);
  const dispatch = useDispatch();
  
  const paquetesSeleccionados = useSelector((state) =>  paqSelector(state));
  const idsSeleccionados = useSelector((state) =>  selSelector(state));
  const [paquetes, setPaquetes] = useState();

  //console.log(paquetesSeleccionados);
  //console.log(idsSeleccionados)
  useEffect(()=>{
        setPaquetes((paquetesSeleccionados.filter
          (paq => idsSeleccionados.includes(paq['teoricoId']))).map(fil => fil['array']))
  },[paquetesSeleccionados, idsSeleccionados]) 
  //console.log('paquetes',paquetes);

  const horariosGenerados = useSelector((state) =>  resultadosSelector(state));
  useEffect(() => {
		if (horariosGenerados.length === 0 ) {
			dispatch(getResultadosGenerados(paquetes));
		}
	},[horariosGenerados,dispatch,paquetes]);
console.log("Generados: ", horariosGenerados)

  const handleChange = (event, value) => {
    setPage(value);
  };
  const elementos = [0, 1, 2, "2", 4];
  return (
    <div className={classes.root}>
      <SwipeableViews
        disabled
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={page - 1}
      >
        {elementos.map((e, i, a) => (
          <Tabla key={i} />
        ))}
      </SwipeableViews>
      <Pagination
        //style={classes.pagination}
        count={elementos.length}
        color={"primary"}
        onChange={handleChange}
      />
    </div>
  );
}
