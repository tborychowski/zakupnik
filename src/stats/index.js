import $ from 'util';
import Calendar from 'calendar';
import Data from './data';
import Chart from './Chart';

let lastLoadDate, _chart0, _chart1, _chart2, isReady = false;

function chart0 (data) {
	if (!_chart0) _chart0 = Chart('pie', 'chart0', 'Spending by category (this month)', data);
	else {
		_chart0.series[0].remove();
		_chart0.addSeries(data);
	}
}

function chart1 (data) {
	if (!_chart1) _chart1 = Chart('line', 'chart1', 'Income vs Expenses (this year)', data);
	else {
		_chart1.xAxis[0].removePlotBand('m');
		const m = +Calendar.get('M') - 1.5;
		_chart1.xAxis[0].addPlotBand({ id: 'm', from: m, to: m + 1, color: 'rgba(80,80,80,0.3)' });
	}
}

function chart2 (data) {
	if (!_chart2) _chart2 = Chart('stock', 'chart2', 'Spending by time (day-by-day, current month), for [categories dropdown]', data);
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
	if (!isReady) {
		$.on('calendar/changed', load);
		load();
		isReady = true;
	}
}

export default {
	init
};
