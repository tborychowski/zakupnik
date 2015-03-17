import $ from 'util';
import Chart from 'chart.js';
import Calendar from 'calendar';
import Data from 'data/charts';
// Chart.defaults.global.responsive = true;

var pieOptions = {
		segmentShowStroke: false,
		percentageInnerCutout: 50,
		animateRotate: true,
		animateScale: false,
		tooltipTemplate: '<%=label%> €<%= value %>',
		legendTemplate: '<ul class="pie-legend"><%for(var i=0;i<segments.length;i++){%>' +
			'<li><span class="sq" style="background-color:<%=segments[i].fillColor%>"></span>' +
			'<%=segments[i].label%>' +
			'<span class="val">€<%=segments[i].value%></span></li><%}%></ul>'
	},
	charts = [
		{ el: null, canvas: null, ctx: null, chart: null, options: pieOptions },
		{ el: null, canvas: null, ctx: null, chart: null, options: {}},
		{ el: null, canvas: null, ctx: null, chart: null, options: {}}
	],
	el;


function chart0 (data) {
	var chart = charts[0], _data = $.addColors(data);
	if (!chart.isReady) {
		chart.chart = new Chart(chart.ctx).Pie(_data, chart.options);
		chart.legend.html(chart.chart.generateLegend());

		$.each(chart.legend.find('li'), function (legendNode, index) {
			$(legendNode).on('mouseover', function () {
				var activeSegment = chart.chart.segments[index];
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				chart.chart.showTooltip([activeSegment]);
				activeSegment.restore();
			});
		});
		chart.legend.on('mouseout', function () { chart.chart.draw(); });
		chart.isReady = true;
	}
	else chart.chart.update(_data);
}

function loadData () {
	Data.spendingByCategory({ date: Calendar.get('YYYY-MM') }).then(chart0);

}

function init () {
	el = $('#stats');
	charts.forEach(function (ch, i) {
		ch.el = el.find('.chart' + i);
		ch.legend = ch.el.find('.legend');
		ch.canvas = ch.el.find('.chart-container');
		ch.ctx = ch.canvas[0].getContext('2d');
	});
	loadData();
}

export default {
	init
};
