import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getCarreras } from '../../../redux/actions/carreras';
import { carrerasResults as carrerasResultSelector } from '../../../redux/selectors';
import { setCarrera } from '../../../redux/actions/carrera';
const CssTextField = withStyles({
	root: {
		'& input': {
			color: '#ffffff',
		},
		'& label': {
			color: 'text.primary',
		},
		'& label.Mui-focused': {
			color: '#2196f3',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#2196f3',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#fff',
			},
			'&:hover fieldset': {
				borderColor: '#2196f3',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#2196f3',
			},
		},
	},
})(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

export default function SearchCarrera(props) {
	const dispatch = useDispatch();
	const carrerasResults = useSelector((state) => carrerasResultSelector(state));

	useEffect(() => {
		if (!carrerasResults) {
			dispatch(getCarreras());
		}
	});
	const classes = useStyles();

	const onChangeComplete = (event, value, reason) => {
		dispatch(setCarrera(value));
	};

	return (
		<Container maxWidth='sm'>
			<Grid
				container
				spacing={0}
				justify='center'
				direction='column'
				style={{ minHeight: '15vh' }}
			>
				<Grid item>
					{carrerasResults ? (
						<Autocomplete
							id='input-nombre-carrera'
							onChange={onChangeComplete}
							options={carrerasResults}
							getOptionLabel={(option) => option['nombre']}
							renderInput={(params) => (
								<TextField {...params} id='custom-css-outlined-input' label="Nombre de su carrera" variant="outlined" />
							)}
						/>
					) : (
						<></>
					)}
				</Grid>
				<Grid item>
					<script src='https://gist.github.com/EnmanuelMag/fe81e4261975fc584501668b845d4193.js'></script>
				</Grid>
			</Grid>
		</Container>
	);
}
