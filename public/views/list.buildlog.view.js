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
    updated() {
        console.log($('#buildLogTable'));
        $('#buildLogTable').DataTable({
            "ordering": true
        });
        $('.dataTables_length').addClass('bs-select');
        console.log(this);
    },
    mounted() {},
    template: `
	<div class="container">
        <table id="buildLogTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%"> 
			<thead>
				<tr>
					<th class="th-sm">Log</th>
					<th class="th-sm">User</th>
					<th class="th-sm">Date</th>
				</tr>
			</thead>
			<tbody v-for="buildLog in buildLogs">
				<tr>
					<td>{{buildLog.command.split(' ')[0]}}-{{buildLog.name}}-{{buildLog.date}}</td>
					<td>{{buildLog.name}}</td>
					<td>{{buildLog.date}}</td>
				</tr>
			</tbody>
		</table>	
	</div>
	`
});
