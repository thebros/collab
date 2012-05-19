
(function(){

	function ask(question, format, callback) {
	 var stdin = process.stdin, stdout = process.stdout;
 
	 stdin.resume();
	 stdout.write(question + ": ");
 
	 stdin.once('data', function(data) {
	   data = data.toString().trim();
 
	   if (format.test(data)) {
	     callback(data);
	   } else {
	     stdout.write("It should match: "+ format +"\n");
	     ask(question, format, callback);
	   }
	 });
	}
	exports.ask = ask;
	
	commandclient = require('./commandclient.js');
	exports.interactive = function() {
	
		var input;
		var goon = true;
		do {
			ask("jsn> ",/^.*$/,execute);
		} while (goon);
		
		function execute(line) {
			if (line=="q") {
				goon = false;
			}
			else {
				console.log(commandclient.send(line));
			}
		}
	}
	
})()
