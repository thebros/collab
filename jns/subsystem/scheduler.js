
(function() {
	
	var schedule = {};
	
	// handler.message should take (idpath,message) as parameters
	exports.schedule = function(idpath,interval,handler) {
		if (typeof handler == undefined) {
			jsn.subsystem_error('scheduler.schedule','handler not defined');
		}
		if (typeof schedule[idpath] != undefined) {
			jsn.subsystem_warning('scheduler.schedule','key already in schedule: '+idpath);
		}
		schedule[idpath] = {
			ticksInterval: interval,
			ticksRemaining: interval,
			taskHandler: handler
		};
	}
	
	exports.unschedule = function(idpath) {
		if (typeof schedule[idpath] == undefined) {
			jsn.subsystem_warning('scheduler.unschedule','key not in schedule: '+idpath);
		}
		else {
			delete schedule[idpath];
		}
	}
	
	exports.once = function() {
		for (var idpath in schedule) {
			if (schedule.hasOwnProperty(idpath)) {
				var task = schedule[idpath];
				if (!(task.ticksRemaining--)) {
					task.ticksRemaining = task.ticksInterval;
					try {
						task.taskHandler(idpath,{messagetype:".once", messageargs: []});
					}
					catch (err) {
						jsn.subsystem_error('scheduler.once: error running task '+idpath+' - '+err.toString());
					}
				}
			}
		}
	}
	
})();

