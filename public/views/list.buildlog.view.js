
Vue.component('route-buildLogList', {
	data() {
		return { 
			buildLogs: []
		}
	},
	methods: {
		redirect(buildLog) {
			this.$router.push({
				path: `/buildLog/${buildLog.id}`
			});
		}
	},
	created() {
		fetch('/api/buildLogs')
			.then(res => res.json())
			.then(data => {
                console.log("result from /api/buildLogs:");
                console.log(data);
				this.buildLogs = data.logs;
			})
	},
	template: `
	<div class="container">
		<section class="col-md-10 col-md-offset-1">
			<div class="row" style="text-align: center;">
				<h1>Build logs</h1>
			</div>

			<div>
				<div class="well" v-for="buildLog in buildLogs" > 
					<div style="text-align: center;"  >
						<h4>
						<span v-on:click="redirect(buildLog)">
                            <a>{{ buildLog.name }}{{ buildLog.date }}</a>
                        </span>
						</h4>
					</div>
				</div>
			</div>
		</section>
	</div>
	`
});
