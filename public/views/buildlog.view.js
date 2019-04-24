Vue.component('route-booking', {
    data() {
        return {
            buildLogID: this.$route.params.buildLogID,
            buildLog: null
        }
    },
    methods: {
    },
    created() {
        fetch(`/api/buildLog/${this.buildLogID}`)
            .then(res => res.json())
            .then(data => {
                this.buildLog = data.log;
            });
    },
    template: `
    <div class="container">
        <section class="col-md-10 col-md-offset-1">
            Log ID: {{ buildLog.id }}
        </section>
    </div>
	`
});
