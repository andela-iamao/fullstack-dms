const express = require('express');

const app = express();
app.use(express.static('static'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('App started on port 3000');
})