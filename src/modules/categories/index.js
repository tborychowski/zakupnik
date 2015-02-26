import $ from 'util';
import Data from 'data/categories';

var el;


function getTree(data, item = {id: 0}) {
	let items = data.filter(function (i) { return i.parent_id === item.id; });
	if (items.length) {
		item.items = items;
		for (let sub of items) sub = getTree(data, sub);
	}
	return item;
}


function createTree (data, html = []) {
	if (!data.length) data = data.items;
	for (let item of data) {
		html.push('<li>' + item.name);
		if (item.items) html.push(createTree(item.items));
		html.push('</li>');
	}
	return '<ul>' + html.join('') + '</ul>';
}


function init () {
	el = $('.category-tree');
	Data.get()
		.then(getTree)
		.then(createTree)
		.then(function (html) { el[0].innerHTML = html; })
		.catch(function (e) {
			console.error('ERROR:', e);
		});
}

export default {
	init
};
