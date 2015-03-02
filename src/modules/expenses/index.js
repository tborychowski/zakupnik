import $ from 'util';
import Data from 'data/entries';
import Categories from 'data/categories';
import Pikaday from 'pikaday';

var tableTpl = require('./table.html');
var formTpl = require('./form.html');
var el, formContainer, form, tableContainer, subforms, picker, catList = [], isReady = false;

function dateToString (date) {
	var Y = date.getFullYear(), M = date.getMonth(), D = date.getDate();
	return [ Y, ('0' + (M + 1)).substr(-2), ('0' + D).substr(-2) ].join('-');     // 2010-12-21
}

// parse string date: 2011-01-31
function stringToDate (str) {
	var s = str.split('-');
	return new Date(s[0], s[1]-1, s[2]);
}

function load (initial = false) {
	Data.get().then(function (entries) {
		tableContainer.html(tableTpl({ entries }));
	});
	Categories.getTree().then(function (data) {
		catList = data;
		if (initial) subforms.html('');
		split(initial);
	});
}

function unsplit (btn) {
	btn.closest('.form-row').remove();
}

function split (first) {
	var subform = $(formTpl({ first: first === true, categories: catList }));
	subform.appendTo(subforms).find('select')[0].focus();
}

function add () {
	var formData = form.get(true), newData = [];

	if (!Array.isArray(formData.amount)) newData = [formData];
	else {	// has split
		let i, total = formData.amount[0];
		for (i in formData.amount) {
			newData.push({
				date: formData.date,
				category_id: formData.category_id[i],
				amount: formData.amount[i]
			});
			if (i > 0) total -= formData.amount[i];
		}
		newData[0].amount = total;
	}

	Data.save(newData).then(function (resp) {
		if (resp.result === 'success') form.set({ date: formData.date });
		load(true);
	});
}

function del (row, id) {
	row.addClass('active');
	if (window.confirm('Are you sure you wish to delete this row?')) {
		Data.del({ id: id }).then(function (resp) {
			if (resp.result === 'success') row.remove();
		});
	}

}

function edit (row, id) {
	tableContainer.find('.active').removeClass('active');
	row.addClass('active');
	Data.get(id).then(function (data) {
		subforms.html('');
		split(true);
		form.set(data);
		picker.setDate(data.date);
	});
}



function init () {
	if (!isReady) {
		el = $('#expenses');
		tableContainer = el.find('.expenses-table');
		formContainer = el.find('.expenses-form .form');
		subforms = formContainer.find('.subforms');
		form = $.form(formContainer[0]);

		var start = new Date('2010-01-01'),
			end = new Date(),
			field = formContainer.find('.datefield')[0];

		end.setMonth(end.getMonth() + 1);
		field.value = dateToString(new Date());

		picker = new Pikaday({
			firstDay: 1,
			format: 'YYYY-MM-DD',
			defaultDate: dateToString(new Date()),
			// setDefaultDate: true,
			// container: formContainer.find('.form-calendar')[0],
			// bound: false,
			field: field,
			minDate: start,
			maxDate: end,
			yearRange: [start.getFullYear(), end.getFullYear()],
			onSelect: function (v) {
				field.value = dateToString(v);
			}
		});

		formContainer.on('submit', function (e) {
			e.preventDefault();
			add();
		});

		formContainer.on('click', function (e) {
			let target = $(e.target);
			if (target.is('.btn-split')) split();
			if (target.is('.btn-del')) unsplit(target);
		});

		tableContainer.on('click', function (e) {
			let btn = $(e.target),
				row = btn.closest('.row'),
				id = row && row.data('id');

			if (btn.is('.fa')) btn = btn.closest('.btn');
			if (btn.is('.btn-del')) del(row, id);
			else if (btn.is('.btn-mod')) edit(row, id);
			else return;
			e.preventDefault();
		});
	}

	load(true);
	isReady = true;
}


export default {
	init
};
