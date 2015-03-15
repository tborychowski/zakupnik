import $ from 'util';
import Data from 'data/categories';

var el, treeContainer, formContainer, form, btn = {}, catSel;
var tpl = require('./category.html');

function updateCatSelect (data) {
	var options = ['<option value="0"></option>'];
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


function edit(cat) {
	formContainer.toggleClass('update', !$.isObjectEmpty(cat));
	form.set(cat, true);
}

function save () {
	Data.save(form.get(true)).then(function () {
		formContainer.removeClass('update');
		loadTree();
	});
}

function del () {
	var data = form.get(true);
	if (window.confirm('Are you sure you wish to remove "' + data.name + '"')) {
		Data.del(data).then(function () {
			formContainer.removeClass('update');
			loadTree();
		});
	}
}

function onClick (e) {
	var target = $(e.target);
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
		.then(function (html) { treeContainer.html(html); })
		.catch(function (e) { console.error('ERROR:', e); });
}

function init () {
	el = $('#categories');
	treeContainer = el.find('.tree');
	formContainer = el.find('.form form');
	form = $.form(formContainer[0]);
	btn.add = formContainer.find('.btn-add');
	btn.del = formContainer.find('.btn-del');
	btn.sav = formContainer.find('.btn-sav');
	catSel = formContainer.find('.category');

	el.on('click', onClick);
	formContainer.on('submit', function (e) { save(); e.preventDefault(); });

	loadTree();
}

export default {
	init
};
