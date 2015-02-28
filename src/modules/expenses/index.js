import $ from 'util';
import Data from 'data/entries';
import Categories from 'data/categories';

var el, form, table, subforms, catList = [];
var tableTpl = require('./table.html');
var formTpl = require('./form.html');


function loadCategories () {
	Categories.get().then(function (data) {
		catList = data;
		split(true);
		form.find('.btn-split').on('click', split);
	});
}

function load () {
	Data.get().then(function (entries) {
		table.html(tableTpl({ entries }));
	});
}

function split (first) {
	var subform = $(formTpl({ first: first === true, categories: catList }));
	subform.appendTo(subforms).find('select')[0].focus();
}

function add () {
	console.log('add');
}

function init () {
	el = $('#expenses');
	table = el.find('.expenses-table');
	form = el.find('.expenses-form');
	subforms = form.find('.subforms');

	form.on('submit', function (e) { e.preventDefault(); });
	form.find('.btn-add').on('click', add);

	load();
	loadCategories();
}

export default {
	init
};
