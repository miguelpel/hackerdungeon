import React, { Component } from 'react';

import './map.css';

import { mapLayout } from './layout';

class Map extends Component {
	state = {
		layout: mapLayout,
		playerPosition: this.props.playerPosition ? this.props.playerPosition : { x: 32, y: 11 },
		rows: 56,
		cols: 160,
		spans: null,
		currentCharAndColor: null
	};

	componentDidMount = () => {
		window.addEventListener('keyup', this.keyHandling);
		const span = document.getElementById('mapContainerSpan');
		const spans = span.getElementsByTagName('SPAN');
		this.setState(
			{
				spans
			},
			this.spawnPlayer
		);
	};

	componentWillUnmount = () => {
		// Remove event listener on compenent unmount
		window.removeEventListener('keyup', this.keyHandling);
	};

	keyHandling = e => {
		// Handle event
		console.log('Key code: ' + e.keyCode);
		e.preventDefault();
	};

	spawnPlayer = () => {
		let newSpan = this.getSpanAt(this.state.playerPosition);
		let charAndColor = this.getCharAndColorOf(newSpan);
		this.setPlayerTo(newSpan);
		this.setState({
			currentCharAndColor: charAndColor
		});
	};

	move = (fromPosition, toPosition) => {
		console.log(`from x: ${fromPosition.x} y: ${fromPosition.y}`);
		console.log(`to x: ${toPosition.x} y: ${toPosition.y}`);
		if (this.checkIfWater(toPosition)) {
			this.setState({
				playerPosition: toPosition
			});
			let oldSpan = this.getSpanAt(fromPosition);
			let newSpan = this.getSpanAt(toPosition);
			let charAndColor = this.getCharAndColorOf(newSpan);
			this.setPlayerTo(newSpan);
			this.removePlayerFrom(oldSpan);
			this.setState({
				currentCharAndColor: charAndColor
			});
		} else {
			return false;
		}
	};

	setPlayerTo = span => {
		span.innerHTML = '@';
		span.style.color = 'red';
		span.classList.add('pulse');
	};

	removePlayerFrom = span => {
		span.classList.remove('red');
		this.setCharAndColor(span, this.state.currentCharAndColor);
	};

	checkIfWater = position => {
		if (position.y < 2 || position.y > 55) {
			console.log('out of map');
			return false;
		}
		let span = this.getSpanAt(position);
		if (span.innerHTML === ',') {
			console.log('Water!');
			console.log(span.style.color);
			return false;
		} else {
			console.log('land.');
			return true;
		}
	};

	getCharAndColorOf = span => {
		let char = span.innerHTML;
		let color = span.style.color;
		return { char: char, color: color };
	};

	setCharAndColor = (span, charAndColorObject) => {
		span.innerHTML = charAndColorObject.char;
		span.style.color = charAndColorObject.color;
	};

	getSpanAt = position => {
		let nbr = position.x - 1 + this.state.cols * (position.y - 1);
		return this.state.spans[nbr];
	};

	getPositionOf = spanNbr => {
		let spanY = Math.floor(spanNbr / this.state.cols) + 1;
		let spanX = (spanNbr % this.state.cols) + 1;
		return { x: spanX, y: spanY };
	};

	render() {
		return <div>{this.state.layout}</div>;
	}
}

export default Map;
