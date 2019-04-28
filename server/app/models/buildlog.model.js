function BuildLog(id, date, name, env, command, output) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.env = env;
    this.command = command;
    this.output = output; 
}

module.exports = BuildLog;
