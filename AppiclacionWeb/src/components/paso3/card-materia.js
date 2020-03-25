import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import { Typography, CardContent, CardActions } from "@material-ui/core";
import CardParalelo from "./card-paralelo";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary,
    fontSize: "14px"
  },
  cardActions: {
    backgroundColor: theme.palette.primary.main
  },
  cardContent: {
    padding: 10
  }
}));

export default function SingleLineGridList(props) {
  const classes = useStyles();
  const materia = props.materia;
  const paralelos = [0, 1, 2, 3, 4];
  const nCols = props.isMobile ? 1 : 2;
  //antes se retornaba un div con classname root
  return (
    <Card elevation={10}>
      <CardContent className={classes.cardContent}>
        <GridList
          padding={10}
          spacing={10}
          cellHeight={"auto"}
          className={classes.gridList}
          cols={nCols}
        >
          {paralelos.map(tile => (
            <GridListTile key={tile.img}>
              <CardParalelo teorico={true} />
            </GridListTile>
          ))}
        </GridList>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography
          className={classes.title}
          color="textPrimary"
          variant="h5"
          component="h2"
        >
          MATERIA {materia["codigo"]}
        </Typography>
      </CardActions>
    </Card>
  );
}
