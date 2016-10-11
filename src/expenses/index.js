import $ from 'util';
import Data from 'data/entries';
import Calendar from 'calendar';
import Grid from 'grid';
import Form from './form';

var el, grid, previewGrid, preview, formContainer, form, isReady = false, lastLoadDate;

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
	formContainer.removeClass('update');
}

function edit (item, row) {
	formContainer.addClass('update');
	grid.selectRow(row, true);
	Data.get(item.id).then(data => {
		Calendar.set(data.date);
		form.set({ items: { 0: data }, repeat: 1 });
	});
}

function onDel (e) {
	if (e) e.preventDefault();
	var data = form.getData().items, id = (data && data[0] ? data[0].id : null);
	if (id && window.confirm('Are you sure you wish to delete this item?')) {
		Data.del(id).then(onResp).then(onReset);
	}
}

function onReset (e) {
	if (e) e.preventDefault();
	formContainer.removeClass('update');
	Calendar.set(new Date());
	form.reset();
	grid.unselectRows();
	onPreview();
}

function onPreview () {
	var data = form.getData(), sum = 0, totalStr;
	preview.toggleClass('hidden', !(data.items && data.items.length));

	if (!data.items) return;
	for (let r of data.items) sum += r.amount;
	totalStr = $.formatNumber(sum);
	if (data.items) previewGrid.setData({ totalStr, items: data.items });
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

// Category & description renderer/formatter
function categoryRenderer (v, item) {
	return v + ' - ' + item.description;
}

// Footer renderer/formatter
function footer (/* data */) {
	let total = this.items.reduce(function (pre, cur) { return pre + cur.amount; }, 0);
	console.log(total);
	total = $.formatNumber(total);
	// let total = data.totalStr;
	return '€' + total;
}

function init () {
	if (!isReady) {
		el = $('#expenses');
		preview = el.find('.preview');

		formContainer = el.find('.form');
		form = new Form({
			target: formContainer,
			onAdd: onResp,
			onChange: onPreview
		});

		grid = new Grid({
			target: el.find('.expenses-table')[0],
			sort: { by: 'date', order: 'desc' },
			dataSource: (params) => Data.get(params),
			columns: [
				{ width: 27, icons: { pencil: edit } },
				{ name: 'Date', field: 'date', width: 90 },
				{ name: 'Category', field: 'category', renderer: categoryRenderer },
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
		el.find('.btn-del').on('click', onDel);
		$.on('calendar/changed', load);
	}
	else onReset();

	load();
	isReady = true;
}


export default {
	init
};
