var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var mongoose = require('mongoose');
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var scheduler = require('node-schedule');
var socketIO = require('socket.io');


// API routes
var app = express();
var port = 3010;

//REST specific stuff
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//JSX compiling throught webpack and hot reloading
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

//React static injection
app.use(express.static('./dist'));

// Import DB Models and controllers
var playersModel     = require('../models/player')(app, mongoose);
var matchesModel     = require('../models/LunchGroup')(app, mongoose);
var PlayerCtrl = require('../dbcontrollers/foosball_controller');

//DATABASE connection
mongoose.connect('mongodb://localhost/SocialLunch', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  //The server only listens if the DB connection succeeded
  var server = app.listen(port, function(error) {
    if (error) throw error;
    console.log("Express server listening on port", port);
  });

  //Web socket configuration
  var io = socketIO(server);
  io.on('connection', function (socket) {
    console.log('New client connected to IO!');
  });

  //Routes
  app.use('/app', function (req, res) {
      res.sendFile(path.resolve('client/index.html'));
  });

  var players = express.Router();
  var matches = express.Router();

  players.route('/players')
    .get(PlayerCtrl.findAllTodayPlayers)
    .delete((req, res) => {
      PlayerCtrl.deletePlayer(req, res);
      io.sockets.emit('update');
    })
    .post((req, res) => {
      PlayerCtrl.addPlayer(req, res);
      io.sockets.emit('update');
    });
  app.use('/api', players);

  matches.route('/matches')
    .get(PlayerCtrl.findAllTodayMatches)
  app.use('/api', matches);

  //CRON like jobs
  var j = scheduler.scheduleJob('0 03 15 * * 5', function(){
    console.log('Scheduled job: ' + new Date());
    PlayerCtrl.generateMatches();
    io.sockets.emit('update');
  });
});
