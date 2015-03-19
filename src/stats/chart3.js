import $ from 'util';

var isReady = false,
	chart,
	options = {
		chart: { renderTo: 'chart2', type: 'pie', backgroundColor: null },
		title: { align: 'left', style: { color: '#eee' },
			text: 'Spending by time (day-by-day, current month), for [categories dropdown]'
		},
		colors: $.colors,
		credits: { enabled: false },

		tooltip: { borderRadius: 0, hideDelay: 0, //borderWidth: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.9)', style: { color: '#F0F0F0' }
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
	data = data.map(function (item) { return [item.label, item.value]; });

	if (!isReady) {
		options.series = [{ data: data }];
		chart = new window.Highcharts.Chart(options);
		isReady = true;
	}
	else chart.series[0].setData(data);
}
