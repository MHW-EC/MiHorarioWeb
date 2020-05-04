import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from "@material-ui/core/Typography"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    divInfo: {
        marginLeft: 'auto',
        marginRight: 0
    },
    dialogContent:{
        marginLeft: 0,
        marginRight: 'auto',
        textAlign: 'left'
    }
}));

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div className={classes.divInfo} >
            <IconButton
                color="inherit"
                size='medium'
                //edge='end'
                onClick={handleClickOpen}
            >
                <InfoOutlinedIcon />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Información"}</DialogTitle>
                <DialogContent dividers>
                    <div className={classes.dialogContent}>
                        <Typography variant='body1' >
                        Si te gustó nuestro trabajo y deseas ayudarnos puedes conectarnos a nuestros correo o donar a nuestro Paypal.
                        </Typography>
                        <br/>
                        <Typography variant='caption' >
                        Josue Cobos Salvador: jacobos@fiec.espol.edu.ec
                        </Typography>
                        <br/>
                        <Typography variant='caption' >
                        Enmanuel Magallanes: fmagalla@fiec.espol.edu.ec
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
          </Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}
