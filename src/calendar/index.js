import $ from 'util';
import Pikaday from 'pikaday';
import Moment from 'moment';

var tpl = require('./template.html');
var el, picker,
	isReady = false,
	gotoMap = {
		prev: function (c) { return c.subtract(1, 'days'); },
		next: function (c) { return c.add(1, 'days'); },
		today: function () { return Moment(); }
	};


function goTo (where) { picker.setMoment(gotoMap[where](picker.getMoment())); }

function onSelect () { $.trigger('calendar/changed', picker.getMoment()); }

function _set (date) { picker.setMoment(Moment(date)); }
function _get (format) {
	if (!isReady) init();
	if (!format) return picker.getMoment();
	if (format === true) format = 'YYYY-MM-DD';
	return picker.getMoment().format(format);
}

function onClick (e) {
	var target = $(e.target);
	if (target.is('.btn')) {
		goTo(target.data('go'));
		e.preventDefault();
	}
}

function init () {
	if (isReady) return;
	el = $('#calendar').html(tpl()).on('click', onClick);

	var today = new Date();
	picker = new Pikaday({
		firstDay: 1,
		defaultDate: today,
		setDefaultDate: true,
		format: 'ddd, D MMM YYYY',
		field: el.find('.date')[0],
		yearRange: [2014, today.getFullYear()],
		onSelect
	});
	onSelect();
	isReady = true;
}

export default {
	init,
	set: _set,
	get: _get
};
