var colors = [
	'#3498db',
	'#d35400',
	'#9b59b6',
	'#bdc3c7',
	'#e74c3c',
	'#1abc9c',
	'#ecf0f1',
	'#27ae60',
	'#8e44ad',
	'#e67e22',
	'#2980b9',
	'#f1c40f',
	'#16a085',
	'#95a5a6',
	'#f39c12',
	'#2ecc71',
	'#c0392b',
	'#7f8c8d',
	'#2f7ed8',
	'#0d233a',
	'#8bbc21',
	'#910000',
	'#1aadce',
	'#492970',
	'#f28f43',
	'#77a1e5',
	'#c42525',
	'#a6c96a'
];

function lighter (hex, lum = 0.2) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = '#', c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ('00' + c).substr(c.length);
	}
	return rgb;
}

/**
 * Add "color" and "highlight" to every element of an array
 * @param {[type]} items [description]
 */
function addColors (items) {
	return items.map(function (item, i) {
		item.color = colors[i];
		item.highlight = lighter(colors[i]);
		return item;
	});
}

export default {
	colors,
	lighter,
	addColors
};
