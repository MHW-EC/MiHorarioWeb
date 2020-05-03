import React, { useEffect, useState } from "react";
import {withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton"

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
  },skeleton: {
    //marginTop: theme.spacing(2),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      display: "flex",
  },
});
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white
  },
  /*body: {
    fontSize: 14
  }*/
}))(TableCell);

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
              <StyledTableCell>CÓDIGO</StyledTableCell>
              <StyledTableCell align="left">MATERIA</StyledTableCell>
              <StyledTableCell align="left">PAR</StyledTableCell>
              <StyledTableCell align="left">PROFESOR</StyledTableCell>
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
      
    </div > : <div className= {classes.skeleton}>
      <Skeleton variant="rect" amination='wave' width={400} height={400} />
      <br/><Skeleton variant="circle" amination='wave' width={40} height={40} />
    </div>
  );
}
/*<TableCell align="left">Profesor&nbsp;</TableCell>
              <TableCell align="left">CENACAD&nbsp;%</TableCell> */