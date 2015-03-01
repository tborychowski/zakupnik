import $ from 'util';
import Data from 'data/entries';
import Categories from 'data/categories';
import Moment from 'moment';
import Pikaday from 'pikaday';

var tableTpl = require('./table.html');
var formTpl = require('./form.html');
var el, formContainer, form, tableContainer, subforms, picker, catList = [], isReady = false;


function load (initial = false) {
	Data.get().then(function (entries) {
		tableContainer.html(tableTpl({ entries }));
	});
	Categories.getTree().then(function (data) {
		catList = data.items;
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
		if (resp.result === 'success') form.reset();
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
		form = new $.form(formContainer[0]);

		var start = Moment('2010-01-01'), end = Moment().endOf('month');
		picker = new Pikaday({
			firstDay: 1,
			bound: false,
			defaultDate: Moment().toDate(),
			setDefaultDate: true,
			container: formContainer.find('.form-calendar')[0],
			field: formContainer.find('.datefield')[0],
			minDate: start.toDate(),
			maxDate: end.toDate(),
			yearRange: [start.year(), end.year()]
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

	load(!isReady);
	isReady = true;
}


export default {
	init
};
