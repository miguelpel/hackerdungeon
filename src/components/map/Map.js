import React, { Component } from 'react';

import { mapLayout } from './layout';

class Map extends Component {
	state = {
		layout: mapLayout
	};

	render() {
		return <pre>{this.state.layout}</pre>;
	}
}

export default Map;
