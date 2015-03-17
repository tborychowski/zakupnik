import $ from 'util';
import Chart from 'chart.js';
// Chart.defaults.global.responsive = true;

var isReady = false,
	isInitialised = false,
	ctx, chart,
	options = {
		bezierCurve: false,
		scaleFontColor: '#bbb',
		scaleLineColor: 'rgba(255,255,255,.1)',
		scaleGridLineColor: 'rgba(255,255,255,.05)',
		scaleLabel: '<%=value>0?"€"+parseFloat(value)/1000+"k":"0"%>',
		multiTooltipTemplate: '<%=datasetLabel%>: €<%= value %>'
	},
	chartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Income',
				fillColor: 'rgba(220,220,220,0.4)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: []
			},
			{
				label: 'Expenses',
				fillColor: 'rgba(151,187,205,0.4)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(151,187,205,1)',
				data: []
			}
		]
	};


function init () {
	if (isInitialised) return;
	var el = $('.chart1');
	ctx = el.find('.chart-container')[0].getContext('2d');
	isInitialised = true;
}


export default function (data = {}) {
	if (!isInitialised) init();

	chartData.datasets[0].data = data.income || [];
	chartData.datasets[1].data = data.expenses || [];

	if (!isReady) {
		chart = new Chart(ctx).Line(chartData, options);
		isReady = true;
	}
	else {
		if (!data.datasets.length && chart) {
			chart.destroy();
			chart = null;
			isReady = false;
		}
		else chart.update(data);
	}
}
