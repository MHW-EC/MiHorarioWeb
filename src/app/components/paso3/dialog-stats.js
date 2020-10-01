import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormPractico from './form-practico';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Container } from '@material-ui/core';
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
  radar: {
    margin: '30px',
    fontFamily: 'Roboto',
  },
}));

export default function ConfirmationDialogRaw(props) {
  const { profesor, data, onClose, value: valueProp, open, ...other } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Estádisticas del profesor {profesor}
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Container>
          <ResponsiveContainer width={'99%'} height={450}>
            <RadarChart
              outerRadius={150}
              width={450}
              height={400}
              data={data}
              className={classes.radar}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Container>
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
