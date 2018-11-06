import React, { Component } from 'react';

import { mapLayout } from './layout';

class Map extends Component {
	state = {
		layout: mapLayout
	};

	render() {
		return <div>{this.state.layout}</div>;
	}
}

export default Map;
