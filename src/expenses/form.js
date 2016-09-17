import $ from 'util';
import Toaster from 'toaster';
import Data from 'data/entries';
import Categories from 'data/categories';
import Calendar from 'calendar';
import Moment from 'moment';

var tpl = require('./form.html');
var _defaults = {
	onAdd: function () {}
};

function parseCategories (cats) {
	let map = {};
	for (let p of cats) {
		if (p.items) {
			for (let c of p.items) map[c.id] = c.name;
		}
	}
	return map;
}

function cloneItem (item, addMonths = 1) {
	let newItem = JSON.parse(JSON.stringify(item));
	newItem.date = Moment(newItem.date).add(addMonths, 'months').format('YYYY-MM-DD');
	return newItem;
}

// items repeat for X months
function repeatItems (items, times) {
	if (!items || !items.length) return [];
	var newItems = [];
	for (let item of items) {
		for (let i = 1; i < times; i++) {
			newItems.push(cloneItem(item, i));
		}
	}
	items = items.concat(newItems);
	items.sort((a, b) => a.date.localeCompare(b.date));
	return items;
}

export default class Form {

	constructor (config) {
		this.cfg = Object.assign(_defaults, config);
		this.el = this.cfg.target;
		this.form = $.form(this.el[0]);
		this.subforms = this.cfg.target.find('.subforms');

		this.categories = [];
		this.catMap = {};

		this.el.on('submit', this.onSubmit.bind(this));
		this.el.on('click', this.onClick.bind(this));

		if (typeof this.cfg.onChange === 'function') {
			this.form.observe(function (nv, ov, f) {
				this.cfg.onChange.call(this.cfg.onChange, nv, ov, f);
			}.bind(this));
		}
		this.draw();
	}

	draw () {
		if (this.categories.length) this.reset();
		else Categories.getTree().then(data => {
			this.categories = data;
			this.catMap = parseCategories(data);
			this.reset();
		});
		return this;
	}

	reset () {
		this.subforms.html('');
		this.split(true);
		let rep = this.el.find('.repeat-in');
		if (rep) rep[0].value = 1;
		return this;
	}

	set (data) {
		this.reset();
		this.form.set(data);
		return this;
	}

	unsplit (btn) {
		btn.closest('.form-row').remove();
		let rows = this.el.find('.form-row');
		$.each(rows, function (row, i) {
			let fields = $(row).find('input,select');
			$.each(fields, function (f) {
				if (!f.name) return;
				f.name = f.name.replace(/\[\d+\]/, '[' + i + ']');
			});
		});
		this.subforms.find('.form-row:last-of-type .category')[0].focus();
		this.cfg.onChange.call(this.cfg.onChange);
	}

	split (first) {
		let idx = this.subforms.find('.form-row').length;
		let firstDesc = this.subforms.find('.form-row:first-of-type .description')[0];
		let description = firstDesc ? firstDesc.value : '';
		let rec = { first: first === true, categories: this.categories, idx, description };
		let subform = $(tpl(rec));
		subform.appendTo(this.subforms).find('select')[0].focus();
		this.addInputEvents(subform);
	}

	setDate (date) {
		var dates = this.subforms.find('input[name$="date"]');
		$.each(dates, function (f) { f.value = date; });
	}

	getData (clean = false) {
		var date = Calendar.get(true),
			format = (n) => $.formatNumber(n),
			formData = this.form.get(true),
			data = [],
			errors = [],
			total = 0;

		$.each(formData.items, function (item, i) {
			if (!item.date) item.date = date;
			if (!item.amount) errors.push('Please enter amount!');
			else {
				item.amount = this.parseAmount(item.amount);
				if (i.toString() === '0') total = item.amount;
				else total -= item.amount;
				if (!clean) {
					item.amount_str = format(item.amount);
					item.category = this.catMap[item.category_id];
				}
				data.push(item);
			}
		}, this);
		if (errors.length && clean) return Toaster.error(errors[0]);
		if (data && data.length) {
			data[0].amount = total;
			if (!clean) data[0].amount_str = format(total);
		}
		formData.items = repeatItems(data, formData.repeat);
		return formData;
	}

	parseAmount (amount) {
		/*jshint evil: true */
		amount = ('' + amount).replace(/\s/g, '');
		if (!(/^[\+\-\\*\/\(\)\d\.]+$/i).test(amount)) return 0;
		if ((/[\+\-\\*\/\.]+/i).test(amount)) {
			try { amount = eval(amount); }
			catch(e) { amount = 0; }
		}
		return parseFloat(amount);
	}

	validate (data) {
		if (!data || !data.length) return false;
		for (let d of data) {
			if (d.amount <= 0) return Toaster.error('Amount cannot be negative');
		}
		return true;
	}


	addInputEvents (subform) {
		let inputs = subform.find('.category, .amount, .description');
		let amount = subform.find('.amount');
		amount.on('keydown', this.onKeyDown.bind(this));
		inputs.on('keyup', this.onKeyUp.bind(this));
	}


	onKeyUp (e) {
		var target = $(e.target);
		if (e.keyCode === $.keys.C && e.ctrlKey) this.split();
		else if (e.keyCode === $.keys.X && e.ctrlKey) this.unsplit(target);
		else return;
		e.preventDefault();
	}

	onKeyDown (e) {
		if (e.keyCode === $.keys.ENTER) return true;
		if ($.isAllowed(e)) return true;
		e.preventDefault();
	}

	onClick (e) {
		var target = $(e.target);
		if (target.is('.btn-split')) this.split();
		else if (target.is('.btn-unsplit')) this.unsplit(target);
		else return;
		e.preventDefault();
	}


	onSubmit (e) {
		e.preventDefault();
		let data = this.getData(true).items;
		if (!this.validate(data)) return;
		if (data) Data.save(data)
			.then(resp => { if (resp.result === 'success') this.reset(); return resp; })
			.then(this.cfg.onAdd);
	}

}
