
(function() {
	
	var jns;
	
	exports.setjns = function(thejns) {
		jns = thejns;
	}
	
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
	
		if (! idpath) {
			jns.subsystem_error('registry.send','empty idpath passed to send');
		}
		
		var dest = idpath;
		var result;
		
		do {
			
			if (result = sendto(dest,message)) {
				return result.result;
			}
			
			dest = withoutlast(dest);
		} while (dest);
		
		jns.subsystem_error('registry.send','key not in registry: '+idpath);
		
		function sendto(idpath,message) {		
			console.log('registry trying "'+idpath+'"');	
			var handler = registry[idpath];
			if (typeof handler == 'undefined') {
				return null;
			}
			return {result: handler(idpath,message)};
		}
		
		function withoutlast(s) {
			var poslastdot = s.lastIndexOf('.');
			if (poslastdot == -1) {
				return s;
			}
			else {
				return s.substring(0,poslastdot-1);
			}
		}
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
		jns.messaging.noforeignidpath(idpath,registry_idpath);
		if (message.messagetype == 'basic.identify') {
			return 'System Registry';
		}
		else {
			throw new Error(registry_idpath+': unknown message - '+message.messagetype);
		}
	}
	
})();

