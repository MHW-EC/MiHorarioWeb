import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardParalelo from "./card-paralelo";
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
export default function ActionsInExpansionPanelSummary() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="Paralelo 101"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardParalelo teorico={false} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions2-content"
          id="additional-actions2-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="Paralelo 102"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardParalelo teorico={false} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions3-content"
          id="additional-actions3-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="Paralelo 103"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardParalelo isteorico={false} teorico={{}}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
