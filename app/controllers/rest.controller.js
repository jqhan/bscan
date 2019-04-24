const model = require("../model.js");
const express = require('express');
const router = express.Router();

router.get('/buildLogs', function (req, res) {
  const buildLogs = model.getBuildLogs();
  res.json({ logs: buildLogs });
});

router.get('/buildLog/:buildLogID', function (req, res) {
  const buildLog = model.findBuildLog(req.params.buildLogID);
  res.json({ log: buildLog });
});

module.exports = router;
