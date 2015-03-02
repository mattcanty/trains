var express = require('express')
var stylus = require('stylus')
var nib = require('nib')
var morgan = require('morgan')
var nationalRailClient = require('./national_rail/nationalRailSoapClient')
var stations = require('./stations/stations')

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(stylus.middleware({ 
  src: __dirname + '/public', 
  compile: compile
}))

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.send('Hello world!');
})

app.get('/departures/:stationCode', function(req, res){
  nationalRailClient.getDepartureBoard(req.param('stationCode'), 10, function(err, result){
    res.render('index', result);
  })
})

app.get('/stations/search/:query', function(req, res){
  stations.findMatches(req.param('query'), function(err, result){
    res.send(result)
  })
})

app.listen(process.env.PORT, process.env.IP)