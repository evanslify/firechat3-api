var https = require('https');
var fs = require('fs');

var hskey = fs.readFileSync('api-key.pem');
var hscert = fs.readFileSync('api-cert.pem');

var options = {
    key: hskey,
    cert: hscert
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Hi from HTTPS");
}).listen(8000);
