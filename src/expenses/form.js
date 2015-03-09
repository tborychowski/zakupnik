import $ from 'util';
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
		this.subforms = this.cfg.target.find('.subforms');
		this.categories = [];
		this.catMap = {};
		this.cfg.target.on('submit', this.onSubmit.bind(this));
		this.cfg.target.on('click', this.onClick.bind(this));
		this.draw();
	}

	onClick (e) {
		var target = $(e.target);
		if (target.is('.btn-split')) this.split();
		else if (target.is('.btn-del')) this.unsplit(target);
		else return;
		e.preventDefault();
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
		var f = $.form(this.subforms.find('.form-row')[0]);
		f.set(data);
		return this;
	}

	unsplit (btn) {
		btn.closest('.form-row').remove();
	}

	split (first) {
		$(tpl({ first: first === true, categories: this.categories }))
			.appendTo(this.subforms)
			.find('select')[0].focus();
	}

	parseAmount (amount) {
		/*jshint evil: true */
		amount = ('' + amount).replace(/\s/g, '');
		if (!(/^[\+\-\\*\/\(\)\d\.]+$/i).test(amount)) return 0;
		if ((/[\+\-\\*\/\.]+/i).test(amount)) amount = eval(amount);
		return parseFloat(amount);
	}

	getData () {
		var forms = this.subforms.find('.form-row'),
			date = Calendar.get(true),
			format = (n) => n.toLocaleString('en-GB', { minimumFractionDigits: 2 }),
			data = [],
			errors = [],
			total = 0;

		$.each(forms, function (f, i) {
			let fd = $.form(f).get(true);
			if (!fd.date) fd.date = date;
			if (!fd.amount) return errors.push('Please enter amount!');
			fd.amount = this.parseAmount(fd.amount);
			fd.amount_str = format(fd.amount);
			fd.category = this.catMap[fd.category_id];
			if (i === 0) total = fd.amount;
			else total -= fd.amount;
			data.push(fd);
		}, this);
		if (errors.length) return false;
		data[0].amount = total;
		data[0].amount_str = format(total);
		return data;
	}

	onSubmit (e) {
		e.preventDefault();
		let data = this.getData();
		if (data) Data.save(data)
			.then(resp => { if (resp.result === 'success') this.reset(); return resp; })
			.then(this.cfg.onAdd);
	}

}
