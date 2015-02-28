import $ from 'util';

function _get () {
	return $.ajax('categories');
}

function getTree () {
	return $.ajax('categorytree');
}

export default {
	get: _get, getTree
};
