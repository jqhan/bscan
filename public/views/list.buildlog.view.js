
Vue.component('route-list', {
	data() {
		return { 
			buildLogs: []
		}
	},
	methods: {
		redirect(buildLOg) {
			this.$router.push({
				path: `/buildLog/${buildLog.id}`
			});
		}
	},
	created() {
		fetch('/api/buildLogs')
			.then(res => res.json())
			.then(data => {
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
				<div class="well" v-for="buildLog in buildLogs"> 
					<div style="text-align: center;">
						<h4>
						<span>BuildLog: {{ buildLog.id }}</span>
						</h4>
						<div v-for="env_var in buildLog.environment">
							<div style="display:inline-block"> 
                                {{env_var.time}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	`
});
