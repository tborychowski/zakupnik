import $ from 'util';
import Data from './data';
import Calendar from 'calendar';
import Grid from 'lite-grid';
import Form from './form';

let el, grid, previewGrid, preview, formContainer, form, isReady = false, lastLoadDate;

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
	const data = form.getData().items, id = (data && data[0] ? data[0].id : null);
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
	const data = form.getData();
	let sum = 0, totalStr;
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
	let val = `€${item.amount_str}`;
	if (v <= 0) val = `<span class="warn"><i class="fa fa-exclamation-circle"></i> ${val}</span>`;
	return val;
}

// Category & description renderer/formatter
function categoryRenderer (v, item) {
	return v + (item.description ? ' - ' + item.description : '');
}

// Footer renderer/formatter
function footer (/* data */) {
	let total = this.items.reduce((pre, cur) => pre + cur.amount, 0);
	total = $.formatNumber(total);
	return `€${total}`;
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
				{ name: 'Description', field: 'category', renderer: categoryRenderer },
				{ name: 'Amount', field: 'amount', width: 105, renderer, footer }
			]
		});

		previewGrid = new Grid({
			target: el.find('.preview-table')[0],
			sort: { by: 'date', order: 'desc' },
			dataSource: (params) => Data.get(params),
			columns: [
				{ name: 'Date', field: 'date', width: 90 },
				{ name: 'Description', field: 'category', renderer: categoryRenderer },
				{ name: 'Amount', field: 'amount', width: 105, renderer, footer }
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
