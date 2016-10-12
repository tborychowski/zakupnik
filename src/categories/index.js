import $ from 'util';
import Data from 'data/categories';

const tpl = require('./category.html');
let isReady = false;
let el, treeContainer, formContainer, form, btn = {}, catSel;

function updateCatSelect (data) {
	const options = ['<option value="0">[root]</option>'];
	for (let c of data) options.push(`<option value="${c.id}">${c.name}</option>`);
	catSel.html(options.join(''));
	return data;
}

function createTree (data, html = []) {
	if (!data.length) data = [data];
	for (let item of data) {
		html.push('<li>' + tpl(item));
		if (item.items) html.push(createTree(item.items));
		html.push('</li>');
	}
	return '<ul class="category-tree">' + html.join('') + '</ul>';
}

function edit (cat) {
	formContainer.toggleClass('update', !$.isObjectEmpty(cat));
	form.set(cat, true);
}

function save () {
	Data.save(form.get(true)).then(() => {
		formContainer.removeClass('update');
		loadTree();
	});
}

function del () {
	const data = form.get(true);
	if (window.confirm('Are you sure you wish to remove "' + data.name + '"')) {
		Data.del(data).then(() => {
			formContainer.removeClass('update');
			loadTree();
		});
	}
}

function onClick (e) {
	const target = $(e.target);
	if (target.is('.cat')) edit(target.data());
	else if (target.is('.btn-reset')) edit({});
	else if (target.is('.btn-del')) del();
	else return;
	e.preventDefault();
}

function loadTree () {
	form.reset();
	Data.getTree()
		.then(updateCatSelect)
		.then(createTree)
		.then(html => treeContainer.html(html))
		.catch(e => {
			console.error('ERROR:', e);
		});
}

function init () {
	if (!isReady) {
		el = $('#categories');
		treeContainer = el.find('.tree');
		formContainer = el.find('.form');
		form = $.form(formContainer[0]);
		btn.add = formContainer.find('.btn-add');
		btn.del = formContainer.find('.btn-del');
		btn.sav = formContainer.find('.btn-sav');
		catSel = formContainer.find('.category');

		el.on('click', onClick);
		formContainer.on('submit', e => {
			save();
			e.preventDefault();
		});
		loadTree();
		isReady = true;
	}
	else {
		edit({});	// reset form
	}
}

export default {
	init
};
