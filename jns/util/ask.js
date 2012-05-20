
(function() {
	
	var prompt = require('prompt');
	
	exports.ask = function(question,format,callback,warningmessage,allowempty) {
		
		if (typeof warningmessage == 'undefined') {
			warningmessage = "Invalid input";
		}
		
		if (typeof allowempty == 'undefined') {
			allowempty = false;
		}
		
		var properties = [
			{
				name: question, 
				validator: format,
				warning: warningmessage,
				empty: allowempty
			},
		];


		prompt.start();

		prompt.get(properties, callback);
	}
	
	exports.pause = function() {
		prompt.pause();
	}
	
})()

