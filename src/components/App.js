import React, { Component } from 'react';
import './App.css';
import Map from './map/Map';

import Fonts from '../cheatsheets/Fonts';

class App extends Component {
	state = {
		elem: document.documentElement,
		fullscreen: false,
		w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	};

	componentDidMount = () => {
		window.addEventListener('resize', this.resize);
	};

	componentWillUnmount = () => {
		// Remove event listener on compenent unmount
		window.removeEventListener('resize', this.resize);
	};

	resize = () => {
		console.log('resize');
		let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let fontSize = Math.round(this.state.h / 70) + 'px';
		this.setState({
			w,
			h
		});
	};

	openFullscreen = () => {
		if (this.state.elem.requestFullscreen) {
			this.state.elem.requestFullscreen();
		} else if (this.state.elem.mozRequestFullScreen) {
			/* Firefox */
			this.state.elem.mozRequestFullScreen();
		} else if (this.state.elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			this.state.elem.webkitRequestFullscreen();
		} else if (this.state.elem.msRequestFullscreen) {
			/* IE/Edge */
			this.state.elem.msRequestFullscreen();
		}
		this.setState({
			fullscreen: true
		});
	};

	closeFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
		this.setState({
			fullscreen: false
		});
	};

	toggleFScreen = () => {
		if (!this.state.fullscreen) this.openFullscreen();
		else this.closeFullscreen();
	};

	render() {
		const style = {
			overflow: 'hidden'
		};
		return (
			<div id="game" style={style} onDoubleClick={e => this.toggleFScreen()}>
				<Map w={this.state.w} h={this.state.h} />
				{/* <Fonts /> */}
			</div>
		);
	}
}

export default App;
