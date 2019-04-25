/* jslint node: true */
"use strict";

const BuildLog = require('./models/buildlog.model');

const buildLogs = [];


exports.readBuildLogs = () => {

	const path = require('path');
	const fs = require('fs');
	const directoryPath = path.join(__dirname, 'buildlogs');

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		files.forEach(function (filename) {
            let rawdata = fs.readFileSync(directoryPath + "/" + filename); 
		    const buildLog = JSON.parse(rawdata);  
            buildLogs.push(buildLog);
			console.log(buildLog.id); 
		});
	});
};


exports.getBuildLogs = () => buildLogs;

exports.findBuildLog = (id) => {
   return buildLogs.find(function(log) {
         return log.id == id;
   });
}

exports.getWeeklyChartData = () => {
    var data = [];
    var labels = [];
    var date = new Date();
    for (var i=0; i<7; i++) {
        var dateStr = date.toISOString().slice(0,10);
        console.log(dateStr);
        data.push(this.getAverageBuildTime(dateStr));
        labels.push(dateStr);
        date.setDate(date.getDate() - 1);
    }
    // reverse for chronical order
    return {data: data.reverse(), labels: labels.reverse()};
}

exports.getAverageBuildTime = (date) => {
    var timeSum = 0;
    var amountOfLogsOnThatDate = 0;
    buildLogs.forEach(function(log) {
        // YYYY-MM-DD = 10 characters
        if (log.date.substring(0,10) == date.substring(0,10)) {
            timeSum += log.time;
            amountOfLogsOnThatDate += 1;
        }
    });
    if (amountOfLogsOnThatDate == 0) {
        console.log("LOGS DATE = 0");
        return 0;
    }
    return timeSum / amountOfLogsOnThatDate;
}
