import $ from '../util';
const tpl = require('./toast.html');


function initToaster () {
	return $('<div id="toaster"></div>').appendTo('body').on('click', onClick);
}

function getToaster () {
	let toaster = $('#toaster');
	return toaster.length ? toaster : initToaster();
}

function onClick (e) {
	let target = $(e.target);
	if (!target.is('.toast')) target = target.closest('.toast');
	if (target.length) dismissToast(target, 0);
}

function showToast (toast) {
	setTimeout(() => { toast.addClass('visible'); }, 100);
}

function dismissToast (toast, delay = 3000) {
	return setTimeout(() => {
		toast.addClass('hiding');
		setTimeout(() => { toast.remove(); }, 500);
	}, delay);
}



function Toaster (msg = '') {
	if (!msg) return;
	if (typeof msg === 'string') msg = { message: msg, type: 'success' };

	const toaster = getToaster();
	const toast = $(tpl(msg));

	toaster.append(toast);
	showToast(toast);
	dismissToast(toast);
}

Toaster.error = function (msg) {
	return Toaster({ type: 'error', message: msg });
};

Toaster.warning = function (msg) {
	return Toaster({ type: 'warning', message: msg });
};

Toaster.success = function (msg) {
	return Toaster({ type: 'success', message: msg });
};

export default Toaster;
