var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var setup_controller = require('./controllers/setup_controller');
var api_controller = require('./controllers/api_controller');

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
setup_controller(app);
api_controller(app);

app.listen(port);