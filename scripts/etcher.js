let etch = {
	pixels: [],
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

etch.setup = function() {
	etch.container = document.querySelector('#container');
	etch.buttons.clear = document.createElement('button');
	etch.buttons.clear.innerHTML = 'Clear';
	etch.buttons.clear.addEventListener('click', etch.clearPad);
	etch.container.appendChild(etch.buttons.clear);

	etch.pad = document.createElement('div');
	etch.pad.setAttribute('id', 'etchpad');
	etch.container.appendChild(etch.pad);
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