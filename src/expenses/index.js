import $ from 'util';
import Data from 'data/entries';
import Categories from 'data/categories';
import Calendar from 'calendar';
import Grid from 'grid';

var formTpl = require('./form.html');
var el, formContainer, form, tableContainer, grid, subforms, catList = [], isReady = false;

function load (initial = false) {
	grid.load();
	Categories.getTree().then(function (data) {
		catList = data;
		if (initial) subforms.html('');
		split(initial);
	});
}

function resetForm () {
	grid.unselectRows();
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

function del (item, row) {
	this.selectRow(row, true);
	if (window.confirm('Are you sure you wish to delete this row?')) {
		Data.del({ id: item.id }).then(function (resp) {
			if (resp.result === 'success') row.remove();
		});
	}

}

function edit (item, row) {
	Data.get(item.id).then(function (data) {
		Calendar.set(data.date);
		resetForm();
		form.set(data);
		grid.selectRow(row, true);
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

		grid = new Grid({
			target: tableContainer[0],
			sort: { by: 'date', order: 'desc' },
			dataSource: () => Data.get(),
			columns: [
				{ width: 52, icons: { pencil: edit, 'trash-o': del }},
				{ name: 'Date', field: 'date', width: 90 },
				{ name: 'Category', field: 'category', width: '40%' },
				{ name: 'Description', field: 'description' },
				{ name: 'Amount', field: 'amount', width: 100,
					renderer: (v, item) => '€' + item.amount_str,
					footer: (d) => '€' + d.total_str
				}
			]
		});
	}

	load(true);
	isReady = true;
}


export default {
	init
};
