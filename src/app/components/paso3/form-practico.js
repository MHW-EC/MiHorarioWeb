import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Checkbox,
	FormControlLabel
}from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardAsociado from './card-asociado';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { asociadosResults as asociadosSelector } from '../../../redux/selectors';
import { getAsociados } from '../../../redux/actions/asociado';
import { addPaquete, removePaquete } from '../../../redux/actions/paquetes';

const useStyles = makeStyles({
	root: {
		width: '100%',
		padding: 0,
	},
	skeleton: {
		minHeight: "50px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"

	},
	subSkeleton:{
		marginLeft: "25%",
            marginRight: "auto",
	}
});
export default function ActionsInExpansionPanelSummary(props) {
	const classes = useStyles();
	//const [parAsociados, setParAsociados] = useState();
	const [teoricoid, setTeoricoId] = useState();
	const [teorico, setTeorico] = useState();
	//const [checked, setChecked] = useState(false);

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

	const handleChecking = (evento, teorico, practico) => {
		let checked = evento.target.checked;
		checked
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
									onChange={(event) => handleChecking(event, teorico, par)}
								/>
							}
							label={`Paralelo ${par['paralelo']}`}
						/>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{padding: 10}}>
						<CardAsociado paralelo={par} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			))}
		</div>
	) : (
		<div className={classes.root}>
			<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label='Expand'
					>
						<FormControlLabel
							aria-label='Acknowledge'
							control={
								<Checkbox
									disabled={true}
									color='primary'
								/>
							}
							label={<Skeleton animation='wave' variant='text' width={100}/>}
						/>
					</ExpansionPanelSummary>
				</ExpansionPanel>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label='Expand'
					>
						<FormControlLabel
							aria-label='Acknowledge'
							control={
								<Checkbox
									disabled={true}
									color='primary'
								/>
							}
							label={<Skeleton animation='wave' variant='text' width={100}/>}
						/>
					</ExpansionPanelSummary>
				</ExpansionPanel>
		</div>
		
	);
}
