import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  table: {
    minWidth: 175
  },
  tableContainer: {
    maxWidth: 650
  },
  root: {
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex"
  }
});

export default function DenseTable(props) {
  const classes = useStyles();
  const [horario, setHorario] = useState();

  useEffect(()=>{
    setHorario(props.horario)
  }, [props.horario])

  return ( horario ? 
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} component={Paper} elevation={5}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="left">Materia</TableCell>
              <TableCell align="left">Par</TableCell>
              <TableCell align="left">Profesor&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horario.map(row => (
              <TableRow key={row['_id']}>
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.paralelo}</TableCell>
                <TableCell align="left">{row.profesor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant="contained" color="secondary">
        Visualizar
      </Button>
    </div > : <></>
  );
}
/*<TableCell align="left">Profesor&nbsp;</TableCell>
              <TableCell align="left">CENACAD&nbsp;%</TableCell> */