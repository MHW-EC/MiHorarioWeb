import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HighchartsReact from 'highcharts-react-official';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormPractico from './form-practico';

import { Container, Typography } from '@material-ui/core';

const parserArray = (array) => {
  return array.map((object) => {
    return object.value;
  });
};

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
    padding: 10,
  },
  radar: {
    margin: '30px',
    fontFamily: 'Roboto',
    color: theme.palette.primary.contrastText,
  },
  font: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function ConfirmationDialogRaw(props) {
  const { profesor, data, onClose, value: valueProp, open, ...other } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  console.log(data);
  const optionsFunc = (data, profesorT) => {
    return {
      chart: {
        polar: true,
      },
      title: {
        text: '',
        x: -80,
      },
      pane: {
        size: '80%',
      },
      accessibility: {
        description: `La punta del polígono se hace más aguda hacia el sentimiento más
        frecuente encontrado en las opiniones sobre este profesor. Basado en al menos 15 opiniones dadas por estudiantes que han tomando
        materias con este profesor.`,
      },
      xAxis: {
        categories: ['Enojado', 'Feliz', 'Miedo', 'Triste', 'Confianza'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
      },
      series: [
        {
          name: profesorT,
          data: parserArray(data),
          pointPlacement: 'on',
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
              },
              pane: {
                size: '70%',
              },
            },
          },
        ],
      },
    };
  };

  return data ? (
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
        <Typography variant="body2">Profesor : {profesor}</Typography>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsFunc(data, profesor)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
