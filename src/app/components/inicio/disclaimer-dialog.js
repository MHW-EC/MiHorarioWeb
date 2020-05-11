import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

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

    return <div >
       
    </div>
};

const Titulo = () => (
    "Aclaración"
);

const Contenido = () => {
    const classes = useStyles();
    return (
        <div className={classes.dialogContent}>
            <Typography variant='body1'>
                La información en esta página fue actualizada el 06/05/2020 - 23:59:59.
                Probablemente actualicemos la información hoy 10/05/2020 - 23:59:59, sin embargo
                revise su horario con los planificados en la página oficial.
            </Typography>
            <br />
            <Typography variant='body1'>
                No nos hacemos responsables por cambios de última hora.
            </Typography>
        </div>)
};

const Actions = ({ handle }) => (
    <>
        <Button onClick={handle} color='primary'>
            Ok
		</Button>
    </>
);

export default { Controlador, Titulo, Contenido, Actions }