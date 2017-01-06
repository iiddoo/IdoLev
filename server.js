var express = require('express');
var bodyParser = require('body-parser');

process.on('uncaughtException', function (err) {
    console.dir(err);
});

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var path = require('path');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(4444);

console.log('listening on port: 4444');

