import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
	root: {
		'& input': {
			color: '#ffffff'
		},
		'& label': {
			color: '#ffffff'
		},
		'& label.Mui-focused': {
			color: '#2196f3'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#2196f3'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#fff'
			},
			'&:hover fieldset': {
				borderColor: '#2196f3'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#2196f3'
			}
		}
	}
})(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing(1)
	}
}));



export default function SearchCarrera() {
	const classes = useStyles();
	return (
    <Container maxWidth="sm">
		<Grid
    container
    
    spacing={0}
    
    justify="center"
    direction="column"
    style={{ minHeight: '25vh' }}
		>
			<Grid item>
				<Autocomplete
					id='grouped-demo'
					options={top100Films}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => (
						<CssTextField
							{...params}
							className={classes.margin}
							label='Nombre de su carrera'
							variant='outlined'
							id='custom-css-outlined-input'
						/>
					)}
				/>
			</Grid>
		</Grid>
    </Container>
	);
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
	{ title: 'Forrest Gump', year: 1994 }
];