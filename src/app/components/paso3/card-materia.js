import React,{ useEffect,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import { Typography, CardContent, CardActions } from "@material-ui/core";
import CardTeorico from "./card-teorico";
import { useSelector, useDispatch } from 'react-redux'
import { teoricosResults as paralelosSelector } from '../../../redux/selectors';
import { getTeoricos } from '../../../redux/actions/teorico'

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
  cardActions: {
    backgroundColor: theme.palette.primary.main
  },
  cardContent: {
    padding: 10
  }
}));

export default function SingleLineGridList(props) {
  const classes = useStyles();
  const [materia] = useState(props.materia);
  const [nCols] = useState(props.isMobile ? 1 : 1.2);
  //const [paralelos,setParalelos] = useState();
  const dispatch = useDispatch();
  const parTeorico = useSelector((state, codigo) =>  paralelosSelector(state,materia['codigo']));

  useEffect(() => {
		if (!parTeorico) {
			dispatch(getTeoricos(materia['codigo']));
		}
  });
  return parTeorico ? (
    <Card elevation={6} style={{minHeight: 'auto'}}>
      <CardContent className={classes.cardContent}>
        <GridList
          padding={10}
          spacing={10}
          cellHeight={"auto"}
          className={classes.gridList}
          cols={nCols}
  >   
         {parTeorico['paralelos'].map(par=>(
         <GridListTile key={par["paralelo"]}>
          <CardTeorico paralelo={par} />
        </GridListTile>)
        )}
        </GridList>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography variant="body1" >
        {materia["nombre"]} - {materia["codigo"]}
        </Typography>
      </CardActions>
    </Card>
  ):(
    <div>Loading...</div>
  );
}
/*

         <GridListTile key={par["paralelo"]}>
         <CardParalelo isteorico={true} teorico={par}/>
       </GridListTile>*/