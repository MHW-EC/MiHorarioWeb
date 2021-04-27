import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
  divInfo: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  dialogContent: {
    marginLeft: 0,
    marginRight: 'auto',
    textAlign: 'left',
  },
}));

const Controlador = ({ handle }) => {
  return (
    <div>
      <IconButton color="inherit" size="medium" onClick={handle}>
        <InfoOutlinedIcon />
      </IconButton>
    </div>
  );
};

const Titulo = () => 'Información';

const Contenido = () => {
  const classes = useStyles();
  return (
    <div className={classes.dialogContent}>
      <Typography variant="body1">
        Si te gustó nuestro trabajo y deseas ayudarnos puedes conectarnos a
        nuestros correos o donar a nuestro Paypal.
      </Typography>
      <br />
      <Typography variant="body1">
        Josue Cobos Salvador:{' '}
        <a href="mailto:jacobos@fiec.espol.edu.ec" variant="caption">
          jacobos@fiec.espol.edu.ec
        </a>
      </Typography>
      <br />
      <Typography variant="body1">
        Enmanuel Magallanes:{' '}
        <a href="mailto:fmagalla@fiec.espol.edu.ec" variant="caption">
          fmagalla@fiec.espol.edu.ec
        </a>
      </Typography>
      <br />
      <Typography>
        Paypal:{' '}
        <a href="mailto:mihorarioweb@gmail.com" variant="caption">
          mihorarioweb@gmail.com
        </a>
      </Typography>
    </div>
  );
};

const Actions = ({ handle }) => (
  <>
    <Button onClick={handle} color="primary">
      Ok
    </Button>
  </>
);

export default { Controlador, Titulo, Contenido, Actions };
