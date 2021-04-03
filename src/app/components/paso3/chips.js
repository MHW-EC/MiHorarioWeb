import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {Chip, Tooltip} from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import BlockIcon from "@material-ui/icons/Block";
const topHexColor = "#D4AF37";
const DisabledChip = withStyles({
  root: {
    color: "gray",
    borderColor: "gray"
  }
})(Chip);
const SuccessChip = withStyles({
  root: {
    color: "green",
    borderColor: "green"
  },
  icon: {
    color: "green"
  }
})(Chip);
const WarningChip = withStyles({
  root: {
    color: "orange",
    borderColor: "orange"
  },
  icon: {
    color: "orange"
  }
})(Chip);
const ErrorChip = withStyles({
  root: {
    color: "red",
    borderColor: "red"
  },
  icon: {
    color: "red"
  }
})(Chip);
const GoldChip = withStyles({
  root: {
    color: topHexColor,
    borderColor: topHexColor,
  },
  icon: {
    color: topHexColor
  }
})(Chip);
export function GetChip (valor, top){
	if(top){
		return <Tooltip title="Docente recomendado">
      <GoldChip
        variant="outlined"
        size="small"
        icon={<InsertEmoticonIcon />}
        label={valor}
      /></Tooltip>
  }else if(valor >= 80){
		return <Tooltip title="Puntuación del profesor">
      <SuccessChip
        variant="outlined"
        size="small"
        icon={<InsertEmoticonIcon />}
        label={valor}
      />
    </Tooltip>
	}else if(valor < 80 && valor >=70){
		return <Tooltip title="Puntuación del profesor">
      <WarningChip
        variant="outlined"
        size="small"
        icon={<SentimentSatisfiedIcon />}
        label={valor}
      /></Tooltip>
	}else if(valor < 70 && valor >0){
		return <Tooltip title="Puntuación del profesor">
      <ErrorChip
        variant="outlined"
        size="small"
        icon={<SentimentVeryDissatisfiedIcon />}
        label={valor}
      /></Tooltip>
	}else{
		return <Tooltip title="Puntuación del profesor">
      <DisabledChip
        variant="outlined"
        size="small"
        icon={<BlockIcon />}
        label={"sin registros"}
      /></Tooltip>
	}
}