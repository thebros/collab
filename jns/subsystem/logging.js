
(function() {
	
	var jns;
	
	exports.setjns = function(thejns) {
		jns = thejns;
	}
	
	var wrapper = require('../debugging/wrapper.js');

	function logmessage(message) {
		console.log(message);
	}
	exports.logmessage = logmessage;
	
	exports.logwrap = function(fun) {
		
		var funname = fun.name;
		
		function handler(calltype,args) {logmessage(funname+" "+calltype+" "+args);}
		
		var handlertable = {
			onwrapexception: handler,
			onbeforecall: handler,
			onaftercall: handler,
			oncallexception: handler
		};
		
		return wrapper.wrapfunction(fun,handlertable);
	}
	
})();
