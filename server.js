var fs = require('fs');
var http = require('http');
var https = require('https');
var options = {
    key: fs.readFileSync('./api-key.key', 'utf8'),
    cert: fs.readFileSync('./api-cert.crt', 'utf8'),
    ca: [
        fs.readFileSync('./ca.crt', 'utf8'),
    ],
    ciphers: [
        "ECDHE-RSA-AES256-SHA384",
        "DHE-RSA-AES256-SHA384",
        "ECDHE-RSA-AES256-SHA256",
        "DHE-RSA-AES256-SHA256",
        "ECDHE-RSA-AES128-SHA256",
        "DHE-RSA-AES128-SHA256",
        "HIGH",
        "!aNULL",
        "!eNULL",
        "!EXPORT",
        "!DES",
        "!RC4",
        "!MD5",
        "!PSK",
        "!SRP",
        "!CAMELLIA"
    ].join(':'),
    honorCipherOrder: true
};

var express = require('express');
var app = express();

var mock = {
    'status': true,
    'new_user': true,
};

app.post('/', function(req, res){
  console.log(req.body);
  res.send(mock);
});

var port = 8000;
https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});
