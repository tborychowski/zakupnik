import $ from 'util';
import Data from 'data/entries';
import Calendar from 'calendar';
import Grid from 'grid';
import Form from './form';

var el, grid, previewGrid, preview, form, isReady = false, lastLoadDate;

function load (force) {
	let date = Calendar.get('YYYY-MM');
	// don't reload if month the same
	if (!lastLoadDate || lastLoadDate !== date || force === true) {
		lastLoadDate = date;
		grid.load({ date });
	}
	// update all inputs
	form.setDate(Calendar.get(true));
	onPreview();
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
		form.set({ items: { 0: data } });
	});
}

function onReset (e) {
	e.preventDefault();
	Calendar.set(new Date());
	form.reset();
	onPreview();
}

function onPreview () {
	var data = form.getData(), sum = 0, total_str;
	preview.toggleClass('hidden', !(data.items && data.items.length));

	if (!data.items) return;
	for (let r of data.items) sum += r.amount;
	total_str = $.formatNumber(sum);
	if (data.items) previewGrid.setData({ total_str, items: data.items });
}

/**
 * Amount cell renderer/formatter
 */
function renderer (v, item) {
	if (v <= 0) {
		return '<span class="warn"><i class="fa fa-exclamation-circle"></i> €' +
			item.amount_str + '</span>';
	}
	return '€' + item.amount_str;
}

/**
 * Footer renderer/formatter
 */
function footer (data) {
	return '€' + data.total_str;
}

function init () {
	if (!isReady) {
		el = $('#expenses');
		preview = el.find('.preview');

		form = new Form({
			target: el.find('.expenses-form'),
			onAdd: onResp,
			onChange: onPreview
		});

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
		$.on('calendar/changed', load);
	}

	load();
	isReady = true;
}


export default {
	init
};
