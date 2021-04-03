import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog
} from "@material-ui/core";
import FormPractico from './form-practico';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.primary.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
  dialogContent: {
    alignItems: 'center',
    padding: 0,
  },
}));

export default function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, cargado, ...other } = props;
  const classes = useStyles();
  const [teoricoid, setTeoricoId] = useState();
  const [teorico, setTeorico] = useState();

  useEffect(() => {
    setTeoricoId(props.teoricoid);
  }, [props.teoricoid]);

  useEffect(() => {
    setTeorico(props.teorico);
  }, [props.teorico]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullWidth={true}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Seleccione asociados
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {cargado ? (
          <FormPractico teoricoid={teoricoid} teorico={teorico} />
        ) : null}
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
  open: PropTypes.bool.isRequired,
};
