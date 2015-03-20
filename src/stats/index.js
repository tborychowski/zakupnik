import $ from 'util';
import Calendar from 'calendar';
import Data from 'data/stats';
import chart0 from './chart0';
import chart1 from './chart1';
import chart2 from './chart2';


var lastLoadDate;

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
