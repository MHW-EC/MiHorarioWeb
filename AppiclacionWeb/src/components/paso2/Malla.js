import React,{ useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    
  },
  paperOnClick: {
    borderColor: 'blue'
  }

}));


export default function Malla() {
  const classes = useStyles();
  const [columnas] = useState(5);
  const materias = [0, 1, 2, 3, 4, 5, 6,
     7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22 ,23,24 ,25,26,27,
    28, 29 ];
  const listItems = [];
  let fila = [];
  materias.forEach(number => {
    if (number % columnas === 0) {
      fila = [];
    } else if (number % columnas === columnas - 2) {
      listItems.push(
        <Grid container spacing={3}>
          {fila}
        </Grid>
      );
    }

    fila.push(
      <Grid item xs>
        <Paper className={classes.paper} variant={'outlined'} >
          <Typography variant="subtitle2">
            MATERIA { number}
          </Typography>
          <Typography variant="caption">MATH200{number}</Typography>
        </Paper>
      </Grid>
    );
  });

  return <div className={classes.root}>{listItems}</div>;
}
