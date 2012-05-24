
(function() {
	
	var wrapper = require('../debugging/wrapper.js');

	exports.Subsystem = function(jns) {
		this.jns = jns;
		this.logmessage = logmessage;
		this.logwrap = logwrap;
		return this;
	}
	
	function logmessage(message) {
		console.log(message);
	}
	
	function logwrap(fun) {
		
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
