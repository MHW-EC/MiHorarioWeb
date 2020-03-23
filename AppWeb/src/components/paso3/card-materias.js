import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CarreteParalelos from "./carrete-paralelos";
import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  cardContent:{
    padding: 0,
    backgroundColor: Colors.grey[200],
    minHeight: 'auto'
  },
  title: {
    fontSize: 14
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={10}>
      <CardContent className={classes.cardContent}>
        <CarreteParalelos />
      </CardContent>
      <CardActions style={{ backgroundColor: Colors.teal[500] }}>
        <Typography className={classes.title} color="textPrimary" variant="h1">
        MATERIA #1
        </Typography>
      </CardActions>
    </Card>
  );
}
