import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardParalelo from "./card-paralelo";
import axios from 'axios';
//import * as Colores from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 0
  }
  /*contenedorPanelDesplegable: {
    backgroundColor: Colores.cyan[500],
    alignItems: "center",
    padding: 10
  }*/
});
export default function ActionsInExpansionPanelSummary(props) {
  const classes = useStyles();
  const [parAsociados, setParAsociados] = useState();
  const [parAsociadosObjs, setParAsociadosObjs] = useState([]);

  useEffect(()=>{
    setParAsociados(props.parAsociados)
  },[props.parAsociados]);
  

  useEffect(()=>{
    const fetchData = async (codigo) => {
      const response = await axios.get(`http://localhost:8080/practico/${codigo}`);
      setParAsociadosObjs([...parAsociadosObjs,response.data])
    }
    if(parAsociados){
      parAsociados.forEach(codigo => {
      fetchData(codigo);
      })
    } 
  }, [parAsociadosObjs, parAsociados]);

  return ( (parAsociadosObjs && parAsociados) ?
    <div className={classes.root}>
      {parAsociadosObjs.map(par => (
          <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            id={par['_id']}
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox color='primary'/>}
              label={par['paralelo']}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardParalelo isteorico={false} paralelo={par} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div> : <div>Loading...</div>
  );
}
