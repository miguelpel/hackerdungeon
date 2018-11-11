export const getSpanAt = position => {
	let mapContainerDiv = document.getElementById('mapContainerSpan');
	//let rows = mapContainerDiv.getElementsByTagName('SPAN');
	let row = mapContainerDiv.childNodes[position.y];
	let span = row.childNodes[position.x];
	console.log(span.innerHTML);
	return span;
};

export const checkIfWater = position => {
	if (position.y < 2 || position.y > 55) {
		console.log('out of map');
		return false;
	}
	//"rgb(168 , 216 , 227)"
	let span = getSpanAt(position);
	if (span.innerHTML === ',') {
		console.log('Water!');
		console.log(span.style.color);
		return false;
	} else {
		console.log('land.');
		return true;
	}
};

export const getCharAndColorOf = span => {
	let char = span.innerHTML;
	let color = span.style.color;
	return { char: char, color: color };
};

export const setCharAndColor = (span, charAndColorObject) => {
	span.innerHTML = charAndColorObject.char;
	span.style.color = charAndColorObject.color;
};

export const setPlayerTo = span => {
	span.innerHTML = 'O';
	span.style.color = 'red';
	span.classList.add('pulse');
};

export const removePlayerFrom = (span, currentCharAndColor) => {
	span.classList.remove('pulse');
	setCharAndColor(span, currentCharAndColor);
};
