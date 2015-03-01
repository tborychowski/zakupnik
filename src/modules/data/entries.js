import $ from 'util';

const _url = 'entries';

function _get (id) {
	return $.ajax(_url + (id ? '/' + id : ''));
}

function save (params) {
	if (params.length === 1 && params[0].id) params = params[0]; // updating
	return $.ajax(_url + (params.id ? '/' + params.id : ''), params);
}

function del (params) {
	 return $.ajax({ url: _url + '/' + params.id, method: 'DELETE' });
}

export default {
	get: _get,
	save,
	del
};
