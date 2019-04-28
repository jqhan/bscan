Vue.component('route-buildLog', {
    data() {
        return {
            buildLogID: this.$route.params.buildLogID,
            buildLog: null,
            selectedBuildLog: null,
            buildLogs: []
        }
    },
    methods: {
        buildLogName(log) {
            return log.command.split(' ')[0] + "-" +
                log.user + "-" + log.date;
        },
        prettyJSON(json) {
            var prettyString = JSON.stringify(json).replace(/"|{|}/g, '').replace(/:/, ': ');
            return prettyString;
        },
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
                this.buildLog = data.log;
            });
        fetch('/api/buildLogs')
            .then(res => res.json())
            .then(data => {
                this.buildLogs = data.logs;
            });
    },
    template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <section class="col-md-10 col-md-offset-1" v-if="buildLog !== null">
            <h3> {{ buildLogName(buildLog) }}</h3>
            <div v-html="getExitCodeText()"></div>
            <br />
            <b>Command:</b> {{ buildLog.command }}
            <br />
            <b>Output:</b> {{ buildLog.output }}
            <br />
            <b>Environment:</b>
            <div v-for="e in buildLog.env" >
                {{ prettyJSON(e) }}
                <br />       
            </div> 
            <b>Dependencies:</b>
            <div v-for="e in buildLog.dependencies" >
                {{ prettyJSON(e) }}
                <br />       
            </div> 
          </section>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="sel1">
              Compare with another build log:
            </label>
            <select v-model="selectedBuildLog" class="form-control" v-if="buildLogs !== null">
              <option v-for="log in buildLogs" v-bind:value="log">
                {{ buildLogName(log) }}
              </option>
            </select> 
            <section class="col-md-10 col-md-offset-1" v-if="selectedBuildLog != null">
              <h3>{{ buildLogName(selectedBuildLog) }}</h3>
              <div v-html="getExitCodeText()"></div>
              <br />
              <b>Command:</b> {{ selectedBuildLog.command }}
              <br />
              <b>Output:</b> {{ selectedBuildLog.output }}
              <br />
              <b>Environment:</b>
              <div v-for="e in selectedBuildLog.env" >
                  {{ prettyJSON(e) }}
                  <br />       
              </div> 
              <b>Dependencies:</b>
              <div v-for="e in selectedBuildLog.dependencies" >
                  {{ prettyJSON(e) }}
                  <br />       
              </div> 
            </section>
          </div>
        </div>
      </div> 
    </div>
	`
});
