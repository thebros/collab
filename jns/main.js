
// jns - main module

jns = {};

jns.spawn = require('child_process').spawn;

load_subsystems();

jns.bindir = process.cwd();


(function mainfunction() {

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
