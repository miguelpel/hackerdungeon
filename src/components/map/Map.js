import React, { Component } from 'react';

import './map.css';

import { mapLayout } from './layoutData';

class Map extends Component {
	state = {
		layout: mapLayout,
		playerPosition: this.props.playerPosition ? this.props.playerPosition : { x: 32, y: 11 },
		rows: 56,
		cols: 160,
		spans: null,
		currentCharAndColor: null,
		w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	};

	componentDidMount = () => {
		window.addEventListener('resize', this.resize);
		window.addEventListener('keydown', this.keyHandling);
		const span = document.getElementById('mapContainerSpan');
		const spans = span.getElementsByTagName('SPAN');
		this.setState(
			{
				spans
			},
			this.spawnPlayer
		);
	};

	resize = () => {
		let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		this.setState({
			w,
			h
		});
	};

	// componentWillUnmount = () => {
	// 	// Remove event listener on compenent unmount
	// 	window.removeEventListener('keyup', this.keyHandling);
	// };

	// keyHandling = e => {
	// 	// Handle event
	// 	console.log('Key code: ' + e.keyCode);
	// 	e.preventDefault();
	// };

	// spawnPlayer = () => {
	// 	let newSpan = this.getSpanAt(this.state.playerPosition);
	// 	let charAndColor = this.getCharAndColorOf(newSpan);
	// 	this.setPlayerTo(newSpan);
	// 	this.setState({
	// 		currentCharAndColor: charAndColor
	// 	});
	// };

	getLayout = () => {
		// get the layout data
		// create a span element
		const rowStyle = {
			display: 'flex',
			justifyContent: 'space-between'
		};
		const layout = [];
		let row = [];
		this.state.layout.forEach((span, i) => {
			if (i % this.state.cols === 0) {
				// create a new row
				const rowP = <span style={rowStyle}>{row}</span>;
				layout.push(rowP);
				row = [];
				row.push(span);
			} else {
				row.push(span);
			}
		});
		const rowP = <span style={rowStyle}>{row}</span>;
		layout.push(rowP);
		return layout;
	};

	render() {
		const containerSpanStyle = {
			width: this.state.w,
			height: this.state.h,
			overFlow: 'hidden',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			// lineHeight: '12px',
			// fontSize: '12px',
			fontWeight: 'bold',
			whiteSpace: 'pre',
			fontFamily: 'monospace',
			color: 'black',
			background: 'rgba(0, 0, 0, 0)'
		};
		return (
			<div id="mapContainerSpan" style={containerSpanStyle}>
				{this.getLayout()}
			</div>
		);
	}
}

export default Map;
