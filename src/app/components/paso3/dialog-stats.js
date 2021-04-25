import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Typography
} from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import Dark from 'highcharts/themes/dark-unica';
import Light from 'highcharts/themes/grid-light';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.default,
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

  const theme = useTheme();

  const handleClose = () => {
    onClose();
  };

  const optionsFunc = (data, profesorT) => {
    return {
      chart: {
        polar: true,
      },
      exporting: {
        enabled: false,
      },
      title: null,
      pane: {
        size: '80%',
      },
      accessibility: {
        description: `¿Qué significa este gráfico?. La punta del polígono se hace más aguda hacia el sentimiento más
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
        max: 100,
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">Porcentaje: <b>{point.y}%</b><br/>',
      },
      series: [
        {
          name: profesorT,
          type: 'area',
          data: data.map(object => object.value * 100),
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
                size: '65%',
              },
            },
          },
        ],
      },
    };
  };

  HighchartsExporting(Highcharts);
  require('highcharts/highcharts-more')(Highcharts);

  if (theme.palette.type === 'light') {
    Light(Highcharts);
  } else {
    Dark(Highcharts);
  }

  return data ? (
    <Dialog
      fullWidth={true}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Resultado del profesor
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <HighchartsReact
          key={theme.palette.type}
          highcharts={Highcharts}
          options={optionsFunc(data, profesor)}
        />
        <Typography variant="caption" align="center">
          ¿Qué significa este gráfico?. La punta del polígono se hace más aguda
          hacia el sentimiento más frecuente encontrado en las opiniones sobre
          este profesor. Esta información está basada en al menos 15 opiniones
          dadas por estudiantes que han tomando materias con este profesor.
        </Typography>
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
