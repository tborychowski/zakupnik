import $ from 'util';
import Data from 'data/entries';
import Categories from 'data/categories';
import Calendar from 'calendar';

var tableTpl = require('./table.html');
var formTpl = require('./form.html');
var el, formContainer, form, tableContainer, subforms, catList = [], isReady = false;

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

function resetForm () {
	tableContainer.find('.active').removeClass('active');
	subforms.html('');
	split(true);
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
	formData.date = Calendar.get(true);

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
		Calendar.set(data.date);
		resetForm();
		form.set(data);
	});
}



function init () {
	if (!isReady) {
		el = $('#expenses');
		tableContainer = el.find('.expenses-table');
		formContainer = el.find('.expenses-form');
		subforms = formContainer.find('.subforms');
		form = $.form(formContainer[0]);


		formContainer.on('submit', function (e) {
			e.preventDefault();
			add();
		});

		el.find('.btn-reset').on('click', function (e) {
			e.preventDefault();
			Calendar.set(new Date());
			resetForm();
		});

		formContainer.on('click', function (e) {
			var target = $(e.target);
			if (target.is('.btn-split')) split();
			if (target.is('.btn-del')) unsplit(target);
		});

		tableContainer.on('click', function (e) {
			var btn = $(e.target),
				row = btn.closest('.row'),
				id = row && row.data('id');

			if (btn.is('.fa')) btn = btn.closest('.btn');
			if (btn.is('.btn-del')) del(row, id);
			else if (btn.is('.btn-mod')) edit(row, id);
			else if (row) edit(row, id);
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
