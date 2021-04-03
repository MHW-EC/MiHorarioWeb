import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Grid, Container, Grow } from '@material-ui/core';
import Celda from './celda';
import { useSelector, useDispatch } from 'react-redux';
import { carreraSeleccionada as carreraSelector } from '../../../redux/selectors';
import { getCarrera } from '../../../redux/actions/carrera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllTeoricos } from '../../../redux/actions/teorico';
import { allTeoricosResults as allteoricosSelector } from '../../../redux/selectors';
import { getMateriasMalla, getMaterias } from '../../../redux/actions/materias';
import { addMateria } from '../../../redux/actions/materias';
import { materiasSeleccionadas as matSelSelector } from '../../../redux/selectors';
import { materiasMalla as mallaSelSelector } from '../../../redux/selectors';
import { setMateriasMalla } from '../../../redux/actions/materias';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    //alignContent: 'center',
    color: theme.palette.text.secondary,
  },
  paperOnClick: {
    borderColor: 'blue',
  },
  spacing: {
    paddingTop: '10px',
  },
  spacingTitle: {
    paddingTop: '30px',
  },
}));

const generarCelda = (elemento, index, malla) => {
  return (
    <Grid key={elemento.codigo} item xs={6} sm={4} md={4} lg={3} xl={2}>
      <Grow in timeout={750}>
        <Paper variant="outlined" style={{ minHeight: 125 }} evelation={3}>
          <Celda fromMalla={malla} materia={elemento} />
        </Paper>
      </Grow>
    </Grid>
  );
};

export default function Malla(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  /* const [input, setInput] = useState(''); */
  const carrera = useSelector((state) => carreraSelector(state));

  const allTeoricosBase = useSelector((state) => allteoricosSelector(state));
  const [allTeoricosUnicos, setAllTeoricosUnicos] = useState([]);
  //const [celdas, setCeldas] = useState([]);

  const materiasSelect = useSelector((state) => matSelSelector(state));
  const materiasMalla = useSelector((state) => mallaSelSelector(state));

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
  const btnCerrar = <Typography style={{ color: '#ffffff' }}>| Ok</Typography>;

  const [refresh, setRefresh] = useState(false);

  //useEffect(() => {}, [refresh]);

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

  useEffect(() => {
    if (allTeoricosBase.length === 0) {
      dispatch(getAllTeoricos());
    }
  });

  useEffect(() => {
    if (allTeoricosBase.length !== 0 && allTeoricosUnicos.length === 0) {
      let unicos = [];
      allTeoricosBase.forEach((ter) => {
        if (
          typeof unicos.find((e) => e.codigo === ter.codigo) === 'undefined'
        ) {
          unicos.push(ter);
        }
      });
      setAllTeoricosUnicos(unicos);
    }
  }, [allTeoricosUnicos, allTeoricosBase]);

  useEffect(() => {
    if (!carrera) {
      dispatch(getCarrera());
    }
  });

  const onChangeComplete = (event, value, reason) => {
    if (reason === 'select-option') {
      document.getElementById('input-nombre-carrera').inputValue = '';
      let notInMalla =
        typeof materiasMalla.find((e) => e.codigo === value.codigo) ===
        'undefined';
      if (
        typeof materiasSelect.find((e) => e.key === value.codigo) ===
          'undefined' &&
        notInMalla
      ) {
        dispatch(addMateria({ ...value, check: true }));
      }
      if (!notInMalla) {
        dispatch(setMateriasMalla(materiasMalla.map((e) => {
          if (e.codigo === value.codigo) {
            e.check = true;
          }
          return e;
        })));
        
        setRefresh(!refresh);
        enqueueSnackbar({
          message: 'Materia añadida satisfactoriamente',
          options: {
            preventDuplicate: true,
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            action: (key) => (
              <Button onClick={() => closeSnackbar(key)}>{btnCerrar} </Button>
            ),
          },
        });
      }
    }
  };
  return (
    <div className={classes.root}>
      <div>
        <Grid container={true} spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={8} md={8} lg={5} xl={5}>
            {allTeoricosBase && allTeoricosUnicos ? (
              <Container>
                <Autocomplete
                  id="input-nombre-carrera"
                  clearOnEscape={true}
                  onChange={onChangeComplete}
                  options={allTeoricosUnicos}
                  label="Agregue una nueva materia"
                  //options={carrerasResults.reduce((a, b) => {
                  //	return {'materias': a.materias.concat(b.materias)} } )['materias']}
                  getOptionLabel={(option) => {
                    return `${option['nombre']} - ${option['codigo']}`;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="custom-css-outlined-input"
                      label="Agregue una nueva materia"
                      variant="outlined"
                    />
                  )}
                />
              </Container>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </div>
      {materiasSelect && materiasSelect.length > 0 ? (
        <>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid className={classes.spacingTitle}>
              <Typography variant="subtitle2" color="textSecondary">
                Seleccionadas
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className={classes.spacing}
            container={true}
            spacing={3}
            justify="center"
            alignItems="center"
          >
            {materiasSelect.map((mat) =>
              generarCelda(mat, materiasSelect.length, false)
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}

      {materiasMalla && materiasMalla.length > 0 ? (
        <>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid className={classes.spacingTitle}>
              <Typography variant="subtitle2" color="textSecondary">
                Recomendadas
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className={classes.spacing}
            container={true}
            spacing={3}
            justify="center"
            alignItems="center"
          >
            {materiasMalla.map((mat) =>
              generarCelda(mat, materiasMalla.length, true)
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
