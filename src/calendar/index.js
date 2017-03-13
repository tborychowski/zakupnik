import $ from 'util';
import Pikaday from 'pikaday';
import Moment from 'moment';

const tpl = require('./template.html');
let el, picker, todayBtn, isReady = false;
const gotoMap = {
	prev: c => c.subtract(1, 'weeks'),
	next: c => c.add(1, 'weeks'),
	prevMonth: c => c.subtract(1, 'months'),
	nextMonth: c => c.add(1, 'months'),
	today: () => Moment()
};


function goTo (where) {
	const now = picker.getMoment();
	let newdate = now;
	// console.log(where, now);
	if (where in gotoMap) newdate = gotoMap[where](now);
	else newdate = now.isoWeekday(where);
	picker.setMoment(newdate);
}

function toggleTodayBtn (m) {
	todayBtn.toggleClass('btn-hidden', m.diff(Moment().startOf('day'), 'days', true) === 0);
}

function selectWeekday (wd) {
	wd = ('' + wd).substr(0, 3).toLowerCase();
	$('.btn.highlight').removeClass('highlight');
	$('.btn-' + wd).addClass('highlight');
}

function onSelect () {
	const m = picker.getMoment();
	selectWeekday(m.format('dddd'));
	toggleTodayBtn(m);
	$.trigger('calendar/changed', m);
}

function _set (date) {
	picker.setMoment(Moment(date));
}

function _get (format) {
	if (!isReady) init();
	if (!format) return picker.getMoment();
	if (format === true) format = 'YYYY-MM-DD';
	return picker.getMoment().format(format);
}

function onClick (e) {
	const target = $(e.target);
	if (target.is('.btn')) {
		goTo(target.data('go'));
		e.preventDefault();
	}
}

function init () {
	if (isReady) return;
	el = $('#calendar').html(tpl()).on('click', onClick);
	todayBtn = el.find('.btn-today');

	const today = new Date();
	picker = new Pikaday({
		firstDay: 1,
		defaultDate: today,
		setDefaultDate: true,
		format: 'Do MMM YYYY',
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
