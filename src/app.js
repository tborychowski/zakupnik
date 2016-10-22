import calendar from 'calendar';
calendar.init();


import menu from 'menu';
menu.init();


import router from 'router';
router({
	default: 'expenses',
	handler: menu.goto
});


import toaster from 'toaster';
console.log(toaster);
