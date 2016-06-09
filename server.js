var fs = require('fs');
var http = require('http');
var https = require('https');
var constants = require('constants');
var apn = require('apn');
var bodyparser = require('body-parser');

var options = {
    key: fs.readFileSync('./ssl-cert/api-key.key', 'utf8'),
    cert: fs.readFileSync('./ssl-cert/api-cert.crt', 'utf8'),
    ca: [
            fs.readFileSync('./ssl-cert/ca.crt', 'utf8'),
        ],
    secureProtocol: 'TLSv1_2_method',
    secureOptions: constants.SSL_OP_NO_SSLv3,
    honorCipherOrder: true
};

var express = require('express');
var app = express();
app.use(bodyparser.JSON());

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
