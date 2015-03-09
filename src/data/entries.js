import $ from 'util';

const _url = 'entries';


export default {
	get: (params) => {
		let id = (typeof params === 'number' ? params : null);
		return $.get(_url + (id ? '/' + id : ''), params || {});
	},

	save: (params) => {
		if (params.length === 1 && params[0].id) params = params[0]; // updating
		return $.post(_url + (params.id ? '/' + params.id : ''), params);
	},

	del: (id) => $.del(_url + '/' + id)
};
