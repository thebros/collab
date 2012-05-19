
(function() {

	var express = require('express');

	// call with 'new'!
	exports.Server = function(portno,handler,logmessage) {

		if (this==global) {
			throw new Error("commandserver.Server must be called with 'new'")
		}
		
		this.portno = portno;
		this.handler = handler;
		this.logmessage = logmessage;
		
		var that = this;
		
		this.httpserver = express.createServer();
		this.httpserver.use(express.bodyParser());	
		
		this.httpserver.post('/command',function(req,res) {
			var result;
			var message;
			try {

				console.log('req.body.src: <'+req.body.src+'>');
				
				result = that.handler(req.body.src);
				res.writeHead(200,{'Content-type': 'application/json'});
				res.end(result);
			}
			catch (ex) {
				
				console.log("Exception!");
				
				result = ex.toString();
				that.logmessage(result);
			}			
		});

		this.listen = function() {
			this.httpserver.listen(this.portno);
		}
		
		return this;
	}
})();


exports.testserver = function() {

	var s = new exports.Server(9913,testhandler,testlogmessage);
	s.listen();
	
	function testhandler(line) {
		return JSON.stringify({testhandler: line});
	}
	
	function testlogmessage(message) {
		console.log("testlogmessage: "+message);
	}
	
	return s;
}
