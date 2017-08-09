var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    dishes = require('./dishRouter');
    promotions = require('./promoRouter'),
    leadership = require('./leaderRouter');
    
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use('/dishes', dishes);
app.use('/promotions', promotions);
app.use('/leadership', leadership);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});