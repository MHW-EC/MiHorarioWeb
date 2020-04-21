import React,{ useEffect,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import { Typography, CardContent, CardActions } from "@material-ui/core";
import CardParalelo from "./card-paralelo";
import axios from 'axios';

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
  const [materia] = useState(props.materia);
  const [nCols] = useState(props.isMobile ? 1 : 2);
  const [paralelos,setParalelos] = useState();


  /*useEffect(() => {
    axios.get('http://localhost:8080/teorico/' + materia['codigo'])
      .then(({data}) => {
          data.forEach(element => {paralelos.push(element)});
      })
      .catch(function (error) {
          console.log(error);
      });
  });*/
 useEffect(()=>{
   const fetchData = async () => {
     const response = await axios.get(`http://localhost:8080/teorico/${materia['codigo']}`);
     setParalelos(response.data)
     //response.data.forEach(e=>{paralelos.push(e)})
   }
   fetchData();
 }, [materia]);

//antes se retornaba un div con classname root
  return paralelos ? (
    <Card elevation={10}>
      <CardContent className={classes.cardContent}>
        <GridList
          padding={10}
          spacing={10}
          cellHeight={"auto"}
          className={classes.gridList}
          cols={nCols}
  >   
        {paralelos.map(par=>(
         <GridListTile key={par["paralelo"]}>
         <CardParalelo isteorico={true} teorico={par}/>
       </GridListTile>)
        )}
        </GridList>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography
          className={classes.title}
          color="textPrimary"
          variant="h5"
          component="h2"
        >
        {materia["nombre"]} - {materia["codigo"]}
        </Typography>
      </CardActions>
    </Card>
  ):(
    <div>Loading...</div>
  );
}
