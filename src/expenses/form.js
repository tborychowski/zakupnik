import $ from 'util';
import Toaster from 'toaster';
import Data from 'data/entries';
import Categories from 'data/categories';
import Calendar from 'calendar';

var tpl = require('./form.html');
var _defaults = {
	onAdd: function () {}
};
function parseCategories (cats) {
	let map = {};
	for (let p of cats) {
		for (let c of p.items) map[c.id] = c.name;
	}
	return map;
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
		return this;
	}

	set (data) {
		this.reset();
		this.form.set(data);
		return this;
	}

	unsplit (btn) {
		btn.closest('.form-row').remove();
	}

	split (first) {
		let idx = this.subforms.find('.form-row').length;
		let subform = $(tpl({ first: first === true, categories: this.categories, idx }));
		subform.appendTo(this.subforms).find('select')[0].focus();
		this.addInputEvents(subform);
	}

	setDate (date) {
		var dates = this.subforms.find('input[name$="date"]');
		$.each(dates, function (f) { f.value = date; });
	}

	getData (clean = false) {
		var date = Calendar.get(true),
			format = (n) => n.toLocaleString('en-GB', { minimumFractionDigits: 2 }),
			items = this.form.get(true).items,
			data = [],
			errors = [],
			total = 0;

		$.each(items, function (item, i) {
			if (!item.date) item.date = date;
			if (!item.amount) return errors.push('Please enter amount!');
			item.amount = this.parseAmount(item.amount);
			if (i.toString() === '0') total = item.amount;
			else total -= item.amount;
			if (!clean) {
				item.amount_str = format(item.amount);
				item.category = this.catMap[item.category_id];
			}
			data.push(item);
		}, this);

		if (errors.length) return false;
		if (data && data.length) {
			data[0].amount = total;
			if (!clean) data[0].amount_str = format(total);
		}
		return data;
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
			if (d.amount <= 0) {
				Toaster.error('Amount cannot be negative');
				return false;
			}
		}
		return true;
	}


	addInputEvents (subform) {
		let inputs = subform.find('.amount');
		inputs.on('keydown', this.onKeyDown.bind(this));
		// inputs.on('input', this.onInput.bind(this));
	}


	onKeyDown (e) {
		if ($.isAllowed(e)) return true;
		e.preventDefault();
	}

	onClick (e) {
		var target = $(e.target);
		if (target.is('.btn-split')) this.split();
		else if (target.is('.btn-del')) this.unsplit(target);
		else return;
		e.preventDefault();
	}


	onSubmit (e) {
		e.preventDefault();
		let data = this.getData(true);
		if (!this.validate(data)) return;
		if (data) Data.save(data)
			.then(resp => { if (resp.result === 'success') this.reset(); return resp; })
			.then(this.cfg.onAdd);
	}

}
