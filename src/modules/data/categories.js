import $ from 'util';

const _url = 'categories';


function getTree () {
	return $.ajax('categorytree');
}

function _get () {
	return $.ajax(_url);
}

function save (params) {
	if (!params.id) delete params.id;
	return $.ajax(_url + (params.id ? '/' + params.id : ''), params);
}

function del (params) {
	 return $.ajax({ url: _url + '/' + params.id, method: 'DELETE' });
}


export default {
	get: _get,
	getTree,
	save,
	del
};
