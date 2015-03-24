import $ from 'util';

var _clone = function (o) { return JSON.parse(JSON.stringify(o)); },

	_options = {
		chart: { renderTo: '', type: '', backgroundColor: null, spacing: [20, 10, 10, 10] },
		title: { align: 'left', style: { color: '#eee' }, text: '' },
		colors: $.colors,
		credits: { enabled: false },
		tooltip: {
			hideDelay: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			style: { color: '#F0F0F0' },
			valuePrefix: '€'
		},
		legend: {
			verticalAlign: 'top',
			align: 'left',
			x: 0,
			y: 30,
			itemStyle: { color: '#ccc' },
			itemHoverStyle: { color: '#fff' },
			itemHiddenStyle: { color: '#888' }
		},
		plotOptions: {}
	},

	_xAxis = { labels: { style: { color: '#ccc' }} },

	_yAxis = {
		title: { text: null },
		labels: {
			style: { color: '#ccc' },
			formatter: function () { return '€' + this.value; }
		},
		showFirstLabel: false,
		min: 0,
		tickPixelInterval: 50,
		gridLineColor: '#444'
	};



export default function (type, containerId, title, data) {
	var chart = 'Chart';
	var options = _clone(_options);
	options.chart.renderTo = containerId;
	options.title.text = title;
	if (data) options.series = [data];

	if (type === 'pie') {
		options.chart.type = type;
		options.legend.layout = 'vertical';
		options.legend.align = 'left';
		options.tooltip.headerFormat = '<span style="font-size: 10px">Expenses</span><br/>';
		options.tooltip.pointFormatter = function () {
			return '<span style="color: ' + this.color + '">●</span> ' + this.name + ': €' + this.y;
		};
		options.plotOptions.pie = {
			borderWidth: 0,
			showInLegend: true,
			allowPointSelect: false,
			dataLabels: { enabled: false }
		};
	}

	else if (type === 'line') {
		if (data) options.series = data;
		options.chart.type = type;
		options.tooltip.crosshairs = true;
		options.tooltip.shared = true;
		options.legend.align = 'right';
		options.yAxis = _clone(_yAxis);
		options.xAxis = _clone(_xAxis);
		options.xAxis.categories = $.months;
	}

	else if (type === 'stock') {
		chart = 'StockChart';
		options.rangeSelector = { enabled: false };
		options.tooltip.xDateFormat = '%a, %e %b %Y';
		options.xAxis = _clone(_xAxis);
		options.yAxis = _clone(_yAxis);
	}
	return new window.Highcharts[chart](options);
}
