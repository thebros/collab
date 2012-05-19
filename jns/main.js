
// jns - main module

var jns = {};

jns.spawn = require('child_process').spawn;

load_subsystems();

jns.bindir = process.cwd();




(function mainfunction() {
	
	var CommandServer = require('./ui/commandserver.js').Server;
	jns.commandserver = new CommandServer(9913,commandhandler(),jns.logging.logmessage);
	jns.commandserver.listen();
	
	startup();
	
	
	console.log(jns);
	
	
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
	jns.logmessage("ERROR: "+subsystem+" - "+mess);
}


jns.subsystem_warning = function(subsystem,mess) {
	jns.logwarning("WARNING: "+subsystem+" - "+mess);
}


function load_subsystems() {
	var subsystems = ["logging","registry","messaging","scheduler"];
	var ss;
	for (var s in subsystems) {
		ss = subsystems[s];
		jns[ss] = require('./subsystem/'+ss+'.js');
	}
}


function commandhandler() {
	
	var commands = {version: function() {return "0.1"}};
	
	var dispatch = require('./util/dispatch.js').dispatcher(commands);
	
	return function(line) {
		var result = dispatch(jns,line);
		if ('parseerror' in result) {
			return "error parsing command: "+result.parseerror;
		}
		if ('runerror' in result) {
			return "error running command: "+result.runerror;
		}
		if ('result' in result) {
			return result.result;
		}
		return 'internal error: no known key in dispatch result!';
	}
}

exports.jns = jns;
