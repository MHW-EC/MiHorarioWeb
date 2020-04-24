import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import FormPractico from "./form-practico";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.primary.paper
  },
  paper: {
    width: "80%",
    maxHeight: 435
  },
  dialogContent: {
    alignItems: "center",
    padding: 0,
  }
}));

export default function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const classes = useStyles();
  const [teoricoId, setTeoricoId] = useState();
  
  useEffect(()=>{
    setTeoricoId(props.teoricoId)
  },[props.teoricoId]);
  
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title" >
        Seleccione asociados
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <FormPractico teoricoId={teoricoId}/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
