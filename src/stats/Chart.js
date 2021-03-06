import $ from 'util';

const _clone = o => JSON.parse(JSON.stringify(o));

const _options = {
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
		itemMarginBottom: 5,
		itemStyle: { color: '#ccc', fontWeight: 'normal', fontSize: 13 },
		itemHoverStyle: { color: '#fff' },
		itemHiddenStyle: { color: '#888' }
	},
	plotOptions: {}
};
const _xAxis = { labels: { style: { color: '#ccc' } } };
const _yAxis = {
	title: { text: null },
	labels: {
		style: { color: '#ccc' },
		formatter: function () { return '€' + $.formatNumber(this.value); }
	},
	showFirstLabel: false,
	min: 0,
	tickPixelInterval: 50,
	gridLineColor: '#444'
};



function Chart (type, containerId, title, data) {
	window.Highcharts.setOptions({ lang: { thousandsSep: ',' } });

	let chart = 'Chart';
	const options = _clone(_options);
	options.chart.renderTo = containerId;
	options.title.text = title;
	if (data) options.series = [data];

	if (type === 'pie') {
		options.chart.type = type;
		options.legend.layout = 'vertical';
		options.legend.align = 'left';
		options.tooltip.headerFormat = '<span style="font-size: 10px">Expenses</span><br/>';
		options.tooltip.pointFormatter = function () {
			const val = '€' + $.formatNumber(this.y);
			return `<span style="color: ${this.color}">●</span> ${this.name}: ${val}`;
		};
		options.plotOptions.pie = {
			borderWidth: 0,
			innerSize: '50%',
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
		options.tooltip.formatter = function () {
			let html = this.x + '<br>';
			const sum = '€' + $.formatNumber(this.points[0].y - this.points[1].y);
			for (let point of this.points) {
				const y = '€' + $.formatNumber(point.y);
				html += `<span style="color: ${point.series.color}">●</span> ${point.series.name} ${y}<br>`;
			}
			html += `<span style="color: green">●</span> savings: ${sum}<br>`;
			return html;
		};

		options.legend.align = 'right';
		options.yAxis = _clone(_yAxis);
		options.xAxis = _clone(_xAxis);
		options.xAxis.categories = $.months;

		const m = (new Date()).getMonth() - 0.5;
		options.xAxis.plotBands = [{ id: 'm', from: m, to: m + 1, color: 'rgba(80,80,80,0.3)' }];
	}

	else if (type === 'stock') {
		chart = 'StockChart';
		options.rangeSelector = { enabled: false };
		options.tooltip.xDateFormat = '%a, %e %b %Y';
		options.tooltip.pointFormatter = function () {
			const val = '€' + $.formatNumber(this.y);
			return `<span style="color: ${this.color}">●</span> ${this.series.name}: ${val}`;
		};
		options.xAxis = _clone(_xAxis);
		options.yAxis = _clone(_yAxis);
	}
	return new window.Highcharts[chart](options);
}


export default Chart;
