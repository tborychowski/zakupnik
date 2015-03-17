import $ from 'util';
import Chart from 'chart.js';
// Chart.defaults.global.responsive = true;

var options = {
		segmentShowStroke: false,
		// percentageInnerCutout: 50,
		animateRotate: true,
		animateScale: false,
		tooltipTemplate: '<%=label%> €<%= value %>',
		legendTemplate: '<%for(var i=0;i<segments.length;i++){%>' +
			'<li><span class="sq" style="background-color:<%=segments[i].fillColor%>"></span>' +
			'<%=segments[i].label%>' +
			'<span class="val">€<%=segments[i].value%></span></li><%}%>>'
	},
	isReady = false,
	isInitialised = false,
	ctx, chart, legend;



function init () {
	if (isInitialised) return;
	var el = $('.chart0');
	legend = el.find('.legend');
	ctx = el.find('.chart-container')[0].getContext('2d');
	isInitialised = true;
}

function addLegendEvents (legendNode, index) {
	$(legendNode).on('mouseover', function () {
		var activeSegment = chart.segments[index];
		activeSegment.save();
		activeSegment.fillColor = activeSegment.highlightColor;
		chart.showTooltip([activeSegment]);
		activeSegment.restore();
	});
	$(legendNode).on('mouseout', function () {
		chart.draw();
	});
}


export default function (data) {
	if (!isInitialised) init();

	var _data = $.addColors(data);
	if (!isReady) {
		chart = new Chart(ctx).Pie(_data, options);
		legend.html(chart.generateLegend());
		$.each(legend.find('li'), addLegendEvents);
		isReady = true;
	}
	else {
		if (!_data.length && chart.segments.length) {
			chart.destroy();
			legend.html('<span class="no-data">No data</span>');
			isReady = false;
		}
		else {
			chart.update(_data);
			legend.html(chart.generateLegend());
		}
	}
}
