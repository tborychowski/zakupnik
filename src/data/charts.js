import $ from 'util';

export default {
	spendingByCategory: (params) => {
		return $.get('spendingByCategory', params || {});
	},

	incomeVsExpenses: (params) => {
		return $.get('incomeVsExpenses', params || {});
	}

};
