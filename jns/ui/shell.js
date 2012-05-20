
(function() {

	var ask = require('../util/ask.js');
	var cc = require('../ui/commandclient.js');
	
	exports.interactive = function() {
		
		function startask() {
			ask.ask("line",/^.*$/,callback);
		}
		
		function callback(err,result) {
			if (err) {
				console.log(err);
			}
			else {
				if (result.line=='q') {
					ask.pause();
				}
				else {					
					cc.send(result.line,true);
					startask();
				}
			}
		}
		
		startask();
	}
	
})();
