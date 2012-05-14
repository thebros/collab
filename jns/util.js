
exports.isrunningpid = function(pid) {

	var util  = require('util'),
	    spawn = require('child_process').spawn,
	    ps    = spawn('ps', ['ax']);

	ps.stdout.on('data', function (data) {
	  console.log("ps stdout:",data.toString());
	});

	ps.stderr.on('data', function (data) {
	  console.log('ps stderr:',data.toString());
	});

	ps.on('exit', function (code) {
	  //if (code !== 0) {
	    console.log('ps process exited with code ' + code);
	  //}
	});


};

