import $ from 'util';
import Data from 'data/entries';
import Calendar from 'calendar';
import Grid from 'grid';
import Form from './form';

var el, grid, preview, previewGrid, form, isReady = false, lastLoadDate;

function load (force) {
	let date = Calendar.get('YYYY-MM');
	// don't reload if month the same
	if (!lastLoadDate || lastLoadDate !== date || force === true) {
		lastLoadDate = date;
		grid.load({ date });
	}
	// update all inputs
	let d = Calendar.get(true);
	$.each(form.subforms.find('input[name=date]'), function (f) { f.value = d; });
}

function onResp (resp) {
	if (resp.result === 'success') load(true);
}

function del (item, row) {
	grid.selectRow(row, true);
	if (window.confirm('Are you sure you wish to delete this row?')) {
		Data.del(item.id).then(onResp);
	}
}

function edit (item, row) {
	grid.selectRow(row, true);
	Data.get(item.id).then(data => {
		Calendar.set(data.date);
		form.set(data);
	});
}

function onReset (e) {
	Calendar.set(new Date());
	form.reset();
	e.preventDefault();
}

function onPreview () {
	var items = form.getData(), sum = 0, total_str;
	if (!items) return;
	for (let r of items) sum += r.amount;
	total_str = sum.toLocaleString('en-GB', { minimumFractionDigits: 2 });
	if (items) previewGrid.setData({ total_str, items });
}


function init () {
	if (!isReady) {
		el = $('#expenses');
		preview = el.find('.preview');

		form = new Form({ target: el.find('.expenses-form'), onAdd: onResp });

		let renderer = (v, item) => '€' + item.amount_str,
			footer = (d) => '€' + d.total_str;

		grid = new Grid({
			target: el.find('.expenses-table')[0],
			sort: { by: 'date', order: 'desc' },
			dataSource: (params) => Data.get(params),
			columns: [
				{ width: 52, icons: { pencil: edit, 'trash-o': del }},
				{ name: 'Date', field: 'date', width: 90 },
				{ name: 'Category', field: 'category', width: '40%' },
				{ name: 'Description', field: 'description' },
				{ name: 'Amount', field: 'amount', width: 100, renderer, footer }
			]
		});

		previewGrid = new Grid({
			target: el.find('.preview-table')[0],
			sort: { by: 'date', order: 'desc' },
			dataSource: (params) => Data.get(params),
			columns: [
				{ name: 'Date', field: 'date', width: 90 },
				{ name: 'Category', field: 'category', width: '40%' },
				{ name: 'Description', field: 'description' },
				{ name: 'Amount', field: 'amount', width: 100, renderer, footer }
			]
		});

		el.find('.btn-reset').on('click', onReset);
		el.find('.btn-preview').on('click', onPreview);
		$.on('calendar/changed', load);
	}

	load();
	isReady = true;
}


export default {
	init
};
