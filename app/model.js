/* jslint node: true */
"use strict";

const BuildLog = require('./models/buildlog.model');

const buildLogs = [];
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, 'buildlogs');

exports.readBuildLogs = () => {

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function(filename) {
            let rawdata = fs.readFileSync(directoryPath + "/" + filename);
            const buildLog = JSON.parse(rawdata);
            buildLogs.push(buildLog);
        });
    });
};


exports.getBuildLogs = () => buildLogs;

exports.findBuildLog = (id) => {
    return buildLogs.find(function(log) {
        return log.id == id;
    });
}

exports.generateNewId = () => {
    return new Promise(function(resolve, reject) {
        var maxId = -1;
        buildLogs.forEach(function(value, index) {
            if (parseInt(value.id, 10) > maxId) { maxId = parseInt(value.id, 10); }
        });
        var newId = parseInt(maxId, 10) + 1;
        resolve(newId);
    });
}

exports.addLog = (body) => {
    return new Promise(function(resolve, reject) {
        exports.generateNewId().then(function(value) {
                var log = JSON.parse(body);
                log['id'] = value.toString();
                fs.writeFile("app/buildlogs/" +
                        log.command.toString().split(' ')[0] +
                        "-" + (log.user).toString() + "-" +
                        value.toString() +
                        ".json", JSON.stringify(log), (err) => {
                    if (err) {
                        console.log(err);
                        reject(new Error("Write to log file failed"));
                    } else {
                        console.log("Successfully Written to File:  app/buildlogs/" +
                                log.command.toString().split(' ')[0] +
                                "-" + (log.user).toString() + "-" +
                                value.toString() + ".json");
                        resolve(value);
                        buildLogs.push(log);
                    }
                });
            })
            .catch(err => {
                console.error(err);
            });

    });
}

exports.getWeeklyChartDataCombinedAverage = () => {
    var data = [];
    var labels = [];
    var date = new Date();
    for (var i = 0; i < 7; i++) {
        var dateStr = date.toISOString().slice(0, 10);
        console.log(dateStr);
        data.push(this.getAverageBuildTimeByDate(dateStr));
        labels.push(dateStr);
        date.setDate(date.getDate() - 1);
    }
    // reverse for chronical order
    return {
        data: data.reverse(),
        labels: labels.reverse()
    };
}

exports.getWeeklyChartDataIndividualAverage = () => {
    var data = [];
    var labels = [];
    var date = new Date();
    var users = new Set();
    buildLogs.forEach(function(log) {
        users.add(log.user);
    });
    var self = this; // Context is different in forEach anon func
    users.forEach(function(user) {
        console.log(user);
        var avg = self.getAverageBuildTimeByUser(user);
        data.push(avg);
        labels.push(user);
    });
    return {
        data: data,
        labels: labels
    };
}

exports.getAverageBuildTimeByUser = (user) => {
    var timeSum = 0;
    var amountOfLogsOnThatDate = 0;
    buildLogs.forEach(function(log) {
        if (log.succeeded === true) {
            // YYYY-MM-DD = 10 characters
            if (log.user === user) {
                timeSum += log.time;
                amountOfLogsOnThatDate += 1;
            }
        }
    });
    if (amountOfLogsOnThatDate == 0) {
        return 0;
    }
    return timeSum / amountOfLogsOnThatDate;
}

exports.getAverageBuildTimeByDate = (date) => {
    var timeSum = 0;
    var amountOfLogsOnThatDate = 0;
    buildLogs.forEach(function(log) {
        if (log.succeeded === true) {
            // YYYY-MM-DD = 10 characters
            if (log.date.substring(0, 10) === date.substring(0, 10)) {
                timeSum += log.time;
                amountOfLogsOnThatDate += 1;
            }
        }
    });
    if (amountOfLogsOnThatDate == 0) {
        return 0;
    }
    return timeSum / amountOfLogsOnThatDate;
}
