const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/buildLogs', function (req, res) {
  const buildLogs = model.getBuildLogs();
  res.json({ logs: buildLogs });
});

router.get('/weeklyChartDataCombinedAverage', function (req, res) {
  const chartData = model.getWeeklyChartDataCombinedAverage();
  res.json({ data: chartData });
});

router.get('/weeklyChartDataIndividualAverage', function (req, res) {
  const chartData = model.getWeeklyChartDataIndividualAverage();
  res.json({ data: chartData });
});

router.get('/buildLog/:buildLogID', function (req, res) {
  console.log("API recieved:");
  console.log(req.params);
  const buildLog = model.findBuildLog(req.params.buildLogID);
  res.json({ log: buildLog });
});

router.post('/buildLog/add', function (req, res) {
  console.log("API recieved:");
  model.addLog(JSON.stringify(req.body)).then(function (value) {
    console.log('value :', value);
    res.json({ url: 'http://localhost:8989/#/buildLog/' + value });
  })
  .catch(err => {
    if (err.length > 0) {
      
      res.status(500).send(err);
    } else {
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
