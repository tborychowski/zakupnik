import $ from 'util';

var isReady = false,
	chart,
	options = {
		chart: { renderTo: 'chart1', type: 'line', backgroundColor: null },
		title: { align: 'left', style: { color: '#eee' },
			text: 'Income vs Expenses (this year)'
		},
		colors: $.colors,
		credits: { enabled: false },
		yAxis: {
			title: { text: null },
			labels: { style: { color: '#ccc' }},
			showFirstLabel: false,
			min: 0,
			gridLineColor: '#444'
		},
		xAxis: {
			labels: { style: { color: '#ccc' }},
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			style: { color: '#F0F0F0' },
			crosshairs: true,
			shared: true,
			hideDelay: 0,
			valuePrefix: '€'
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			x: 0,
			y: 30,
			itemStyle: { color: '#ccc' },
			itemHoverStyle: { color: '#fff' },
			itemHiddenStyle: { color: '#888' }
		}
	};


export default function (data) {
	if (!isReady) {
		options.series = data;
		chart = new window.Highcharts.Chart(options);
		isReady = true;
	}
	else chart.setSeries(data);
}
