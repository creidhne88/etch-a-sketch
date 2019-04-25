// CORE
let etch = {
	size: 16,
	pixels: [],
	containers: {},
	buttons: {},
};

etch.setColor = rgb => {
	let color = 'rgb(';
	if (rgb && rgb.length === 3) {
		for (let i = 0; i < 3; i++) {
			color += rgb[i];
			if (i < 2) { color += ', '; }
		}
	}
	else {
		for (let i = 0; i < 3; i++) {
			color += Math.floor(Math.random() * 256);
			if (i < 2) { color += ', '; }
		}
	}
	color += ')';
	return color;
};

etch.setup = () => {
	etch.container = document.querySelector('#container');
	etch.generateCont('buttonPanel', 'panel', etch.container);

	etch.containers.input = document.createElement('input');
	etch.containers.input.setAttribute('min', 1);
	etch.containers.input.setAttribute('max', 500);
	etch.containers.input.setAttribute('type', 'number');
	etch.containers.input.setAttribute('placeholder', etch.size);
	etch.containers.input.addEventListener('mouseout', etch.verifyInput);
	etch.containers.buttonPanel.appendChild(etch.containers.input);

	etch.generateButton('resize', etch.containers.buttonPanel).addEventListener('click', etch.resizePad);
	etch.generateButton('clear', etch.containers.buttonPanel).addEventListener('click', etch.clearPad);
	etch.generateButton('random', etch.containers.buttonPanel).addEventListener('click', etch.randomizePad);
	etch.generateButton('paint', etch.containers.buttonPanel).addEventListener('click', etch.switch);
	etch.listener = etch.darkenPixel;
	etch.generateCont('etchpad', null, etch.container);
	etch.generatePad(etch.size, etch.containers.etchpad);
};

etch.generateCont = (id, cssClass, parent) => {
	etch.containers[id] = document.createElement('div');
	if (id) { etch.containers[id].setAttribute('id', id); }
	if (cssClass) { etch.containers[id].classList.add(cssClass); }
	parent.appendChild(etch.containers[id]);
	return etch.containers[id];
};

etch.generateButton = (text, parent) => {
	etch.buttons[text] = document.createElement('button');
	etch.buttons[text].innerHTML = text.charAt(0).toUpperCase() + text.slice(1);
	parent.appendChild(etch.buttons[text]);
	return etch.buttons[text];
};

etch.switch = () => {
	etch.pixels.map(el => {
		el.removeEventListener('mouseover', etch.listener);
	});
	if (etch.listener === etch.darkenPixel) {
		etch.listener = etch.paintPixel;
		etch.buttons.paint.innerHTML = 'Darken';
	}
	else {
		etch.listener = etch.darkenPixel;
		etch.buttons.paint.innerHTML = 'Paint';
	}
	etch.pixels.map(el => {
		el.addEventListener('mouseover', etch.listener);
	});
};

etch.generatePad = (amount, parent) => {
	const size = Math.round((100 / amount) * 100) / 100;
	for (let i = 0; i < amount ** 2; i++) {
		let pixel = document.createElement('div');
		pixel.classList.add('pixel');
		pixel.style.backgroundColor = 'rgb(255, 255, 255)';
		pixel.style.width = `${size}%`;
		pixel.style.height = `${size}%`;
		parent.appendChild(pixel);
		etch.pixels.push(pixel);
	}
	etch.pixels.map(el => {
		el.addEventListener('mouseover', etch.listener);
	});
};

// BUTTON/FIELD HANDLERS
etch.clearPad = () => { etch.pixels.map(el => { el.style.backgroundColor = '#ffffff'; }); };
etch.randomizePad = () => { etch.pixels.map(el => { el.style.backgroundColor = etch.setColor(); }); };
etch.resizePad = () => {
	etch.pixels.map(el => { el.remove(); return null; });
	etch.pixels = [];
	etch.generatePad(etch.size, etch.containers.etchpad);
};
etch.verifyInput = () => {

};

// PIXEL HANDLERS
etch.paintPixel = event => { event.target.style.backgroundColor = 'rgb(0, 0, 0)'; };
etch.darkenPixel = event => {
	let rgb = event.target.style.backgroundColor;
	if (rgb === 'rgb(255, 255, 255)' || rgb === 'rgb(0, 0, 0)') {
		event.target.style.backgroundColor = etch.setColor();
	}
	else {
		rgb = rgb.slice(4, rgb.length - 1).split(', ').map(el => parseInt(el)).map(el => el - 25);
		event.target.style.backgroundColor = etch.setColor(rgb);
	}
};