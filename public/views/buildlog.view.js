Vue.component('route-buildLog', {
    data() {
        return {
            buildLogID: this.$route.params.buildLogID,
            buildLog: null
        }
    },
    methods: {
        getExitCodeText() {
            if (this.buildLog.succeeded === true) {
                return "<font color=\"green\">Successful build.</font>";
            } else {
                return "<font color=\"red\">Failed build.</font>";
            }
        }
    },
    created() {
        fetch(`/api/buildLog/${this.buildLogID}`)
            .then(res => res.json())
            .then(data => {
                console.log( "data from buildLog fetch:");
                console.log(data);
                this.buildLog = data.log;
            });
    },
    template: `
    <div class="container">
        <section class="col-md-10 col-md-offset-1">
            <h1>{{ buildLog.name }} {{ buildLog.date }}</h1>
            <div v-html="getExitCodeText()"></div>
            <br />
            Command: {{buildLog.command}}
            <br />
            Output: {{buildLog.output}}
            <br />
            Environment:
            <div v-for="e in buildLog.env" >
                {{e}}
                <br />       
            </div> 
        </section>
    </div>
	`
});
