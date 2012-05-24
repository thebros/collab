
// jns - main module

(function() {
	
	var main_idpath = "sys.main";
	var main_version = "0.1";

	console.log('JNS '+main_version);
	
	var jns = {};
	jns.shuttingdown = false;
	jns.unavailable = function(funname) {throw new Error('Function "'+funname+'" is not available at this time');}

	jns.spawn = require('child_process').spawn;

	console.log('- loading subsystems');
	load_subsystems();
		
	jns.registry.register(main_idpath,messagehandler);

	jns.bindir = process.cwd();


	(function mainfunction() {
	
		console.log('- about to listen on port 9913');
		var CommandServer = require('./ui/commandserver.js').Server;
		jns.commandserver = new CommandServer(9913,commandhandler(),jns.logging.logmessage);
		jns.commandserver.listen();
		
		console.log('- startup');
		startup();
	
		jns.logging.logwrap(mainloop);
	})();


	function mainloop() {
	
	}


	function startup() {
		//startwatchdog(process.pid);
	}
	

	function startwatchdog(ppid) {
		jns.spawn("node watchdog.js",[ppid],{cwd: jns.bindir})
	}


	jns.logmessage = function(mess) {
		console.log("logmessage| "+mess);
	}


	jns.subsystem_error = function(subsystem,mess) {
		jns.logging.logmessage("ERROR: "+subsystem+" - "+mess);
	}


	jns.subsystem_warning = function(subsystem,mess) {
		jns.logging.logmessage("WARNING: "+subsystem+" - "+mess);
	}


	function load_subsystems() {
		var subsystems = ["logging","registry","messaging","scheduler"];
		var ss;
		for (var s in subsystems) {
			ss = subsystems[s];
			console.log('-- '+ss);
			jns[ss] = new require('./subsystem/'+ss+'.js').Subsystem(jns);
		}
	}


	function commandhandler() {
	
		var commands = {
			
			version: function(jns,command,args) {
				return "0.1"
			},
			
			registry: function(jns,command,args) {
				return jns.registry.dump();
			},
			
			send: function(jns,command,args) {
				var argarr = args.split(/\s*,\s*/);
				var message = {source: "sys.console", dest: argarr[0], messagetype: argarr[1]};
				return jns.registry.send(message.dest,message);
			},
		};
	
		var dispatch = require('./util/dispatch.js').dispatcher(commands);
	
		return function(line) {
			jns.logging.logmessage("main command: "+line);
			var result = dispatch(jns,line);
			if ('parseerror' in result) {
				return {error: "error parsing command: "+result.parseerror};
			}
			if ('runerror' in result) {
				return {error: "error running command: "+result.runerror};
			}
			if ('result' in result) {
				jns.logging.logmessage("main result: "+result.result);
				return result;
			}
			return 'internal error: no known key in dispatch result!';
		}
	}
	
	function messagehandler(idpath,message) {
		jns.messaging.noforeignidpath(idpath,main_idpath);
		console.log("messagehandler: "+message.messagetype);
		switch (message.messagetype) {
			case 'basic.identify': return 'JNS '+main_version;
			case 'basic.shutdown':
				if (! jns.shuttingdown) {
					jns.shuttingdown = true;
					jns.registry.broadcast('sys.','basic.shutdown');
					console.log('main shutting down');
					process.exit(0);
				}
			default: throw new Error(main_idpath+': unknown message - '+message.messagetype);
		}
	}

	exports.jns = jns;
	
})();

