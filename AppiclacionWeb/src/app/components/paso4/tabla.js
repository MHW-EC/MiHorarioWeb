import React from "react";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Materia", 1, "Profesor X", 80),
  createData("Materia A", 101, "Profesor A", 75),
  createData("Materia B", 2, "Profesor B", 60),
  createData("Materia C", 4, "Profesor D", 80),
  createData("Materia D", 7, "Profesor F", 75),
  createData("Materia E", 1, "Profesor X", 99)
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} component={Paper} elevation={5}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Materia</TableCell>
              <TableCell align="left">Paralelo</TableCell>
              <TableCell align="left">Profesor&nbsp;</TableCell>
              <TableCell align="left">CENACAD&nbsp;%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="left">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant="contained" color="secondary">
        Visualizar
      </Button>
    </div >
  );
}
