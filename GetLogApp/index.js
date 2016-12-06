var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var server = require('http').Server(app);
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating

require('./app/routes.js')(app);

var server = http.createServer(app).listen(port, function() {
    console.log("Server listening on port " + port);
});

function getData(mac, callback) {
  data: http.get({
      host: 'http://104.131.38.163',
      path: '/jmonitor/' + req.params.mac + "/system.log_" + req.params.mac
  }, function(response) {
      // Continuously update stream with data
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {

          // Data reception is done, do whatever with it!
          var parsed = JSON.parse(body);
          callback({
              email: parsed.email,
              password: parsed.pass
          });
      });
  });
}
