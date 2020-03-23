import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CardParalelo from "./card-paralelo";
//import * as Colors from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "transparent",
    minWidth: 'auto',
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    padding: 10,
  },
  gridTile: {
    minWidth: 260,
    minHeight: 225,
  },
}));

export default function SingleLineGridList() {
  const classes = useStyles();
  const tileData = [
    { img: "0", title: "t1" },
    { img: "1", title: "t1" },
    { img: "2", title: "t2" },
    { img: "3", title: "t3" },
    { img: "4", title: "t4" },
    { img: "5", title: "t5" }
  ];
  //<img src={tile.img} alt={tile.title} />
  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={10}
        spacing={10}
      >
        {tileData.map(tile => (
          <GridListTile  key={tile['img']} className={classes.gridTile}  >
          <CardParalelo teorico={true} />
          </GridListTile> 
        ))}
      </GridList>
    </div>
  );
}
