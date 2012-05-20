
(function() {

	var ask = require('../util/ask.js');
	var cc = require('../ui/commandclient.js');
	
	exports.interactive = function() {
		
		ask.ask("jns> ",/^.*$/,callback);
		
		function callback(err,result) {
			if (err) {
				console.log(err);
			}
			else {
				if (result=='q') {
					ask.pause();
				}
				else {
					cc.send(result,true);
				}
			}
		}
	}
	
})();
