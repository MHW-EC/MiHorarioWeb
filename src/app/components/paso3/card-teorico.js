import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardHeader,
  Button,
  Divider,
  Zoom,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DialogPractico from './dialog-practico';
import DialogStats from './dialog-stats';
import { blueGrey } from '@material-ui/core/colors';
import { formatoIntevalo, formatoIntevaloEx } from '../util/util';
import {
  addSeleccionado,
  removeSeleccionado,
} from '../../../redux/actions/seleccionados';
import { addPaquete, removePaquete } from '../../../redux/actions/paquetes';
import { profesorSelector } from '../../../redux/selectors';
import { getProfesor } from '../../../redux/actions/profesor';
import { seleccionados as selSelector } from '../../../redux/selectors';
import Skeleton from '@material-ui/lab/Skeleton';
import { GetChip } from './chips';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from '../../../redux/actions/notifier';
import { MAX_NUMBERS } from '../../constants';
const topHexColor = '#D4AF37';
const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  div: {
    padding: 12,
    alignContent: 'left',
    alignItems: 'left',
  },
  fab: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
  },
  ghostIcon: {
    opacity: 0,
    padding: 10,
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
  root: {
    height: 'auto',
  },
  rootTop: {
    borderColor: topHexColor,
  },
  avatarTop: {
    backgroundColor: topHexColor,
  },
}));

const countByTeorico = (teoricosIdArray, materiaCode) => {
  return teoricosIdArray.reduce(
    (amount, element) => amount + (element.split('_')[0] === materiaCode),
    0
  );
};

export default function SimpleCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [paralelo] = useState(props.paralelo);
  const [isAdd, setIsAdd] = useState(1); //necesariamente binario y no bool
  const top = props.top;
  const seleccionados = useSelector((state) => selSelector(state));
  const profesor = useSelector((state) =>
    profesorSelector(
      state,
      paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE'
    )
  );
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  useEffect(() => {
    if (paralelo && !profesor) {
      dispatch(
        getProfesor(
          paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE',
          paralelo['codigo'],
          paralelo['nombre']
        )
      );
    }
  }, [paralelo, profesor, dispatch]);

  const handleAddRemove = () => {
    if (isAdd) {
      let materiaCode = paralelo['_id'].split('_')[0];
      let amount = countByTeorico(seleccionados, materiaCode);
      if (amount >= MAX_NUMBERS.TEORICOSPERMATERIA) {
        enqueueSnackbar({
          message: `Cantidad máxima de teóricos para ${materiaCode}: ${MAX_NUMBERS.TEORICOSPERMATERIA}`,
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
      dispatch(addSeleccionado(paralelo['_id']));
      setIsAdd(0);
    } else {
      dispatch(removeSeleccionado(paralelo['_id']));
      setIsAdd(1);
    }
    if (paralelo['paralelos_practicos'].length === 0) {
      isAdd
        ? dispatch(addPaquete([paralelo], paralelo['_id']))
        : dispatch(removePaquete(paralelo['_id']));
    }
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'inherit',
      className: classes.fab,
      icon: <AddBoxOutlinedIcon />,
      label: 'Disabled',
      entra: -1,
      tooltipNode: 'Añadir teórico',
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddBoxOutlinedIcon />,
      label: 'Add',
      entra: 1,
      tooltipNode: 'Añadir teórico',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <DeleteOutlineIcon />,
      label: 'Remove',
      entra: 0,
      tooltipNode: 'Remover teórico',
    },
  ];

  const handleParAsociados = () => {
    setOpen(true);
    setCargado(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleStats = () => {
    setOpenStats(true);
  };

  const handleCloseDialogStats = () => {
    setOpenStats(false);
  };
  const getAction = () => {
    return (
      paralelo && (
        <>
          <AddBoxOutlinedIcon className={classes.ghostIcon} />
          {fabs.map((fab, index) => (
            <Zoom
              key={fab.color}
              in={isAdd === fab.entra}
              timeout={transitionDuration}
              unmountOnExit
            >
              <Tooltip title={fab.tooltipNode}>
                <IconButton
                  aria-label={fab.label}
                  className={fab.className}
                  color={fab.color}
                  onClick={() => {
                    handleAddRemove();
                  }}
                >
                  {fab.icon}
                </IconButton>
              </Tooltip>
            </Zoom>
          ))}
        </>
      )
    );
  };
  return paralelo && profesor ? (
    <Card className={top ? classes.rootTop : classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar className={top ? classes.avatarTop : classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        action={getAction()}
        title={paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE'}
        subheader={
          <>
            {GetChip(profesor['registros'][0]['promedio'], top)}
            {profesor.stats && (
              <>
                <Button
                  onClick={handleStats}
                  size="small"
                  variant="text"
                  color="primary"
                  endIcon={<ExpandMoreIcon />}
                >
                  ver opiniones
                </Button>
                <DialogStats
                  id="stats-profesor"
                  open={openStats}
                  keepMounted
                  onClose={handleCloseDialogStats}
                  data={profesor.stats}
                  profesor={paralelo['profesor']}
                />
              </>
            )}
          </>
        }
        style={{ padding: 12 }}
      />
      <Divider />
      <CardContent className={classes.div}>
        <Typography variant="body2" component="p" aling="left">
          Clases
        </Typography>
        {paralelo.hasOwnProperty('eventos') &&
          paralelo.eventos.clases.map((clase) => (
            <React.Fragment key={clase['inicio']}>
              <Typography variant="body2" aling="left" color="textSecondary">
                - {formatoIntevalo(clase['inicio'], clase['fin'])}
              </Typography>
            </React.Fragment>
          ))}
        {paralelo.hasOwnProperty('eventos') && (
          <React.Fragment>
            <Typography variant="body2" component="p">
              Examenes
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              - Parcial{' '}
              {formatoIntevaloEx(
                paralelo.eventos.examenes.parcial['inicio'],
                paralelo.eventos.examenes.parcial['fin']
              )}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              - Final{' '}
              {formatoIntevaloEx(
                paralelo.eventos.examenes.final['inicio'],
                paralelo.eventos.examenes.final['fin']
              )}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              - Mejoramiento{' '}
              {formatoIntevaloEx(
                paralelo.eventos.examenes.mejoramiento['inicio'],
                paralelo.eventos.examenes.mejoramiento['fin']
              )}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>

      {paralelo && paralelo['paralelos_practicos'].length > 0 && (
        <>
          <Divider />
          <CardActions>
            <Button
              size="small"
              onClick={handleParAsociados}
              color="primary"
              endIcon={<AddCircleOutlineIcon />}
            >
              Par asociados
            </Button>
            <DialogPractico
              id="práctico-menu"
              open={open}
              cargado={cargado}
              keepMounted
              onClose={handleCloseDialog}
              teoricoid={paralelo['_id']}
              teorico={paralelo}
            />
          </CardActions>
        </>
      )}
    </Card>
  ) : (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
          <div
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Skeleton animation="wave" variant="text" height={10} />
          </div>
        }
        subheader={
          <div
            style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Skeleton animation="wave" variant="text" height={10} />
          </div>
        }
      />
      <CardContent style={{ padding: 0 }}>
        <Skeleton animation="wave" variant="rect" height={150} />
      </CardContent>
      <CardActions>
        <Skeleton
          animation="wave"
          variant="rect"
          height={25}
          width={80}
          style={{ borderRadius: 4 }}
        />
      </CardActions>
    </Card>
  );
}
