
(function() {
	
	exports.wrapmodule = function(modulename,handler) {

		var wrappingmodule;
		var wrappedmodule;
		var propname;
		var propvalue;
	
		try {
			wrappingmodule = {};
			wrappedmodule = require(modulename);
			for (propname in wrappedmodule) {
				if (wrappedmodule.hasOwnProperty(propname)) {
					propvalue = wrappedmodule[propname];
					if (typeof propvalue == 'function') {
						wrappingmodule[propname] = wrapfunction(propvalue,handler);
					}
				}
			}
		}
		
		catch (ex) {
			handlercall(handler,"onwrapexception",[ex,modulename]);
		};
		
		return wrappingmodule;
	};
	
	function wrapfunction(fun,handler) {
		return function () {
			var result;
			try {
				handlercall(handler("onbeforecall",[arguments]));
				result = apply(fun,arguments);
				handlercall(handler("onaftercall",[arguments,result]));
				return result;
			}
			catch (ex) {
				handlercall(handler,"oncallexception",[ex,fun.name]);
			}
		};
	};
	exports.wrapfunction = wrapfunction;
	
	function handlercall(handler,calltype,args) {
		if (calltype in handler) {
			handler[calltype](args);
		}
	}
})();
