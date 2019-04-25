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

etch.setup = function() {
	etch.container = document.querySelector('#container');
	etch.generateCont('buttonPanel', 'panel', etch.container);
	etch.generateButton('clear', etch.containers.buttonPanel).addEventListener('click', etch.clearPad);
	etch.generateButton('random', etch.containers.buttonPanel).addEventListener('click', etch.randomizePad);
	etch.generatePad(16, etch.generateCont('etchpad', null, etch.container));
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

etch.generatePad = function(amount, parent) {
	const size = Math.round((100 / amount) * 100) / 100;
	for (let i = 0; i < amount ** 2; i++) {
		let pixel = document.createElement('div');
		pixel.classList.add('pixel');
		pixel.style.backgroundColor = '#ffffff';
		pixel.style.width = `${size}%`;
		pixel.style.height = `${size}%`;
		parent.appendChild(pixel);
		etch.pixels.push(pixel);
	}
	etch.pixels.map(el => {
		el.addEventListener('mouseover', event => {
			event.target.style.backgroundColor = etch.getRandomColor();
		});
	});
};

etch.clearPad = () => { etch.pixels.map(el => { el.style.backgroundColor = '#ffffff'; }); };
etch.randomizePad = () => { etch.pixels.map(el => { el.style.backgroundColor = etch.getRandomColor(); }); };