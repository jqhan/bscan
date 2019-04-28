Vue.component('route-statistics', {
    data() {
        return {
            buildLogs: [],
        }
    },
    methods: {
        renderChart(id, chartData, chartLabels, chartType, headerText) {
            var ctx = $('#' + id);
            console.log("hmm");
            console.log(ctx);
            var buildTimeLineChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: headerText,
                        backgroundColor: 'rgba(175, 221, 130, 1)',
                        data: chartData,
                    }]
                },
                options: {
                    responsive: true,
                }
            });
        }
    },
    mounted() {
        fetch('/api/weeklyChartDataCombinedAverage')
            .then(res => res.json())
            .then(obj => {
                const weeklyChart = obj.data;
                this.renderChart('combinedAverageLineChart',
                    weeklyChart.data,
                    weeklyChart.labels,
                    'line',
                    "This week's average build times in total");
            });
        fetch('/api/weeklyChartDataIndividualAverage')
            .then(res => res.json())
            .then(obj => {
                const weeklyChart = obj.data;
                console.log(weeklyChart);
                this.renderChart('individualAverageBarChart',
                    weeklyChart.data,
                    weeklyChart.labels,
                    'bar',
                    "This week's average build times for users");
            });
    },
    template: `
	<div class="container">
   		<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  		<ol class="carousel-indicators">
    	<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
		<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
		<canvas class="d-block w-100" id="combinedAverageLineChart"></canvas>
    </div>
    <div class="carousel-item">
		<canvas class="d-block w-100" id="individualAverageBarChart"></canvas>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> 



	</div>
	`

});
