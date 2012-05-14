
// jns - main module

jns = {};

jns.spawn = require('child_process').spawn;

jns.registry = require('./subsystem/registry.js');
jns.scheduler = require('./subsystem/scheduler.js');

jns.bindir = process.cwd();


(function mainfunction() {

	startup();
	
	mainloop();
	
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

