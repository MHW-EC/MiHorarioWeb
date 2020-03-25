import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabla from "./tabla";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      display: "flex"
    }
  }
}));

export default function PaginationControlled() {
  const classes = useStyles();

  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  //const [elementos] = React.useState(pros.elementos);

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
        count={elementos.length}
        color={"primary"}
        onChange={handleChange}
      />
    </div>
  );
}
