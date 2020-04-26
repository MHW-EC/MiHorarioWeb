import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Zoom from '@material-ui/core/Zoom';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PasoAPaso from './components/PasoAPaso';
import { useSelector, useDispatch } from 'react-redux';
import { getCarreras, getFetchCarreras } from './redux/actions/carreras';

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#282c34',
		position: 'fixed',
		bottom: theme.spacing(5),
		right: theme.spacing(5),
	},
	scrollTop: {
		backgroundColor: 'transparent',
	},
}));

function ScrollTop(props) {
	const { children, window } = props;
	const classes = useStyles();
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor'
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role='presentation' className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};
function App(props) {
	return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar>
					<Toolbar>
						<Typography variant='h6'>HORARIO</Typography>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar id='back-to-top-anchor' />
			<Container>
				<PasoAPaso />
			</Container>
			<ScrollTop {...props}>
				<Fab color='secondary' size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}

export default App;
