import Data from 'data/categories';


function init () {
	Data.get()
		.then(function (data) {
			console.log(data);
		})
		.catch(function (e) {
			console.error('ERROR:', e);
		});
}

export default {
	init
};
