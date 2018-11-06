import React, { Component } from 'react';
import './App.css';
import Map from './map/Map';

import Fonts from '../cheatsheets/Fonts';

class App extends Component {
	render() {
		return (
			<div>
				<Map />
				<Fonts />
			</div>
		);
	}
}

export default App;
