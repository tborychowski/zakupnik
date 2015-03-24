import $ from 'util';
import Calendar from 'calendar';
import Data from 'data/stats';
import Chart from './Chart';

var lastLoadDate, _chart0, _chart1, _chart2;

function chart0 (data) {
	if (!_chart0) _chart0 = Chart('pie', 'chart0', 'Spending by category (this month)', data);
	else _chart0.setSeries(data);
}

function chart1 (data) {
	if (!_chart1) _chart1 = Chart('line', 'chart1', 'Income vs Expenses (this year)', data);
	else _chart1.setSeries(data);
}

function chart2 (data) {
	if (!_chart2) _chart2 = Chart('stock', 'chart2', 'Spending by time (day-by-day, current month), for [categories dropdown]', data);
	else _chart2.setSeries(data);
}


function load (force) {
	let date = Calendar.get('YYYY-MM');
	// don't reload if month the same
	if (!lastLoadDate || lastLoadDate !== date || force === true) {
		lastLoadDate = date;
		Data.spendingByCategory({ date }).then(chart0);
		Data.incomeVsExpenses({ year: Calendar.get('YYYY') }).then(chart1);
		Data.spendingByDay({ date }).then(chart2);
	}

}

function init () {
	$.on('calendar/changed', load);
	load();
}

export default {
	init
};
