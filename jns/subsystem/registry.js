
(function() {
	
	var registry = {};
	
	var registry_idpath = 'sys.registry';
	registry[registry_idpath] = messagehandler;
	
	function identify_message(dest) {
		return {source: registry_idpath, dest: dest, messagetype: 'basic.identify'}
	}
	
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
		return handler(idpath,message);
	}
	
	exports.dump = function() {
		
		var result = "";
		var idpath;
		for (idpath in registry) {
			result += (idpath+"="+registry[idpath](idpath,identify_message(idpath))+'\n');
		}
		
		return result;
	}
	
	function messagehandler(idpath,message) {
		if (message.messagetype == 'basic.identify') {
			return 'System Registry';
		}
		else {
			throw new Error(registry_idpath+': unknown message - '+message.messagetype);
		}
	}
	
})();

