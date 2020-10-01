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
import { Container, Typography } from '@material-ui/core';

const parserArray = (array) => {
  return array.map(object => {
    return {subject: object['tone'], A: object['value'], fullMark: 1,}
  })
}

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
    (data ? (
      <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Resultado del profesor
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
      <Typography variant='body2'>
          Profesor : {profesor}
        </Typography>
        <Typography variant='subtitle2'>
          ¿Qué significa esta gráfica?
        </Typography>
        <Typography variant='body2'>
          La punta del polígono se hace más aguda hacia el sentimiento más frecuente encontrado en las opiniones sobre este profesor.
        </Typography>
        <Container>
          <ResponsiveContainer width={'99%'} height={450}>
            <RadarChart
              outerRadius={150}
              width={450}
              height={400}
              data={parserArray(data)}
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
        <Typography variant='caption'>
          Basado en al menos 15 opiniones dadas por estudiantes que han tomando
          materias con este profesor.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  
    ): null)
  );
}
ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
