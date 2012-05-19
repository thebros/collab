
(function() {
	
	var registry = {};
	
	// handler.message should take (idpath,message) as parameters
	exports.register = function(idpath,handler) {
		if (typeof handler == 'undefined') {
			jns.subsystem_error('registry.register','handler not defined');
		}
		if (typeof registry[idpath] != 'undefined') {
			console.log(typeof registry[idpath]);
			jns.subsystem_warning('registry.register','key already in registry: '+idpath);
		}
		registry[idpath] = handler;
	}
	
	exports.unregister = function(idpath) {
		if (typeof registry[idpath] == 'undefined') {
			jns.subsystem_warning('registry.unregister','key not in registry: '+idpath);
		}
		else {
			delete registry[idpath];
		}
	}
	
	exports.send = function(idpath,message) {
		var handler = registry[idpath];
		if (typeof handler == 'undefined') {
			jns.subsystem_error('registry.send','key not in registry: '+idpath);
		}
		return handler.message(idpath,message);
	}
	
	exports.dump = function() {
		return registry;
	}
	
})();

