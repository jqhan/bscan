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
