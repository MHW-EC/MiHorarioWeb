import React, { useState, useEffect } from 'react';

import Page from './page';

export default function SimpleCard(props) {
	const [paralelo, setParalelo] = useState();

	useEffect(() => {
		setParalelo(props.paralelo);
	}, [props.paralelo]);

	const state = { paralelo };

	return <Page state={state} />;
}
