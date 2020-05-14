import React from 'react';
import Slide from '@material-ui/core/Slide';

import Page from './page';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
	const [open, setOpen] = React.useState(props.open);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const state = { open, titulo: props.titulo, contenido: props.contenido };
	const func = {
		handleClickOpen,
		handleClose,
		Transition,
		children: props.children,
		actions: props.actions,
	};

	return <Page state={state} func={func} />;
}
