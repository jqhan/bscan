const setupBoilerplate = require('./boilerplate/setup');


const { app, listen } =  setupBoilerplate();
const port = 8989;

// Bind REST controller to /api/*
const router = require('./controllers/rest.controller.js');
app.use('/api', router);

// Demo calls to model
const model = require('./model.js');

listen(port, () => {
  console.log("server listening on port", port);
});
