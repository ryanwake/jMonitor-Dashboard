var http = require('http');
var fs = require('fs');
var request2 = require('request');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.sendFile('index.html'); // load the index.ejs file
    });

    app.get('/getLog/:id', function(req, res) {
        res.render("logs.ejs", {
            data: req.params.id
        });
    })

}
