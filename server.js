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
        "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256",
        "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384",
        "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
        "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
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

var port = 443;
https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});
