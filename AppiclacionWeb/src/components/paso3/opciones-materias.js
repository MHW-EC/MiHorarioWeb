import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMateria from "./card-materia";
const useStyles = makeStyles({
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
  const materiasSelect = props.materiasSelect;
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="center">
        {materiasSelect.map((materia) => (
          <Grid item xs={10} sm={10} md={8} lg={6} xl={6}>
            <CardMateria materia={materia} isMobile={props.isMobile} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
