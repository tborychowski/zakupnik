import $ from 'util';

var isReady = false,
	chart,
	options = {
		chart: { renderTo: 'chart2', backgroundColor: null },
		title: { align: 'left', style: { color: '#eee' },
			text: 'Spending by time (day-by-day, current month), for [categories dropdown]'
		},
		colors: $.colors,
		credits: { enabled: false },
		rangeSelector: { enabled: false },
		yAxis: {
			title: { text: null },
			labels: {
				style: { color: '#ccc' },
				formatter: function () { return '€' + this.value; }
			},
			showFirstLabel: false,
			min: 0,
			tickPixelInterval: 50,
			gridLineColor: '#444'
		},
		xAxis: {
			labels: { style: { color: '#ccc' }}
		},
		tooltip: {
			hideDelay: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			style: { color: '#F0F0F0' },
			valuePrefix: '€'
		},
		legend: {
			align: 'left',
			verticalAlign: 'top',
			layout: 'vertical',
			x: 0,
			y: 30,
			itemStyle: { color: '#ccc' },
			itemHoverStyle: { color: '#fff' },
			itemHiddenStyle: { color: '#888' }
		}
	};


export default function (data) {
	if (!isReady) {
		options.series = [data];
		chart = new window.Highcharts.StockChart(options);
		isReady = true;
	}
	else chart.series[0].setData(data);
}
