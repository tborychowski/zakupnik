import $ from 'util';

var isReady = false,
	chart,
	options = {
		chart: { renderTo: 'chart0', type: 'pie', backgroundColor: null },
		title: { align: 'left', style: { color: '#eee' },
			text: 'Spending by category (this month)'
		},
		colors: $.colors,
		credits: { enabled: false },

		tooltip: {
			hideDelay: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			style: { color: '#F0F0F0' },
			headerFormat: '<span style="font-size: 10px">Expenses</span><br/>',
			pointFormatter: function () {
				return '<span style="color: ' + this.color + '">●</span> ' +
					this.name + ': €' + this.y;
			}
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
		},
		plotOptions: {
			pie: { borderWidth: 0, showInLegend: true, allowPointSelect: false,
				dataLabels: { enabled: false }
			}
		}
	};


export default function (data) {
	if (!isReady) {
		options.series = [data];
		chart = new window.Highcharts.Chart(options);
		isReady = true;
	}
	else chart.series[0] = data;
}
