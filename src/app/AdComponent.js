import React from 'react';

export default class AdComponent extends React.Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return (
			<ins
				className='adsbygoogle'
				style={{ display: 'block' }}
				data-ad-client='ca-pub-9337951382602553'
				data-ad-slot='4526917962'
				data-ad-format='auto'
				data-full-width-responsive='true'
			></ins>
		);
	}
}
