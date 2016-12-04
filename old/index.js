var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var server = require('http').Server(app);
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//app.listen(port);
var server = http.createServer(app).listen(port, function() {
    console.log("Server listening on port " + port);
});

var osvers = [];
var jslast_checkin = [];
var url = 'http://localhost/data.php';
getData = function(stuff) {
    http.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {



            var callbackString = {};
            callbackString.os = osvers;
            callbackString.last = jslast_checkin;
            stuff(null, callbackString);
        });
    });
}
