require('better-logging')(console);
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const express = require('express');
const http = require('http');

module.exports = () => {
    const app = express(); // Creates express app
    const httpServer = http.Server(app);

    // Set up express
    app.use((req, res, next) => {
        // Logs each incoming request
        console.info(`${console.color.Dark_Gray} ${req.ip} ${console.color.RESET} ${req.path} ${req.body || ''}`);
        next();
    });
    app.use(bodyParser.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, '..', '..', 'public')));

    return {
        app,
        listen: (port, cb) => httpServer.listen(port, cb)
    }
}
