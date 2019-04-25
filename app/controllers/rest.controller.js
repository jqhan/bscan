const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/buildLogs', function (req, res) {
  const buildLogs = model.getBuildLogs();
  res.json({ logs: buildLogs });
});

router.get('/weeklyChartData', function (req, res) {
  const chartData = model.getWeeklyChartData();
  res.json({ data: chartData });
});

router.get('/buildLog/:buildLogID', function (req, res) {
  console.log("API recieved:");
  console.log(req.params);
  const buildLog = model.findBuildLog(req.params.buildLogID);
  res.json({ log: buildLog });
});

module.exports = router;
