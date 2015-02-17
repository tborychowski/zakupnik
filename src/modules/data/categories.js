import $ from 'util';

function _get () {
	return $.ajax('categories');
}

export default {
	get: _get
};
