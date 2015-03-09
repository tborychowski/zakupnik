import $ from 'util';

const _url = 'categories';

export default {
	get: () => $.get(_url),
	getTree: () => $.get('categorytree'),
	save: (params) => {
		if (!params.id) delete params.id;
		return $.post(_url + (params.id ? '/' + params.id : ''), params);
	},
	del: (params) => $.del(_url + '/' + params.id)
};
