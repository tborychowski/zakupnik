import $ from 'util';
import Toaster from 'toaster';
import Data from './data';
import Calendar from 'calendar';
import Moment from 'moment';

const _defaults = {
	onAdd: () => {}
};

function cloneItem (item, addMonths = 1) {
	let newItem = JSON.parse(JSON.stringify(item));
	newItem.date = Moment(newItem.date).add(addMonths, 'months').format('YYYY-MM-DD');
	return newItem;
}

// items repeat for X months
function repeatItems (items, times) {
	if (!items || !items.length) return [];
	const newItems = [];
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

		if (typeof this.cfg.onChange === 'function') {
			this.form.observe(this.cfg.onChange);
		}

		let subform = this.subforms.find('.form-row');
		subform.find('input')[0].focus();
		this.addInputEvents(subform);

		return this.reset();
	}

	reset () {
		this.form.reset();
		let rep = this.el.find('.repeat-in');
		if (rep) rep[0].value = 1;
		return this;
	}

	set (data) {
		this.reset();
		this.form.set(data);
		return this;
	}

	setDate (date) {
		const dates = this.subforms.find('input[name$="date"]');
		$.each(dates, f => { f.value = date; });
	}

	getData (clean = false) {
		const date = Calendar.get(true);
		const format = n => $.formatNumber(n);
		const item = this.form.get(true);
		const repeat = item.repeat;
		const errors = [];

		delete item.repeat;
		if (!item.date) item.date = date;
		if (!item.amount) errors.push('Please enter amount!');
		else {
			item.amount = this.parseAmount(item.amount);
			if (!clean) item.amount_str = format(item.amount);
		}
		if (errors.length && clean) return Toaster.error(errors[0]);
		if (!errors.length) return { items: repeatItems([item], repeat) };
		return {};
	}

	parseAmount (amount) {
		/* eslint no-eval: 0 */
		amount = ('' + amount).replace(/\s/g, '');
		if (!(/^[+\-\\*/()\d.]+$/i).test(amount)) return 0;
		if ((/[+\-\\*/.]+/i).test(amount)) {
			try { amount = eval(amount); }
			catch (e) { amount = 0; }
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
		let inputs = subform.find('.amount');
		inputs.on('keydown', this.onKeyDown.bind(this));
	}


	onKeyDown (e) {
		if (e.keyCode === $.keys.ENTER) return true;
		if ($.isAllowed(e)) return true;
		e.preventDefault();
	}


	onSubmit (e) {
		e.preventDefault();
		let data = this.getData(true);
		if (!this.validate(data.items)) return;
		if (data.items) {
			Data.save(data.items)
				.then(resp => {
					if (resp.result === 'success') this.reset();
					return resp;
				})
				.then(this.cfg.onAdd);
		}
	}

}
