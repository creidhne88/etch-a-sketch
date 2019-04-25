let etch = {
	pixels: [],
	containers: {},
	buttons: {}
};

etch.getRandomColor = function() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * letters.length)];
	}
	return color;
};

etch.generateCont = function(id, cssClass, parent) {
	etch.containers[id] = document.createElement('div');
	if (id) { etch.containers[id].setAttribute('id', id); }
	if (cssClass) { etch.containers[id].classList.add(cssClass); }
	parent.appendChild(etch.containers[id]);
	return etch.containers[id];
};

etch.generateButton = function(text, parent) {
	etch.buttons[text] = document.createElement('button');
	etch.buttons[text].innerHTML = text.charAt(0).toUpperCase() + text.slice(1);
	parent.appendChild(etch.buttons[text]);
	return etch.buttons[text];
};

etch.setup = function() {
	etch.container = document.querySelector('#container');
	etch.generateButton('clear', etch.container).addEventListener('click', etch.clearPad);
	etch.generateCont('etchpad', null, etch.container);
	etch.generatePad(16);
};

etch.generatePad = function(amount) {
	etch.pad = document.querySelector('#etchpad');
	const size = Math.round((100 / amount) * 100) / 100;
	for (let i = 0; i < amount ** 2; i++) {
		let pixel = document.createElement('div');
		pixel.classList.add('pixel');
		pixel.style.backgroundColor = etch.getRandomColor();
		pixel.style.width = `${size}%`;
		pixel.style.height = `${size}%`;
		etch.pad.appendChild(pixel);
		etch.pixels.push(pixel);
	}
	etch.pixels.map(el => {
		el.addEventListener('mouseover', event => {
			event.target.style.backgroundColor = etch.getRandomColor();
		});
	});
};

etch.clearPad = function() {
	if (etch.pixels.length !== 0) {
		etch.pixels.map(el => { el.style.backgroundColor = '#ffffff'; });
	}
};