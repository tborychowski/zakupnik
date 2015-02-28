import $ from 'util';

function _get () {
	return $.ajax('entries');
}

export default {
	get: _get
};
