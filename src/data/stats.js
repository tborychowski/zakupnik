import $ from 'util';

export default {
	spendingByCategory: params => $.get('spendingByCategory', params || {}),

	incomeVsExpenses: params => $.get('incomeVsExpenses', params || {}),

	spendingByDay: params => $.get('spendingByDay', params || {})

};
