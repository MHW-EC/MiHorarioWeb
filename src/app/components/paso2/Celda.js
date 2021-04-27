import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Checkbox,
  CardActionArea,
  Button,
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {
  checkMateria,
  unCheckMateria,
  removeMateria,
} from '../../../redux/actions/materias';
import { getMateriasMalla, getMaterias } from '../../../redux/actions/materias';
import { materiasSeleccionadas as matSelSelector } from '../../../redux/selectors';
import { materiasMalla as mallaSelSelector } from '../../../redux/selectors';
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';
import { MAX_NUMBERS } from '../../constants';

export default function Celda({ materia, fromMalla }) {
  const dispatch = useDispatch();
  const materiasSelect = useSelector((state) => matSelSelector(state));
  const materiasMalla = useSelector((state) => mallaSelSelector(state));
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  useEffect(() => {
    if (!materiasSelect) {
      dispatch(getMaterias());
    }
  });
  useEffect(() => {
    if (!materiasMalla) {
      dispatch(getMateriasMalla());
    }
  });

  let marcado = materia.check;

  const onCheck = () => {
    if (marcado) {
      dispatch(unCheckMateria(materia));
    } else {
      let totalMateria =
        materiasMalla.reduce((a, b) => (b.check || 0) + a, 0) +
        materiasSelect.reduce((a, b) => (b.check || 0) + a, 0);
      if (totalMateria >= MAX_NUMBERS.MATERIAS) {
        enqueueSnackbar({
          message: `Cantidad máxima de materias: ${MAX_NUMBERS.MATERIAS}`,
          options: {
            preventDuplicate: true,
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            action: (key) => (
              <Button onClick={() => closeSnackbar(key)}>Cerrar </Button>
            ),
          },
        });
        return;
      }
      dispatch(checkMateria(materia));
    }
    marcado = !marcado;
  };
  const handleBorrar = () => {
    dispatch(removeMateria(materia));
  };
  return (
    <CardActionArea onClick={onCheck}>
      <Grid
        container={true}
        justify="center"
        alignItems="center"
        style={{ minHeight: 125 }}
      >
        <Grid container item xs={9}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">{materia['nombre']}</Typography>
            <Typography variant="caption">{materia['codigo']}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <Checkbox
              checked={marcado}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item xs={12}>
            {!fromMalla && (
              <span onClick={handleBorrar}>
                <CloseOutlinedIcon />
              </span>
            )}
          </Grid>
        </Grid>
      </Grid>
    </CardActionArea>
  );
}

Celda.propTypes = {
  materia: PropTypes.object.isRequired,
  materiasSelect: PropTypes.array,
};
