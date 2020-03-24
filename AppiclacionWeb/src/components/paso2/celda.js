import React,{useState} from "react";
import PropTypes from "prop-types";
//import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Checkbox } from "@material-ui/core";

/*const useStyles = makeStyles(theme => ({
    root: {
    },
}));
*/
export default function Celda(props) {
    const [materia] = useState(props.materia);
    const [materiasSelect] = useState(props.materiasSelect);
    //const [onMateriaSelect] = useState(props.onMateriaSelect);
    //const classes = useStyles();
    //materiasSelect
    const onCheck = (bool) => {
        if(bool){
            materiasSelect.push(materia);
        }else{
            //materiasSelect.pop();
            let index = materiasSelect.findIndex(mat => mat['codigo'] === materia['codigo']);
            materiasSelect.splice(index,1);
        }
        console.log(materiasSelect);
    }
    return (
        <Grid container xs={6}>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='subtitle2'>MATERIA : {materia['nombre']}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='caption'>{materia['codigo']}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Checkbox
                    color='primary'
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={(event)=> {onCheck(event.target.checked)}}
                />
            </Grid>
        </Grid>
    );
}

Celda.propTypes = {
    materia: PropTypes.object.isRequired,
    materiasSelect: PropTypes.array
};
