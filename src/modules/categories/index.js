import $ from 'util';
import Data from 'data/categories';

var el;


function createTree (data, html = []) {
	if (!data.length) data = [data];
	for (let item of data) {
		html.push('<li>' + item.name);
		if (item.items) html.push(createTree(item.items));
		html.push('</li>');
	}
	return '<ul class="category-tree">' + html.join('') + '</ul>';
}


function init () {
	el = $('#categories');
	Data.get()
		.then(createTree)
		.then(function (html) {
			el[0].innerHTML = html;
		})
		.catch(function (e) {
			console.error('ERROR:', e);
		});
}

export default {
	init
};
