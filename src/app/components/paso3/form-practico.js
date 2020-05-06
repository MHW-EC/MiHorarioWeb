import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardAsociado from './card-asociado';

import { useSelector, useDispatch } from 'react-redux';
import { asociadosResults as asociadosSelector } from '../../../redux/selectors';
import { getAsociados } from '../../../redux/actions/asociado';
import { addPaquete, removePaquete } from '../../../redux/actions/paquetes';
//import * as Colores from "@material-ui/core/colors";

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: 0,
	},
	/*contenedorPanelDesplegable: {
    backgroundColor: Colores.cyan[500],
    alignItems: "center",
    padding: 10
  }*/
});
export default function ActionsInExpansionPanelSummary(props) {
	const classes = useStyles();
	//const [parAsociados, setParAsociados] = useState();
	const [teoricoid, setTeoricoId] = useState();
	const [teorico, setTeorico] = useState();

	useEffect(() => {
		setTeoricoId(props.teoricoid);
	}, [props.teoricoid]);

	useEffect(() => {
		setTeorico(props.teorico);
	}, [props.teorico]);

	const dispatch = useDispatch();
	const parAsociados = useSelector((state, codigo) =>
		asociadosSelector(state, teoricoid)
	);

	useEffect(() => {
		if (!parAsociados) {
			dispatch(getAsociados(teoricoid));
		}
	});

	const handleAddPaquete = (evento, teorico, practico) => {
		evento.target.checked
			? dispatch(addPaquete([teorico, practico], teoricoid, practico['_id']))
			: dispatch(removePaquete(teoricoid, practico['_id']));
	};
	return parAsociados ? (
		<div className={classes.root}>
			{parAsociados['paralelos'].map((par) => (
				<ExpansionPanel key={par['_id']}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label='Expand'
						id={par['_id']}
					>
						<FormControlLabel
							aria-label='Acknowledge'
							onClick={(event) => event.stopPropagation()}
							onFocus={(event) => event.stopPropagation()}
							control={
								<Checkbox
									color='primary'
									onChange={(event) => handleAddPaquete(event, teorico, par)}
								/>
							}
							label={`Paralelo ${par['paralelo']}`}
						/>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{padding: 0}}>
						<CardAsociado paralelo={par} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</div>
	) : (
		<div>Loading...</div>
	);
}
