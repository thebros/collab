
(function() {

	var ask = require('../util/ask.js');
	var cc = require('../ui/commandclient.js');
	
	
	exports.interactive = function() {
		
		
		function startask() {
			ask.ask("line",undefined,askcallback,undefined,true);
		}
		
		
		function askcallback(err,result) {
			
			var line;
			
			if (err) {
				console.log(err);
			}
			
			else {
			
				line = result.line;
				
				if (line=='q') {
					// if we don't call startask the process will quit ..
				}
				else {		
					if (line.length) {		
						cc.send(line,sendcallback,false);
						// - this will call startask when it's written the response to stdout
					}
					else {
						startask();
					}
				}
			}
			
			function sendcallback(chunk) {
				process.stdout.write(JSON.parse(chunk)+'\n');
				startask();
			}
		}
		
		startask();
	}
	
})();
