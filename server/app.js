const express = require('express');

const app = express();
app.use(express.static('static'));

require('./routes')(app);

module.exports = app;
