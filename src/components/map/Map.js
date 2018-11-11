import React, { Component } from 'react';

import './map.css';

import { mapLayout } from './layoutData';
import { getSpanAt, checkIfWater, setPlayerTo, removePlayerFrom, getCharAndColorOf } from './mapFunctions';

class Map extends Component {
	state = {
		layout: mapLayout,
		playerPosition: this.props.playerPosition ? this.props.playerPosition : { x: 31, y: 11 },
		rows: 56,
		cols: 160,
		currentCharAndColor: null
	};

	componentDidMount = () => {
		window.addEventListener('keydown', this.keyHandling);
		this.spawnPlayer();
	};

	componentWillUnmount = () => {
		// Remove event listener on compenent unmount
		window.removeEventListener('keydown', this.keyHandling);
	};

	keyHandling = e => {
		// Handle event
		e = e || window.event;
		if (e.keyCode == '38') {
			// console.log('up arrow');
			this.move(this.state.playerPosition, {
				x: this.state.playerPosition.x,
				y: this.state.playerPosition.y - 1
			});
		} else if (e.keyCode == '40') {
			// console.log('down arrow');
			this.move(this.state.playerPosition, {
				x: this.state.playerPosition.x,
				y: this.state.playerPosition.y + 1
			});
		} else if (e.keyCode == '37') {
			// console.log('left arrow');
			this.move(this.state.playerPosition, {
				x: this.state.playerPosition.x - 1,
				y: this.state.playerPosition.y
			});
		} else if (e.keyCode == '39') {
			// console.log('right arrow');
			this.move(this.state.playerPosition, {
				x: this.state.playerPosition.x + 1,
				y: this.state.playerPosition.y
			});
		}
		e.preventDefault();
	};

	move = (fromPosition, toPosition) => {
		console.log(`from x: ${fromPosition.x} y: ${fromPosition.y}`);
		console.log(`to x: ${toPosition.x} y: ${toPosition.y}`);
		if (checkIfWater(toPosition)) {
			this.setState(
				{
					playerPosition: toPosition
				},
				e => console.log(this.state.playerPosition)
			);
			let oldSpan = getSpanAt(fromPosition);
			let newSpan = getSpanAt(toPosition);
			let currentCharAndColor = getCharAndColorOf(newSpan);
			setPlayerTo(newSpan);
			removePlayerFrom(oldSpan, this.state.currentCharAndColor);
			this.setState({
				currentCharAndColor
			});
		} else {
			return false;
		}
	};

	spawnPlayer = () => {
		if (checkIfWater(this.state.playerPosition)) {
			// change position of player,
			//player.position = toPosition;
			//get the newSpan
			let newSpan = getSpanAt(this.state.playerPosition);
			// get the char and color at new position,
			let currentCharAndColor = getCharAndColorOf(newSpan);
			// change char and color at next position,
			setPlayerTo(newSpan);
			// stock char and color into vaiable.
			this.setState({
				currentCharAndColor
			});
		} else {
			return false;
		}
	};

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
		const fS =
			Math.round(this.props.h / 70) + 'px' < Math.round(this.props.w / 120) + 'px'
				? Math.round(this.props.h / 70) + 'px'
				: Math.round(this.props.w / 120) + 'px';
		console.log(fS);
		const containerSpanStyle = {
			width: this.props.w,
			height: this.props.h,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			fontSize: fS,
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
