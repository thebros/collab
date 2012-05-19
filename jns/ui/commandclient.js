
var options = {
   host: 'localhost',
   port: 9913,
   path: '/command',
   method: 'POST'
};

var http = require('http');

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.setHeader('Transfer-Encoding','chunked');
req.setHeader('content-type','application/json');

// write data to request body
req.write(JSON.stringify({src: "version"}));
//req.write('data\n');
req.end();

