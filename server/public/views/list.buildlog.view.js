Vue.component('route-buildLogList', {
    data() {
        return {
            buildLogs: [],
            dataTable: null
        }
    },
    methods: {
        redirect(id) {
            this.$router.push({
                path: `/buildLog/${id}`
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
    updated() {
        this.dataTable = $('#buildLogTable').DataTable({});

        $('.dataTables_length').addClass('bs-select');
        this.buildLogs.forEach(buildLog => {
			const buildLogName = buildLog.command.split(' ')[0] + 
							"-" + buildLog.user + "-" +
							buildLog.date;
            this.dataTable.row.add([
				'<a href="javascript:void(0)">' + buildLogName + '</a>',
                buildLog.id,
				buildLog.user,
				buildLog.date
            ]).draw(false);
        });
        var self = this;
        $("table").on("click", "tr", function(e) {
            var data = self.dataTable.row(this).data();
            self.redirect(data[1]);
        });
    },
    mounted() {},
    template: `
	<div class="container">
        <table id="buildLogTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%"> 
			<thead>
				<tr>
					<th class="th-sm">Log</th>
                    <th class="th-sm">ID</th>
					<th class="th-sm">User</th>
					<th class="th-sm">Date</th>
				</tr>
			</thead>
			<tbody v-for="buildLog in buildLogs" >
			</tbody>
		</table>	
	</div>
	`
});
