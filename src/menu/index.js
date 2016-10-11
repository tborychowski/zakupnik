import $ from 'util';
import expenses from 'expenses';
import income from 'income';
import stats from 'stats';
import categories from 'categories';


const modules = {expenses, income, stats, categories};
let el, items, contents, selected;

function onChange () {
	var hash = location.hash.substr(1);

	if (hash) selected = items.filter('[href="#' + hash + '"]');
	else selected = items.first();
	change(selected);
}

function change (item) {
	var id = item[0].hash.substr(1), content = $('#' + id);

	items.removeClass('visible active');
	item.addClass('active');

	contents.removeClass('visible active');
	content.addClass('visible');
	setTimeout(function () { content.addClass('active'); }, 100);

	// initialise module
	if (modules[id]) modules[id].init();
}


function init () {
	el = $('#menu');
	items = el.find('.fa');
	contents = $('#content .section');
	window.addEventListener('hashchange', onChange);
	onChange();
}

export default {
	init
};
