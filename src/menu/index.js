import $ from 'util';
import expenses from 'expenses';
import income from 'income';
import stats from 'stats';
import categories from 'categories';


const modules = {expenses, income, stats, categories};
let el, items, contents;


function goto (route) {
	let item;

	if (route) item = items.filter(`[href="#${route}"]`);
	else item = items.first();


	const id = item[0].hash.substr(1);
	const content = $(`#${id}`);

	items.removeClass('active');
	item.addClass('active');

	contents.removeClass('visible active');
	content.addClass('visible');
	setTimeout(() => { content.addClass('active'); }, 100);

	// initialise module
	if (modules[id]) modules[id].init();
}


function init () {
	el = $('#menu');
	items = el.find('.fa');
	contents = $('#content .section');
}


export default {
	init,
	goto
};
